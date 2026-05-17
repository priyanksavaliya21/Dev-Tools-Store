export default function HeroSection() {
  return (
    <section className="Hero_Section">
      <div className="container">
        <div className="Hero_Content">
          <div className="Hero_Badge">
            <span className="Badge_Dot" />
            Professional AI Tools for Developers
          </div>
          <h1 className="Hero_Title">
            Supercharge Your <span className="Gradient_Text">Development Workflow</span>
          </h1>
          <p className="Hero_Description">
            Save hours every week with our suite of professional AI tools. From writing assignments to detecting AI content, get everything you need to work smarter. Trusted by thousands of developers, designers, and students worldwide.
          </p>
          <div className="Hero_CTA">
            <a href="#products" className="CTA_Primary">
              <svg className="CTA_Icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              Get Started Now
            </a>
            <a href="#pricing" className="CTA_Secondary">
              See All Plans
              <svg className="CTA_Icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </div>
        <div className="Hero_Stats">
          <div className="Stat_Item">
            <div className="Stat_Value">10K+</div>
            <div className="Stat_Label">Active Users</div>
          </div>
          <div className="Stat_Divider" />
          <div className="Stat_Item">
            <div className="Stat_Value">50M+</div>
            <div className="Stat_Label">Requests Processed</div>
          </div>
          <div className="Stat_Divider" />
          <div className="Stat_Item">
            <div className="Stat_Value">99.9%</div>
            <div className="Stat_Label">Uptime Guaranteed</div>
          </div>
          <div className="Stat_Divider" />
          <div className="Stat_Item">
            <div className="Stat_Value">4.9★</div>
            <div className="Stat_Label">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
}
