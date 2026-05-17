import Link from "next/link";
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="Footer">
      <div className="container">
        <div className="Footer_Grid">
          <div className="Footer_Brand">
            <div className="Footer_Logo">
              <div className="Footer_Logo_Icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </div>
              <span>DevTools Store</span>
            </div>
            <p className="Footer_Description">
              AI-powered developer tools for building smarter applications. Trusted by 10K+ developers worldwide.
            </p>
          </div>
          <div className="Footer_Column">
            <h4 className="Footer_Column_Title">Quick Links</h4>
            <ul className="Footer_Links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/#products">Products</Link></li>
              <li><Link href="/#pricing">Pricing</Link></li>
              <li><Link href="/admin">Dashboard</Link></li>
            </ul>
          </div>
          <div className="Footer_Column">
            <h4 className="Footer_Column_Title">Tools</h4>
            <ul className="Footer_Links">
              <li><span>Assignment Writer</span></li>
              <li><span>Grammar Guru</span></li>
              <li><span>Diagram Maker</span></li>
              <li><span>AI Detector & Bypass</span></li>
            </ul>
          </div>
          <div className="Footer_Column">
            <h4 className="Footer_Column_Title">Support</h4>
            <ul className="Footer_Links">
              <li><span>Help Center</span></li>
              <li><span>Contact Us</span></li>
              <li><span>Privacy Policy</span></li>
              <li><span>Terms of Service</span></li>
            </ul>
          </div>
        </div>
        <div className="Footer_Bottom">
          <p className="Footer_Copyright">
            &copy; {year} DevTools Store. All rights reserved.
          </p>
          <div className="Footer_Stripe">
            <span>Payments secured by</span>
            <span className="Stripe_Badge">
              <svg className="Stripe_Icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                <line x1="1" y1="10" x2="23" y2="10" />
              </svg>
              Stripe
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
