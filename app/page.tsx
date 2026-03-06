import { Metadata } from "next";

const PROJECT_ID = "eq6o0luu";
const DATASET = "production";

export const metadata: Metadata = {
  title: "GameVault – Discover the Best Games",
  description: "Hand-picked collection of premium games. Find your next favorite adventure. Browse Action, RPG, Puzzle, Strategy and more.",
  openGraph: {
    title: "GameVault – Discover the Best Games",
    description: "Hand-picked collection of premium games.",
    type: "website",
  },
};

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

interface Game {
  _id: string;
  title: string;
  description: string;
  genre: string;
  rating: number;
  websiteLink: string;
  imageUrl?: string;
  featured?: boolean;
  badge?: string;
  developer?: string;
  ageRating?: string;
  slug?: string;
}

async function getGames(): Promise<Game[]> {
  try {
    const query = encodeURIComponent(
      `*[_type == "game"] | order(_createdAt desc) { _id, title, description, genre, rating, websiteLink, featured, badge, developer, ageRating, "imageUrl": image.asset->url, "slug": slug.current }`
    );
    const url = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${query}`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    const data = await res.json();
    if (data.result && data.result.length > 0) return data.result;
  } catch (e) {}
  return demoGames;
}

export default async function Home() {
  const games = await getGames();
  const featuredGames = games.filter((g) => g.featured);
  const genres = ["All", ...Array.from(new Set(games.map((g) => g.genre)))];

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a15", color: "#fff", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

      {/* Navbar */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "#0a0a15f0", backdropFilter: "blur(12px)",
        borderBottom: "1px solid #ffffff0d", padding: "14px 20px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 22 }}>🕹️</span>
          <span style={{ fontWeight: 800, fontSize: 18, background: "linear-gradient(90deg, #7C3AED, #3B82F6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            GameVault
          </span>
        </div>
        <span style={{ color: "#555", fontSize: 12 }}>{games.length} games</span>
      </nav>

      {/* Hero */}
      <div style={{
        background: "linear-gradient(135deg, #1a0533 0%, #0d1b4d 50%, #0a0a15 100%)",
        padding: "40px 20px 32px", textAlign: "center",
      }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "#7C3AED", letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>
          ✦ The Ultimate Collection ✦
        </div>
        <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900, margin: "0 0 12px", lineHeight: 1.2 }}>
          Discover the{" "}
          <span style={{ background: "linear-gradient(90deg, #7C3AED, #3B82F6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Best Games
          </span>
        </h1>
        <p style={{ color: "#888", fontSize: 15, margin: "0 0 28px", lineHeight: 1.6 }}>
          Hand-picked collection of premium games
        </p>
      </div>

      {/* Featured */}
      {featuredGames.length > 0 && (
        <div style={{ padding: "24px 0 8px" }}>
          <div style={{ padding: "0 20px 14px" }}>
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>⭐ Featured</h2>
          </div>
          <div style={{ display: "flex", gap: 14, padding: "0 20px 4px", overflowX: "auto", scrollbarWidth: "none" }}>
            {featuredGames.map((game) => {
              const color = genreColors[game.genre] || "#95A5A6";
              const icon = genreIcons[game.genre] || "🎮";
              const href = game.slug ? "/" + game.slug : "#";
              return (
                <a key={game._id} href={href} style={{
                  minWidth: 190, width: 190, borderRadius: 18, overflow: "hidden",
                  background: "#111128", border: "1px solid #ffffff0d",
                  cursor: "pointer", flexShrink: 0, textDecoration: "none", color: "inherit", display: "block",
                }}>
                  <div style={{
                    height: 100,
                    background: game.imageUrl ? "url(" + game.imageUrl + ") center/cover" : "linear-gradient(135deg, " + color + "55, #0d0d1a)",
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40,
                  }}>
                    {!game.imageUrl && icon}
                  </div>
                  <div style={{ padding: "10px 12px" }}>
                    <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", color: "#fff" }}>{game.title}</div>
                    <div style={{ color: "#666", fontSize: 11, marginBottom: 8 }}>{game.genre}</div>
                    <div style={{ background: color + "22", color: color, textAlign: "center", padding: "5px", borderRadius: 8, fontSize: 11, fontWeight: 700 }}>
                      Play Now
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* Genre Pills */}
      <div style={{ padding: "16px 20px 12px", display: "flex", gap: 8, overflowX: "auto", scrollbarWidth: "none" }}>
        {genres.map((g) => {
          const color = genreColors[g] || "#7C3AED";
          return (
            <a key={g} href={g === "All" ? "/" : "/?genre=" + g} style={{
              background: g === "All" ? "linear-gradient(135deg, #7C3AED, #3B82F6)" : "#ffffff0d",
              border: "1px solid #ffffff15",
              color: g === "All" ? "#fff" : "#888",
              padding: "7px 16px", borderRadius: 20, fontSize: 12,
              fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap",
              flexShrink: 0, textDecoration: "none",
            }}>{g}</a>
          );
        })}
      </div>

      {/* Games List */}
      <main style={{ padding: "4px 0 60px" }}>
        <div style={{ padding: "0 20px 10px" }}>
          <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#aaa" }}>
            🎮 All Games
            <span style={{ color: "#444", fontWeight: 400, fontSize: 13, marginLeft: 8 }}>({games.length})</span>
          </h2>
        </div>
        <div style={{ background: "#111128", margin: "0 16px", borderRadius: 16, border: "1px solid #ffffff08", overflow: "hidden" }}>
          {games.map((game) => {
            const color = genreColors[game.genre] || "#95A5A6";
            const icon = genreIcons[game.genre] || "🎮";
            const href = game.slug ? "/" + game.slug : "#";
            return (
              <a key={game._id} href={href} style={{
                display: "flex", alignItems: "center", gap: 14,
                padding: "14px 16px",
                borderBottom: "1px solid #ffffff08",
                textDecoration: "none", color: "inherit",
              }}>
                <div style={{
                  width: 58, height: 58, borderRadius: 15, flexShrink: 0,
                  background: game.imageUrl ? "url(" + game.imageUrl + ") center/cover" : "linear-gradient(135deg, " + color + ", " + color + "77)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 26, border: "1.5px solid #ffffff10",
                }}>
                  {!game.imageUrl && icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                    <span style={{ fontWeight: 700, fontSize: 15, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {game.title}
                    </span>
                    {game.badge && (
                      <span style={{
                        background: color, color: "#fff", fontSize: 9,
                        fontWeight: 700, padding: "2px 6px", borderRadius: 8,
                        textTransform: "uppercase", flexShrink: 0,
                      }}>{game.badge}</span>
                    )}
                  </div>
                  <div style={{ color: "#666", fontSize: 12, marginBottom: 4 }}>{game.genre} · {game.developer || "Developer"}</div>
                  <div style={{ display: "flex", gap: 1 }}>
                    {[1,2,3,4,5].map((s) => (
                      <span key={s} style={{ color: s <= game.rating ? "#FFD700" : "#333", fontSize: 11 }}>★</span>
                    ))}
                  </div>
                </div>
                <div style={{ color: "#333", fontSize: 22, flexShrink: 0 }}>›</div>
              </a>
            );
          })}
        </div>
      </main>

      <footer style={{ borderTop: "1px solid #ffffff08", padding: "24px 20px", textAlign: "center", color: "#333", fontSize: 12 }}>
        <span style={{ fontSize: 18 }}>🕹️</span>
        <p style={{ margin: "6px 0 0" }}>© 2025 GameVault · Built with Next.js & Sanity</p>
      </footer>
    </div>
  );
}

const demoGames: Game[] = [
  { _id: "1", title: "Cyber Legends", description: "Epic futuristic battle royale with stunning visuals.", genre: "Action", rating: 5, websiteLink: "#", featured: true, badge: "New", developer: "NeonSoft Studios", ageRating: "13+", slug: "cyber-legends" },
  { _id: "2", title: "Dragon Quest Online", description: "Massive open-world RPG with hundreds of quests.", genre: "RPG", rating: 4, websiteLink: "#", badge: "Hot", developer: "FantasyForge", ageRating: "All Ages", slug: "dragon-quest-online" },
  { _id: "3", title: "Mind Maze", description: "Brain-twisting puzzles that challenge your logic.", genre: "Puzzle", rating: 4, websiteLink: "#", developer: "BrainWave Games", ageRating: "All Ages", slug: "mind-maze" },
  { _id: "4", title: "Galaxy Conquest", description: "Real-time strategy across the cosmos.", genre: "Strategy", rating: 5, websiteLink: "#", featured: true, developer: "StarForge Labs", ageRating: "All Ages", slug: "galaxy-conquest" },
  { _id: "5", title: "Football Stars", description: "The most realistic football simulation.", genre: "Sports", rating: 4, websiteLink: "#", developer: "KickOff Games", ageRating: "All Ages", slug: "football-stars" },
  { _id: "6", title: "Shadow Realm", description: "Dark atmospheric horror adventure.", genre: "Horror", rating: 3, websiteLink: "#", badge: "18+", developer: "DarkPixel", ageRating: "18+", slug: "shadow-realm" },
];
