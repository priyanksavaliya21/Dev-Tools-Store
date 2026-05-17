import { NextResponse } from "next/server";
import stripe from "@/lib/stripe";
export async function POST(req) {
  try {
    const body = await req.json();
    const { priceId, mode, customerEmail, customerPhone, productName } = body;
    if (!priceId || !mode || !customerEmail || !productName) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: priceId, mode, customerEmail, productName",
        },
        { status: 400 },
      );
    }
    if (!["payment", "subscription"].includes(mode)) {
      return NextResponse.json(
        { error: 'Invalid mode. Must be "payment" or "subscription".' },
        { status: 400 },
      );
    }
    const existingCustomers = await stripe.customers.list({
      email: customerEmail,
      limit: 1,
    });
    let customerId;
    if (existingCustomers.data.length > 0) {
      customerId = existingCustomers.data[0].id;
      if (customerPhone) {
        await stripe.customers.update(customerId, { phone: customerPhone });
      }
    } else {
      const newCustomer = await stripe.customers.create({
        email: customerEmail,
        phone: customerPhone || undefined,
        metadata: { source: "devtools-store" },
      });
      customerId = newCustomer.id;
    }
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const sessionConfig = {
      customer: customerId,
      line_items: [{ price: priceId, quantity: 1 }],
      mode: mode,
      success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/cancel`,
      metadata: {
        product_name: productName,
        customer_email: customerEmail,
        customer_phone: customerPhone || "",
      },
    };
    if (mode === "subscription") {
      sessionConfig.subscription_data = {
        metadata: {
          plan_name: productName,
          customer_email: customerEmail,
          customer_phone: customerPhone || "",
        },
      };
    }
    if (mode === "payment") {
      sessionConfig.payment_intent_data = {
        metadata: {
          product_name: productName,
          customer_email: customerEmail,
          customer_phone: customerPhone || "",
        },
      };
    }
    const session = await stripe.checkout.sessions.create(sessionConfig);
    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (error) {
    console.error("[create-checkout-session] Error:", error.message);
    return NextResponse.json(
      { error: error.message || "Failed to create checkout session" },
      { status: 500 },
    );
  }
}
