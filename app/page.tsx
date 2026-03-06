import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yono Games – Download Best Rummy & Slots Apps",
  description: "Download the best Yono Rummy, Slots and Casino apps. Get sign-up bonus, refer & earn rewards. Find top rated, new and other Yono games.",
  openGraph: {
    title: "Yono Games – Download Best Rummy & Slots Apps",
    description: "Download the best Yono Rummy, Slots and Casino apps with sign-up bonus and refer & earn rewards.",
    type: "website",
  },
};

const PROJECT_ID = "eq6o0luu";
const DATASET = "production";

interface App {
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
      `*[_type == "app"] | order(reviewCount desc) {
        _id, name, "slug": slug.current, category,
        bonus, minWithdraw, version, rating, reviewCount, isFeatured,
        "logoUrl": logo.asset->url
      }`
    );
    const res = await fetch(
      `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${query}`,
      { next: { revalidate: 60 } }
    );
    const data = await res.json();
    if (data.result?.length > 0) return data.result;
  } catch (e) {}
  return demoApps;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", gap: 1 }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} style={{ color: s <= Math.round(rating) ? "#FFD700" : "#ddd", fontSize: 13 }}>★</span>
      ))}
    </div>
  );
}

function AppCard({ app, rank }: { app: App; rank: number }) {
  return (
    <a href={"/" + app.slug} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 12,
        background: "#fff", borderRadius: 14, padding: "14px 16px",
        marginBottom: 10, boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
        border: "1px solid #f0f0f0", transition: "box-shadow 0.2s",
      }}>
        {/* Rank */}
        <div style={{ color: "#bbb", fontWeight: 700, fontSize: 14, minWidth: 22, textAlign: "center" }}>{rank}</div>

        {/* Logo */}
        <div style={{
          width: 58, height: 58, borderRadius: 14, flexShrink: 0, overflow: "hidden",
          background: "linear-gradient(135deg, #00632b22, #01245922)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {app.logoUrl
            ? <img src={app.logoUrl} alt={app.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            : <span style={{ fontSize: 28 }}>🎮</span>
          }
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: "#1a1a1a", marginBottom: 3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {app.name}
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 4 }}>
            <span style={{ fontSize: 12, color: "#2e7d32", fontWeight: 600 }}>
              🎁 Bonus: ₹{app.bonus}
            </span>
            <span style={{ fontSize: 12, color: "#1565c0", fontWeight: 600 }}>
              💸 Min WD: ₹{app.minWithdraw}
            </span>
            {app.version && (
              <span style={{ fontSize: 12, color: "#666" }}>
                v{app.version}
              </span>
            )}
          </div>
          <StarRating rating={app.rating} />
        </div>

        {/* Download Button */}
        <a href={"/" + app.slug} style={{
          background: "linear-gradient(135deg, #00632b, #007860)",
          color: "#fff", padding: "8px 14px", borderRadius: 10,
          fontSize: 13, fontWeight: 700, textDecoration: "none",
          whiteSpace: "nowrap", flexShrink: 0,
        }}>
          ⬇ Download
        </a>
      </div>
    </a>
  );
}

