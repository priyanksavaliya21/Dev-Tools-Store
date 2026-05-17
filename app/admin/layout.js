export const metadata = {
  title: "Admin Dashboard — DevTools Store",
  description:
    "Admin dashboard to view all customers, payments, and subscriptions. Manage Stripe billing and monitor sales data.",
  robots: {
    index: false,
    follow: false,
  },
};
export default function AdminLayout({ children }) {
  return children;
}
