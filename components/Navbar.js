"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);
  const handleLinkClick = () => {
    setMenuOpen(false);
  };
  return (
    <nav className="Navbar">
      <div className="container">
        <div className="Navbar_Inner">
          <Link href="/" className="Navbar_Logo" onClick={handleLinkClick}>
            <div className="Logo_Icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </div>
            <span className="Logo_Text">DevTools Store</span>
          </Link>
          <div className={`Navbar_Links ${menuOpen ? "Open" : ""}`}>
            <Link
              href="/"
              className={`Nav_Link ${pathname === "/" ? "Active" : ""}`}
              onClick={handleLinkClick}
            >
              Home
            </Link>
            <Link
              href="/#products"
              className="Nav_Link"
              onClick={handleLinkClick}
            >
              Products
            </Link>
            <Link
              href="/#pricing"
              className="Nav_Link"
              onClick={handleLinkClick}
            >
              Pricing
            </Link>
            <Link
              href="/admin"
              className={`Nav_Link ${pathname === "/admin" ? "Active" : ""}`}
              onClick={handleLinkClick}
            >
              Admin
            </Link>
          </div>
          <button
            className={`Hamburger ${menuOpen ? "Open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="Navbar_Overlay" onClick={() => setMenuOpen(false)} />
      )}
    </nav>
  );
}
