import { useInView } from "../hooks/useInView";

const TECH_CARDS = [
  {
    icon: "🧠",
    title: "AI & Machine Learning",
    subtitle: "Predictive Intelligence",
    color: "#a855f7",
    tags: ["TensorFlow", "PyTorch", "Scikit-learn", "LSTM"],
    description: "Real-time predictive analytics with neural networks trained on historical energy patterns.",
    stats: [
      { label: "Prediction Accuracy", value: "94.7%" },
      { label: "Models Deployed", value: "12" },
    ],
  },
  {
    icon: "📡",
    title: "IoT Sensors",
    subtitle: "Edge Intelligence",
    color: "#00f5ff",
    tags: ["ESP32", "LoRa", "MQTT", "Zigbee"],
    description: "128 distributed sensors collecting energy data every 30 seconds across all zones.",
    stats: [
      { label: "Active Sensors", value: "128" },
      { label: "Data Points/hr", value: "15,360" },
    ],
  },
  {
    icon: "☁️",
    title: "Cloud Database",
    subtitle: "Distributed Architecture",
    color: "#00ff88",
    tags: ["ICP", "WASM", "Motoko", "Zero-Trust"],
    description: "Distributed ledger on Internet Computer Protocol with 99.9% uptime and zero downtime deployments.",
    stats: [
      { label: "Uptime", value: "99.97%" },
      { label: "Data Retention", value: "7 years" },
    ],
  },
  {
    icon: "📊",
    title: "Web Dashboard",
    subtitle: "Real-Time Interface",
    color: "#eab308",
    tags: ["React 19", "TypeScript", "Recharts", "WebSockets"],
    description: "Interactive monitoring interface with real-time updates, animations, and mobile responsiveness.",
    stats: [
      { label: "Update Latency", value: "<100ms" },
      { label: "Components", value: "120+" },
    ],
  },
];

export default function TechStackSection() {
  const { ref, isInView } = useInView();

  return (
    <section id="tech">
      <div className="section-container" ref={ref}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <h2 className="section-heading gradient-text">Technology Stack</h2>
          <p className="section-subheading">Built with cutting-edge technologies for maximum reliability and performance</p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {TECH_CARDS.map((card, idx) => (
            <div
              key={card.title}
              className="glass-card glow-hover"
              style={{
                padding: "1.75rem",
                opacity: isInView ? 1 : 0,
                transform: isInView ? "translateY(0)" : "translateY(40px)",
                transition: `all 0.7s ease ${idx * 0.12}s`,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Background glow */}
              <div
                style={{
                  position: "absolute",
                  top: -40,
                  right: -40,
                  width: 160,
                  height: 160,
                  borderRadius: "50%",
                  background: `radial-gradient(circle, ${card.color}10, transparent)`,
                  pointerEvents: "none",
                }}
              />

              {/* Icon */}
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 16,
                  background: `${card.color}12`,
                  border: `1px solid ${card.color}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "2rem",
                  marginBottom: "1.25rem",
                  boxShadow: `0 0 20px ${card.color}15`,
                  transition: "all 0.3s",
                }}
              >
                {card.icon}
              </div>

              {/* Title */}
              <div style={{ fontWeight: 800, fontSize: "1.1rem", marginBottom: 4, color: card.color }}>
                {card.title}
              </div>
              <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", marginBottom: "1rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                {card.subtitle}
              </div>

              {/* Description */}
              <p style={{ fontSize: "0.83rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.65, marginBottom: "1.25rem" }}>
                {card.description}
              </p>

              {/* Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: "1.25rem" }}>
                {card.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      background: `${card.color}10`,
                      border: `1px solid ${card.color}25`,
                      color: card.color,
                      borderRadius: 100,
                      padding: "0.2rem 0.65rem",
                      fontSize: "0.7rem",
                      fontWeight: 600,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div style={{ display: "flex", gap: 12 }}>
                {card.stats.map((stat) => (
                  <div key={stat.label} style={{ flex: 1, background: "rgba(255,255,255,0.03)", borderRadius: 8, padding: "0.6rem", textAlign: "center" }}>
                    <div className="stat-number" style={{ fontSize: "1rem", fontWeight: 800, color: card.color }}>{stat.value}</div>
                    <div style={{ fontSize: "0.62rem", color: "rgba(255,255,255,0.35)", marginTop: 3, lineHeight: 1.3 }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
