import { Metadata } from "next";
import Header from "../Header";

export const metadata: Metadata = {
  title: "Contact Us – NovaGames",
  description: "Get in touch with NovaGames team for any queries, app listing requests or support.",
};

export default function ContactUs() {
  return (
    <div style={{ minHeight: "100vh", background: "#f5f7fa", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <Header />

      <div style={{ background: "linear-gradient(135deg, #00632b, #012459)", padding: "32px 16px", textAlign: "center" }}>
        <h1 style={{ color: "#fff", fontSize: 28, fontWeight: 900, margin: "0 0 8px" }}>Contact Us</h1>
        <p style={{ color: "#ffffff99", fontSize: 14, margin: 0 }}>We are here to help you</p>
      </div>

      <main style={{ maxWidth: 700, margin: "0 auto", padding: "24px 16px 60px" }}>
        <div style={{ background: "#fff", borderRadius: 16, padding: 24, marginBottom: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
          <h2 style={{ color: "#00632b", fontSize: 20, marginTop: 0 }}>📞 Get In Touch</h2>
          <p style={{ color: "#555", lineHeight: 1.8 }}>
            Have a question, suggestion, or want to list your app on NovaGames? We'd love to hear from you. Reach out to us through any of the channels below.
          </p>

          {[
            { icon: "📧", label: "Email", value: "support@Novagames.com", href: "mailto:support@Novagames.com" },
            { icon: "✈️", label: "Telegram", value: "@Novagames", href: "https://t.me/Novagames" },
            { icon: "🌐", label: "Website", value: "www.Novagames.com", href: "/" },
          ].map((item) => (
            <a key={item.label} href={item.href} style={{
              display: "flex", alignItems: "center", gap: 14,
              padding: "14px 16px", background: "#f9f9f9", borderRadius: 12,
              marginBottom: 10, textDecoration: "none", color: "inherit",
              border: "1px solid #f0f0f0",
            }}>
              <span style={{ fontSize: 28 }}>{item.icon}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#1a1a1a" }}>{item.label}</div>
                <div style={{ fontSize: 13, color: "#00632b" }}>{item.value}</div>
              </div>
            </a>
          ))}
        </div>

        <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
          <h2 style={{ color: "#00632b", fontSize: 18, marginTop: 0 }}>⏰ Response Time</h2>
          <p style={{ color: "#555", lineHeight: 1.8, margin: 0 }}>
            We typically respond within <strong>24–48 hours</strong>. For urgent queries, please reach out via Telegram for a faster response.
          </p>
        </div>
      </main>

      <footer style={{ background: "#1a1a1a", color: "#aaa", padding: "24px 16px", textAlign: "center", fontSize: 13 }}>
        <p style={{ margin: "0 0 8px", color: "#fff", fontWeight: 700 }}>🎮 NovaGames</p>
        <p style={{ margin: "0 0 8px" }}>© 2025 NovaGames. All rights reserved.</p>
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "0 16px" }}>
          <a href="/about-us" style={{ color: "#aaa", textDecoration: "none" }}>About Us</a>
          <a href="/disclaimer" style={{ color: "#aaa", textDecoration: "none" }}>Disclaimer</a>
          <a href="/privacy-policy" style={{ color: "#aaa", textDecoration: "none" }}>Privacy Policy</a>
        </div>
      </footer>
    </div>
  );
}
