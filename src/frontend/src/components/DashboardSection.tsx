import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { TrendingDown, TrendingUp, Minus, Zap, DollarSign, Leaf, Cpu } from "lucide-react";
import { useInView } from "../hooks/useInView";

const WEEKLY_DATA = [
  { name: "Mon", usage: 45, cost: 180 },
  { name: "Tue", usage: 62, cost: 248 },
  { name: "Wed", usage: 38, cost: 152 },
  { name: "Thu", usage: 71, cost: 284 },
  { name: "Fri", usage: 55, cost: 220 },
  { name: "Sat", usage: 48, cost: 192 },
  { name: "Sun", usage: 33, cost: 132 },
];

const MONTHLY_DATA = [
  { name: "Jan", usage: 312 },
  { name: "Feb", usage: 289 },
  { name: "Mar", usage: 334 },
  { name: "Apr", usage: 298 },
  { name: "May", usage: 361 },
  { name: "Jun", usage: 405 },
  { name: "Jul", usage: 388 },
  { name: "Aug", usage: 342 },
  { name: "Sep", usage: 276 },
  { name: "Oct", usage: 253 },
  { name: "Nov", usage: 229 },
  { name: "Dec", usage: 198 },
];

const PREDICTION_DATA = [
  { name: "Today", actual: 55, predicted: 58 },
  { name: "Day 2", actual: 48, predicted: 51 },
  { name: "Day 3", actual: 62, predicted: 64 },
  { name: "Day 4", actual: null, predicted: 59 },
  { name: "Day 5", actual: null, predicted: 52 },
  { name: "Day 6", actual: null, predicted: 67 },
  { name: "Day 7", actual: null, predicted: 71 },
];

const STAT_CARDS = [
  {
    icon: Zap,
    title: "Total Energy",
    value: "2,847 kWh",
    trend: "-12%",
    trendDir: "down",
    trendColor: "#00ff88",
    label: "this week",
    color: "#00f5ff",
  },
  {
    icon: DollarSign,
    title: "Cost Savings",
    value: "₹1,24,350",
    trend: "+8.3%",
    trendDir: "up",
    trendColor: "#00ff88",
    label: "this month",
    color: "#a855f7",
  },
  {
    icon: Leaf,
    title: "Carbon Reduced",
    value: "1,840 kg",
    trend: "-23%",
    trendDir: "down",
    trendColor: "#00ff88",
    label: "CO₂ this month",
    color: "#00ff88",
  },
  {
    icon: Cpu,
    title: "Active Devices",
    value: "47 / 52",
    trend: "5 offline",
    trendDir: "warn",
    trendColor: "#eab308",
    label: "5 require attention",
    color: "#eab308",
  },
];

function useCountUp(target: number, inView: boolean, duration = 1500) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const steps = 40;
    const increment = target / steps;
    let current = 0;
    const interval = duration / steps;
    const id = setInterval(() => {
      current += increment;
      if (current >= target) { setVal(target); clearInterval(id); }
      else setVal(Math.floor(current));
    }, interval);
    return () => clearInterval(id);
  }, [inView, target, duration]);
  return val;
}

function formatINR(n: number) {
  const s = Math.floor(n).toString();
  const lastThree = s.slice(-3);
  const rest = s.slice(0, -3);
  if (!rest) return lastThree;
  return `${rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",")},${lastThree}`;
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ color: string; name: string; value: number }>; label?: string }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "rgba(0,0,0,0.85)",
      border: "1px solid rgba(0,245,255,0.25)",
      borderRadius: 10,
      padding: "0.75rem 1rem",
    }}>
      <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.8rem", marginBottom: 4 }}>{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color, fontWeight: 600, fontSize: "0.9rem" }}>
          {p.name}: {p.value} kWh
        </p>
      ))}
    </div>
  );
};

