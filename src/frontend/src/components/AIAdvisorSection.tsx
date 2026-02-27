import { useState, useEffect } from "react";
import { Send, Zap, CheckCircle } from "lucide-react";
import { useInView } from "../hooks/useInView";

const CHAT_MESSAGES = [
  { id: 1, text: "Hello! I'm your AI Energy Advisor. I've analyzed your energy patterns today.", delay: 0 },
  { id: 2, text: "💡 Turn off AC between 2–4 PM to save ₹120/month during off-peak hours.", delay: 300, savings: "₹120/mo" },
  { id: 3, text: "🔆 Switch to LED lights across all zones to reduce 30% consumption.", delay: 600 },
  { id: 4, text: "⚡ Peak usage detected at 8 PM — consider shifting heavy loads to 10 PM–6 AM.", delay: 900, savings: "₹340/mo" },
  { id: 5, text: "☀️ Your solar generation is 23% below optimal today. Check panel orientation.", delay: 1200 },
];

const RECOMMENDATIONS = [
  { priority: 1, text: "Implement demand-response during peak hours (6–10 PM)", savings: 2840, impact: 92 },
  { priority: 2, text: "Upgrade HVAC compressor to inverter-grade technology", savings: 1950, impact: 78 },
  { priority: 3, text: "Install smart power strips for always-on device management", savings: 1120, impact: 65 },
  { priority: 4, text: "Optimize solar panel tilt angle for seasonal maximum yield", savings: 880, impact: 58 },
  { priority: 5, text: "Schedule industrial equipment during off-peak tariff windows", savings: 640, impact: 45 },
];

const PRIORITY_COLORS = ["#ef4444", "#f97316", "#eab308", "#00f5ff", "#a855f7"];

export default function AIAdvisorSection() {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [input, setInput] = useState("");
  const { ref, isInView } = useInView(0.2);

  useEffect(() => {
    if (!isInView) return;
    CHAT_MESSAGES.forEach((msg) => {
      setTimeout(() => {
        setVisibleMessages((prev) => [...prev, msg.id]);
      }, msg.delay + 400);
    });
  }, [isInView]);

  return (
    <section id="advisor" style={{ background: "rgba(168,85,247,0.02)" }}>
      <div className="section-container" ref={ref}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <h2 className="section-heading gradient-text">AI Energy Advisor</h2>
          <p className="section-subheading">Your intelligent energy optimization assistant, powered by real-time analytics</p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2rem",
            opacity: isInView ? 1 : 0,
            transition: "opacity 0.8s ease",
          }}
          className="grid-cols-1 md:grid-cols-2"
        >
          {/* Chat Interface */}
          <div>
            <div style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: 8 }}>
              <Zap size={18} color="#00f5ff" />
              Live AI Chat
            </div>
            <div
              className="glass-card"
              style={{
                padding: "1.25rem",
                height: 420,
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Messages */}
              <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12, paddingRight: 4 }}>
                {CHAT_MESSAGES.map((msg) =>
                  visibleMessages.includes(msg.id) ? (
                    <div key={msg.id} style={{ display: "flex", gap: 10, animation: "fadeInUp 0.5s ease forwards" }}>
                      {/* Avatar */}
                      <div
                        style={{
                          width: 34,
                          height: 34,
                          borderRadius: "50%",
                          background: "rgba(0,245,255,0.12)",
                          border: "1px solid rgba(0,245,255,0.3)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          boxShadow: "0 0 8px rgba(0,245,255,0.2)",
                          fontSize: "0.8rem",
                          fontWeight: 700,
                          color: "#00f5ff",
                        }}
                      >
                        AI
                      </div>
                      <div>
                        <div className="chat-bubble">
                          <p style={{ fontSize: "0.88rem", lineHeight: 1.6, color: "rgba(255,255,255,0.85)", margin: 0 }}>{msg.text}</p>
                        </div>
                        {msg.savings && (
                          <div style={{ display: "inline-flex", alignItems: "center", gap: 4, marginTop: 4 }}>
                            <CheckCircle size={12} color="#00ff88" />
                            <span style={{ fontSize: "0.72rem", color: "#00ff88", fontWeight: 600 }}>Save {msg.savings}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : null
                )}
              </div>

              {/* Input */}
              <div style={{ display: "flex", gap: 8, marginTop: 12, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                <input
                  type="text"
                  className="glass-input"
                  placeholder="Ask me anything about your energy..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  style={{ flex: 1, fontSize: "0.85rem" }}
                />
                <button
                  type="button"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 8,
                    background: "rgba(0,245,255,0.1)",
                    border: "1px solid rgba(0,245,255,0.3)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    color: "#00f5ff",
                  }}
                  onClick={() => setInput("")}
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Recommendations Panel */}
          <div>
            <div style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: 8 }}>
              <Zap size={18} color="#a855f7" />
              AI Recommendation Engine
            </div>
            <div className="glass-card" style={{ padding: "1.25rem" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {RECOMMENDATIONS.map((rec) => (
                  <article
                    key={rec.priority}
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      borderRadius: 12,
                      padding: "1rem",
                      transition: "all 0.3s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,245,255,0.2)";
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
                      (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.03)";
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
                      <div
                        className="rank-badge"
                        style={{ background: `${PRIORITY_COLORS[rec.priority - 1]}20`, color: PRIORITY_COLORS[rec.priority - 1], border: `1px solid ${PRIORITY_COLORS[rec.priority - 1]}40`, flexShrink: 0 }}
                      >
                        #{rec.priority}
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: "0.83rem", lineHeight: 1.5, color: "rgba(255,255,255,0.8)", margin: 0 }}>{rec.text}</p>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                      <span style={{ fontSize: "0.75rem", color: "#00ff88", fontWeight: 700 }}>₹{rec.savings.toLocaleString("en-IN")}/month</span>
                      <button type="button" className="neon-btn-green" style={{ padding: "0.3rem 0.85rem", fontSize: "0.75rem", borderRadius: 6 }}>
                        Apply
                      </button>
                    </div>
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                        <span style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.35)" }}>Impact Score</span>
                        <span style={{ fontSize: "0.68rem", color: "#00f5ff" }}>{rec.impact}%</span>
                      </div>
                      <div className="progress-bar-track" style={{ height: 5 }}>
                        <div className="progress-bar-fill" style={{ width: `${rec.impact}%`, background: "linear-gradient(90deg, #00f5ff, #a855f7)" }} />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
