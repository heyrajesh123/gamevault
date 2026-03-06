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

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "eq6o0luu";
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

async function fetchGames(): Promise<Game[]> {
  const query = encodeURIComponent(
    `*[_type == "game"] | order(_createdAt desc) {
      _id, title, description, genre, rating, websiteLink, featured, badge,
      "imageUrl": image.asset->url
    }`
  );
  const url = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${query}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.result || [];
}

function Stars({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} style={{ color: s <= rating ? "#FFD700" : "#444", fontSize: 14 }}>★</span>
      ))}
    </div>
  );
}

function GameCard({ game }: { game: Game }) {
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
        border: hovered ? `1px solid ${genreColor}55` : "1px solid #ffffff11",
        borderRadius: 16, overflow: "hidden",
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? `0 16px 40px ${genreColor}22` : "0 4px 20px #00000044",
        cursor: "pointer",
      }}
    >
      <div style={{
        width: "100%", aspectRatio: "16/9",
        background: `linear-gradient(135deg, ${genreColor}33, #0d0d1a)`,
        position: "relative", display: "flex", alignItems: "center",
        justifyContent: "center", fontSize: 48,
      }}>
        {game.imageUrl ? (
          <img src={game.imageUrl} alt={game.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <span>🎮</span>
        )}
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
            background: `${genreColor}22`, color: genreColor, fontSize: 11,
            fontWeight: 600, padding: "3px 9px", borderRadius: 8,
            whiteSpace: "nowrap", marginLeft: 8,
          }}>{game.genre}</span>
        </div>
        <Stars rating={game.rating || 0} />
        <p style={{
          color: "#aaa", fontSize: 13, lineHeight: 1.6, margin: "10px 0 16px",
          display: "-webkit-box", WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>
          {game.description}
        </p>
        
          href={game.websiteLink} target="_blank" rel="noopener noreferrer"
          style={{
            display: "block", textAlign: "center",
            background: hovered ? genreColor : "transparent",
            color: hovered ? "#fff" : genreColor,
            border: `1.5px solid ${genreColor}`,
            borderRadius: 10, padding: "10px 0",
            fontWeight: 700, fontSize: 13, textDecoration: "none",
            transition: "all 0.25s ease", letterSpacing: 0.5,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          Visit Game →
        </a>
