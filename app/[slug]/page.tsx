import { Metadata } from "next";

const PROJECT_ID = "eq6o0luu";
const DATASET = "production";

const genreColors: Record<string, string> = {
  Action: "#FF4444", RPG: "#9B59B6", Strategy: "#3498DB",
  Puzzle: "#2ECC71", Sports: "#F39C12", Horror: "#E74C3C",
  Adventure: "#1ABC9C", Simulation: "#E67E22", Other: "#95A5A6",
};

const genreIcons: Record<string, string> = {
  Action: "⚔️", RPG: "🧙", Strategy: "♟️",
  Puzzle: "🧩", Sports: "⚽", Horror: "👻",
  Adventure: "🗺️", Simulation: "🎯", Other: "🎮",
};

async function getGame(slug: string) {
  const query = encodeURIComponent(
    `*[_type == "game" && slug.current == "${slug}"][0] {
      _id, title, description, genre, rating, websiteLink,
      featured, badge, developer, ageRating,
      "imageUrl": image.asset->url,
      "slug": slug.current
    }`
  );
  const url = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${query}`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  const data = await res.json();
  return data.result;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const game = await getGame(params.slug);
  if (!game) return { title: "Game Not Found – GameVault" };
  return {
    title: `${game.title} – GameVault`,
    description: game.description,
    openGraph: {
      title: `${game.title} – GameVault`,
      description: game.description,
      images: game.imageUrl ? [game.imageUrl] : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${game.title} – GameVault`,
      description: game.description,
      images: game.imageUrl ? [game.imageUrl] : [],
    },
  };
}

export default async function GamePage({ params }: { params: { slug: string } }) {
  const game = await getGame(params.slug);
  const color = game ? (genreColors[game.genre] || "#95A5A6") : "#95A5A6";
  const icon = game ? (genreIcons[game.genre] || "🎮") : "🎮";

  if (!game) {
    return (
      <div style={{ minHeight: "100vh", background: "#0a0a15", color: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
        <div style={{ fontSize: 60, marginBottom: 20 }}>🕹️</div>
        <h1 style={{ fontSize: 24, marginBottom: 12 }}>Game Not Found</h1>
        <a href="/" style={{ color: "#7C3AED", textDecoration: "none", fontWeight: 600 }}>← Back to GameVault</a>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a15", color: "#fff", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

      {/* Navbar */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "#0a0a15ee", backdropFilter: "blur(12px)",
        borderBottom: "1px solid #ffffff11", padding: "0 20px",
        display: "flex", alignItems: "center", height: 56,
      }}>
        <a href="/" style={{
          background: "#ffffff15", border: "none", color: "#fff",
          borderRadius: 20, padding: "6px 14px", cursor: "pointer",
          fontSize: 14, fontWeight: 600, textDecoration: "none",
          display: "inline-flex", alignItems: "center", gap: 6,
        }}>← Back</a>
        <span style={{ marginLeft: 16, fontWeight: 700, fontSize: 16 }}>{game.title}</span>
      </nav>

      {/* Hero Banner */}
      <div style={{
        width: "100%", height: 240,
        background: game.imageUrl
          ? `url(${game.imageUrl}) center/cover`
          : `linear-gradient(135deg, ${color}44, #0d0d1a)`,
        position: "relative", display: "flex",
        alignItems: "center", justifyContent: "center",
      }}>
        {!game.imageUrl && <span style={{ fontSize: 90 }}>{icon}</span>}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 100,
          background: "linear-gradient(transparent, #0a0a15)",
        }} />
        {game.badge && (
          <div style={{
            position: "absolute", top: 14, right: 14,
            background: color, color: "#fff", fontSize: 11,
            fontWeight: 700, padding: "4px 12px", borderRadius: 20,
            textTransform: "uppercase",
          }}>{game.badge}</div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: "0 20px 60px", maxWidth: 640, margin: "0 auto" }}>

        {/* Title + Icon */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginTop: 16, marginBottom: 24 }}>
          <div style={{
            width: 76, height: 76, borderRadius: 20, flexShrink: 0,
            background: `linear-gradient(135deg, ${color}, ${color}88)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 36, border: "2px solid #ffffff15",
          }}>{icon}</div>
          <div style={{ flex: 1 }}>
            <h1 style={{ margin: "0 0 4px", fontSize: 24, fontWeight: 800, lineHeight: 1.2 }}>{game.title}</h1>
            <div style={{ color: color, fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
              {game.developer || "Independent Developer"}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              {[1,2,3,4,5].map((s) => (
                <span key={s} style={{ color: s <= game.rating ? "#FFD700" : "#333", fontSize: 15 }}>★</span>
              ))}
              <span style={{ color: "#666", fontSize: 13, marginLeft: 4 }}>{game.rating}.0</span>
            </div>
          </div>
        </div>

        {/* Play Button */}
        <a href={game.websiteLink} target="_blank" rel="noopener noreferrer" style={{
          display: "block", textAlign: "center", textDecoration: "none",
          background: `linear-gradient(135deg, ${color}, ${color}bb)`,
          color: "#fff", fontWeight: 800, fontSize: 17,
          padding: "17px", borderRadius: 16, marginBottom: 28,
          boxShadow: `0 8px 28px ${color}44`, letterSpacing: 0.5,
        }}>
          🎮 Play Now
        </a>

        {/* Stats */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
          background: "#111128", borderRadius: 16, overflow: "hidden",
          border: "1px solid #ffffff0d", marginBottom: 24,
        }}>
          {[
            { label: "Genre", value: game.genre },
            { label: "Rating", value: `${game.rating}/5 ⭐` },
            { label: "Age", value: game.ageRating || "All Ages" },
          ].map((stat, i) => (
            <div key={i} style={{
              padding: "18px 12px", textAlign: "center",
              borderRight: i < 2 ? "1px solid #ffffff0d" : "none",
            }}>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{stat.value}</div>
              <div style={{ color: "#555", fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* About */}
        <div style={{ background: "#111128", borderRadius: 16, padding: 22, border: "1px solid #ffffff0d", marginBottom: 20 }}>
          <h2 style={{ margin: "0 0 12px", fontSize: 14, fontWeight: 700, color: "#aaa", textTransform: "uppercase", letterSpacing: 1 }}>About this Game</h2>
          <p style={{ margin: 0, color: "#ccc", fontSize: 15, lineHeight: 1.8 }}>{game.description}</p>
        </div>

        {/* Tags */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <span style={{
            background: `${color}22`, color: color,
            padding: "8px 18px", borderRadius: 20, fontSize: 13, fontWeight: 600,
            border: `1px solid ${color}44`,
          }}>{icon} {game.genre}</span>
          {game.featured && (
            <span style={{
              background: "#FFD70022", color: "#FFD700",
              padding: "8px 18px", borderRadius: 20, fontSize: 13, fontWeight: 600,
              border: "1px solid #FFD70044",
            }}>⭐ Featured</span>
          )}
        </div>

        {/* SEO structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "VideoGame",
              "name": game.title,
              "description": game.description,
              "genre": game.genre,
              "url": game.websiteLink,
              "image": game.imageUrl || "",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": game.rating,
                "bestRating": 5,
                "worstRating": 1,
                "ratingCount": 1,
              },
            }),
          }}
        />
      </div>
    </div>
  );
}
