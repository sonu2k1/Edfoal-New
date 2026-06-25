"use client";
import Link from "next/link";
import { Mail, Phone, Clock } from "lucide-react";

const footerLogoUrl = "https://ik.imagekit.io/edfoalImage/assets/image/footerlogo.png";

const PAGES = [
  { label: "Home",        href: "/" },
  { label: "About Us",    href: "/about" },
  { label: "Our Services",href: "/services" },
  { label: "Contact Us",  href: "/contact" },
];

const SERVICES = [
  { label: "Automation",           href: "/services" },
  { label: "Tailored AI Solutions",href: "/services" },
  { label: "AI Consultancy",       href: "/services" },
];

/* ── shared styles ── */
const headingStyle: React.CSSProperties = {
  fontSize: "13px",
  fontWeight: 700,
  color: "#e2d59f",
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
  marginBottom: "20px",
};

const linkStyle: React.CSSProperties = {
  fontSize: "13.5px",
  color: "#94a3b8",
  textDecoration: "none",
  display: "block",
  transition: "color 0.2s",
};

function Footer() {
  return (
    <footer
      style={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#030914",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* ── Faded watermark ── */}
      <div
        aria-hidden="true"
        style={{
          pointerEvents: "none",
          position: "absolute",
          bottom: "8px",
          left: "50%",
          transform: "translateX(-50%)",
          whiteSpace: "nowrap",
          fontSize: "clamp(3.75rem, 22vw, 12rem)",
          lineHeight: 1,
          letterSpacing: "0.01em",
          fontFamily: "AndroidLogo, sans-serif",
          backgroundImage:
            "linear-gradient(180deg, rgba(225,235,244,0.18) 0%, rgba(176,194,211,0.10) 52%, rgba(176,194,211,0.02) 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          color: "transparent",
          userSelect: "none",
          zIndex: 0,
        }}
      >
        EdFoal
      </div>

      {/* ── Main content ── */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "64px 40px 40px",
        }}
      >
        {/* Outer: company left | three cols right */}
        <div
          className="footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 360px) minmax(0, 1fr)",
            gap: "64px",
            alignItems: "start",
          }}
        >
          {/* ── Col 1: Company ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Link href="/" style={{ display: "inline-block", marginBottom: "4px" }}>
              <img
                src={footerLogoUrl}
                alt="EdFoal Logo"
                style={{ height: "28px", width: "auto", objectFit: "contain" }}
              />
            </Link>
            <p style={{ fontSize: "13.5px", color: "#94a3b8", lineHeight: 1.7, maxWidth: "280px", margin: 0 }}>
              At EdFoal AI, we create tailored AI solutions to reduce costs, save
              time, and enhance business efficiency for growth.
            </p>

            {/* LinkedIn icon */}
            <a
              href="https://www.linkedin.com/company/edfoal"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-linkedin-btn"
              aria-label="EdFoal on LinkedIn"
              style={{ marginTop: "8px" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>

          {/* ── Right: Pages | Services | Contact Us ── */}
          <div
            className="footer-right-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "32px",
              alignItems: "start",
            }}
          >

            {/* Our Pages */}
            <div>
              <h3 style={headingStyle}>Our Pages</h3>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "14px" }}>
                {PAGES.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      style={linkStyle}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "#ffffff"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = "#94a3b8"; }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 style={headingStyle}>Services</h3>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "14px" }}>
                {SERVICES.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      style={linkStyle}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "#ffffff"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = "#94a3b8"; }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Us */}
            <div>
              <h3 style={headingStyle}>Contact Us</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

                {/* Send Mail */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <Mail size={16} style={{ color: "#e2d59f", marginTop: "2px", flexShrink: 0 }} />
                  <div>
                    <p style={{ fontSize: "13px", fontWeight: 700, color: "#ffffff", margin: "0 0 4px", maxWidth: "none" }}>Send Mail</p>
                    <Link
                      href="mailto:info@edfoal.com"
                      style={{ fontSize: "13px", color: "#94a3b8", textDecoration: "none" }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "#ffffff"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = "#94a3b8"; }}
                    >
                      info@edfoal.com
                    </Link>
                  </div>
                </div>

                {/* Call Us */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <Phone size={16} style={{ color: "#e2d59f", marginTop: "2px", flexShrink: 0 }} />
                  <div>
                    <p style={{ fontSize: "13px", fontWeight: 700, color: "#ffffff", margin: "0 0 4px", maxWidth: "none" }}>Call Us</p>
                    <p style={{ fontSize: "13px", color: "#94a3b8", margin: 0, maxWidth: "none" }}>+91 1234567890</p>
                  </div>
                </div>

                {/* Opening Hours */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <Clock size={16} style={{ color: "#e2d59f", marginTop: "2px", flexShrink: 0 }} />
                  <div>
                    <p style={{ fontSize: "13px", fontWeight: 700, color: "#ffffff", margin: "0 0 4px", maxWidth: "none" }}>Opening Hours</p>
                    <p style={{ fontSize: "13px", color: "#94a3b8", margin: 0, maxWidth: "none" }}>Mon - Fri,<br />9:00 - 20:00</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* ── Gold divider + bottom copyright ── */}
        <div
          style={{
            marginTop: "56px",
            borderTop: "1px solid rgba(226,213,159,0.45)",
            paddingTop: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <p style={{ fontSize: "12px", color: "#64748b", margin: 0, maxWidth: "none" }}>
            © 2026 EdFoal. All rights reserved.
          </p>
        </div>
      </div>

      {/* ── Styles ── */}
      <style>{`
        .footer-linkedin-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border: 1.5px solid #F5C84C;
          border-radius: 11px;
          color: #F5C84C;
          background: transparent;
          text-decoration: none;
          transition: background 0.3s ease, color 0.3s ease, transform 0.3s ease;
          flex-shrink: 0;
        }
        .footer-linkedin-btn:hover {
          background: #F5C84C;
          color: #030914;
          transform: scale(1.05);
        }
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .footer-right-grid {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 24px !important;
          }
        }
        @media (max-width: 600px) {
          .footer-right-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </footer>
  );
}

export { Footer };
