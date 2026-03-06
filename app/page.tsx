"use client";
import React, { useEffect, useState } from "react";

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
}

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

function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} style={{ color: s <= rating ? "#FFD700" : "#333", fontSize: size }}>★</span>
      ))}
    </div>
  );
}

function GameDetail({ game, onBack }: { game: Game; onBack: () => void }) {
  const color = genreColors[game.genre] || "#95A5A6";
  const icon = genreIcons[game.genre] || "🎮";

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a15", color: "#fff", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <div style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "#0a0a15ee", backdropFilter: "blur(12px)",
        borderBottom: "1px solid #ffffff11", padding: "0 20px",
        display: "flex", alignItems: "center", height: 56,
      }}>
        <button onClick={onBack} style={{
          background: "#ffffff15", border: "none", color: "#fff",
          borderRadius: 20, padding: "6px 14px", cursor: "pointer",
          fontSize: 14, fontWeight: 600,
        }}>← Back</button>
        <span style={{ marginLeft: 16, fontWeight: 700, fontSize: 16 }}>{game.title}</span>
      </div>

      <div style={{
        width: "100%", height: 220,
        background: game.imageUrl
          ? "url(" + game.imageUrl + ") center/cover"
          : "linear-gradient(135deg, " + color + "44, #0d0d1a)",
        position: "relative", display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {!game.imageUrl && <span style={{ fontSize: 80 }}>{icon}</span>}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 80,
          background: "linear-gradient(transparent, #0a0a15)",
        }} />
        {game.badge && (
          <div style={{
            position: "absolute", top: 14, right: 14,
            background: color, color: "#fff", fontSize: 11,
            fontWeight: 700, padding: "4px 12px", borderRadius: 20, textTransform: "uppercase",
          }}>{game.badge}</div>
        )}
      </div>

      <div style={{ padding: "0 20px 40px", maxWidth: 600, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginTop: 16, marginBottom: 20 }}>
          <div style={{
            width: 72, height: 72, borderRadius: 18, flexShrink: 0,
            background: "linear-gradient(135deg, " + color + ", " + color + "88)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 34, border: "2px solid #ffffff15",
          }}>{icon}</div>
          <div style={{ flex: 1 }}>
            <h1 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 800, lineHeight: 1.2 }}>{game.title}</h1>
            <div style={{ color: color, fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
              {game.developer || "Independent Developer"}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Stars rating={game.rating} size={13} />
              <span style={{ color: "#666", fontSize: 12 }}>{game.rating}.0</span>
            </div>
          </div>
        </div>

        <a href={game.websiteLink} target="_blank" rel="noopener noreferrer" style={{
          display: "block", textAlign: "center", textDecoration: "none",
          background: "linear-gradient(135deg, " + color + ", " + color + "bb)",
          color: "#fff", fontWeight: 800, fontSize: 16,
          padding: "16px", borderRadius: 14, marginBottom: 24,
          boxShadow: "0 8px 24px " + color + "44", letterSpacing: 0.5,
        }}>
          🎮 Play Now
        </a>

        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
          background: "#111128", borderRadius: 16, overflow: "hidden",
          border: "1px solid #ffffff0d", marginBottom: 24,
        }}>
          {[
            { label: "Genre", value: game.genre },
            { label: "Rating", value: game.rating + "/5 ⭐" },
            { label: "Age", value: game.ageRating || "All Ages" },
          ].map((stat, i) => (
            <div key={i} style={{
              padding: "16px 12px", textAlign: "center",
              borderRight: i < 2 ? "1px solid #ffffff0d" : "none",
            }}>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{stat.value}</div>
              <div style={{ color: "#555", fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#111128", borderRadius: 16, padding: 20, border: "1px solid #ffffff0d", marginBottom: 20 }}>
          <h3 style={{ margin: "0 0 12px", fontSize: 15, fontWeight: 700, color: "#aaa", textTransform: "uppercase", letterSpacing: 1 }}>About</h3>
          <p style={{ margin: 0, color: "#ccc", fontSize: 15, lineHeight: 1.7 }}>{game.description}</p>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <span style={{
            background: color + "22", color: color,
            padding: "8px 16px", borderRadius: 20, fontSize: 13, fontWeight: 600,
            border: "1px solid " + color + "44",
          }}>{icon} {game.genre}</span>
          {game.featured && (
            <span style={{
              background: "#FFD70022", color: "#FFD700",
              padding: "8px 16px", borderRadius: 20, fontSize: 13, fontWeight: 600,
              border: "1px solid #FFD70044",
            }}>⭐ Featured</span>
          )}
        </div>
      </div>
    </div>
  );
}

function GameCard({ game, onClick }: { game: Game; onClick: () => void }) {
  const [pressed, setPressed] = useState(false);
  const color = genreColors[game.genre] || "#95A5A6";
  const icon = genreIcons[game.genre] || "🎮";

  return (
    <div
      onClick={onClick}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      style={{
        display: "flex", alignItems: "center", gap: 14,
        padding: "14px 16px", cursor: "pointer",
        background: pressed ? "#ffffff08" : "transparent",
        borderBottom: "1px solid #ffffff08",
        transition: "background 0.15s",
      }}
    >
      <div style={{
        width: 60, height: 60, borderRadius: 16, flexShrink: 0,
        background: game.imageUrl
          ? "url(" + game.imageUrl + ") center/cover"
          : "linear-gradient(135deg, " + color + ", " + color + "77)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 28, border: "1.5px solid #ffffff10",
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
              fontWeight: 700, padding: "2px 7px", borderRadius: 10,
              textTransform: "uppercase", flexShrink: 0,
            }}>{game.badge}</span>
          )}
        </div>
        <div style={{ color: "#666", fontSize: 12, marginBottom: 5 }}>{game.genre}</div>
        <Stars rating={game.rating} size={11} />
      </div>
      <div style={{ color: "#333", fontSize: 22, flexShrink: 0 }}>›</div>
    </div>
  );
}

function FeaturedCard({ game, onClick }: { game: Game; onClick: () => void }) {
  const color = genreColors[game.genre] || "#95A5A6";
  const icon = genreIcons[game.genre] || "🎮";

  return (
    <div onClick={onClick} style={{
      minWidth: 200, width: 200, borderRadius: 18, overflow: "hidden",
      background: "#111128", border: "1px solid #ffffff0d",
      cursor: "pointer", flexShrink: 0,
    }}>
      <div style={{
        height: 110,
        background: game.imageUrl
          ? "url(" + game.imageUrl + ") center/cover"
          : "linear-gradient(135deg, " + color + "55, #0d0d1a)",
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 44,
      }}>
        {!game.imageUrl && icon}
      </div>
      <div style={{ padding: "12px 14px" }}>
        <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{game.title}</div>
        <div style={{ color: "#666", fontSize: 11, marginBottom: 8 }}>{game.genre}</div>
        <div style={{
          background: color + "22", color: color, textAlign: "center",
          padding: "6px", borderRadius: 8, fontSize: 12, fontWeight: 700,
          border: "1px solid " + color + "33",
        }}>Play Now</div>
      </div>
    </div>
  );
}

const demoGames: Game[] = [
  { _id: "1", title: "Cyber Legends", description: "Epic futuristic battle royale with stunning visuals and fast-paced gameplay. Battle against players worldwide in neon-lit arenas.", genre: "Action", rating: 5, websiteLink: "#", featured: true, badge: "New", developer: "NeonSoft Studios", ageRating: "13+" },
  { _id: "2", title: "Dragon Quest Online", description: "Massive open-world RPG with hundreds of quests and deep character customization. Explore vast lands and defeat ancient dragons.", genre: "RPG", rating: 4, websiteLink: "#", badge: "Hot", developer: "FantasyForge", ageRating: "All Ages" },
  { _id: "3", title: "Mind Maze", description: "Brain-twisting puzzles that will challenge your logic and creativity. Over 500 levels of mind-bending fun.", genre: "Puzzle", rating: 4, websiteLink: "#", developer: "BrainWave Games", ageRating: "All Ages" },
  { _id: "4", title: "Galaxy Conquest", description: "Real-time strategy game where you build empires across the cosmos. Manage resources, build fleets and conquer the universe.", genre: "Strategy", rating: 5, websiteLink: "#", featured: true, developer: "StarForge Labs", ageRating: "All Ages" },
  { _id: "5", title: "Football Stars", description: "The most realistic football simulation with real physics engine. Play with your favorite teams and compete in online leagues.", genre: "Sports", rating: 4, websiteLink: "#", developer: "KickOff Games", ageRating: "All Ages" },
  { _id: "6", title: "Shadow Realm", description: "Dark atmospheric horror adventure through haunted dimensions. Face your deepest fears in this spine-chilling experience.", genre: "Horror", rating: 3, websiteLink: "#", badge: "18+", developer: "DarkPixel", ageRating: "18+" },
];

export default function Home() {
  const [games, setGames] = useState<Game[]>([]);
  const [filtered, setFiltered] = useState<Game[]>([]);
  const [search, setSearch] = useState("");
  const [activeGenre, setActiveGenre] = useState("All");
  const [loading, setLoading] = useState(true);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  useEffect(() => {
    const query = encodeURIComponent(
      `*[_type == "game"] | order(_createdAt desc) { _id, title, description, genre, rating, websiteLink, featured, badge, developer, ageRating, "imageUrl": image.asset->url }`
    );
    fetch("https://" + PROJECT_ID + ".api.sanity.io/v2021-10-21/data/query/" + DATASET + "?query=" + query)
      .then((r) => r.json())
      .then((data) => {
        const result = data.result || [];
        setGames(result.length ? result : demoGames);
        setFiltered(result.length ? result : demoGames);
        setLoading(false);
      })
      .catch(() => {
        setGames(demoGames);
        setFiltered(demoGames);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let result = games;
    if (activeGenre !== "All") result = result.filter((g) => g.genre === activeGenre);
    if (search) result = result.filter((g) =>
      g.title.toLowerCase().includes(search.toLowerCase()) ||
      g.description.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
  }, [search, activeGenre, games]);

  const genres = ["All", ...Array.from(new Set(games.map((g) => g.genre)))];
  const featuredGames = games.filter((g) => g.featured);

  if (selectedGame) {
    return <GameDetail game={selectedGame} onBack={() => setSelectedGame(null)} />;
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a15", color: "#fff", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <div style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "#0a0a15f0", backdropFilter: "blur(12px)",
        borderBottom: "1px solid #ffffff0d", padding: "12px 20px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{ fontSize: 22 }}>🕹️</span>
          <span style={{ fontWeight: 800, fontSize: 18, background: "linear-gradient(90deg, #7C3AED, #3B82F6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            GameVault
          </span>
          <span style={{ marginLeft: "auto", color: "#555", fontSize: 12 }}>{games.length} games</span>
        </div>
        <div style={{ position: "relative" }}>
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 15, opacity: 0.4 }}>🔍</span>
          <input
            type="text" placeholder="Search games..." value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%", boxSizing: "border-box",
              background: "#ffffff0d", border: "1px solid #ffffff15",
              borderRadius: 12, padding: "10px 12px 10px 38px",
              color: "#fff", fontSize: 14, outline: "none",
            }}
          />
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "80px 0", color: "#555" }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>⏳</div>
          <p>Loading games...</p>
        </div>
      ) : (
        <div>
          {featuredGames.length > 0 && !search && activeGenre === "All" && (
            <div style={{ padding: "20px 0 8px" }}>
              <div style={{ padding: "0 20px 12px" }}>
                <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>⭐ Featured</h2>
              </div>
              <div style={{ display: "flex", gap: 14, padding: "0 20px 4px", overflowX: "auto", scrollbarWidth: "none" }}>
                {featuredGames.map((game) => (
                  <FeaturedCard key={game._id} game={game} onClick={() => setSelectedGame(game)} />
                ))}
              </div>
            </div>
          )}

          <div style={{ padding: "16px 20px 8px", display: "flex", gap: 8, overflowX: "auto", scrollbarWidth: "none" }}>
            {genres.map((g) => (
              <button key={g} onClick={() => setActiveGenre(g)} style={{
                background: activeGenre === g ? "linear-gradient(135deg, #7C3AED, #3B82F6)" : "#ffffff0d",
                border: activeGenre === g ? "none" : "1px solid #ffffff15",
                color: activeGenre === g ? "#fff" : "#888",
                padding: "7px 16px", borderRadius: 20, fontSize: 12,
                fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0,
              }}>{g}</button>
            ))}
          </div>

          <div style={{ padding: "8px 0" }}>
            <div style={{ padding: "0 20px 10px" }}>
              <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#aaa" }}>
                {activeGenre === "All" ? "🎮 All Games" : (genreIcons[activeGenre] || "🎮") + " " + activeGenre}
                <span style={{ color: "#444", fontWeight: 400, fontSize: 13, marginLeft: 8 }}>({filtered.length})</span>
              </h2>
            </div>
            <div style={{ background: "#111128", margin: "0 16px", borderRadius: 16, border: "1px solid #ffffff08", overflow: "hidden" }}>
              {filtered.length === 0 ? (
                <div style={{ textAlign: "center", padding: "48px 20px", color: "#555" }}>
                  <div style={{ fontSize: 36, marginBottom: 12 }}>🕹️</div>
                  <p>No games found</p>
                </div>
              ) : (
                filtered.map((game) => (
                  <GameCard key={game._id} game={game} onClick={() => setSelectedGame(game)} />
                ))
              )}
            </div>
          </div>
          <div style={{ height: 40 }} />
        </div>
      )}
    </div>
  );
}
