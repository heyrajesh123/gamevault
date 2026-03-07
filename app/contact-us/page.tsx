import { Metadata } from "next";
import Header from "../Header";
import Footer from "../Footer";

export const metadata: Metadata = {
  title: "Contact Us – NovaGames",
  description: "Get in touch with NovaGames team.",
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
          <p style={{ color: "#555", lineHeight: 1.8 }}>Have a question or want to list your app? Reach out to us.</p>
          {[
            { icon: "📧", label: "Email", value: "support@Novagames.com", href: "mailto:support@Novagames.com" },
            { icon: "✈️", label: "Telegram", value: "@Novagames", href: "https://t.me/Novagames" },
          ].map((item) => (
            <a key={item.label} href={item.href} style={{
              display: "flex", alignItems: "center", gap: 14,
              padding: "14px 16px", background: "#f9f9f9", borderRadius: 12,
              marginBottom: 10, textDecoration: "none", color: "inherit", border: "1px solid #f0f0f0",
            }}>
              <span style={{ fontSize: 28 }}>{item.icon}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#1a1a1a" }}>{item.label}</div>
                <div style={{ fontSize: 13, color: "#00632b" }}>{item.value}</div>
              </div>
            </a>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
