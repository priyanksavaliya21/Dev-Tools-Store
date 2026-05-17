"use client";
import { useState } from "react";
import { CUSTOMERS } from "@/lib/products";
export default function ProductCard({ product }) {
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleCustomerChange = (e) => {
    const email = e.target.value;
    setSelectedCustomer(email);
    setError("");
    const customer = CUSTOMERS.find((c) => c.email === email);
    if (customer?.phone) setPhone(customer.phone);
    else setPhone("");
  };
  const handleBuyNow = async () => {
    if (!selectedCustomer) {
      setError("Please select a customer first.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId: product.priceId,
          mode: "payment",
          customerEmail: selectedCustomer,
          customerPhone: phone || undefined,
          productName: product.name,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to create checkout session");
      }
      window.location.href = data.url;
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      setLoading(false);
    }
  };
  return (
    <div className="Product_Card">
      <div className="Card_Icon">{product.icon}</div>
      <h3 className="Card_Title">{product.name}</h3>
      <p className="Card_Description">{product.description}</p>
      <ul className="Card_Features">
        {product.features.map((feature, i) => (
          <li key={i}>
            <span className="Check_Icon">✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <div className="Card_Price">
        ${product.price.toFixed(2)}
        <span className="Price_Label">one-time</span>
      </div>
      <div className="Card_Footer">
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
        {error && (
          <p className="Error_Text">
            {error}
          </p>
        )}
        <button className="Buy_Btn" onClick={handleBuyNow} disabled={loading}>
          {loading && <span className="Btn_Spinner" />}
          {loading ? "Processing..." : "Buy Now"}
        </button>
      </div>
    </div>
  );
}
