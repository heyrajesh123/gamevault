import { Metadata } from "next";
import Header from "../Header";
import Footer from "../Footer";

export const metadata: Metadata = {
  title: "Terms & Conditions – NovaGames",
  description: "Read the NovaGames Terms and Conditions.",
};

export default function TermsAndConditions() {
  return (
    <div style={{ minHeight: "100vh", background: "#f5f7fa", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <Header />
      <div style={{ background: "linear-gradient(135deg, #00632b, #012459)", padding: "32px 16px", textAlign: "center" }}>
        <h1 style={{ color: "#fff", fontSize: 28, fontWeight: 900, margin: "0 0 8px" }}>Terms & Conditions</h1>
        <p style={{ color: "#ffffff99", fontSize: 14, margin: 0 }}>Please read before using NovaGames</p>
      </div>
      <main style={{ maxWidth: 700, margin: "0 auto", padding: "24px 16px 60px" }}>
        <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.08)", lineHeight: 1.8, color: "#444", fontSize: 15 }}>
          <p style={{ color: "#666", fontSize: 13, marginTop: 0 }}>Last updated: January 2025</p>
          <h2 style={{ color: "#00632b", fontSize: 18 }}>1. Acceptance of Terms</h2>
          <p>By accessing or using NovaGames, you agree to be bound by these Terms and Conditions.</p>
          <h2 style={{ color: "#00632b", fontSize: 18 }}>2. Age Requirement</h2>
          <p>You must be at least <strong>18 years of age</strong> to use this website.</p>
          <h2 style={{ color: "#00632b", fontSize: 18 }}>3. Intellectual Property</h2>
          <p>All content on NovaGames is the property of NovaGames. Reproduction without permission is prohibited.</p>
          <h2 style={{ color: "#00632b", fontSize: 18 }}>4. Third-Party Apps</h2>
          <p>NovaGames provides links to third-party applications for informational purposes only. We do not endorse or take responsibility for any third-party apps.</p>
          <h2 style={{ color: "#00632b", fontSize: 18 }}>5. Limitation of Liability</h2>
          <p>NovaGames shall not be liable for any damages arising from the use of our website or any apps listed herein.</p>
          <h2 style={{ color: "#00632b", fontSize: 18 }}>6. Responsible Gaming</h2>
          <p>We strongly encourage responsible gaming. Never bet more than you can afford to lose.</p>
          <h2 style={{ color: "#00632b", fontSize: 18 }}>7. Governing Law</h2>
          <p>These Terms are governed by the laws of India.</p>
          <div style={{ background: "#e8f5e9", borderRadius: 12, padding: 16, marginTop: 24 }}>
            <p style={{ margin: 0, fontWeight: 600, color: "#2e7d32" }}>✅ By using NovaGames, you agree to all the terms stated above.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
