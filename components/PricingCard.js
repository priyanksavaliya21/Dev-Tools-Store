"use client";
import { useState } from "react";
import { CUSTOMERS } from "@/lib/products";
export default function PricingCard({ plan, billing }) {
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const currentPlan = billing === "yearly" ? plan.yearly : plan.monthly;
  const price = currentPlan.price;
  const priceId = currentPlan.priceId;
  const interval = currentPlan.interval;
  const monthlyEquivalent =
    billing === "yearly" ? (price / 12).toFixed(2) : null;
  const handleCustomerChange = (e) => {
    const email = e.target.value;
    setSelectedCustomer(email);
    setError("");
    const customer = CUSTOMERS.find((c) => c.email === email);
    if (customer?.phone) setPhone(customer.phone);
    else setPhone("");
  };
  const handleSubscribe = async () => {
    if (!selectedCustomer) {
      setError("Please select a customer first.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const planLabel = `${plan.name} (${billing === "yearly" ? "Annual" : "Monthly"})`;
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId: priceId,
          mode: "subscription",
          customerEmail: selectedCustomer,
          customerPhone: phone || undefined,
          productName: planLabel,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create checkout");
      window.location.href = data.url;
    } catch (err) {
      setError(err.message || "Something went wrong.");
      setLoading(false);
    }
  };
  return (
    <div className={`Pricing_Card ${plan.popular ? "Popular" : ""}`}>
      {plan.popular && <div className="Popular_Badge">Most Popular</div>}
      <div className="Plan_Top">
        <div className="Plan_Icon">{plan.icon}</div>
        <h3 className="Plan_Name">{plan.name}</h3>
        <p className="Plan_Description">{plan.description}</p>
        <div className="Plan_Price">
          ${price.toFixed(2)}
          <span className="Price_Period">/{interval}</span>
        </div>
        {billing === "yearly" && monthlyEquivalent && (
          <div className="Price_Monthly_Equivalent">
            That&apos;s just ${monthlyEquivalent}/month
          </div>
        )}
        <select
          className="Customer_Select"
          value={selectedCustomer}
          onChange={handleCustomerChange}
        >
          <option value="">Select Customer</option>
          {CUSTOMERS.map((c) => (
            <option key={c.email} value={c.email}>
              {c.name} — {c.email}
            </option>
          ))}
        </select>
        <input
          className="Phone_Input"
          type="tel"
          placeholder="Phone number (optional)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        {error && <p className="Error_Text">{error}</p>}
        <button
          className={`Subscribe_Btn ${plan.popular ? "Primary_CTA" : "Secondary_CTA"}`}
          onClick={handleSubscribe}
          disabled={loading}
        >
          {loading && <span className="Btn_Spinner" />}
          {loading
            ? "Processing..."
            : `Subscribe ${billing === "yearly" ? "Annually" : "Monthly"}`}
        </button>
      </div>
      <div className="Plan_Bottom">
        <div className="Features_Title">What&apos;s included</div>
        <ul className="Features_List">
          {plan.features.map((feature, i) => (
            <li key={i}>
              <span className="Feature_Check">✓</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
