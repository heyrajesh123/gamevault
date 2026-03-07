import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background: "#1a1a1a", color: "#aaa", padding: "24px 16px", textAlign: "center", fontSize: 13 }}>
      <p style={{ margin: "0 0 8px", color: "#fff", fontWeight: 700 }}>🎮 NovaGames</p>
      <p style={{ margin: "0 0 12px" }}>© 2025 NovaGames. All rights reserved.</p>
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "6px 16px" }}>
        <Link href="/about-us" style={{ color: "#aaa", textDecoration: "none" }}>About Us</Link>
        <Link href="/contact-us" style={{ color: "#aaa", textDecoration: "none" }}>Contact Us</Link>
        <Link href="/disclaimer" style={{ color: "#aaa", textDecoration: "none" }}>Disclaimer</Link>
        <Link href="/privacy-policy" style={{ color: "#aaa", textDecoration: "none" }}>Privacy Policy</Link>
        <Link href="/terms-and-conditions" style={{ color: "#aaa", textDecoration: "none" }}>Terms & Conditions</Link>
      </div>
    </footer>
  );
}
