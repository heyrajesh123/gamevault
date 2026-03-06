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
  slug?: string;
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

function GameCard({ game }: { game: Game }) {
  const [pressed, setPressed] = useState(false);
  const color = genreColors[game.genre] || "#95A5A6";
  const icon = genreIcons[game.genre] || "🎮";
  const href = game.slug ? "/" + game.slug : "#";

  return (
    <a
      href={href}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      style={{
        display: "flex", alignItems: "center", gap: 14,
        padding: "14px 16px", cursor: "pointer",
        background: pressed ? "#ffffff08" : "transparent",
        borderBottom: "1px solid #ffffff08",
        transition: "background 0.15s",
        textDecoration: "none", color: "inherit",
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
    </a>
  );
}

function FeaturedCard({ game }: { game: Game }) {
  const color = genreColors[game.genre] || "#95A5A6";
  const icon = genreIcons[game.genre] || "🎮";
  const href = game.slug ? "/" + game.slug : "#";

  return (
    <a href={href} style={{
      minWidth: 200, width: 200, borderRadius: 18, overflow: "hidden",
      background: "#111128", border: "1px solid #ffffff0d",
      cursor: "pointer", flexShrink: 0, textDecoration: "none",
      color: "inherit", display: "block",
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
        <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", color: "#fff" }}>{game.title}</div>
        <div style={{ color: "#666", fontSize: 11, marginBottom: 8 }}>{game.genre}</div>
        <div style={{
          background: color + "22", color: color, textAlign: "center",
          padding: "6px", borderRadius: 8, fontSize: 12, fontWeight: 700,
          border: "1px solid " + color + "33",
        }}>Play Now</div>
      </div>
    </a>
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

export default function Home() {
  const [games, setGames] = useState<Game[]>([]);
  const [filtered, setFiltered] = useState<Game[]>([]);
  const [search, setSearch] = useState("");
  const [activeGenre, setActiveGenre] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = encodeURIComponent(
      `*[_type == "game"] | order(_createdAt desc) { _id, title, description, genre, rating, websiteLink, featured, badge, developer, ageRating, "imageUrl": image.asset->url, "slug": slug.current }`
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

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a15", color: "#fff", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

      {/* Navbar */}
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
                  <FeaturedCard key={game._id} game={game} />
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
                  <GameCard key={game._id} game={game} />
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
