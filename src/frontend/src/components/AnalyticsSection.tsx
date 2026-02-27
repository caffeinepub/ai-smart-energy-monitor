import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChevronDown, ChevronRight, Calculator, TrendingUp, Leaf, Target, Award } from "lucide-react";
import { useInView } from "../hooks/useInView";

// Carbon Calculator
function CarbonCalculator() {
  const [kwh, setKwh] = useState(500);
  const [factor, setFactor] = useState(0.82);
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    setResult((kwh * factor) / 1000);
  };

  const getColor = (tons: number) => {
    if (tons < 1) return "#00ff88";
    if (tons < 2) return "#eab308";
    return "#ef4444";
  };

  return (
    <div className="glass-card" style={{ padding: "1.5rem", height: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.25rem" }}>
        <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(0,255,136,0.12)", border: "1px solid rgba(0,255,136,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Leaf size={18} color="#00ff88" />
        </div>
        <span style={{ fontWeight: 700, fontSize: "1rem" }}>Carbon Emission Calculator</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: "1.25rem" }}>
        <div>
          <label htmlFor="kwh-input" style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.55)", display: "block", marginBottom: 6 }}>Monthly Electricity (kWh)</label>
          <input
            id="kwh-input"
            type="number"
            className="glass-input"
            value={kwh}
            onChange={(e) => setKwh(Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="factor-input" style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.55)", display: "block", marginBottom: 6 }}>Emission Factor (kg CO₂/kWh)</label>
          <input
            id="factor-input"
            type="number"
            className="glass-input"
            value={factor}
            step="0.01"
            onChange={(e) => setFactor(Number(e.target.value))}
          />
        </div>
        <button type="button" className="neon-btn" onClick={calculate} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
          <Calculator size={15} />
          Calculate Emissions
        </button>
      </div>

      {result !== null && (
        <div
          style={{
            background: `${getColor(result)}10`,
            border: `1px solid ${getColor(result)}30`,
            borderRadius: 10,
            padding: "1rem",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", marginBottom: 6 }}>Your Monthly CO₂ Emissions</div>
          <div className="stat-number" style={{ fontSize: "2rem", fontWeight: 800, color: getColor(result) }}>
            {result.toFixed(2)} tons
          </div>
          <div style={{ fontSize: "0.72rem", marginTop: 6, color: getColor(result), opacity: 0.7 }}>
            {result < 1 ? "✓ Below average — great job!" : result < 2 ? "⚠ Moderate — room for improvement" : "⚡ High — immediate action recommended"}
          </div>
        </div>
      )}
    </div>
  );
}

// ROI Calculator
function ROICalculator() {
  const [investment, setInvestment] = useState(50000);
  const [monthlySavings, setMonthlySavings] = useState(3500);

  const payback = investment > 0 && monthlySavings > 0 ? (investment / monthlySavings).toFixed(1) : "—";
  const totalSavings5yr = monthlySavings * 60;
  const roi5yr = investment > 0 ? (((totalSavings5yr - investment) / investment) * 100).toFixed(1) : "—";

  return (
    <div className="glass-card" style={{ padding: "1.5rem", height: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.25rem" }}>
        <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(168,85,247,0.12)", border: "1px solid rgba(168,85,247,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Calculator size={18} color="#a855f7" />
        </div>
        <span style={{ fontWeight: 700, fontSize: "1rem" }}>ROI Calculator</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: "1.5rem" }}>
        <div>
          <label htmlFor="investment-input" style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.55)", display: "block", marginBottom: 6 }}>Investment Amount (₹)</label>
          <input id="investment-input" type="number" className="glass-input" value={investment} onChange={(e) => setInvestment(Number(e.target.value))} />
        </div>
        <div>
          <label htmlFor="monthly-savings-input" style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.55)", display: "block", marginBottom: 6 }}>Monthly Savings (₹)</label>
          <input id="monthly-savings-input" type="number" className="glass-input" value={monthlySavings} onChange={(e) => setMonthlySavings(Number(e.target.value))} />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
        {[
          { label: "Payback Period", value: `${payback} mo`, color: "#00f5ff" },
          { label: "5-Year ROI", value: `${roi5yr}%`, color: "#a855f7" },
          { label: "Total 5yr Savings", value: `₹${(totalSavings5yr / 100000).toFixed(1)}L`, color: "#00ff88" },
        ].map((item) => (
          <div key={item.label} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "0.85rem 0.75rem", textAlign: "center", border: `1px solid ${item.color}20` }}>
            <div className="stat-number" style={{ fontSize: "1.2rem", fontWeight: 800, color: item.color }}>{item.value}</div>
            <div style={{ fontSize: "0.62rem", color: "rgba(255,255,255,0.4)", marginTop: 4, lineHeight: 1.3 }}>{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Net-Zero Mode
function NetZeroMode() {
  const [enabled, setEnabled] = useState(false);
  const progress = 35;

  const actions = [
    "Shift 40% loads to solar generation hours",
    "Enable demand-response automation",
    "Target 20% reduction in HVAC consumption",
    "Optimize battery charge/discharge cycles",
    "Install additional 10kW solar capacity",
  ];

  return (
    <div className="glass-card" style={{ padding: "1.5rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.25rem" }}>
        <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(0,245,255,0.12)", border: "1px solid rgba(0,245,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Target size={18} color="#00f5ff" />
        </div>
        <span style={{ fontWeight: 700, fontSize: "1rem" }}>Net-Zero Optimization Mode</span>
        <button
          type="button"
          onClick={() => setEnabled(!enabled)}
          style={{
            marginLeft: "auto",
            width: 50,
            height: 26,
            borderRadius: 13,
            background: enabled ? "rgba(0,245,255,0.25)" : "rgba(255,255,255,0.1)",
            border: `1px solid ${enabled ? "#00f5ff" : "rgba(255,255,255,0.2)"}`,
            cursor: "pointer",
            position: "relative",
            boxShadow: enabled ? "0 0 10px rgba(0,245,255,0.35)" : "none",
            transition: "all 0.3s",
          }}
        >
          <div style={{ width: 20, height: 20, borderRadius: "50%", background: enabled ? "#00f5ff" : "rgba(255,255,255,0.5)", position: "absolute", top: 2, left: enabled ? 26 : 2, transition: "all 0.3s" }} />
        </button>
      </div>

      <div style={{ marginBottom: "1.25rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.6)" }}>Progress to Net-Zero (Target: 2030)</span>
          <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#00f5ff" }}>{progress}%</span>
        </div>
        <div className="progress-bar-track" style={{ height: 12 }}>
          <div
            className="progress-bar-fill"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, #00ff88, #00f5ff)",
              boxShadow: "0 0 10px rgba(0,245,255,0.5)",
            }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: "0.72rem", color: "rgba(255,255,255,0.4)" }}>
          <span>Current: 2.4 tons/mo</span>
          <span>Target: 0.5 tons/mo</span>
        </div>
      </div>

      {enabled && (
        <div style={{ animation: "fadeInUp 0.5s ease" }}>
          <div style={{ fontSize: "0.78rem", color: "#00f5ff", fontWeight: 600, marginBottom: 10 }}>Recommended Actions:</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {actions.map((action) => (
              <div key={action} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.8rem", color: "rgba(255,255,255,0.7)" }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00ff88", flexShrink: 0, boxShadow: "0 0 4px #00ff88" }} />
                {action}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Root Cause Analysis
function RootCauseAnalysis() {
  const [expanded, setExpanded] = useState<string | null>("HVAC");

  const issues = [
    {
      id: "HVAC",
      name: "HVAC Inefficiency",
      impact: 35,
      color: "#ef4444",
      causes: ["Dirty air filters reducing airflow 18%", "Refrigerant level 12% below optimal", "Thermostat calibration off by 2°C"],
    },
    {
      id: "Lighting",
      name: "Lighting Waste",
      impact: 22,
      color: "#f97316",
      causes: ["Incandescent bulbs in 34 zones", "Motion sensors inactive in corridors", "Daylight harvesting disabled"],
    },
    {
      id: "Standby",
      name: "Equipment Standby",
      impact: 18,
      color: "#eab308",
      causes: ["7 servers on full idle power", "12 workstations not sleep-configured", "3 industrial machines in hot standby"],
    },
    {
      id: "Peak",
      name: "Peak Hour Usage",
      impact: 25,
      color: "#a855f7",
      causes: ["Batch jobs scheduled during 6–10 PM", "HVAC cooling peak coincides with billing peak", "EV charging not time-shifted"],
    },
  ];

  return (
    <div className="glass-card" style={{ padding: "1.5rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.25rem" }}>
        <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <TrendingUp size={18} color="#ef4444" />
        </div>
        <div>
          <span style={{ fontWeight: 700, fontSize: "1rem" }}>Root Cause Analysis Engine</span>
          <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)" }}>High Consumption in Building-A</div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {issues.map((issue) => (
          <div key={issue.id} className="rca-item">
            <button
              type="button"
              style={{ width: "100%", background: "none", border: "none", cursor: "pointer", padding: "0.85rem 1rem", display: "flex", alignItems: "center", gap: 10 }}
              onClick={() => setExpanded(expanded === issue.id ? null : issue.id)}
            >
              {expanded === issue.id ? <ChevronDown size={16} color="#00f5ff" /> : <ChevronRight size={16} color="rgba(255,255,255,0.4)" />}
              <div style={{ flex: 1, textAlign: "left" }}>
                <div style={{ fontWeight: 600, fontSize: "0.88rem", color: "rgba(255,255,255,0.9)" }}>{issue.name}</div>
                <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{issue.impact}% impact on total over-consumption</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 60, height: 6, borderRadius: 3, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${issue.impact}%`, background: issue.color, borderRadius: 3 }} />
                </div>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: issue.color }}>{issue.impact}%</span>
              </div>
            </button>

            {expanded === issue.id && (
              <div style={{ padding: "0 1rem 0.85rem 2.5rem", animation: "fadeInUp 0.3s ease" }}>
                {issue.causes.map((cause) => (
                  <div key={cause} style={{ display: "flex", alignItems: "center", gap: 8, padding: "0.35rem 0", fontSize: "0.8rem", color: "rgba(255,255,255,0.6)" }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: issue.color, flexShrink: 0 }} />
                    {cause}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Energy Efficiency Leaderboard
const LEADERBOARD = [
  { rank: 1, device: "Solar Array", score: 96.2, trend: "up", color: "#ffd700" },
  { rank: 2, device: "LED Grid", score: 94.8, trend: "up", color: "#c0c0c0" },
  { rank: 3, device: "Smart AC", score: 88.3, trend: "neutral", color: "#cd7f32" },
  { rank: 4, device: "Battery System", score: 82.1, trend: "down", color: "#00f5ff" },
  { rank: 5, device: "Industrial Motor", score: 74.5, trend: "down", color: "#a855f7" },
];

function Leaderboard() {
  return (
    <div className="glass-card" style={{ padding: "1.5rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.25rem" }}>
        <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(255,215,0,0.12)", border: "1px solid rgba(255,215,0,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Award size={18} color="#ffd700" />
        </div>
        <span style={{ fontWeight: 700, fontSize: "1rem" }}>Energy Efficiency Leaderboard</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: "1.25rem" }}>
        {LEADERBOARD.map((item) => (
          <div
            key={item.rank}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "0.7rem 1rem",
              background: "rgba(255,255,255,0.03)",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div
              className="rank-badge"
              style={{
                background: item.rank === 1 ? "rgba(255,215,0,0.2)" : item.rank === 2 ? "rgba(192,192,192,0.15)" : item.rank === 3 ? "rgba(205,127,50,0.15)" : "rgba(255,255,255,0.06)",
                color: item.color,
                border: `1px solid ${item.color}40`,
                fontSize: "0.78rem",
              }}
            >
              #{item.rank}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: "0.88rem" }}>{item.device}</div>
              <div style={{ width: "100%", height: 4, background: "rgba(255,255,255,0.07)", borderRadius: 2, marginTop: 4, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${item.score}%`, background: item.color, borderRadius: 2 }} />
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div className="stat-number" style={{ fontSize: "1rem", fontWeight: 700, color: item.color }}>{item.score}%</div>
              <div style={{ fontSize: "0.7rem", marginTop: 2 }}>
                {item.trend === "up" ? "⬆️" : item.trend === "down" ? "⬇️" : "➡️"}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: "rgba(0,245,255,0.06)", border: "1px solid rgba(0,245,255,0.15)", borderRadius: 10, padding: "0.75rem", textAlign: "center" }}>
        <span style={{ fontSize: "0.82rem", color: "#00f5ff", fontWeight: 600 }}>🏆 You're in the top 12% of energy users</span>
      </div>
    </div>
  );
}

// CO2 bar chart
const CO2_DATA = [
  { month: "Jul", co2: 3.2 },
  { month: "Aug", co2: 2.9 },
  { month: "Sep", co2: 2.5 },
  { month: "Oct", co2: 2.3 },
  { month: "Nov", co2: 2.0 },
  { month: "Dec", co2: 1.7 },
  { month: "Jan", co2: 2.4 },
];

export default function AnalyticsSection() {
  const { ref, isInView } = useInView();

  return (
    <section id="analytics" style={{ background: "rgba(0,0,0,0.15)" }}>
      <div className="section-container" ref={ref}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <h2 className="section-heading gradient-text">Analytics & Optimization</h2>
          <p className="section-subheading">Deep-dive tools to analyze, optimize, and track your energy performance</p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "1.5rem",
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s ease",
          }}
        >
          <CarbonCalculator />
          <ROICalculator />
          <NetZeroMode />
          <RootCauseAnalysis />
          <Leaderboard />

          {/* CO2 Monthly Chart */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.25rem" }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(0,255,136,0.12)", border: "1px solid rgba(0,255,136,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Leaf size={18} color="#00ff88" />
              </div>
              <span style={{ fontWeight: 700, fontSize: "1rem" }}>Monthly CO₂ Reduction Trend</span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={CO2_DATA} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: "rgba(0,0,0,0.85)", border: "1px solid rgba(0,255,136,0.2)", borderRadius: 8 }}
                  labelStyle={{ color: "rgba(255,255,255,0.7)" }}
                  itemStyle={{ color: "#00ff88" }}
                />
                <Bar dataKey="co2" name="CO₂ (tons)" fill="#00ff8870" stroke="#00ff88" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
