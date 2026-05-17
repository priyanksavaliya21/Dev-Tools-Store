import Link from "next/link";
export const metadata = {
  title: "Payment Cancelled — Try Again Anytime | DevTools Store",
  description:
    "Your payment was cancelled and no charges were made. Browse our tools again or explore different pricing options that might work better for you.",
  robots: {
    index: false,
  },
};
export default function CancelPage() {
  return (
    <div className="Cancel_Page">
      <div className="Status_Icon">✕</div>
      <h1 className="Page_Title">Payment Cancelled</h1>
      <p className="Page_Description">
        Your payment was cancelled. No charges have been made to your account.
        We’d love to help you find the right tool for your needs. Feel free to
        explore other options or contact support if you have any questions.
      </p>
      <div className="Page_Links">
        <Link href="/" className="Link_Primary">
          Browse All Tools
        </Link>
        <Link href="/#pricing" className="Link_Secondary">
          View Pricing Plans
        </Link>
      </div>
    </div>
  );
}