export default async function Home() {
  const apps = await getApps();

  const topRated = apps.filter((a) => a.category === "top-rated");
  const newGames = apps.filter((a) => a.category === "new-games");
  const otherGames = apps.filter((a) => a.category === "other-games");

  return (
    <div style={{ minHeight: "100vh", background: "#f5f7fa", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

      {/* Header */}
      <header style={{
        background: "linear-gradient(300deg, #00632b 0%, #00785f 48%, #012459 100%)",
        padding: "0 16px",
      }}>
        <div style={{ maxWidth: 700, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
          <a href="/" style={{ textDecoration: "none" }}>
            <span style={{ fontSize: 22, fontWeight: 800, color: "#fff", fontFamily: "cursive" }}>
              🎮 YonoGames
            </span>
          </a>
          <nav style={{ display: "flex", gap: 8 }}>
            <a href="/" style={{ color: "#fff", textDecoration: "none", fontSize: 13, padding: "6px 12px", borderRadius: 8, background: "#ffffff22" }}>Home</a>
            <a href="/about-us" style={{ color: "#fff", textDecoration: "none", fontSize: 13, padding: "6px 12px" }}>About</a>
          </nav>
        </div>
      </header>

      {/* Banner */}
      <div style={{
        background: "linear-gradient(135deg, #00632b, #012459)",
        padding: "32px 16px", textAlign: "center",
      }}>
        <h1 style={{ color: "#fff", fontSize: "clamp(22px, 4vw, 36px)", fontWeight: 900, margin: "0 0 10px" }}>
          Download Best Yono Games 🎮
        </h1>
        <p style={{ color: "#ffffff99", fontSize: 14, margin: 0 }}>
          Sign-up bonus • Refer & Earn • Daily Rewards
        </p>
      </div>

      {/* Main Content */}
      <main style={{ maxWidth: 700, margin: "0 auto", padding: "20px 16px 60px" }}>

        {/* Tab Navigation */}
        <div id="tab-nav" style={{
          display: "flex", background: "#fff", borderRadius: 14,
          padding: 6, marginBottom: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          gap: 4,
        }}>
          {[
            { id: "top-rated", label: "⭐ Top Rated" },
            { id: "new-games", label: "🆕 New Games" },
            { id: "other-games", label: "🎮 Other Games" },
          ].map((tab, i) => (
            <button key={tab.id} onClick={() => {}} id={"tab-btn-" + tab.id} style={{
              flex: 1, padding: "10px 8px", borderRadius: 10, border: "none",
              background: i === 0 ? "linear-gradient(135deg, #00632b, #007860)" : "transparent",
              color: i === 0 ? "#fff" : "#666",
              fontWeight: 700, fontSize: 13, cursor: "pointer",
            }}>{tab.label}</button>
          ))}
        </div>

        {/* Top Rated */}
        <section id="top-rated">
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "#1a1a1a", marginBottom: 14 }}>
            ⭐ Top Rated Yono Games
          </h2>
          {topRated.length > 0
            ? topRated.map((app, i) => <AppCard key={app._id} app={app} rank={i + 1} />)
            : demoApps.filter(a => a.category === "top-rated").map((app, i) => <AppCard key={app._id} app={app} rank={i + 1} />)
          }
        </section>

        {/* New Games */}
        <section id="new-games" style={{ marginTop: 32 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "#1a1a1a", marginBottom: 14 }}>
            🆕 New Yono Games
          </h2>
          {newGames.length > 0
            ? newGames.map((app, i) => <AppCard key={app._id} app={app} rank={i + 1} />)
            : demoApps.filter(a => a.category === "new-games").map((app, i) => <AppCard key={app._id} app={app} rank={i + 1} />)
          }
        </section>

        {/* Other Games */}
        <section id="other-games" style={{ marginTop: 32 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "#1a1a1a", marginBottom: 14 }}>
            🎮 Other Games
          </h2>
          {otherGames.length > 0
            ? otherGames.map((app, i) => <AppCard key={app._id} app={app} rank={i + 1} />)
            : demoApps.filter(a => a.category === "other-games").map((app, i) => <AppCard key={app._id} app={app} rank={i + 1} />)
          }
        </section>

      </main>

      {/* Footer */}
      <footer style={{ background: "#1a1a1a", color: "#aaa", padding: "24px 16px", textAlign: "center", fontSize: 13 }}>
        <p style={{ margin: "0 0 8px", color: "#fff", fontWeight: 700 }}>🎮 YonoGames</p>
        <p style={{ margin: "0 0 8px" }}>© 2025 YonoGames. All rights reserved.</p>
        <p style={{ margin: 0 }}>
          <a href="/about-us" style={{ color: "#aaa", textDecoration: "none", marginRight: 16 }}>About Us</a>
          <a href="/disclaimer" style={{ color: "#aaa", textDecoration: "none" }}>Disclaimer</a>
        </p>
      </footer>

      {/* Tab switching script */}
      <script dangerouslySetInnerHTML={{ __html: `
        function showTab(tabId) {
          ['top-rated', 'new-games', 'other-games'].forEach(function(id) {
            var section = document.getElementById(id);
            var btn = document.getElementById('tab-btn-' + id);
            if (id === tabId) {
              section.style.display = 'block';
              btn.style.background = 'linear-gradient(135deg, #00632b, #007860)';
              btn.style.color = '#fff';
            } else {
              section.style.display = 'none';
              btn.style.background = 'transparent';
              btn.style.color = '#666';
            }
          });
        }
        document.addEventListener('DOMContentLoaded', function() {
          ['top-rated', 'new-games', 'other-games'].forEach(function(id) {
            var btn = document.getElementById('tab-btn-' + id);
            btn.addEventListener('click', function() { showTab(id); });
          });
          showTab('top-rated');
        });
      ` }} />
    </div>
  );
}

const demoApps: App[] = [
  { _id: "1", name: "Yono Rummy", slug: "yono-rummy", category: "top-rated", bonus: 500, minWithdraw: 100, version: "2.1", rating: 4.5, reviewCount: 1200 },
  { _id: "2", name: "Jaiho Rummy", slug: "jaiho-rummy", category: "top-rated", bonus: 300, minWithdraw: 50, version: "1.8", rating: 4.2, reviewCount: 980 },
  { _id: "3", name: "Spin 777", slug: "spin-777", category: "top-rated", bonus: 200, minWithdraw: 100, version: "3.0", rating: 4.0, reviewCount: 750 },
  { _id: "4", name: "ABC Rummy", slug: "abc-rummy", category: "new-games", bonus: 400, minWithdraw: 100, version: "1.0", rating: 4.3, reviewCount: 200 },
  { _id: "5", name: "Saga Slots", slug: "saga-slots", category: "new-games", bonus: 250, minWithdraw: 50, version: "1.2", rating: 4.1, reviewCount: 150 },
  { _id: "6", name: "MQM Bet", slug: "mqm-bet", category: "other-games", bonus: 150, minWithdraw: 200, version: "2.5", rating: 3.8, reviewCount: 400 },
];
