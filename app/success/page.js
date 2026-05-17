import Link from "next/link";
export const metadata = {
  title: "Payment Successful — Your Purchase is Confirmed | DevTools Store",
  description:
    "Thank you for your purchase! Your payment has been successfully processed. Access your tools immediately from your admin dashboard.",
  robots: {
    index: false,
  },
};
export default function SuccessPage() {
  return (
    <div className="Success_Page">
      <div className="Status_Icon">✓</div>
      <h1 className="Page_Title">Payment Successful!</h1>
      <p className="Page_Description">
        Thank you for your purchase! Your payment has been processed
        successfully. You now have immediate access to your purchased tool.
        Check your email for confirmation details and download instructions.
      </p>
      <div className="Page_Links">
        <Link href="/" className="Link_Primary">
          Back to Home
        </Link>
        <Link href="/admin" className="Link_Secondary">
          View Purchase Details
        </Link>
      </div>
    </div>
  );
}
