import { useState } from "react";
import { Zap, Search, AlertTriangle, CheckCircle, Bell } from "lucide-react";
import { useInView } from "../hooks/useInView";

interface Alert {
  id: number;
  icon: string;
  iconColor: string;
  title: string;
  description: string;
  time: string;
  severity: "HIGH" | "MEDIUM" | "LOW";
  glowColor: string;
  borderColor: string;
  btnText: string;
  acknowledged: boolean;
}

const INITIAL_ALERTS: Alert[] = [
  {
    id: 1,
    icon: "⚡",
    iconColor: "#ef4444",
    title: "High Usage Alert",
    description: "Energy consumption 23% above normal in Zone-B. Immediate review recommended.",
    time: "Today, 8:42 PM",
    severity: "HIGH",
    glowColor: "rgba(239,68,68,0.15)",
    borderColor: "rgba(239,68,68,0.3)",
    btnText: "Acknowledge",
    acknowledged: false,
  },
  {
    id: 2,
    icon: "🔍",
    iconColor: "#eab308",
    title: "Unusual Activity Detected",
    description: "Abnormal current draw pattern detected in Circuit-7. Could indicate equipment fault.",
    time: "Today, 3:15 PM",
    severity: "MEDIUM",
    glowColor: "rgba(234,179,8,0.12)",
    borderColor: "rgba(234,179,8,0.3)",
    btnText: "Investigate",
    acknowledged: false,
  },
  {
    id: 3,
    icon: "⚠️",
    iconColor: "#f97316",
    title: "Device Malfunction Warning",
    description: "Inverter-2 operating at 67% of rated capacity. Performance degradation detected.",
    time: "Yesterday, 11:30 PM",
    severity: "MEDIUM",
    glowColor: "rgba(249,115,22,0.12)",
    borderColor: "rgba(249,115,22,0.28)",
    btnText: "View Details",
    acknowledged: false,
  },
];

const SEVERITY_BADGE_MAP: Record<string, string> = {
  HIGH: "badge-red",
  MEDIUM: "badge-yellow",
  LOW: "badge-green",
};

const PULSE_CLASS_MAP: Record<string, string> = {
  HIGH: "pulse-red",
  MEDIUM: "pulse-yellow",
  LOW: "pulse-green",
};

export default function SmartAlertsSection() {
  const [alerts, setAlerts] = useState<Alert[]>(INITIAL_ALERTS);
  const { ref, isInView } = useInView();

  const handleAcknowledge = (id: number) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, acknowledged: true } : a))
    );
  };

  const acknowledged = alerts.filter((a) => a.acknowledged).length;
  const pending = alerts.filter((a) => !a.acknowledged).length;

  return (
    <section id="alerts" style={{ background: "rgba(0,0,0,0.2)" }}>
      <div className="section-container" ref={ref}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <h2 className="section-heading gradient-text">Smart Alerts</h2>
          <p className="section-subheading">Real-time anomaly detection and intelligent alert management</p>
        </div>

        {/* Alert counter banner */}
        <div
          className="glass-card"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1rem 1.5rem",
            marginBottom: "1.5rem",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Bell size={20} color="#00f5ff" />
            <span style={{ fontWeight: 600 }}>Alert Management Center</span>
          </div>
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <CheckCircle size={16} color="#00ff88" />
              <span style={{ fontSize: "0.88rem", color: "#00ff88", fontWeight: 600 }}>247 resolved this month</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <AlertTriangle size={16} color="#eab308" />
              <span style={{ fontSize: "0.88rem", color: "#eab308", fontWeight: 600 }}>{pending + 3} pending review</span>
            </div>
          </div>
        </div>

        {/* Alert cards */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
            opacity: isInView ? 1 : 0,
            transition: "opacity 0.8s ease",
          }}
          ref={ref}
        >
          {alerts.map((alert, idx) => (
            <div
              key={alert.id}
              className={!alert.acknowledged ? PULSE_CLASS_MAP[alert.severity] : ""}
              style={{
                background: alert.acknowledged
                  ? "rgba(255,255,255,0.03)"
                  : alert.glowColor,
                border: `1px solid ${alert.acknowledged ? "rgba(255,255,255,0.07)" : alert.borderColor}`,
                borderRadius: 16,
                padding: "1.5rem",
                display: "flex",
                alignItems: "flex-start",
                gap: "1.25rem",
                opacity: isInView ? (alert.acknowledged ? 0.55 : 1) : 0,
                transform: isInView ? "translateX(0)" : idx % 2 === 0 ? "translateX(-30px)" : "translateX(30px)",
                transition: `all 0.7s ease ${idx * 0.15}s`,
                flexWrap: "wrap",
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 12,
                  background: `${alert.iconColor}15`,
                  border: `1px solid ${alert.iconColor}35`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                  flexShrink: 0,
                }}
              >
                {alert.icon}
              </div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
                  <span style={{ fontWeight: 700, fontSize: "1rem" }}>{alert.title}</span>
                  <span className={SEVERITY_BADGE_MAP[alert.severity]}>
                    {alert.severity}
                  </span>
                  {alert.acknowledged && <span className="badge-green" style={{ fontSize: "0.65rem" }}>✓ RESOLVED</span>}
                </div>
                <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.55, margin: 0, marginBottom: 8 }}>
                  {alert.description}
                </p>
                <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)", display: "flex", alignItems: "center", gap: 4 }}>
                  <span>🕐</span>
                  {alert.time}
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: 8, flexShrink: 0, alignItems: "flex-start" }}>
                {!alert.acknowledged && (
                  <button
                    type="button"
                    onClick={() => handleAcknowledge(alert.id)}
                    style={{
                      background: `${alert.iconColor}15`,
                      border: `1px solid ${alert.iconColor}40`,
                      color: alert.iconColor,
                      borderRadius: 8,
                      padding: "0.5rem 1rem",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      transition: "all 0.2s",
                    }}
                  >
                    {alert.btnText}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "1rem",
            marginTop: "2rem",
          }}
        >
          {[
            { icon: <Zap size={18} color="#ef4444" />, label: "High Priority", value: "1 Active", color: "#ef4444" },
            { icon: <Search size={18} color="#eab308" />, label: "Under Investigation", value: "2 Cases", color: "#eab308" },
            { icon: <CheckCircle size={18} color="#00ff88" />, label: "Resolved Today", value: "8 Alerts", color: "#00ff88" },
            { icon: <Bell size={18} color="#00f5ff" />, label: "Avg Response Time", value: "4.2 min", color: "#00f5ff" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="glass-card"
              style={{ padding: "1rem", textAlign: "center" }}
            >
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>{stat.icon}</div>
              <div className="stat-number" style={{ fontSize: "1.1rem", fontWeight: 700, color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", marginTop: 4 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
