"use client";
import { useState } from "react";
import Link from "next/link";
import { App } from "./page";

function AppCard({ app, rank }: { app: App; rank: number }) {
  return (
    <Link href={"/" + app.slug} style={{ textDecoration: "none", display: "block" }}>
      <div style={{
        border: "1px solid #ddd",
        borderRadius: 12,
        padding: 2,
        marginBottom: 5,
        background: "#fff",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          padding: "2px 2px",
        }}>
          {/* Rank */}
          <span style={{ color: "#aaa", fontWeight: 600, fontSize: 13, width: 8, flexShrink: 0, textAlign: "center" }}>
            {rank}.
          </span>

          {/* Logo */}
          <div style={{
            width: 64, height: 64, borderRadius: 12,
            flexShrink: 0, overflow: "hidden", background: "#f5f5f5",
          }}>
            {app.logoUrl
              ? <img src={app.logoUrl} alt={app.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>🎮</div>
            }
          </div>

          {/* Text Info */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 800, fontSize: 15, color: "#111", marginBottom: 5, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {app.name}
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#d84315", marginBottom: 1, whiteSpace: "nowrap" }}>
              🎁 Sign Up Bonus ₹{app.bonus}
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#1565c0", whiteSpace: "nowrap" }}>
              🏦 Min. Withdraw ₹{app.minWithdraw}
            </div>
          </div>

          {/* Download Button */}
          <div style={{
            flexShrink: 0,
            background: "linear-gradient(180deg, #2e9e4f 0%, #1a7a35 100%)",
            color: "#fff",
            borderRadius: 10,
            padding: "10px 5px",
            display: "flex",
            alignItems: "center",
            gap: 2,
            fontSize: 13,
            fontWeight: 700,
            boxShadow: "0 3px 8px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.2)",
            border: "1px solid #166b2a",
            whiteSpace: "nowrap",
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M12 16l-6-6h4V4h4v6h4l-6 6z"/>
              <path d="M20 18H4v2h16v-2z"/>
            </svg>
            Download
          </div>
        </div>
      </div>
    </Link>
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
      {/* Tabs */}
      <div style={{
        display: "flex", background: "#fff", borderRadius: 12,
        padding: 4, marginBottom: 14,
        boxShadow: "0 1px 6px rgba(0,0,0,0.08)", gap: 3,
      }}>
        {tabs.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            flex: 1, padding: "10px 2px", borderRadius: 9, border: "none",
            background: activeTab === tab.id ? "linear-gradient(135deg,#00632b,#007860)" : "transparent",
            color: activeTab === tab.id ? "#fff" : "#555",
            fontWeight: 700, fontSize: 12, cursor: "pointer",
          }}>{tab.label}</button>
        ))}
      </div>

      {/* Heading */}
      <h2 style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a", margin: "0 0 12px" }}>
        {fullLabels[activeTab]} Apps
      </h2>

      {/* List */}
      {active.apps.length === 0 ? (
        <div style={{ textAlign: "center", padding: "48px 16px", color: "#aaa", background: "#fff", borderRadius: 12 }}>
          <div style={{ fontSize: 38, marginBottom: 10 }}>🎮</div>
          <p style={{ margin: 0, fontSize: 13 }}>No apps yet</p>
        </div>
      ) : (
        active.apps.map((app, i) => <AppCard key={app._id} app={app} rank={i + 1} />)
      )}
    </div>
  );
}
