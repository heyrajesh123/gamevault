import { Metadata } from "next";
import { notFound } from "next/navigation";

const PROJECT_ID = "eq6o0luu";
const DATASET = "production";

interface Screenshot {
  imageUrl: string;
  altText: string;
}

interface App {
  _id: string;
  name: string;
  slug: string;
  logoUrl?: string;
  category: string;
  bonus: number;
  minWithdraw: number;
  version?: string;
  size?: string;
  downloadLink: string;
  rating: number;
  reviewCount: number;
  perRefer?: number;
  developerName?: string;
  metaTitle?: string;
  metaDescription?: string;
  appInformation?: string;
  telegramLink?: string;
  screenshots: Screenshot[];
}

interface RelatedApp {
  _id: string;
  name: string;
  slug: string;
  logoUrl?: string;
  bonus: number;
  minWithdraw: number;
  rating: number;
}

async function getApp(slug: string): Promise<App | null> {
  try {
    const query = encodeURIComponent(
      `*[_type == "app" && slug.current == "${slug}"][0] {
        _id, name, "slug": slug.current, category,
        bonus, minWithdraw, version, size, downloadLink,
        rating, reviewCount, perRefer, developerName,
        metaTitle, metaDescription, appInformation, telegramLink,
        "logoUrl": logo.asset->url,
        "screenshots": screenshots[]{ "imageUrl": image.asset->url, altText }
      }`
    );
    const res = await fetch(
      `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${query}`,
      { next: { revalidate: 60 } }
    );
    const data = await res.json();
    return data.result || null;
  } catch (e) { return null; }
}

async function getRelatedApps(currentSlug: string): Promise<RelatedApp[]> {
  try {
    const query = encodeURIComponent(
      `*[_type == "app" && slug.current != "${currentSlug}"] | order(_createdAt desc) [0...12] {
        _id, name, "slug": slug.current, bonus, minWithdraw, rating,
        "logoUrl": logo.asset->url
      }`
    );
    const res = await fetch(
      `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${query}`,
      { next: { revalidate: 60 } }
    );
    const data = await res.json();
    return data.result || [];
  } catch (e) { return []; }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const app = await getApp(params.slug);
  if (!app) return { title: "App Not Found – YonoGames" };
  const title = app.metaTitle || `${app.name} APK Download – ₹${app.bonus} Bonus | YonoGames`;
  const description = app.metaDescription || `Download ${app.name} APK and get ₹${app.bonus} sign-up bonus. Minimum withdrawal ₹${app.minWithdraw}. Play and win real cash.`;
  return {
    title, description,
    openGraph: { title, description, images: app.logoUrl ? [app.logoUrl] : [], type: "website" },
    twitter: { card: "summary_large_image", title, description, images: app.logoUrl ? [app.logoUrl] : [] },
  };
}

