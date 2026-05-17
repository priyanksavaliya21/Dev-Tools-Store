"use client";
import { useState, useEffect, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);
export default function AdminPage() {
  const [customers, setCustomers] = useState([]);
  const [payments, setPayments] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [portalLoading, setPortalLoading] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const fetchData = useCallback(async () => {
    try {
      setError("");
      const [custRes, payRes, subRes] = await Promise.all([
        supabase
          .from("customers")
          .select("*")
          .order("created_at", { ascending: true }),
        supabase
          .from("payments")
          .select("*")
          .order("created_at", { ascending: false }),
        supabase
          .from("subscriptions")
          .select("*")
          .order("created_at", { ascending: false }),
      ]);
      if (custRes.error) throw new Error(`Customers: ${custRes.error.message}`);
      if (payRes.error) throw new Error(`Payments: ${payRes.error.message}`);
      if (subRes.error)
        throw new Error(`Subscriptions: ${subRes.error.message}`);
      setCustomers(custRes.data || []);
      setPayments(payRes.data || []);
      setSubscriptions(subRes.data || []);
    } catch (err) {
      setError(err.message || "Failed to load data from Supabase.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);
  useEffect(() => {
    const init = async () => {
      await fetchData();
    };
    init();
  }, [fetchData]);
  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };
  const handlePortal = async (email) => {
    setPortalLoading(email);
    try {
      const res = await fetch("/api/create-portal-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerEmail: email }),
      });
      const data = await res.json();
      if (!res.ok)
        throw new Error(data.error || "Failed to create portal session");
      window.open(data.url, "_blank");
    } catch (err) {
      alert("Portal error: " + err.message);
    } finally {
      setPortalLoading("");
    }
  };
  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  const getStatusLabel = (status) => {
    const labels = {
      active: "Active",
      canceling: "Canceling",
      canceled: "Canceled",
      past_due: "Past Due",
      unpaid: "Unpaid",
      payment_failed: "Payment Failed",
      incomplete: "Incomplete",
      trialing: "Trialing",
    };
    return labels[status] || status;
  };
  if (loading) {
    return (
      <div className="Admin_Page">
        <div className="container">
          <div className="Admin_Header">
            <h1 className="Admin_Title">Admin Dashboard</h1>
            <p className="Admin_Subtitle">Loading data...</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="Admin_Page">
      <div className="container">
        <div className="Admin_Header">
          <h1 className="Admin_Title">Admin Dashboard</h1>
          <p className="Admin_Subtitle">
            View all customers, payments, and subscriptions from Supabase.
          </p>
          <div className="Admin_Security_Note">
            ⚠️ Production note: This page should be secured with authentication
            middleware (e.g., Next.js middleware + Supabase Auth or
            NextAuth.js).
          </div>
        </div>
        {error && (
          <div className="Admin_Error_Banner">
            ⚠️ Error loading data: {error}
          </div>
        )}
        <button
          className="Refresh_Btn"
          onClick={handleRefresh}
          disabled={refreshing}
        >
          {refreshing && <span className="Btn_Spinner" />}
          {refreshing ? "Refreshing..." : "↻ Refresh Data"}
        </button>
        <div className="Admin_Section">
          <h2 className="Section_Title">Customers ({customers.length})</h2>
          <div className="Admin_Table_Wrapper">
            <table className="Admin_Table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Stripe ID</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {customers.length === 0 ? (
                  <tr className="Empty_Row">
                    <td colSpan={5}>No customers found</td>
                  </tr>
                ) : (
                  customers.map((c) => (
                    <tr key={c.id}>
                      <td className="Cell_Primary">{c.name}</td>
                      <td>{c.email}</td>
                      <td>{c.phone || "—"}</td>
                      <td>{c.stripe_customer_id || "—"}</td>
                      <td>{formatDate(c.created_at)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="Admin_Section">
          <h2 className="Section_Title">
            One-Off Payments ({payments.length})
          </h2>
          <div className="Admin_Table_Wrapper">
            <table className="Admin_Table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Customer</th>
                  <th>Phone</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Session ID</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.length === 0 ? (
                  <tr className="Empty_Row">
                    <td colSpan={7}>No payments yet. Make a test purchase!</td>
                  </tr>
                ) : (
                  payments.map((p) => (
                    <tr key={p.id}>
                      <td className="Cell_Primary">{p.product_name}</td>
                      <td>{p.customer_email}</td>
                      <td>{p.customer_phone || "—"}</td>
                      <td className="Cell_Amount">
                        ${Number(p.amount).toFixed(2)}{" "}
                        {p.currency?.toUpperCase()}
                      </td>
                      <td>
                        <span className={`Status_Badge ${p.status}`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="Cell_Truncate">{p.stripe_session_id}</td>
                      <td>{formatDate(p.created_at)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="Admin_Section">
          <h2 className="Section_Title">
            Subscriptions ({subscriptions.length})
          </h2>
          <div className="Admin_Table_Wrapper">
            <table className="Admin_Table">
              <thead>
                <tr>
                  <th>Plan</th>
                  <th>Customer</th>
                  <th>Phone</th>
                  <th>Amount</th>
                  <th>Interval</th>
                  <th>Status</th>
                  <th>Period End</th>
                  <th>Cancels At</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.length === 0 ? (
                  <tr className="Empty_Row">
                    <td colSpan={10}>
                      No subscriptions yet. Subscribe to a plan!
                    </td>
                  </tr>
                ) : (
                  subscriptions.map((s) => (
                    <tr key={s.id}>
                      <td className="Cell_Primary">{s.plan_name}</td>
                      <td>{s.customer_email}</td>
                      <td>{s.customer_phone || "—"}</td>
                      <td className="Cell_Amount">
                        ${Number(s.amount).toFixed(2)}/
                        {s.interval === "year" ? "yr" : "mo"}
                      </td>
                      <td>
                        <span
                          className={`Status_Badge ${s.interval === "year" ? "active" : "pending"}`}
                        >
                          {s.interval === "year" ? "Yearly" : "Monthly"}
                        </span>
                      </td>
                      <td>
                        <span className={`Status_Badge ${s.status}`}>
                          {getStatusLabel(s.status)}
                        </span>
                      </td>
                      <td>{formatDate(s.current_period_end)}</td>
                      <td>
                        {s.cancel_at ? (
                          <span className="Cell_Canceling_Text">
                            {formatDate(s.cancel_at)}
                          </span>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td>{formatDate(s.created_at)}</td>
                      <td>
                        {(s.status === "active" ||
                          s.status === "canceling") && (
                          <button
                            className="Portal_Btn"
                            onClick={() => handlePortal(s.customer_email)}
                            disabled={portalLoading === s.customer_email}
                          >
                            {portalLoading === s.customer_email
                              ? "..."
                              : "Manage"}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
