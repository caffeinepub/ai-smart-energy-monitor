import { Zap, Heart } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "Dashboard", id: "dashboard" },
  { label: "AI Advisor", id: "advisor" },
  { label: "Analytics", id: "analytics" },
  { label: "Sustainability", id: "sustainability" },
  { label: "Tech Stack", id: "tech" },
  { label: "Alerts", id: "alerts" },
  { label: "Contact", id: "contact" },
];

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(20px)",
      }}
    >
      {/* Top divider glow */}
      <div className="divider-gradient" />

      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "3rem 1.5rem 2rem",
        }}
      >
        {/* Main footer content */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "2.5rem",
            marginBottom: "2.5rem",
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1rem" }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: "rgba(0,245,255,0.1)",
                  border: "1px solid rgba(0,245,255,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 16px rgba(0,245,255,0.25)",
                }}
              >
                <Zap size={20} color="#00f5ff" />
              </div>
              <span
                style={{
                  fontWeight: 800,
                  fontSize: "1.05rem",
                  background: "linear-gradient(135deg, #00f5ff, #a855f7)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                AI Energy Monitor
              </span>
            </div>
            <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.7, maxWidth: 260 }}>
              Next-generation AI-powered energy monitoring and optimization platform for a sustainable future.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <div style={{ fontWeight: 700, fontSize: "0.85rem", marginBottom: "1rem", color: "rgba(255,255,255,0.7)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Navigation
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {NAV_LINKS.slice(0, 4).map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => scrollTo(link.id)}
                  style={{
                    background: "none",
                    border: "none",
                    textAlign: "left",
                    color: "rgba(255,255,255,0.45)",
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    padding: 0,
                    transition: "color 0.2s",
                    fontFamily: "Poppins, sans-serif",
                  }}
                  onMouseEnter={(e) => { (e.target as HTMLButtonElement).style.color = "#00f5ff"; }}
                  onMouseLeave={(e) => { (e.target as HTMLButtonElement).style.color = "rgba(255,255,255,0.45)"; }}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontWeight: 700, fontSize: "0.85rem", marginBottom: "1rem", color: "rgba(255,255,255,0.7)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              More
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {NAV_LINKS.slice(4).map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => scrollTo(link.id)}
                  style={{
                    background: "none",
                    border: "none",
                    textAlign: "left",
                    color: "rgba(255,255,255,0.45)",
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    padding: 0,
                    transition: "color 0.2s",
                    fontFamily: "Poppins, sans-serif",
                  }}
                  onMouseEnter={(e) => { (e.target as HTMLButtonElement).style.color = "#a855f7"; }}
                  onMouseLeave={(e) => { (e.target as HTMLButtonElement).style.color = "rgba(255,255,255,0.45)"; }}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Stats summary */}
          <div>
            <div style={{ fontWeight: 700, fontSize: "0.85rem", marginBottom: "1rem", color: "rgba(255,255,255,0.7)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Impact Stats
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { label: "Energy Saved", value: "2.4M kWh" },
                { label: "CO₂ Reduced", value: "1,840 kg" },
                { label: "Cost Saved", value: "₹18.5L" },
                { label: "Devices Online", value: "247" },
              ].map((item) => (
                <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.4)" }}>{item.label}</span>
                  <span className="stat-number" style={{ fontSize: "0.82rem", fontWeight: 700, color: "#00f5ff" }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="divider-gradient" style={{ marginBottom: "1.5rem" }} />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.35)" }}>
            © 2026 AI Smart Energy System. All rights reserved.
          </div>

          <div
            style={{
              fontSize: "0.78rem",
              color: "rgba(255,255,255,0.35)",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            Developed by{" "}
            <span style={{ color: "#a855f7", fontWeight: 600, margin: "0 4px" }}>Mounika Reddy</span>
            · Built with{" "}
            <Heart size={12} color="#ef4444" fill="#ef4444" style={{ margin: "0 2px" }} />
            {" "}using{" "}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#00f5ff", textDecoration: "none", marginLeft: 4 }}
            >
              caffeine.ai
            </a>
          </div>

          <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.25)" }}>
            Powered by Internet Computer Protocol
          </div>
        </div>
      </div>
    </footer>
  );
}
