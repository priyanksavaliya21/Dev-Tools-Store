import { NextResponse } from "next/server";
import stripe from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase";
export const runtime = "nodejs";
export async function POST(req) {
  let event;
  try {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");
    if (!signature) {
      console.error("[webhook] Missing stripe-signature header");
      return NextResponse.json(
        { error: "Missing stripe-signature" },
        { status: 400 },
      );
    }
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET,
      );
    } catch (err) {
      console.error("[webhook] Signature verification failed:", err.message);
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }
    const { data: existingEvent } = await supabaseAdmin
      .from("processed_events")
      .select("id")
      .eq("stripe_event_id", event.id)
      .single();
    if (existingEvent) {
      return NextResponse.json(
        { received: true, duplicate: true },
        { status: 200 },
      );
    }
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutSessionCompleted(event.data.object);
        break;
      case "invoice.paid":
      case "invoice.payment_succeeded":
        await handleInvoicePaid(event.data.object);
        break;
      case "invoice.payment_failed":
        await handleInvoicePaymentFailed(event.data.object);
        break;
      case "customer.subscription.updated":
        await handleSubscriptionUpdated(event.data.object);
        break;
      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(event.data.object);
        break;
      default:
        console.log(`[webhook] Unhandled event type: ${event.type}`);
    }
    await supabaseAdmin.from("processed_events").insert({
      stripe_event_id: event.id,
      event_type: event.type,
    });
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("[webhook] Error processing event:", error.message);
    return NextResponse.json(
      { received: true, error: error.message },
      { status: 200 },
    );
  }
}
function getSubscriptionIdFromInvoice(invoice) {
  if (invoice.subscription) return invoice.subscription;
  if (invoice.parent?.subscription_details?.subscription)
    return invoice.parent.subscription_details.subscription;
  return null;
}
async function handleCheckoutSessionCompleted(session) {
  const customerEmail =
    session.metadata?.customer_email || session.customer_details?.email || "";
  const customerPhone =
    session.metadata?.customer_phone || session.customer_details?.phone || "";
  if (customerEmail && session.customer) {
    const updateData = { stripe_customer_id: session.customer };
    if (customerPhone) updateData.phone = customerPhone;
    await supabaseAdmin
      .from("customers")
      .update(updateData)
      .eq("email", customerEmail);
  }
  if (session.mode === "payment") {
    const { error } = await supabaseAdmin.from("payments").upsert(
      {
        stripe_session_id: session.id,
        customer_email: customerEmail,
        customer_phone: customerPhone || null,
        product_name: session.metadata?.product_name || "Unknown Product",
        amount: (session.amount_total || 0) / 100,
        currency: session.currency || "usd",
        status: "paid",
      },
      { onConflict: "stripe_session_id" },
    );

    if (error) {
      console.error("[webhook] Error saving payment:", error.message);
      throw error;
    }
  }
  if (session.mode === "subscription") {
    const subscriptionId = session.subscription;
    if (!subscriptionId) {
      console.error("[webhook] No subscription ID found on checkout session.");
      return;
    }
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const planName =
      subscription.metadata?.plan_name ||
      session.metadata?.product_name ||
      "Unknown Plan";
    let amount = 0;
    let billingInterval = "month";
    if (subscription.items?.data?.length > 0) {
      amount = (subscription.items.data[0].price?.unit_amount || 0) / 100;
      billingInterval =
        subscription.items.data[0].price?.recurring?.interval || "month";
    } else {
      amount = (session.amount_total || 0) / 100;
    }
    const { error } = await supabaseAdmin.from("subscriptions").upsert(
      {
        stripe_subscription_id: subscription.id,
        customer_email: customerEmail,
        customer_phone: customerPhone || null,
        plan_name: planName,
        interval: billingInterval,
        amount: amount,
        currency: subscription.currency || session.currency || "usd",
        status: subscription.status || "active",
        current_period_end: subscription.current_period_end
          ? new Date(subscription.current_period_end * 1000).toISOString()
          : null,
        cancel_at: subscription.cancel_at
          ? new Date(subscription.cancel_at * 1000).toISOString()
          : null,
        canceled_at: subscription.canceled_at
          ? new Date(subscription.canceled_at * 1000).toISOString()
          : null,
      },
      { onConflict: "stripe_subscription_id" },
    );
    if (error) {
      console.error("[webhook] Error saving subscription:", error.message);
      throw error;
    }
  }
}
async function handleInvoicePaid(invoice) {
  const subscriptionId = getSubscriptionIdFromInvoice(invoice);
  if (!subscriptionId) {
    return;
  }
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  const customerEmail =
    subscription.metadata?.customer_email || invoice.customer_email || "";
  const customerPhone = subscription.metadata?.customer_phone || "";
  const planName = subscription.metadata?.plan_name || "Unknown Plan";
  let amount = 0;
  let billingInterval = "month";
  if (subscription.items?.data?.length > 0) {
    amount = (subscription.items.data[0].price?.unit_amount || 0) / 100;
    billingInterval =
      subscription.items.data[0].price?.recurring?.interval || "month";
  } else {
    amount = (invoice.amount_paid || 0) / 100;
  }
  const { error } = await supabaseAdmin.from("subscriptions").upsert(
    {
      stripe_subscription_id: subscription.id,
      customer_email: customerEmail,
      customer_phone: customerPhone || null,
      plan_name: planName,
      interval: billingInterval,
      amount: amount,
      currency: invoice.currency || "usd",
      status: subscription.status || "active",
      current_period_end: subscription.current_period_end
        ? new Date(subscription.current_period_end * 1000).toISOString()
        : null,
      cancel_at: subscription.cancel_at
        ? new Date(subscription.cancel_at * 1000).toISOString()
        : null,
      canceled_at: subscription.canceled_at
        ? new Date(subscription.canceled_at * 1000).toISOString()
        : null,
    },
    { onConflict: "stripe_subscription_id" },
  );
  if (error) {
    console.error("[webhook] Error saving subscription:", error.message);
    throw error;
  }
}
async function handleSubscriptionUpdated(subscription) {
  let effectiveStatus = subscription.status;
  if (subscription.cancel_at_period_end && subscription.status === "active") {
    effectiveStatus = "canceling";
  }
  const customerEmail = subscription.metadata?.customer_email || "";
  const customerPhone = subscription.metadata?.customer_phone || "";
  const planName = subscription.metadata?.plan_name || "Unknown Plan";
  let amount = 0;
  let billingInterval = "month";
  if (subscription.items?.data?.length > 0) {
    amount = (subscription.items.data[0].price?.unit_amount || 0) / 100;
    billingInterval =
      subscription.items.data[0].price?.recurring?.interval || "month";
  }
  const { error } = await supabaseAdmin.from("subscriptions").upsert(
    {
      stripe_subscription_id: subscription.id,
      customer_email: customerEmail,
      customer_phone: customerPhone || null,
      plan_name: planName,
      interval: billingInterval,
      amount: amount,
      currency: subscription.currency || "usd",
      status: effectiveStatus,
      current_period_end: subscription.current_period_end
        ? new Date(subscription.current_period_end * 1000).toISOString()
        : null,
      cancel_at: subscription.cancel_at
        ? new Date(subscription.cancel_at * 1000).toISOString()
        : null,
      canceled_at: subscription.canceled_at
        ? new Date(subscription.canceled_at * 1000).toISOString()
        : null,
    },
    { onConflict: "stripe_subscription_id" },
  );
  if (error) {
    console.error("[webhook] Error updating subscription:", error.message);
    throw error;
  }
}
async function handleInvoicePaymentFailed(invoice) {
  const subscriptionId = getSubscriptionIdFromInvoice(invoice);
  if (!subscriptionId) return;
  const { error } = await supabaseAdmin
    .from("subscriptions")
    .update({ status: "payment_failed" })
    .eq("stripe_subscription_id", subscriptionId);
  if (error) {
    console.error(
      "[webhook] Error updating subscription status:",
      error.message,
    );
    throw error;
  }
}
async function handleSubscriptionDeleted(subscription) {
  const { error } = await supabaseAdmin
    .from("subscriptions")
    .update({
      status: "canceled",
      canceled_at: subscription.canceled_at
        ? new Date(subscription.canceled_at * 1000).toISOString()
        : new Date().toISOString(),
    })
    .eq("stripe_subscription_id", subscription.id);
  if (error) {
    console.error(
      "[webhook] Error updating subscription to canceled:",
      error.message,
    );
    throw error;
  }
}
