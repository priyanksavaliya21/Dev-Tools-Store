import { NextResponse } from "next/server";
import stripe from "@/lib/stripe";
export async function POST(req) {
  try {
    const body = await req.json();
    const { customerEmail } = body;
    if (!customerEmail) {
      return NextResponse.json(
        { error: "Missing required field: customerEmail" },
        { status: 400 },
      );
    }
    const existingCustomers = await stripe.customers.list({
      email: customerEmail,
      limit: 1,
    });
    if (existingCustomers.data.length === 0) {
      return NextResponse.json(
        { error: "No Stripe customer found with this email" },
        { status: 404 },
      );
    }
    const customerId = existingCustomers.data[0].id;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${appUrl}/admin`,
    });
    return NextResponse.json({ url: portalSession.url }, { status: 200 });
  } catch (error) {
    console.error("[create-portal-session] Error:", error.message);
    return NextResponse.json(
      { error: error.message || "Failed to create portal session" },
      { status: 500 },
    );
  }
}
