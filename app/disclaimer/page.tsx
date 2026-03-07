import { Metadata } from "next";
import Header from "../Header";
import Footer from "../Footer";

export const metadata: Metadata = {
  title: "Disclaimer – NovaGames",
  description: "Read the NovaGames disclaimer before using our website.",
};

export default function Disclaimer() {
  return (
    <div style={{ minHeight: "100vh", background: "#f5f7fa", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <Header />
      <div style={{ background: "linear-gradient(135deg, #00632b, #012459)", padding: "32px 16px", textAlign: "center" }}>
        <h1 style={{ color: "#fff", fontSize: 28, fontWeight: 900, margin: "0 0 8px" }}>Disclaimer</h1>
        <p style={{ color: "#ffffff99", fontSize: 14, margin: 0 }}>Please read carefully before using our site</p>
      </div>
      <main style={{ maxWidth: 700, margin: "0 auto", padding: "24px 16px 60px" }}>
        <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.08)", lineHeight: 1.8, color: "#444", fontSize: 15 }}>
          <p style={{ color: "#666", fontSize: 13, marginTop: 0 }}>Last updated: January 2025</p>
          <h2 style={{ color: "#00632b", fontSize: 18 }}>1. General Information</h2>
          <p>NovaGames is an informational website. We do not own, develop, or operate any of the gaming apps listed on this website.</p>
          <h2 style={{ color: "#00632b", fontSize: 18 }}>2. No Financial Advice</h2>
          <p>The content on NovaGames is for informational purposes only. Participating in real-money gaming involves risk. Please play responsibly.</p>
          <h2 style={{ color: "#00632b", fontSize: 18 }}>3. Age Restriction</h2>
          <p>Online gaming with real money is strictly for users <strong>18 years of age or older</strong>.</p>
          <h2 style={{ color: "#00632b", fontSize: 18 }}>4. Third-Party Links</h2>
          <p>We are not responsible for the content or policies of third-party apps. Download and use apps at your own discretion.</p>
          <h2 style={{ color: "#00632b", fontSize: 18 }}>5. Responsible Gaming</h2>
          <p>We encourage all users to practice responsible gaming. If you have a gambling problem, please seek professional help.</p>
          <div style={{ background: "#fff3cd", borderRadius: 12, padding: 16, marginTop: 24, border: "1px solid #ffc107" }}>
            <p style={{ margin: 0, fontWeight: 600, color: "#856404" }}>⚠️ Online gaming can be addictive. Please play responsibly.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
