"use client";
import { useState } from "react";
import { App } from "./page";

function AppCard({ app, rank }: { app: App; rank: number }) {
  return (
    <a href={"/" + app.slug} style={{ textDecoration: "none", display: "block", marginBottom: 8 }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        background: "#fff", borderRadius: 12, padding: "10px 12px",
        boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
        border: "1px solid #efefef",
      }}>
        {/* Rank */}
        <div style={{ color: "#ccc", fontWeight: 700, fontSize: 12, minWidth: 16, textAlign: "center", flexShrink: 0 }}>
          {rank}
        </div>

        {/* Logo */}
        <div style={{
          width: 46, height: 46, borderRadius: 10, flexShrink: 0, overflow: "hidden",
          background: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {app.logoUrl
            ? <img src={app.logoUrl} alt={app.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            : <span style={{ fontSize: 22 }}>🎮</span>
          }
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0, overflow: "hidden" }}>
          <div style={{
            fontWeight: 700, fontSize: 14, color: "#1a1a1a",
            marginBottom: 3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          }}>
            {app.name}
          </div>
          <div style={{ fontSize: 11.5, color: "#2e7d32", fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            🎁 Sign Up Bonus ₹{app.bonus}
          </div>
          <div style={{ fontSize: 11.5, color: "#1565c0", fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            💸 Min. Withdrawal ₹{app.minWithdraw}
          </div>
        </div>

        {/* Download Button */}
        <div style={{
          background: "linear-gradient(135deg, #00632b, #007860)",
          color: "#fff", padding: "8px 10px", borderRadius: 9,
          fontSize: 11, fontWeight: 700,
          whiteSpace: "nowrap", flexShrink: 0, textAlign: "center",
        }}>
          ⬇ Download
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

  const active = tabs.find((t) => t.id === activeTab)!;

  const fullLabels: Record<string, string> = {
    "new-games": "🆕 New Games",
    "top-rated": "⭐ Top Rated",
    "other-games": "🎮 Other Games",
  };

  return (
    <div>
      {/* Tab Buttons */}
      <div style={{
        display: "flex", background: "#fff", borderRadius: 12,
        padding: 4, marginBottom: 16,
        boxShadow: "0 1px 6px rgba(0,0,0,0.08)", gap: 3,
      }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1, padding: "9px 4px", borderRadius: 9, border: "none",
              background: activeTab === tab.id
                ? "linear-gradient(135deg, #00632b, #007860)"
                : "transparent",
              color: activeTab === tab.id ? "#fff" : "#666",
              fontWeight: 700, fontSize: 12, cursor: "pointer",
              transition: "all 0.2s", lineHeight: 1.2,
            }}
          >{tab.label}</button>
        ))}
      </div>

      {/* Section Heading */}
      <h2 style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a", margin: "0 0 12px" }}>
        {fullLabels[activeTab]} Apps
      </h2>

      {/* App List */}
      {active.apps.length === 0 ? (
        <div style={{
          textAlign: "center", padding: "40px 16px",
          background: "#fff", borderRadius: 12, color: "#aaa",
        }}>
          <div style={{ fontSize: 36, marginBottom: 10 }}>🎮</div>
          <p style={{ margin: 0, fontSize: 13 }}>No apps in this category yet</p>
        </div>
      ) : (
        active.apps.map((app, i) => <AppCard key={app._id} app={app} rank={i + 1} />)
      )}
    </div>
  );
}
