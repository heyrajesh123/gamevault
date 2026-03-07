import { Metadata } from "next";
import Header from "../Header";

export const metadata: Metadata = {
  title: "Privacy Policy – NovaGames",
  description: "Read the NovaGames Privacy Policy to understand how we collect, use, and protect your information.",
};

export default function PrivacyPolicy() {
  return (
    <div style={{ minHeight: "100vh", background: "#f5f7fa", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <Header />

      <div style={{ background: "linear-gradient(135deg, #00632b, #012459)", padding: "32px 16px", textAlign: "center" }}>
        <h1 style={{ color: "#fff", fontSize: 28, fontWeight: 900, margin: "0 0 8px" }}>Privacy Policy</h1>
        <p style={{ color: "#ffffff99", fontSize: 14, margin: 0 }}>How we handle your information</p>
      </div>

      <main style={{ maxWidth: 700, margin: "0 auto", padding: "24px 16px 60px" }}>
        <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.08)", lineHeight: 1.8, color: "#444", fontSize: 15 }}>

          <p style={{ color: "#666", fontSize: 13, marginTop: 0 }}>Last updated: January 2025</p>

          <h2 style={{ color: "#00632b", fontSize: 18 }}>1. Information We Collect</h2>
          <p>We may collect basic information such as your IP address, browser type, and pages visited when you use our website. We do not collect personal identification information unless you voluntarily provide it (e.g., via contact form).</p>

          <h2 style={{ color: "#00632b", fontSize: 18 }}>2. Use of Information</h2>
          <p>Any information collected is used solely to:</p>
          <ul style={{ paddingLeft: 20 }}>
            <li>Improve website functionality and user experience</li>
            <li>Analyze website traffic and usage patterns</li>
            <li>Respond to your queries or feedback</li>
          </ul>

          <h2 style={{ color: "#00632b", fontSize: 18 }}>3. Cookies</h2>
          <p>Our website may use cookies to enhance your browsing experience. You can choose to disable cookies through your browser settings, though this may affect some features of the website.</p>

          <h2 style={{ color: "#00632b", fontSize: 18 }}>4. Third-Party Services</h2>
          <p>We may use third-party analytics tools (such as Google Analytics) to understand website usage. These services have their own privacy policies. We do not sell or share your data with third parties for marketing purposes.</p>

          <h2 style={{ color: "#00632b", fontSize: 18 }}>5. Data Security</h2>
          <p>We take reasonable measures to protect any information collected. However, no method of internet transmission is 100% secure. Use our website at your own risk.</p>

          <h2 style={{ color: "#00632b", fontSize: 18 }}>6. Children's Privacy</h2>
          <p>Our website is not intended for children under 18 years of age. We do not knowingly collect personal information from minors.</p>

          <h2 style={{ color: "#00632b", fontSize: 18 }}>7. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated date.</p>

          <h2 style={{ color: "#00632b", fontSize: 18 }}>8. Contact</h2>
          <p>If you have any questions about this Privacy Policy, please <a href="/contact-us" style={{ color: "#00632b", fontWeight: 600 }}>contact us</a>.</p>
        </div>
      </main>

      <footer style={{ background: "#1a1a1a", color: "#aaa", padding: "24px 16px", textAlign: "center", fontSize: 13 }}>
        <p style={{ margin: "0 0 8px", color: "#fff", fontWeight: 700 }}>🎮 NovaGames</p>
        <p style={{ margin: "0 0 8px" }}>© 2025 NovaGames. All rights reserved.</p>
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "0 16px" }}>
          <a href="/about-us" style={{ color: "#aaa", textDecoration: "none" }}>About Us</a>
          <a href="/disclaimer" style={{ color: "#aaa", textDecoration: "none" }}>Disclaimer</a>
          <a href="/terms-and-conditions" style={{ color: "#aaa", textDecoration: "none" }}>Terms & Conditions</a>
        </div>
      </footer>
    </div>
  );
}
