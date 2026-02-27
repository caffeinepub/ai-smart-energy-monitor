import { useEffect, useRef, useState } from "react";
import { ArrowDown, ChevronRight, Zap } from "lucide-react";

const STATS = [
  { value: "2.4M kWh", label: "Energy Saved" },
  { value: "₹18.5L", label: "Cost Savings" },
  { value: "1,840 T", label: "CO₂ Reduced" },
  { value: "247 Devices", label: "Monitored" },
];

function useCountUp(start: number, step: number, interval: number) {
  const [count, setCount] = useState(start);
  useEffect(() => {
    const id = setInterval(() => {
      setCount((prev) => prev + Math.floor(Math.random() * step) + 1);
    }, interval);
    return () => clearInterval(id);
  }, [step, interval]);
  return count;
}

function formatINR(n: number) {
  const s = n.toString();
  const lastThree = s.slice(-3);
  const rest = s.slice(0, -3);
  if (!rest) return lastThree;
  const formatted = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
  return `${formatted},${lastThree}`;
}

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export default function HeroSection() {
  const savings = useCountUp(1854230, 4, 1200);
  const heroRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 80,
        paddingLeft: "1.5rem",
        paddingRight: "1.5rem",
        paddingBottom: "4rem",
        position: "relative",
        textAlign: "center",
      }}
    >
      {/* Glow orbs */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "10%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          right: "8%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,245,255,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Badge */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: "rgba(0,245,255,0.08)",
          border: "1px solid rgba(0,245,255,0.25)",
          borderRadius: 100,
          padding: "0.35rem 1.1rem",
          marginBottom: "1.5rem",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s ease",
        }}
      >
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#00ff88", display: "inline-block", boxShadow: "0 0 8px #00ff88" }} />
        <span style={{ color: "#00f5ff", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.05em" }}>
          LIVE MONITORING ACTIVE
        </span>
      </div>

      {/* Main title */}
      <h1
        style={{
          fontSize: "clamp(2rem, 5vw, 4.5rem)",
          fontWeight: 900,
          lineHeight: 1.08,
          maxWidth: 900,
          marginBottom: "1.25rem",
          letterSpacing: "-0.02em",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.7s ease 0.1s",
        }}
      >
        <span
          style={{
            background: "linear-gradient(135deg, #00f5ff 0%, #a855f7 55%, #00f5ff 100%)",
            backgroundSize: "200% 200%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          AI Smart Energy
        </span>
        <br />
        <span style={{ color: "rgba(255,255,255,0.95)" }}>Monitoring System</span>
      </h1>

      {/* Subtitle */}
      <p
        style={{
          fontSize: "clamp(1rem, 2vw, 1.35rem)",
          color: "rgba(255,255,255,0.55)",
          maxWidth: 580,
          marginBottom: "2.5rem",
          lineHeight: 1.65,
          fontWeight: 400,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.7s ease 0.2s",
        }}
      >
        Optimizing Energy.{" "}
        <span style={{ color: "rgba(168,85,247,0.85)", fontWeight: 500 }}>
          Empowering the Future.
        </span>
      </p>

      {/* CTA Buttons */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          justifyContent: "center",
          marginBottom: "3rem",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.7s ease 0.3s",
        }}
      >
        <button type="button" className="neon-btn" onClick={() => scrollTo("dashboard")}
          style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Zap size={16} />
          View Dashboard
        </button>
        <button type="button" className="neon-btn-purple" onClick={() => scrollTo("advanced")}
          style={{ display: "flex", alignItems: "center", gap: 8 }}>
          Explore Features
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Stats row */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "2px",
          marginBottom: "3rem",
          opacity: visible ? 1 : 0,
          transition: "all 0.7s ease 0.4s",
        }}
      >
        {STATS.map((stat, idx) => (
          <div
            key={stat.label}
            style={{
              padding: "0.75rem 1.5rem",
              textAlign: "center",
              borderRight: idx < STATS.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
            }}
          >
            <div
              className="stat-number"
              style={{ fontSize: "1.4rem", fontWeight: 700, color: "#00f5ff" }}
            >
              {stat.value}
            </div>
            <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.45)", marginTop: 2 }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Live savings counter */}
      <div
        style={{
          background: "rgba(0,255,136,0.05)",
          border: "1px solid rgba(0,255,136,0.2)",
          borderRadius: 12,
          padding: "1rem 2rem",
          display: "inline-block",
          opacity: visible ? 1 : 0,
          transition: "all 0.7s ease 0.5s",
          boxShadow: "0 0 20px rgba(0,255,136,0.1)",
        }}
      >
        <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", marginBottom: 4, letterSpacing: "0.08em" }}>
          ⚡ LIVE ENERGY SAVINGS
        </div>
        <div
          className="stat-number"
          style={{
            fontSize: "2rem",
            fontWeight: 700,
            color: "#00ff88",
            textShadow: "0 0 20px rgba(0,255,136,0.6)",
          }}
        >
          ₹{formatINR(savings)}
        </div>
        <div style={{ fontSize: "0.7rem", color: "rgba(0,255,136,0.5)", marginTop: 2 }}>
          and counting...
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        type="button"
        onClick={() => scrollTo("dashboard")}
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "rgba(255,255,255,0.3)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          animation: "float 2.5s ease-in-out infinite",
        }}
      >
        <span style={{ fontSize: "0.65rem", letterSpacing: "0.12em" }}>SCROLL</span>
        <ArrowDown size={16} />
      </button>
    </section>
  );
}
