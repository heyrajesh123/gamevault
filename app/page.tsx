"use client";
import { useEffect, useState } from "react";

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
}

const PROJECT_ID = "eq6o0luu";
const DATASET = "production";

function Stars(props: { rating: number }) {
  const stars = [1, 2, 3, 4, 5];
  return React.createElement(
    "div",
    { style: { display: "flex", gap: 2 } },
    stars.map((s) =>
      React.createElement(
        "span",
        { key: s, style: { color: s <= props.rating ? "#FFD700" : "#444", fontSize: 14 } },
        "★"
      )
    )
  );
}

import React from "react";

function GameCard(props: { game: Game }) {
  const game = props.game;
  const [hovered, setHovered] = useState(false);
  const genreColors: Record<string, string> = {
    Action: "#FF4444", RPG: "#9B59B6", Strategy: "#3498DB",
    Puzzle: "#2ECC71", Sports: "#F39C12", Horror: "#E74C3C",
    Adventure: "#1ABC9C", Simulation: "#E67E22", Other: "#95A5A6",
  };
  const genreColor = genreColors[game.genre] || "#95A5A6";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#1a1a2e" : "#111128",
        border: hovered ? ("1px solid " + genreColor + "55") : "1px solid #ffffff11",
        borderRadius: 16,
        overflow: "hidden",
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? ("0 16px 40px " + genreColor + "22") : "0 4px 20px #00000044",
        cursor: "pointer",
      }}
    >
      <div style={{
        width: "100%",
        aspectRatio: "16/9" as any,
        background: "linear-gradient(135deg, " + genreColor + "33, #0d0d1a)",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 48,
      }}>
        {game.imageUrl
          ? <img src={game.imageUrl} alt={game.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          : <span>🎮</span>
        }
        {game.badge && (
          <div style={{
            position: "absolute", top: 10, right: 10,
            background: genreColor, color: "#fff", fontSize: 11,
            fontWeight: 700, padding: "3px 10px", borderRadius: 20,
            letterSpacing: 0.5, textTransform: "uppercase",
          }}>{game.badge}</div>
        )}
        {game.featured && (
          <div style={{
            position: "absolute", top: 10, left: 10,
            background: "linear-gradient(90deg, #FFD700, #FF8C00)",
            color: "#000", fontSize: 11, fontWeight: 700,
            padding: "3px 10px", borderRadius: 20, letterSpacing: 0.5,
          }}>⭐ FEATURED</div>
        )}
      </div>

      <div style={{ padding: "18px 20px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
          <h3 style={{ margin: 0, color: "#fff", fontSize: 17, fontWeight: 700, lineHeight: 1.3 }}>{game.title}</h3>
          <span style={{
            background: genreColor + "22", color: genreColor, fontSize: 11,
            fontWeight: 600, padding: "3px 9px", borderRadius: 8,
            whiteSpace: "nowrap", marginLeft: 8,
          }}>{game.genre}</span>
        </div>
        <Stars rating={game.rating || 0} />
        <p style={{
          color: "#aaa", fontSize: 13, lineHeight: 1.6, margin: "10px 0 16px",
          overflow: "hidden", display: "-webkit-box",
          WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as any,
        }}>
          {game.description}
        </p>
        <a
          href={game.websiteLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "block", textAlign: "center",
            background: hovered ? genreColor : "transparent",
            color: hovered ? "#fff" : genreColor,
            border: "1.5px solid " + genreColor,
            borderRadius: 10, padding: "10px 0",
            fontWeight: 700, fontSize: 13, textDecoration: "none",
            transition: "all 0.25s ease", letterSpacing: 0.5,
          }}
        >
          Visit Game →
        </a>
      </div>
    </div>
  );
}

