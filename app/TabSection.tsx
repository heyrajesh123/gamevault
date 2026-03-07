"use client";
import { useState } from "react";
import { App } from "./page";

function AppCard({ app, rank }: { app: App; rank: number }) {
  return (
    <a href={"/" + app.slug} style={{ textDecoration: "none", display: "block" }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 12,
        background: "#fff", padding: "14px 12px",
        borderBottom: "1px solid #f0f0f0",
      }}>
        {/* Rank */}
        <div style={{ color: "#999", fontWeight: 600, fontSize: 13, minWidth: 22, textAlign: "center", flexShrink: 0 }}>
          {rank}.
        </div>

        {/* Logo - big square */}
        <div style={{
          width: 80, height: 80, borderRadius: 14, flexShrink: 0, overflow: "hidden",
          background: "#f5f5f5",
        }}>
          {app.logoUrl
            ? <img src={app.logoUrl} alt={app.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }}>🎮</div>
          }
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontWeight: 800, fontSize: 16, color: "#111",
            marginBottom: 6, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          }}>
            {app.name}
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#e65100", marginBottom: 4 }}>
            🎁 Sign Up Bonus ₹{app.bonus}
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#1565c0" }}>
            🏦 Min. Withdraw ₹{app.minWithdraw}
          </div>
        </div>

        {/* Download Button - blue, big */}
        <div style={{
          background: "linear-gradient(180deg, #4a90e2, #2563c7)",
          color: "#fff", padding: "12px 14px", borderRadius: 12,
          fontSize: 13, fontWeight: 700,
          flexShrink: 0, textAlign: "center",
          boxShadow: "0 3px 8px rgba(37,99,199,0.35)",
          minWidth: 90,
        }}>
          <div style={{ fontSize: 18, marginBottom: 2 }}>⬇</div>
          Download
        </div>
      </div>
    </a>
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
    { id: "new-games", label: "🆕 New", apps: newGames },
    { id: "top-rated", label: "⭐ Top Rated", apps: topRated },
    { id: "other-games", label: "🎮 Other", apps: otherGames },
  ];

  const fullLabels: Record<string, string> = {
    "new-games": "🆕 New Games",
    "top-rated": "⭐ Top Rated",
    "other-games": "🎮 Other Games",
  };

  const active = tabs.find((t) => t.id === activeTab)!;

  return (
    <div>
      {/* Tab Buttons */}
      <div style={{
        display: "flex", background: "#fff", borderRadius: 12,
        padding: 4, marginBottom: 12,
        boxShadow: "0 1px 6px rgba(0,0,0,0.08)", gap: 3,
      }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1, padding: "10px 4px", borderRadius: 9, border: "none",
              background: activeTab === tab.id
                ? "linear-gradient(135deg, #00632b, #007860)"
                : "transparent",
              color: activeTab === tab.id ? "#fff" : "#666",
              fontWeight: 700, fontSize: 13, cursor: "pointer",
              transition: "all 0.2s",
            }}
          >{tab.label}</button>
        ))}
      </div>

      {/* Section Heading */}
      <h2 style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a", margin: "0 0 8px", paddingLeft: 4 }}>
        {fullLabels[activeTab]} Apps
      </h2>

      {/* App List - clean card with border */}
      <div style={{ background: "#fff", borderRadius: 14, overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,0.08)" }}>
        {active.apps.length === 0 ? (
          <div style={{ textAlign: "center", padding: "48px 16px", color: "#aaa" }}>
            <div style={{ fontSize: 40, marginBottom: 10 }}>🎮</div>
            <p style={{ margin: 0, fontSize: 13 }}>No apps in this category yet</p>
          </div>
        ) : (
          active.apps.map((app, i) => <AppCard key={app._id} app={app} rank={i + 1} />)
        )}
      </div>
    </div>
  );
}
