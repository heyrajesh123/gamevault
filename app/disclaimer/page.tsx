import { Metadata } from "next";
import Header from "../Header";

export const metadata: Metadata = {
  title: "Disclaimer – NovaGames",
  description: "Read the NovaGames disclaimer before using our website or downloading any apps.",
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
          <p>NovaGames is an informational website that provides details about various online gaming applications. We do not own, develop, or operate any of the gaming apps listed on this website.</p>

          <h2 style={{ color: "#00632b", fontSize: 18 }}>2. No Financial Advice</h2>
          <p>The content on NovaGames is for informational purposes only. We do not provide financial, legal, or investment advice. Participating in real-money gaming involves risk. Please play responsibly.</p>

          <h2 style={{ color: "#00632b", fontSize: 18 }}>3. Age Restriction</h2>
          <p>Online gaming with real money is strictly for users <strong>18 years of age or older</strong>. We strongly discourage minors from accessing or participating in any real-money gaming activities.</p>

          <h2 style={{ color: "#00632b", fontSize: 18 }}>4. Third-Party Links</h2>
          <p>Our website contains links to third-party apps and websites. We are not responsible for the content, policies, or practices of these external platforms. Download and use apps at your own discretion.</p>

          <h2 style={{ color: "#00632b", fontSize: 18 }}>5. Accuracy of Information</h2>
          <p>We strive to provide accurate and up-to-date information. However, bonus amounts, withdrawal limits, and app versions may change. Always verify details directly on the app before downloading.</p>

          <h2 style={{ color: "#00632b", fontSize: 18 }}>6. Responsible Gaming</h2>
          <p>We encourage all users to practice responsible gaming. If you or someone you know has a gambling problem, please seek professional help.</p>

          <div style={{ background: "#fff3cd", borderRadius: 12, padding: 16, marginTop: 24, border: "1px solid #ffc107" }}>
            <p style={{ margin: 0, fontWeight: 600, color: "#856404" }}>⚠️ Online gaming can be addictive. Please play responsibly and within your means.</p>
          </div>
        </div>
      </main>

      <footer style={{ background: "#1a1a1a", color: "#aaa", padding: "24px 16px", textAlign: "center", fontSize: 13 }}>
        <p style={{ margin: "0 0 8px", color: "#fff", fontWeight: 700 }}>🎮 NovaGames</p>
        <p style={{ margin: "0 0 8px" }}>© 2025 NovaGames. All rights reserved.</p>
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "0 16px" }}>
          <a href="/about-us" style={{ color: "#aaa", textDecoration: "none" }}>About Us</a>
          <a href="/privacy-policy" style={{ color: "#aaa", textDecoration: "none" }}>Privacy Policy</a>
          <a href="/terms-and-conditions" style={{ color: "#aaa", textDecoration: "none" }}>Terms & Conditions</a>
        </div>
      </footer>
    </div>
  );
}
