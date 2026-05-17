"use client";
import { useState } from "react";
import PricingCard from "@/components/PricingCard";
import { SUBSCRIPTION_PLANS } from "@/lib/products";
export default function PricingSection() {
  const [billing, setBilling] = useState("monthly");
  return (
    <section className="Pricing_Section_Wrapper" id="pricing">
      <div className="container">
        <div className="Section_Header">
          <span className="Section_Label">Pricing</span>
          <h2 className="Title">
            Flexible <span className="Gradient_Text">Pricing Plans</span> for
            Everyone
          </h2>
          <p className="Description">
            Unlock unlimited access to all tools with our transparent
            subscription plans. Choose monthly flexibility or save with annual
            billing. Cancel anytime with no penalties.
          </p>
          <div className="Billing_Toggle">
            <button
              className={`Toggle_Btn ${billing === "monthly" ? "Active" : ""}`}
              onClick={() => setBilling("monthly")}
            >
              Monthly
            </button>
            <button
              className={`Toggle_Btn ${billing === "yearly" ? "Active" : ""}`}
              onClick={() => setBilling("yearly")}
            >
              Yearly
            </button>
          </div>
        </div>

        <div className="Plans_Grid">
          {SUBSCRIPTION_PLANS.map((plan) => (
            <PricingCard key={plan.id} plan={plan} billing={billing} />
          ))}
        </div>
      </div>
    </section>
  );
}