export default async function AppPage({ params }: { params: { slug: string } }) {
  const app = await getApp(params.slug);
  if (!app) notFound();

  const relatedApps = await getRelatedApps(params.slug);

  const infoRows = [
    { label: "App Name", value: app.name },
    app.size ? { label: "APK Size", value: app.size + " MB" } : null,
    app.version ? { label: "Version", value: app.version } : null,
    app.developerName ? { label: "Package Name", value: app.developerName } : null,
    { label: "Minimum Withdrawal", value: "₹" + app.minWithdraw },
    { label: "Sign-Up Bonus", value: "₹" + app.bonus },
    app.perRefer ? { label: "Reward per Refer", value: "₹" + app.perRefer } : null,
    { label: "Price", value: "Free" },
  ].filter(Boolean) as { label: string; value: string }[];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    "name": app.name,
    "description": app.metaDescription || `Download ${app.name} and get ₹${app.bonus} bonus.`,
    "operatingSystem": "Android",
    "applicationCategory": "GameApplication",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": app.rating,
      "bestRating": 5,
      "worstRating": 1,
      "ratingCount": app.reviewCount || 1,
    },
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f5f7fa", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

      {/* Header */}
      <header style={{
        background: "linear-gradient(300deg, #00632b 0%, #00785f 48%, #012459 100%)",
        padding: "0 16px", position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{ maxWidth: 700, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
          <a href="/" style={{ textDecoration: "none" }}>
            <span style={{ fontSize: 22, fontWeight: 800, color: "#fff", fontFamily: "cursive" }}>🎮 YonoGames</span>
          </a>
          <a href="/" style={{ color: "#fff", fontSize: 13, textDecoration: "none", background: "#ffffff22", padding: "6px 14px", borderRadius: 8 }}>
            ← Back
          </a>
        </div>
      </header>

      <main style={{ maxWidth: 700, margin: "0 auto", padding: "20px 16px 60px" }}>

        {/* App Header Card */}
        <div style={{ background: "#fff", borderRadius: 16, padding: 20, marginBottom: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
          <div style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 20 }}>

            {/* Logo */}
            <div style={{ width: 90, height: 90, borderRadius: 20, overflow: "hidden", flexShrink: 0, border: "2px solid #f0f0f0" }}>
              {app.logoUrl
                ? <img src={app.logoUrl} alt={app.name + " Logo"} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                : <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg,#00632b,#012459)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40 }}>🎮</div>
              }
            </div>

            {/* Info */}
            <div style={{ flex: 1 }}>
              <h1 style={{ margin: "0 0 8px", fontSize: 22, fontWeight: 800, color: "#1a1a1a", lineHeight: 1.2 }}>{app.name}</h1>

              {/* Tags — Bonus + Size */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
                <span style={{ background: "#e8f5e9", color: "#2e7d32", padding: "5px 12px", borderRadius: 20, fontSize: 13, fontWeight: 600 }}>
                  🎁 ₹{app.bonus} Bonus
                </span>
                {app.size && (
                  <span style={{ background: "#fff3e0", color: "#e65100", padding: "5px 12px", borderRadius: 20, fontSize: 13, fontWeight: 600 }}>
                    📦 {app.size} MB
                  </span>
                )}
              </div>

              {/* Stars */}
              <div style={{ display: "flex", gap: 1, alignItems: "center" }}>
                {[1,2,3,4,5].map(s => (
                  <span key={s} style={{ color: s <= Math.round(app.rating) ? "#FFD700" : "#ddd", fontSize: 16 }}>★</span>
                ))}
                <span style={{ color: "#666", fontSize: 13, marginLeft: 6 }}>{app.rating?.toFixed(1)} ({app.reviewCount} votes)</span>
              </div>
            </div>
          </div>

          {/* Download Button */}
          <a href={app.downloadLink} target="_blank" rel="noopener noreferrer" style={{
            display: "block", textAlign: "center", textDecoration: "none",
            background: "linear-gradient(135deg, #00632b, #007860)",
            color: "#fff", fontWeight: 800, fontSize: 17,
            padding: "16px", borderRadius: 14, marginBottom: 14,
            boxShadow: "0 6px 20px rgba(0,99,43,0.35)",
          }}>
            ⬇ Download {app.name} APK
          </a>

          {/* Telegram */}
          {app.telegramLink && (
            <a href={app.telegramLink} target="_blank" rel="noopener noreferrer" style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              background: "#0088cc", color: "#fff", textDecoration: "none",
              padding: "12px", borderRadius: 12, fontWeight: 600, fontSize: 14,
            }}>
              ✈ Join our Telegram Channel
            </a>
          )}
        </div>

        {/* App Info Table */}
        <div style={{ background: "#fff", borderRadius: 16, padding: 20, marginBottom: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
          <h2 style={{ margin: "0 0 14px", fontSize: 16, fontWeight: 700, color: "#1a1a1a" }}>App Details</h2>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              {infoRows.map((row, i) => (
                <tr key={i} style={{ borderBottom: i < infoRows.length - 1 ? "1px solid #f5f5f5" : "none" }}>
                  <td style={{ padding: "10px 0", color: "#666", fontSize: 14, fontWeight: 600, width: "45%" }}>{row.label}</td>
                  <td style={{ padding: "10px 0", color: "#1a1a1a", fontSize: 14, fontWeight: 700 }}>{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Screenshots */}
        {app.screenshots?.length > 0 && (
          <div style={{ background: "#fff", borderRadius: 16, padding: 20, marginBottom: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
            <h2 style={{ margin: "0 0 14px", fontSize: 16, fontWeight: 700 }}>Screenshots</h2>
            <div style={{ display: "flex", gap: 10, overflowX: "auto", scrollbarWidth: "none" }}>
              {app.screenshots.map((ss, i) => (
                <img key={i} src={ss.imageUrl} alt={ss.altText || app.name} style={{
                  height: 180, borderRadius: 10, flexShrink: 0, objectFit: "cover",
                  border: "1px solid #f0f0f0",
                }} />
              ))}
            </div>
          </div>
        )}

        {/* App Information */}
        {app.appInformation && (
          <div style={{ background: "#fff", borderRadius: 16, padding: 20, marginBottom: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
            <h2 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 700 }}>App Information</h2>
            <div style={{ color: "#444", fontSize: 14, lineHeight: 1.7 }}
              dangerouslySetInnerHTML={{ __html: app.appInformation }} />
          </div>
        )}

        {/* FAQ */}
        <div style={{ background: "#fff", borderRadius: 16, padding: 20, marginBottom: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
          <h2 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700 }}>Frequently Asked Questions</h2>
          {[
            { q: `What is ${app.name} App?`, a: `${app.name} is a gaming app where you can play games and win real cash. Just download, register, and start playing. You also get bonuses and referral rewards.` },
            { q: `How to download ${app.name} APK?`, a: `To get the ${app.name} APK, just tap the download button on our page. The latest version will start downloading automatically.` },
            { q: `How to deposit in ${app.name}?`, a: `To add money in ${app.name}, you can use UPI, Paytm, PhonePe, or Google Pay. Just go to the deposit section and follow the steps.` },
            { q: `How to withdraw money?`, a: `Open the app, go to the 'Withdraw' section, and link your bank account. You can withdraw once you have ₹${app.minWithdraw} or more.` },
            { q: `Does ${app.name} have customer support?`, a: `Yes, ${app.name} provides customer support through live chat and email. You can contact them from the app for any help.` },
            { q: `Do we get bonus in ${app.name}?`, a: `Yes, new users get a ₹${app.bonus} welcome bonus on ${app.name}. You can use it to start playing right away.` },
          ].map((faq, i) => (
            <div key={i} style={{ borderBottom: i < 5 ? "1px solid #f5f5f5" : "none", paddingBottom: 14, marginBottom: 14 }}>
              <h3 style={{ margin: "0 0 6px", fontSize: 14, fontWeight: 700, color: "#1a1a1a" }}>{faq.q}</h3>
              <p style={{ margin: 0, fontSize: 14, color: "#555", lineHeight: 1.6 }}>{faq.a}</p>
            </div>
          ))}
        </div>

        {/* Other Related Apps */}
        {relatedApps.length > 0 && (
          <div style={{ background: "#fff", borderRadius: 16, padding: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
            <h2 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700 }}>Other Related Apps</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {relatedApps.map((ra) => (
                <a key={ra._id} href={"/" + ra.slug} style={{
                  display: "flex", alignItems: "center", gap: 12,
                  textDecoration: "none", color: "inherit",
                  background: "#f9f9f9", borderRadius: 14, padding: "12px 14px",
                  border: "1px solid #f0f0f0",
                }}>
                  {/* Logo */}
                  <div style={{ width: 52, height: 52, borderRadius: 12, overflow: "hidden", flexShrink: 0, background: "#eee" }}>
                    {ra.logoUrl
                      ? <img src={ra.logoUrl} alt={ra.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>🎮</div>
                    }
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "#1a1a1a", marginBottom: 3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{ra.name}</div>
                    <div style={{ fontSize: 12, color: "#2e7d32", fontWeight: 600, marginBottom: 2 }}>Sign Up Bonus ₹{ra.bonus}</div>
                    <div style={{ fontSize: 12, color: "#555" }}>Min. Withdraw ₹{ra.minWithdraw}/-</div>
                  </div>

                  {/* Download */}
                  <div style={{
                    background: "linear-gradient(135deg, #00632b, #007860)",
                    color: "#fff", padding: "7px 12px", borderRadius: 10,
                    fontSize: 12, fontWeight: 700, flexShrink: 0,
                  }}>
                    ⬇ Download
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer style={{ background: "#1a1a1a", color: "#aaa", padding: "24px 16px", textAlign: "center", fontSize: 13 }}>
        <p style={{ margin: "0 0 8px", color: "#fff", fontWeight: 700 }}>🎮 YonoGames</p>
        <p style={{ margin: "0 0 8px" }}>© 2025 YonoGames. All rights reserved.</p>
        <p style={{ margin: 0 }}>
          <a href="/about-us" style={{ color: "#aaa", textDecoration: "none", marginRight: 16 }}>About Us</a>
          <a href="/disclaimer" style={{ color: "#aaa", textDecoration: "none" }}>Disclaimer</a>
        </p>
      </footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </div>
  );
}
