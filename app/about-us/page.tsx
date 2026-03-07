import { Metadata } from "next";
import Header from "../Header";

export const metadata: Metadata = {
  title: "About Us – NovaGames",
  description: "Learn about NovaGames – your trusted source for the best Nova Rummy, Slots and Casino app downloads.",
};

export default function AboutUs() {
  return (
    <div style={{ minHeight: "100vh", background: "#f5f7fa", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <Header />

      <div style={{ background: "linear-gradient(135deg, #00632b, #012459)", padding: "32px 16px", textAlign: "center" }}>
        <h1 style={{ color: "#fff", fontSize: 28, fontWeight: 900, margin: "0 0 8px" }}>About Us</h1>
        <p style={{ color: "#ffffff99", fontSize: 14, margin: 0 }}>Know more about NovaGames</p>
      </div>

      <main style={{ maxWidth: 700, margin: "0 auto", padding: "24px 16px 60px" }}>
        <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.08)", lineHeight: 1.8, color: "#444", fontSize: 15 }}>

          <h2 style={{ color: "#00632b", fontSize: 20, marginTop: 0 }}>🎮 Welcome to NovaGames</h2>
          <p>NovaGames is your one-stop destination for discovering and downloading the best online gaming apps in India. We curate top-rated Rummy, Slots, Arcade, and Casino apps so you can find the perfect game to play and win real cash.</p>

          <h2 style={{ color: "#00632b", fontSize: 18 }}>🎯 Our Mission</h2>
          <p>Our mission is simple — to help players find safe, trusted, and rewarding gaming apps with the best sign-up bonuses, referral rewards, and minimum withdrawal options. We review each app carefully before listing it on our platform.</p>

          <h2 style={{ color: "#00632b", fontSize: 18 }}>✅ Why Choose NovaGames?</h2>
          <ul style={{ paddingLeft: 20 }}>
            <li style={{ marginBottom: 8 }}>We list only trusted and verified gaming apps</li>
            <li style={{ marginBottom: 8 }}>Detailed information about bonus, withdrawal & version</li>
            <li style={{ marginBottom: 8 }}>Always updated with the latest app versions</li>
            <li style={{ marginBottom: 8 }}>Free to use — no hidden charges</li>
            <li style={{ marginBottom: 8 }}>User-friendly design for easy navigation</li>
          </ul>

          <h2 style={{ color: "#00632b", fontSize: 18 }}>📞 Contact Us</h2>
          <p>Have questions or want to list your app? Feel free to <a href="/contact-us" style={{ color: "#00632b", fontWeight: 600 }}>contact us</a>. We'd love to hear from you!</p>

          <div style={{ background: "#e8f5e9", borderRadius: 12, padding: 16, marginTop: 24, textAlign: "center" }}>
            <p style={{ margin: 0, fontWeight: 700, color: "#2e7d32", fontSize: 16 }}>🎮 NovaGames — Play Smart, Win Big!</p>
          </div>
        </div>
      </main>

      <footer style={{ background: "#1a1a1a", color: "#aaa", padding: "24px 16px", textAlign: "center", fontSize: 13 }}>
        <p style={{ margin: "0 0 8px", color: "#fff", fontWeight: 700 }}>🎮 NovaGames</p>
        <p style={{ margin: "0 0 8px" }}>© 2025 NovaGames. All rights reserved.</p>
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "0 16px" }}>
          <a href="/disclaimer" style={{ color: "#aaa", textDecoration: "none" }}>Disclaimer</a>
          <a href="/privacy-policy" style={{ color: "#aaa", textDecoration: "none" }}>Privacy Policy</a>
          <a href="/terms-and-conditions" style={{ color: "#aaa", textDecoration: "none" }}>Terms & Conditions</a>
        </div>
      </footer>
    </div>
  );
}
