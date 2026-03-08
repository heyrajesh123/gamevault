import { Metadata } from "next";
import Link from "next/link";
import Header from "../Header";
import Footer from "../Footer";

export const metadata: Metadata = {
  title: "Terms and Conditions – YonoGames",
  description: "Read the YonoGames Terms and Conditions before using our website.",
};

export default function TermsAndConditions() {
  return (
    <div style={{ minHeight: "100vh", background: "#f5f7fa", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <Header />

      <div style={{ background: "linear-gradient(135deg, #00632b, #012459)", padding: "32px 16px", textAlign: "center" }}>
        <h1 style={{ color: "#fff", fontSize: 28, fontWeight: 900, margin: "0 0 8px" }}>Terms & Conditions</h1>
        <p style={{ color: "#ffffff99", fontSize: 14, margin: 0 }}>Please read before using YonoGames</p>
      </div>

      <main style={{ maxWidth: 700, margin: "0 auto", padding: "24px 16px 60px" }}>
        <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.08)", lineHeight: 1.8, color: "#444", fontSize: 15 }}>

          <p style={{ color: "#666", fontSize: 13, marginTop: 0 }}>Last updated: January 2025</p>

          <h2 style={{ color: "#00632b", fontSize: 18 }}>1. Acceptance of Terms</h2>
          <p>By accessing or using YonoGames, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our website.</p>

          <h2 style={{ color: "#00632b", fontSize: 18 }}>2. Use of Website</h2>
          <p>YonoGames is an informational platform. You agree to use this website only for lawful purposes and in a manner that does not infringe on the rights of others.</p>

          <h2 style={{ color: "#00632b", fontSize: 18 }}>3. Age Requirement</h2>
          <p>You must be at least <strong>18 years of age</strong> to use this website. By using YonoGames, you confirm that you meet this age requirement.</p>

          <h2 style={{ color: "#00632b", fontSize: 18 }}>4. Intellectual Property</h2>
          <p>All content on YonoGames including text, graphics, logos, and images is the property of YonoGames or its content suppliers. Reproduction without permission is prohibited.</p>

          <h2 style={{ color: "#00632b", fontSize: 18 }}>5. Third-Party Apps</h2>
          <p>YonoGames provides links to third-party applications for informational purposes. We do not endorse or take responsibility for any third-party apps, their content, or their terms of service.</p>

          <h2 style={{ color: "#00632b", fontSize: 18 }}>6. Limitation of Liability</h2>
          <p>YonoGames shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use of our website or any apps listed herein. Use at your own risk.</p>

          <h2 style={{ color: "#00632b", fontSize: 18 }}>7. Responsible Gaming</h2>
          <p>We strongly encourage responsible gaming. Real-money gaming involves financial risk. Never bet more than you can afford to lose. If you have a gaming addiction, please seek help immediately.</p>

          <h2 style={{ color: "#00632b", fontSize: 18 }}>8. Changes to Terms</h2>
          <p>We reserve the right to modify these Terms and Conditions at any time. Continued use of the website after changes constitutes acceptance of the new terms.</p>

          <h2 style={{ color: "#00632b", fontSize: 18 }}>9. Governing Law</h2>
          <p>These Terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of Indian courts.</p>

          <h2 style={{ color: "#00632b", fontSize: 18 }}>10. Contact</h2>
          <p>For any questions regarding these terms, please <Link href="/contact-us" style={{ color: "#00632b", fontWeight: 600 }}>contact us</Link>.</p>

          <div style={{ background: "#e8f5e9", borderRadius: 12, padding: 16, marginTop: 24 }}>
            <p style={{ margin: 0, fontWeight: 600, color: "#2e7d32" }}>✅ By using YonoGames, you agree to all the terms stated above.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