export default function DashboardSection() {
  const [chartPeriod, setChartPeriod] = useState<"weekly" | "monthly">("weekly");
  const { ref, isInView } = useInView();
  const savings = useCountUp(1854367, isInView, 2000);

  const chartData = chartPeriod === "weekly" ? WEEKLY_DATA : MONTHLY_DATA;

  return (
    <section id="dashboard" style={{ background: "rgba(0,0,0,0.2)" }}>
      <div className="section-container" ref={ref}>
        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <h2 className="section-heading gradient-text">Real-Time Dashboard</h2>
          <p className="section-subheading">Live monitoring and analytics for your energy ecosystem</p>
        </div>

        {/* Stat cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1.25rem",
          marginBottom: "2rem",
        }}>
          {STAT_CARDS.map((card) => {
            const Icon = card.icon;
            const TrendIcon = card.trendDir === "down" ? TrendingDown : card.trendDir === "up" ? TrendingUp : Minus;
            return (
              <div
                key={card.title}
                className={`glass-card glow-hover ${isInView ? "fade-in-up" : ""}`}
                style={{ padding: "1.5rem", position: "relative", overflow: "hidden" }}
              >
                {/* Background glow */}
                <div style={{
                  position: "absolute",
                  top: -20,
                  right: -20,
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  background: `radial-gradient(circle, ${card.color}15, transparent)`,
                  pointerEvents: "none",
                }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 10,
                      background: `${card.color}15`,
                      border: `1px solid ${card.color}30`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon size={20} color={card.color} />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      color: card.trendColor,
                      fontSize: "0.82rem",
                      fontWeight: 600,
                    }}
                  >
                    <TrendIcon size={14} />
                    {card.trend}
                  </div>
                </div>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.78rem", marginBottom: 4 }}>{card.title}</div>
                <div className="stat-number" style={{ fontSize: "1.6rem", fontWeight: 700, color: card.color }}>
                  {card.value}
                </div>
                <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", marginTop: 4 }}>{card.label}</div>
              </div>
            );
          })}
        </div>

        {/* Charts row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}
          className="grid-cols-1 md:grid-cols-2">

          {/* Energy usage chart */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem", flexWrap: "wrap", gap: 8 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>Energy Usage</div>
                <div style={{ fontSize: "0.73rem", color: "rgba(255,255,255,0.4)", marginTop: 2 }}>kWh consumption over time</div>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                {(["weekly", "monthly"] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setChartPeriod(p)}
                    style={{
                      padding: "0.3rem 0.85rem",
                      borderRadius: 100,
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      border: chartPeriod === p ? "1px solid #00f5ff" : "1px solid rgba(255,255,255,0.12)",
                      background: chartPeriod === p ? "rgba(0,245,255,0.1)" : "transparent",
                      color: chartPeriod === p ? "#00f5ff" : "rgba(255,255,255,0.5)",
                      textTransform: "capitalize",
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="cyanGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00f5ff" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00f5ff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="usage"
                  name="Usage"
                  stroke="#00f5ff"
                  strokeWidth={2.5}
                  fill="url(#cyanGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* AI Prediction chart */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <div style={{ marginBottom: "1.25rem" }}>
              <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>AI Predictive Load Forecast</div>
              <div style={{ fontSize: "0.73rem", color: "rgba(255,255,255,0.4)", marginTop: 2 }}>
                Actual vs predicted — next 7 days
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={PREDICTION_DATA} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
                <Line
                  type="monotone"
                  dataKey="actual"
                  name="Actual"
                  stroke="#00f5ff"
                  strokeWidth={2.5}
                  dot={{ fill: "#00f5ff", r: 4 }}
                  connectNulls={false}
                />
                <Line
                  type="monotone"
                  dataKey="predicted"
                  name="Predicted"
                  stroke="#a855f7"
                  strokeWidth={2}
                  strokeDasharray="5 4"
                  dot={{ fill: "#a855f7", r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Live savings counter */}
        <div
          className="glass-card"
          style={{
            padding: "2rem",
            textAlign: "center",
            background: "rgba(0,255,136,0.04)",
            border: "1px solid rgba(0,255,136,0.15)",
            boxShadow: "0 0 30px rgba(0,255,136,0.06)",
          }}
        >
          <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.45)", letterSpacing: "0.1em", marginBottom: 8 }}>
            ⚡ LIVE ENERGY SAVINGS COUNTER
          </div>
          <div
            className="stat-number"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 700,
              color: "#00ff88",
              textShadow: "0 0 30px rgba(0,255,136,0.5)",
            }}
          >
            ₹{formatINR(savings)}
          </div>
          <div style={{ fontSize: "0.8rem", color: "rgba(0,255,136,0.5)", marginTop: 8 }}>
            Total savings since deployment · Updates every second
          </div>
        </div>
      </div>
    </section>
  );
}
