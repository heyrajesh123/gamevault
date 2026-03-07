"use client";
import { useState } from "react";
import { App } from "./page";

function Stars({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", gap: 1 }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} style={{ color: s <= Math.round(rating) ? "#FFD700" : "#ddd", fontSize: 12 }}>★</span>
      ))}
    </div>
  );
}

function AppCard({ app, rank }: { app: App; rank: number }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 10,
      background: "#fff", borderRadius: 14, padding: "12px 14px",
      marginBottom: 10, boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
      border: "1px solid #f0f0f0",
    }}>
      {/* Rank */}
      <div style={{ color: "#bbb", fontWeight: 700, fontSize: 13, minWidth: 18, textAlign: "center" }}>
        {rank}
      </div>

      {/* Logo */}
      <div style={{
        width: 54, height: 54, borderRadius: 13, flexShrink: 0, overflow: "hidden",
        background: "linear-gradient(135deg, #e8f5e9, #e3f2fd)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {app.logoUrl
          ? <img src={app.logoUrl} alt={app.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          : <span style={{ fontSize: 24 }}>🎮</span>
        }
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontWeight: 700, fontSize: 14, color: "#1a1a1a", marginBottom: 5,
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>
          {app.name}
        </div>
        <div style={{ fontSize: 12, color: "#2e7d32", fontWeight: 600, marginBottom: 3 }}>
          🎁 Sign Up Bonus ₹{app.bonus}
        </div>
        <div style={{ fontSize: 12, color: "#1565c0", fontWeight: 500 }}>
          💸 Min. Withdrawal ₹{app.minWithdraw}
        </div>
      </div>

      {/* Download Button */}
      <a href={"/" + app.slug} style={{
        background: "linear-gradient(135deg, #00632b, #007860)",
        color: "#fff", padding: "9px 12px", borderRadius: 10,
        fontSize: 12, fontWeight: 700, textDecoration: "none",
        whiteSpace: "nowrap", flexShrink: 0, textAlign: "center",
        display: "block",
      }}>
        ⬇ Download
      </a>
    </div>
  );
}

interface Props {
  topRated: App[];
  newGames: App[];
  otherGames: App[];
}

export default function TabSection({ topRated, newGames, otherGames }: Props) {
  const [activeTab, setActiveTab] = useState("top-rated");

  const tabs = [
    { id: "new-games", label: "🆕 New Games", apps: newGames },
    { id: "top-rated", label: "⭐ Top Rated", apps: topRated },
    { id: "other-games", label: "🎮 Other Games", apps: otherGames },
  ];

  const active = tabs.find((t) => t.id === activeTab)!;

  return (
    <div>
      {/* Tab Buttons */}
      <div style={{
        display: "flex", background: "#fff", borderRadius: 14,
        padding: 5, marginBottom: 20,
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)", gap: 4,
      }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1, padding: "10px 4px", borderRadius: 10, border: "none",
              background: activeTab === tab.id
                ? "linear-gradient(135deg, #00632b, #007860)"
                : "transparent",
              color: activeTab === tab.id ? "#fff" : "#666",
              fontWeight: 700, fontSize: 13, cursor: "pointer",
              transition: "all 0.2s", lineHeight: 1.3,
            }}
          >{tab.label}</button>
        ))}
      </div>

      {/* Section Heading */}
      <h2 style={{ fontSize: 16, fontWeight: 700, color: "#1a1a1a", margin: "0 0 14px" }}>
        {active.label} Apps
      </h2>

      {/* App List */}
      {active.apps.length === 0 ? (
        <div style={{
          textAlign: "center", padding: "48px 16px", color: "#aaa",
          background: "#fff", borderRadius: 14,
        }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🎮</div>
          <p style={{ margin: 0, fontSize: 14 }}>No apps in this category yet</p>
        </div>
      ) : (
        active.apps.map((app, i) => <AppCard key={app._id} app={app} rank={i + 1} />)
      )}
    </div>
  );
}
