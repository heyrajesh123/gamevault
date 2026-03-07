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
      display: "flex", alignItems: "center", gap: 12,
      background: "#fff", borderRadius: 14, padding: "14px 16px",
      marginBottom: 10, boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
      border: "1px solid #f0f0f0",
    }}>
      <div style={{ color: "#bbb", fontWeight: 700, fontSize: 14, minWidth: 20, textAlign: "center" }}>{rank}</div>
      <div style={{
        width: 56, height: 56, borderRadius: 14, flexShrink: 0, overflow: "hidden",
        background: "linear-gradient(135deg, #00632b22, #01245922)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {app.logoUrl
          ? <img src={app.logoUrl} alt={app.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          : <span style={{ fontSize: 26 }}>🎮</span>}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 700, fontSize: 15, color: "#1a1a1a", marginBottom: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {app.name}
        </div>
        <div style={{ fontSize: 12, color: "#2e7d32", fontWeight: 600, marginBottom: 2 }}>Sign Up Bonus ₹{app.bonus}</div>
        <div style={{ fontSize: 12, color: "#555", fontWeight: 500 }}>Min. Withdrawal ₹{app.minWithdraw}</div>
      </div>
      <a href={"/" + app.slug} style={{
        background: "linear-gradient(135deg, #00632b, #007860)",
        color: "#fff", padding: "9px 14px", borderRadius: 10,
        fontSize: 13, fontWeight: 700, textDecoration: "none",
        whiteSpace: "nowrap", flexShrink: 0,
      }}>⬇ Download</a>
    </div>
  );
}

interface Props { topRated: App[]; newGames: App[]; otherGames: App[]; }

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
      <div style={{ display: "flex", background: "#fff", borderRadius: 14, padding: 6, marginBottom: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.08)", gap: 4 }}>
        {tabs.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            flex: 1, padding: "10px 8px", borderRadius: 10, border: "none",
            background: activeTab === tab.id ? "linear-gradient(135deg, #00632b, #007860)" : "transparent",
            color: activeTab === tab.id ? "#fff" : "#666",
            fontWeight: 700, fontSize: 13, cursor: "pointer", transition: "all 0.2s",
          }}>{tab.label}</button>
        ))}
      </div>
      <h2 style={{ fontSize: 16, fontWeight: 700, color: "#1a1a1a", margin: "0 0 14px" }}>{active.label} Apps</h2>
      <div>
        {active.apps.length === 0
          ? <div style={{ textAlign: "center", padding: "48px 0", color: "#aaa", background: "#fff", borderRadius: 14 }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🎮</div>
              <p style={{ margin: 0 }}>No apps in this category yet</p>
            </div>
          : active.apps.map((app, i) => <AppCard key={app._id} app={app} rank={i + 1} />)
        }
      </div>
    </div>
  );
}
