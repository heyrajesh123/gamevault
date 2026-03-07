import { Metadata } from "next";
import TabSection from "./TabSection";
import Header from "./Header";

export const metadata: Metadata = {
  title: "Nova Games – Download Best Rummy & Slots Apps",
  description: "Download the best Nova Rummy, Slots and Casino apps. Get sign-up bonus, refer & earn rewards.",
  openGraph: {
    title: "Nova Games – Download Best Rummy & Slots Apps",
    description: "Download the best Nova Rummy, Slots and Casino apps with sign-up bonus and refer & earn rewards.",
    type: "website",
  },
};

const PROJECT_ID = "eq6o0luu";
const DATASET = "production";

export interface App {
  _id: string;
  name: string;
  slug: string;
  logoUrl?: string;
  category: string;
  bonus: number;
  minWithdraw: number;
  version?: string;
  rating: number;
  reviewCount: number;
  isFeatured?: boolean;
}

async function getApps(): Promise<App[]> {
  try {
    const query = encodeURIComponent(
      `*[_type == "app"] | order(_createdAt desc) {
        _id, name, "slug": slug.current, category,
        bonus, minWithdraw, version, rating, reviewCount, isFeatured,
        "logoUrl": logo.asset->url
      }`
    );
    const res = await fetch(
      `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${query}`,
      { next: { revalidate: 30 } }
    );
    const data = await res.json();
    if (data.result?.length > 0) return data.result;
  } catch (e) {}
  return demoApps;
}

export default async function Home() {
  const apps = await getApps();
  const topRated = apps.filter((a) => a.category === "top-rated");
  const newGames = apps.filter((a) => a.category === "new-games");
  const otherGames = apps.filter((a) => a.category === "other-games");

  return (
    <div style={{ minHeight: "100vh", background: "#f5f7fa", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <Header />

      {/* Banner */}
      <div style={{ background: "linear-gradient(135deg, #00632b, #012459)", padding: "32px 16px", textAlign: "center" }}>
        <h1 style={{ color: "#fff", fontSize: "clamp(22px, 4vw, 36px)", fontWeight: 900, margin: "0 0 10px" }}>
          Download Best Nova Games 🎮
        </h1>
        <p style={{ color: "#ffffff99", fontSize: 14, margin: 0 }}>
          Sign-up bonus • Refer & Earn • Daily Rewards
        </p>
      </div>

      <main style={{ maxWidth: 700, margin: "0 auto", padding: "12px 0px 60px" }}>
        <TabSection topRated={topRated} newGames={newGames} otherGames={otherGames} />
      </main>

      <footer style={{ background: "#1a1a1a", color: "#aaa", padding: "24px 16px", textAlign: "center", fontSize: 13 }}>
        <p style={{ margin: "0 0 8px", color: "#fff", fontWeight: 700 }}>🎮 NovaGames</p>
        <p style={{ margin: "0 0 8px" }}>© 2025 NovaGames. All rights reserved.</p>
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "0 16px" }}>
          <a href="/about-us" style={{ color: "#aaa", textDecoration: "none" }}>About Us</a>
          <a href="/contact-us" style={{ color: "#aaa", textDecoration: "none" }}>Contact Us</a>
          <a href="/disclaimer" style={{ color: "#aaa", textDecoration: "none" }}>Disclaimer</a>
          <a href="/privacy-policy" style={{ color: "#aaa", textDecoration: "none" }}>Privacy Policy</a>
          <a href="/terms-and-conditions" style={{ color: "#aaa", textDecoration: "none" }}>Terms & Conditions</a>
        </div>
      </footer>
    </div>
  );
}

const demoApps: App[] = [
  { _id: "1", name: "Nova Rummy", slug: "Nova-rummy", category: "top-rated", bonus: 500, minWithdraw: 100, version: "2.1", rating: 4.5, reviewCount: 1200 },
  { _id: "2", name: "Jaiho Rummy", slug: "jaiho-rummy", category: "top-rated", bonus: 300, minWithdraw: 50, version: "1.8", rating: 4.2, reviewCount: 980 },
  { _id: "3", name: "Spin 777", slug: "spin-777", category: "top-rated", bonus: 200, minWithdraw: 100, version: "3.0", rating: 4.0, reviewCount: 750 },
  { _id: "4", name: "ABC Rummy", slug: "abc-rummy", category: "new-games", bonus: 400, minWithdraw: 100, version: "1.0", rating: 4.3, reviewCount: 200 },
  { _id: "5", name: "Saga Slots", slug: "saga-slots", category: "new-games", bonus: 250, minWithdraw: 50, version: "1.2", rating: 4.1, reviewCount: 150 },
  { _id: "6", name: "MQM Bet", slug: "mqm-bet", category: "other-games", bonus: 150, minWithdraw: 200, version: "2.5", rating: 3.8, reviewCount: 400 },
];