export default function Home() {
  const [games, setGames] = useState<Game[]>([]);
  const [filtered, setFiltered] = useState<Game[]>([]);
  const [search, setSearch] = useState("");
  const [activeGenre, setActiveGenre] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = encodeURIComponent(
      `*[_type == "game"] | order(_createdAt desc) { _id, title, description, genre, rating, websiteLink, featured, badge, "imageUrl": image.asset->url }`
    );
    const url = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${query}`;

    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        const result = data.result || [];
        setGames(result);
        setFiltered(result);
        setLoading(false);
      })
      .catch(() => {
        const demo: Game[] = [
          { _id: "1", title: "Cyber Legends", description: "Epic futuristic battle royale with stunning visuals and fast-paced gameplay.", genre: "Action", rating: 5, websiteLink: "#", featured: true, badge: "New" },
          { _id: "2", title: "Dragon Quest Online", description: "Massive open-world RPG with hundreds of quests and deep character customization.", genre: "RPG", rating: 4, websiteLink: "#", badge: "Hot" },
          { _id: "3", title: "Mind Maze", description: "Brain-twisting puzzles that will challenge your logic and creativity.", genre: "Puzzle", rating: 4, websiteLink: "#" },
          { _id: "4", title: "Galaxy Conquest", description: "Real-time strategy game where you build empires across the cosmos.", genre: "Strategy", rating: 5, websiteLink: "#", featured: true },
          { _id: "5", title: "Football Stars", description: "The most realistic football simulation with real physics engine.", genre: "Sports", rating: 4, websiteLink: "#" },
          { _id: "6", title: "Shadow Realm", description: "Dark atmospheric horror adventure through haunted dimensions.", genre: "Horror", rating: 3, websiteLink: "#", badge: "18+" },
        ];
        setGames(demo);
        setFiltered(demo);
        setLoading(false);
      });
  }, []);

  const genres = ["All", ...Array.from(new Set(games.map((g) => g.genre)))];

  useEffect(() => {
    let result = games;
    if (activeGenre !== "All") result = result.filter((g) => g.genre === activeGenre);
    if (search) result = result.filter((g) =>
      g.title.toLowerCase().includes(search.toLowerCase()) ||
      g.description.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
  }, [search, activeGenre, games]);

  const featuredGames = filtered.filter((g) => g.featured);
  const regularGames = filtered.filter((g) => !g.featured);

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a15", fontFamily: "'Segoe UI', system-ui, sans-serif", color: "#fff" }}>

      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "#0a0a15ee", backdropFilter: "blur(12px)",
        borderBottom: "1px solid #ffffff11", padding: "0 24px",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 26 }}>🕹️</span>
            <span style={{ fontWeight: 800, fontSize: 20, background: "linear-gradient(90deg, #7C3AED, #3B82F6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              GameVault
            </span>
          </div>
          <div style={{ color: "#aaa", fontSize: 13 }}>{games.length} Games Available</div>
        </div>
      </nav>

      <div style={{
        background: "linear-gradient(135deg, #1a0533 0%, #0d1b4d 50%, #0a0a15 100%)",
        padding: "64px 24px", textAlign: "center", position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0, opacity: 0.04,
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }} />
        <div style={{ position: "relative", maxWidth: 700, margin: "0 auto" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#7C3AED", letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>
            ✦ The Ultimate Collection ✦
          </div>
          <h1 style={{ fontSize: "clamp(32px, 6vw, 60px)", fontWeight: 900, margin: "0 0 16px", lineHeight: 1.15 }}>
            Discover & Play the{" "}
            <span style={{ background: "linear-gradient(90deg, #7C3AED, #3B82F6, #06B6D4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Best Games
            </span>
          </h1>
          <p style={{ color: "#888", fontSize: 17, lineHeight: 1.7, marginBottom: 36 }}>
            Hand-picked collection of premium games. Find your next favorite adventure.
          </p>
          <div style={{ position: "relative", maxWidth: 480, margin: "0 auto" }}>
            <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", fontSize: 18, opacity: 0.5 }}>🔍</span>
            <input
              type="text"
              placeholder="Search games..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%", boxSizing: "border-box",
                background: "#ffffff0d", border: "1.5px solid #ffffff22",
                borderRadius: 14, padding: "14px 16px 14px 46px",
                color: "#fff", fontSize: 15, outline: "none",
              }}
            />
          </div>
        </div>
      </div>

      <div style={{ padding: "24px 24px 0", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {genres.map((g) => (
            <button key={g} onClick={() => setActiveGenre(g)} style={{
              background: activeGenre === g ? "linear-gradient(135deg, #7C3AED, #3B82F6)" : "#ffffff0d",
              border: activeGenre === g ? "none" : "1px solid #ffffff15",
              color: activeGenre === g ? "#fff" : "#aaa",
              padding: "8px 18px", borderRadius: 30, fontSize: 13,
              fontWeight: 600, cursor: "pointer", transition: "all 0.2s",
            }}>{g}</button>
          ))}
        </div>
      </div>

      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px 80px" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "#666" }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>⏳</div>
            <p>Loading games...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "#666" }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>🕹️</div>
            <p>No games found. Try a different search!</p>
          </div>
        ) : (
          <div>
            {featuredGames.length > 0 && (
              <div style={{ marginBottom: 48 }}>
                <h2 style={{ color: "#FFD700", fontSize: 14, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 20 }}>
                  ⭐ Featured Games
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
                  {featuredGames.map((game) => <GameCard key={game._id} game={game} />)}
                </div>
              </div>
            )}
            {regularGames.length > 0 && (
              <div>
                <h2 style={{ color: "#aaa", fontSize: 14, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 20 }}>
                  🎮 All Games ({regularGames.length})
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
                  {regularGames.map((game) => <GameCard key={game._id} game={game} />)}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <footer style={{ borderTop: "1px solid #ffffff11", padding: "32px 24px", textAlign: "center", color: "#444", fontSize: 13 }}>
        <span style={{ fontSize: 20 }}>🕹️</span>
        <p style={{ margin: "8px 0 0" }}>© 2025 GameVault · Built with Next.js & Sanity</p>
      </footer>
    </div>
  );
}
