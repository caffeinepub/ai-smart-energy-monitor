import { useState, useEffect } from "react";
import { Activity, Heart, Network, Thermometer, Zap, BarChart3, CheckSquare, Eye } from "lucide-react";
import { useInView } from "../hooks/useInView";

// Anomaly Detection Card
function AnomalyCard() {
  const anomalies = [
    { zone: "Zone-3", event: "Voltage spike detected", time: "14:23", severity: "High", pct: 90, color: "#ef4444" },
    { zone: "Circuit-7", event: "Abnormal draw pattern", time: "11:45", severity: "Medium", pct: 60, color: "#eab308" },
    { zone: "HVAC-2", event: "Unusual load behavior", time: "09:12", severity: "Low", pct: 35, color: "#00f5ff" },
  ];

  return (
    <div className="glass-card glow-hover" style={{ padding: "1.5rem", height: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Activity size={18} color="#ef4444" />
          </div>
          <span style={{ fontWeight: 700, fontSize: "1rem" }}>Anomaly Detection</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#00ff88", display: "inline-block", animation: "pulse-glow-green 2s infinite" }} />
          <span className="badge-green" style={{ fontSize: "0.7rem" }}>ACTIVE</span>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {anomalies.map((a) => (
          <div key={a.zone} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: "0.85rem 1rem", border: `1px solid ${a.color}20` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: "0.88rem" }}>{a.event}</div>
                <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.45)", marginTop: 2 }}>{a.zone} · {a.time}</div>
              </div>
              <span style={{ background: `${a.color}15`, color: a.color, border: `1px solid ${a.color}30`, borderRadius: 100, padding: "0.15rem 0.6rem", fontSize: "0.7rem", fontWeight: 700 }}>
                {a.severity}
              </span>
            </div>
            <div className="progress-bar-track">
              <div className="progress-bar-fill" style={{ width: `${a.pct}%`, background: `linear-gradient(90deg, ${a.color}80, ${a.color})` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Machine Health Score Card
function MachineHealthCard() {
  const devices = [
    { name: "HVAC System", score: 87, color: "#00ff88" },
    { name: "Solar Panels", score: 94, color: "#00ff88" },
    { name: "Battery Bank", score: 72, color: "#eab308" },
    { name: "Grid Inverter", score: 61, color: "#f97316" },
  ];

  return (
    <div className="glass-card glow-hover" style={{ padding: "1.5rem", height: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.25rem" }}>
        <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(168,85,247,0.15)", border: "1px solid rgba(168,85,247,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Heart size={18} color="#a855f7" />
        </div>
        <span style={{ fontWeight: 700, fontSize: "1rem" }}>Machine Health Score</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {devices.map((d) => (
          <div key={d.name}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.75)" }}>{d.name}</span>
              <span className="stat-number" style={{ fontWeight: 700, fontSize: "0.9rem", color: d.color }}>{d.score}%</span>
            </div>
            <div className="progress-bar-track" style={{ height: 10 }}>
              <div
                className="progress-bar-fill"
                style={{
                  width: `${d.score}%`,
                  background: `linear-gradient(90deg, ${d.color}60, ${d.color})`,
                  boxShadow: `0 0 8px ${d.color}60`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// IoT Architecture Card
function IoTArchCard() {
  const nodes = [
    { icon: "📡", label: "128 Sensors", sub: "ESP32 + LoRa" },
    { icon: "🔗", label: "4 Gateways", sub: "Edge Computing" },
    { icon: "☁️", label: "ICP Cloud", sub: "Distributed" },
    { icon: "📊", label: "Dashboard", sub: "React UI" },
  ];

  return (
    <div className="glass-card glow-hover" style={{ padding: "1.5rem", height: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.25rem" }}>
        <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(0,245,255,0.12)", border: "1px solid rgba(0,245,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Network size={18} color="#00f5ff" />
        </div>
        <span style={{ fontWeight: 700, fontSize: "1rem" }}>IoT Integration Architecture</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap", justifyContent: "center", marginBottom: "1.25rem" }}>
        {nodes.map((node, i) => (
          <div key={node.label} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{
              background: "rgba(0,245,255,0.07)",
              border: "1px solid rgba(0,245,255,0.2)",
              borderRadius: 10,
              padding: "0.6rem 0.9rem",
              textAlign: "center",
              minWidth: 80,
            }}>
              <div style={{ fontSize: "1.4rem", marginBottom: 2 }}>{node.icon}</div>
              <div style={{ fontSize: "0.72rem", fontWeight: 600, color: "#00f5ff" }}>{node.label}</div>
              <div style={{ fontSize: "0.62rem", color: "rgba(255,255,255,0.4)" }}>{node.sub}</div>
            </div>
            {i < nodes.length - 1 && (
              <div style={{ position: "relative", width: 24, display: "flex", alignItems: "center" }}>
                <div style={{ height: 2, width: "100%", background: "rgba(0,245,255,0.3)", borderRadius: 2 }} />
                <div style={{ position: "absolute", width: 6, height: 6, borderRadius: "50%", background: "#00f5ff", right: 0, boxShadow: "0 0 6px #00f5ff", animation: "pulse-glow-cyan 1.5s infinite" }} />
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "space-around", gap: 8 }}>
        {[["128", "Active Sensors"], ["4", "Gateways"], ["99.7%", "Uptime"]].map(([val, lbl]) => (
          <div key={lbl} style={{ textAlign: "center" }}>
            <div className="stat-number" style={{ fontSize: "1.2rem", fontWeight: 700, color: "#00f5ff" }}>{val}</div>
            <div style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.4)" }}>{lbl}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Heatmap Visualization Card
function HeatmapCard() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const hours = ["12am", "6am", "12pm", "6pm"];

  const heatValues: number[][] = days.map((_, di) =>
    Array.from({ length: 24 }, (_, hi) => {
      const base = Math.sin((hi / 24) * Math.PI * 2) * 50 + 50;
      const dayFactor = di < 5 ? 1.2 : 0.7;
      return Math.min(100, Math.max(5, base * dayFactor + Math.random() * 20 - 10));
    })
  );

  const getColor = (v: number) => {
    if (v < 25) return "rgba(0,100,150,0.6)";
    if (v < 50) return "rgba(0,200,255,0.5)";
    if (v < 70) return "rgba(0,245,255,0.7)";
    if (v < 85) return "rgba(255,200,0,0.75)";
    return "rgba(239,68,68,0.85)";
  };

  return (
    <div className="glass-card glow-hover" style={{ padding: "1.5rem", height: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.25rem" }}>
        <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(0,255,136,0.12)", border: "1px solid rgba(0,255,136,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Thermometer size={18} color="#00ff88" />
        </div>
        <span style={{ fontWeight: 700, fontSize: "1rem" }}>Energy Consumption Heatmap</span>
      </div>

      <div style={{ display: "flex", gap: 4 }}>
        {/* Y axis labels */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-around", paddingRight: 4, paddingBottom: 12 }}>
          {days.map((d) => (
            <div key={d} style={{ fontSize: "0.62rem", color: "rgba(255,255,255,0.4)", height: 10, display: "flex", alignItems: "center" }}>
              {d}
            </div>
          ))}
        </div>

        <div style={{ flex: 1 }}>
          {/* X axis labels */}
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            {hours.map((h) => (
              <div key={h} style={{ fontSize: "0.58rem", color: "rgba(255,255,255,0.35)" }}>{h}</div>
            ))}
          </div>
          {/* Grid */}
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {heatValues.map((row, di) => (
              <div key={days[di]} style={{ display: "flex", gap: 2 }}>
                {row.map((val, hi) => (
                  <div
                    key={`cell-${days[di]}-h${hi}`}
                    className="heatmap-cell"
                    style={{
                      flex: 1,
                      height: 10,
                      background: getColor(val),
                      borderRadius: 2,
                    }}
                    title={`${days[di]} ${hi}:00 — ${Math.round(val)}% load`}
                  />
                ))}
              </div>
            ))}
          </div>
          {/* Legend */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10, justifyContent: "flex-end" }}>
            <span style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.3)" }}>Low</span>
            {["rgba(0,100,150,0.7)", "rgba(0,245,255,0.7)", "rgba(255,200,0,0.8)", "rgba(239,68,68,0.9)"].map((c) => (
              <div key={c} style={{ width: 16, height: 8, borderRadius: 2, background: c }} />
            ))}
            <span style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.3)" }}>High</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Auto Energy Mode Card
function AutoEnergyCard() {
  const [isOn, setIsOn] = useState(true);
  const [checks, setChecks] = useState({ peakOffload: true, smartSchedule: true, demandResponse: false });

  return (
    <div className="glass-card glow-hover" style={{ padding: "1.5rem", height: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.25rem" }}>
        <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(0,255,136,0.12)", border: "1px solid rgba(0,255,136,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Zap size={18} color="#00ff88" />
        </div>
        <span style={{ fontWeight: 700, fontSize: "1rem" }}>Auto Energy Mode</span>
      </div>

      {/* Big toggle */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem", padding: "1rem 1.25rem", background: isOn ? "rgba(0,255,136,0.06)" : "rgba(255,255,255,0.03)", borderRadius: 12, border: `1px solid ${isOn ? "rgba(0,255,136,0.2)" : "rgba(255,255,255,0.08)"}` }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: "1.05rem", color: isOn ? "#00ff88" : "rgba(255,255,255,0.6)" }}>
            {isOn ? "⚡ ACTIVE" : "○ INACTIVE"}
          </div>
          <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", marginTop: 2 }}>Auto Energy Optimization</div>
        </div>
        <button
          type="button"
          onClick={() => setIsOn(!isOn)}
          style={{
            width: 56,
            height: 28,
            borderRadius: 14,
            background: isOn ? "rgba(0,255,136,0.3)" : "rgba(255,255,255,0.12)",
            border: `1px solid ${isOn ? "#00ff88" : "rgba(255,255,255,0.2)"}`,
            cursor: "pointer",
            position: "relative",
            boxShadow: isOn ? "0 0 12px rgba(0,255,136,0.4)" : "none",
            transition: "all 0.3s ease",
          }}
        >
          <div style={{
            width: 22,
            height: 22,
            borderRadius: "50%",
            background: isOn ? "#00ff88" : "rgba(255,255,255,0.5)",
            position: "absolute",
            top: 2,
            left: isOn ? 30 : 2,
            transition: "all 0.3s ease",
            boxShadow: isOn ? "0 0 8px rgba(0,255,136,0.6)" : "none",
          }} />
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: "1.25rem" }}>
        {[
          { key: "peakOffload", label: "Peak Hour Offloading", savings: "₹1,200/mo" },
          { key: "smartSchedule", label: "Smart Scheduling", savings: "₹850/mo" },
          { key: "demandResponse", label: "Demand Response", savings: "₹630/mo" },
        ].map((item) => (
          <button
            type="button"
            key={item.key}
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.6rem 0.85rem", background: "rgba(255,255,255,0.03)", borderRadius: 8, cursor: "pointer", border: "1px solid transparent", width: "100%" }}
            onClick={() => setChecks((p) => ({ ...p, [item.key]: !p[item.key as keyof typeof p] }))}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 18,
                height: 18,
                borderRadius: 4,
                border: `2px solid ${checks[item.key as keyof typeof checks] ? "#00f5ff" : "rgba(255,255,255,0.2)"}`,
                background: checks[item.key as keyof typeof checks] ? "rgba(0,245,255,0.15)" : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                {checks[item.key as keyof typeof checks] && <div style={{ width: 8, height: 8, borderRadius: 2, background: "#00f5ff" }} />}
              </div>
              <span style={{ fontSize: "0.82rem" }}>{item.label}</span>
            </div>
            <span style={{ fontSize: "0.72rem", color: "#00ff88", fontWeight: 600 }}>{item.savings}</span>
          </button>
        ))}
      </div>

      <div style={{ background: "rgba(0,255,136,0.06)", border: "1px solid rgba(0,255,136,0.15)", borderRadius: 10, padding: "0.75rem 1rem", textAlign: "center" }}>
        <span style={{ fontSize: "0.82rem", color: "#00ff88", fontWeight: 600 }}>✓ Saved ₹3,420 this week automatically</span>
      </div>
    </div>
  );
}

// Visibility Gap Score Card
function VisibilityGapCard() {
  const score = 73;
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const filled = circumference * (score / 100);
  const gap = circumference - filled;

  const areas = [
    { name: "Monitoring Coverage", pct: 85, color: "#00f5ff" },
    { name: "Data Granularity", pct: 68, color: "#a855f7" },
    { name: "Alert Response", pct: 71, color: "#eab308" },
    { name: "Prediction Accuracy", pct: 67, color: "#f97316" },
  ];

  return (
    <div className="glass-card glow-hover" style={{ padding: "1.5rem", height: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.25rem" }}>
        <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(0,245,255,0.12)", border: "1px solid rgba(0,245,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Eye size={18} color="#00f5ff" />
        </div>
        <span style={{ fontWeight: 700, fontSize: "1rem" }}>Visibility Gap Score</span>
      </div>

      <div style={{ display: "flex", gap: "1.5rem", alignItems: "center", flexWrap: "wrap" }}>
        {/* Circular meter */}
        <div style={{ position: "relative", width: 130, height: 130, flexShrink: 0 }}>
          <svg width="130" height="130" viewBox="0 0 130 130" aria-label="Visibility gap score gauge">
            <circle cx="65" cy="65" r={radius} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="12" />
            <circle
              cx="65" cy="65" r={radius}
              fill="none"
              stroke="url(#visGrad)"
              strokeWidth="12"
              strokeDasharray={`${filled} ${gap}`}
              strokeLinecap="round"
              transform="rotate(-90 65 65)"
            />
            <defs>
              <linearGradient id="visGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00f5ff" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <span className="stat-number" style={{ fontSize: "1.8rem", fontWeight: 800, color: "#00f5ff" }}>{score}</span>
            <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.4)" }}>/ 100</span>
          </div>
        </div>

        {/* Bar chart */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10, minWidth: 120 }}>
          {areas.map((a) => (
            <div key={a.name}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.6)" }}>{a.name}</span>
                <span style={{ fontSize: "0.72rem", fontWeight: 700, color: a.color }}>{a.pct}%</span>
              </div>
              <div className="progress-bar-track" style={{ height: 6 }}>
                <div className="progress-bar-fill" style={{ width: `${a.pct}%`, background: `linear-gradient(90deg, ${a.color}60, ${a.color})` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <button type="button" className="neon-btn" style={{ marginTop: "1.25rem", width: "100%", padding: "0.6rem", fontSize: "0.82rem" }}>
        <BarChart3 size={14} style={{ marginRight: 6 }} />
        Improve Your Visibility Score
      </button>
    </div>
  );
}

export default function AdvancedFeaturesSection() {
  const { ref, isInView } = useInView();

  return (
    <section id="advanced">
      <div className="section-container" ref={ref}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <h2 className="section-heading gradient-text">Advanced Intelligence Features</h2>
          <p className="section-subheading">Cutting-edge AI capabilities for comprehensive energy management</p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "1.5rem",
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s ease",
          }}
        >
          <AnomalyCard />
          <MachineHealthCard />
          <IoTArchCard />
          <HeatmapCard />
          <AutoEnergyCard />
          <VisibilityGapCard />
        </div>
      </div>
    </section>
  );
}
