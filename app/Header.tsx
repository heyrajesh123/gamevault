"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const navLinks = [
    { href: "/", label: "🏠 Home" },
    { href: "/about-us", label: "About Us" },
    { href: "/contact-us", label: "Contact Us" },
    { href: "/disclaimer", label: "Disclaimer" },
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms-and-conditions", label: "Terms" },
  ];

  return (
    <header style={{
      background: "linear-gradient(300deg, #00632b 0%, #00785f 48%, #012459 100%)",
      position: "sticky", top: 0, zIndex: 100,
    }}>
      <div style={{
        maxWidth: 900, margin: "0 auto", padding: "0 16px",
        display: "flex", alignItems: "center", justifyContent: "space-between", height: 60,
      }}>
        {/* Logo */}
<Link href="/" style={{ textDecoration: "none", flexShrink: 0, display: "flex", alignItems: "center", gap: 8 }}>
  <img src="public/app-store.png" alt="Logo" width={36} height={36} style={{ borderRadius: 8, objectFit: "cover" }} />
  <span style={{ fontSize: 20, fontWeight: 800, color: "#fff", fontFamily: "cursive" }}>
    NovaGames
  </span>
</Link>

        {/* Desktop Nav */}
        {!isMobile && (
          <nav style={{ display: "flex", gap: 4, alignItems: "center" }}>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} style={{
                color: "#fff", textDecoration: "none", fontSize: 13,
                padding: "6px 10px", borderRadius: 8,
              }}>{link.label}</Link>
            ))}
          </nav>
        )}

        {/* Hamburger — mobile only */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 8, display: "flex", flexDirection: "column", gap: 5 }}
            aria-label="Menu"
          >
            <span style={{ width: 24, height: 2, background: "#fff", borderRadius: 2, display: "block", transition: "0.3s", transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
            <span style={{ width: 24, height: 2, background: "#fff", borderRadius: 2, display: "block", transition: "0.3s", opacity: menuOpen ? 0 : 1 }} />
            <span style={{ width: 24, height: 2, background: "#fff", borderRadius: 2, display: "block", transition: "0.3s", transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
          </button>
        )}
      </div>

      {/* Mobile Dropdown */}
      {isMobile && menuOpen && (
        <div style={{ background: "#014d22", borderTop: "1px solid #ffffff22" }}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} style={{
              display: "block", color: "#fff", textDecoration: "none",
              padding: "13px 20px", fontSize: 14, borderBottom: "1px solid #ffffff11",
            }}>{link.label}</Link>
          ))}
        </div>
      )}
    </header>
  );
}
