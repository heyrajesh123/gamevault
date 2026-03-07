"use client";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header style={{
      background: "linear-gradient(300deg, #00632b 0%, #00785f 48%, #012459 100%)",
      padding: "0 16px", position: "sticky", top: 0, zIndex: 100,
    }}>
      <div style={{ maxWidth: 700, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
        <a href="/" style={{ textDecoration: "none" }}>
          <span style={{ fontSize: 22, fontWeight: 800, color: "#fff", fontFamily: "cursive" }}>
            🎮 YonoGames
          </span>
        </a>

        {/* Desktop Nav */}
        <nav style={{ display: "flex", gap: 4 }} className="desktop-nav">
          <a href="/" style={{ color: "#fff", textDecoration: "none", fontSize: 13, padding: "6px 12px", borderRadius: 8 }}>🏠 Home</a>
          <a href="/about-us" style={{ color: "#fff", textDecoration: "none", fontSize: 13, padding: "6px 12px" }}>About</a>
          <a href="/contact-us" style={{ color: "#fff", textDecoration: "none", fontSize: 13, padding: "6px 12px" }}>Contact</a>
        </nav>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 8, display: "flex", flexDirection: "column", gap: 5 }}
          aria-label="Menu"
        >
          <span style={{ width: 24, height: 2, background: "#fff", borderRadius: 2, display: "block", transition: "0.3s", transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }}></span>
          <span style={{ width: 24, height: 2, background: "#fff", borderRadius: 2, display: "block", opacity: menuOpen ? 0 : 1, transition: "0.3s" }}></span>
          <span style={{ width: 24, height: 2, background: "#fff", borderRadius: 2, display: "block", transition: "0.3s", transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }}></span>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div style={{
          background: "#014d22", borderTop: "1px solid #ffffff22",
          padding: "8px 0", maxWidth: 700, margin: "0 auto",
        }}>
          {[
            { href: "/", label: "🏠 Home" },
            { href: "/about-us", label: "ℹ️ About Us" },
            { href: "/contact-us", label: "📞 Contact Us" },
            { href: "/disclaimer", label: "📋 Disclaimer" },
            { href: "/privacy-policy", label: "🔒 Privacy Policy" },
            { href: "/terms-and-conditions", label: "📜 Terms & Conditions" },
          ].map((item) => (
            <a key={item.href} href={item.href} style={{
              display: "block", color: "#fff", textDecoration: "none",
              padding: "13px 20px", fontSize: 14,
              borderBottom: "1px solid #ffffff11",
            }}>{item.label}</a>
          ))}
        </div>
      )}

      <style>{`
        @media (min-width: 600px) {
          .desktop-nav { display: flex !important; }
        }
        @media (max-width: 599px) {
          .desktop-nav { display: none !important; }
        }
      `}</style>
    </header>
  );
}
