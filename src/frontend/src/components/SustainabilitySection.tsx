import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useInView } from "../hooks/useInView";

const MONTHLY_CO2 = [
  { month: "Jan", reduced: 95 },
  { month: "Feb", reduced: 112 },
  { month: "Mar", reduced: 130 },
  { month: "Apr", reduced: 148 },
  { month: "May", reduced: 175 },
  { month: "Jun", reduced: 190 },
  { month: "Jul", reduced: 210 },
  { month: "Aug", reduced: 225 },
  { month: "Sep", reduced: 200 },
  { month: "Oct", reduced: 185 },
  { month: "Nov", reduced: 170 },
  { month: "Dec", reduced: 0, est: true },
];

function CountUp({ target, inView, suffix = "" }: { target: number; inView: boolean; suffix?: string }) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const id = setInterval(() => {
      current += increment;
      if (current >= target) {
        setVal(target);
        clearInterval(id);
      } else {
        setVal(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(id);
  }, [inView, target]);

  return (
    <span className="stat-number" style={{ fontWeight: 800 }}>
      {val.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

export default function SustainabilitySection() {
  const { ref, isInView } = useInView(0.15);
  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    if (isInView) {
      const t = setTimeout(() => setProgressWidth(36.8), 300);
      return () => clearTimeout(t);
    }
  }, [isInView]);

  const trees = 84;
  const treeIds = Array.from({ length: trees }, (_, i) => `t${i}`);
  const treeRows = Array.from({ length: Math.ceil(trees / 12) }, (_, ri) =>
    treeIds.slice(ri * 12, ri * 12 + 12)
  );

  return (
    <section id="sustainability" style={{ background: "rgba(0,255,136,0.02)" }}>
      <div className="section-container" ref={ref}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <h2 className="section-heading gradient-text">Sustainability Impact</h2>
          <p className="section-subheading">Tracking our journey toward a greener, cleaner planet</p>
        </div>

        {/* Hero metric */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "3rem",
            opacity: isInView ? 1 : 0,
            transform: isInView ? "scale(1)" : "scale(0.9)",
            transition: "all 0.8s ease",
          }}
        >
          <div style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.45)", letterSpacing: "0.12em", marginBottom: 8 }}>
            TOTAL CO₂ REDUCTION
          </div>
          <div
            style={{
              fontSize: "clamp(3rem, 8vw, 6rem)",
              fontWeight: 900,
              background: "linear-gradient(135deg, #00ff88, #00f5ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              lineHeight: 1,
              marginBottom: 8,
            }}
          >
            <CountUp target={1840} inView={isInView} suffix=" kg" />
          </div>
          <div style={{ fontSize: "1rem", color: "rgba(255,255,255,0.5)" }}>CO₂ equivalent reduced this year</div>
        </div>

        {/* Progress goal */}
        <div
          className="glass-card"
          style={{
            padding: "1.5rem 2rem",
            marginBottom: "2rem",
            opacity: isInView ? 1 : 0,
            transition: "opacity 0.8s ease 0.2s",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
            <div>
              <span style={{ fontWeight: 700 }}>Annual Goal: </span>
              <span style={{ color: "rgba(255,255,255,0.6)" }}>5,000 kg CO₂ by year-end</span>
            </div>
            <span
              className="stat-number"
              style={{ fontSize: "1.4rem", fontWeight: 800, color: "#00ff88" }}
            >
              {progressWidth > 0 ? "36.8%" : "0%"}
            </span>
          </div>
          <div className="progress-bar-track" style={{ height: 16 }}>
            <div
              className="progress-bar-fill"
              style={{
                width: `${progressWidth}%`,
                background: "linear-gradient(90deg, #00ff88, #00f5ff)",
                boxShadow: "0 0 12px rgba(0,255,136,0.5)",
              }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
            <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)" }}>0 kg</span>
            <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)" }}>5,000 kg</span>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2rem" }}
          className="grid-cols-1 md:grid-cols-2">

          {/* Tree equivalent */}
          <div
            className="glass-card"
            style={{
              padding: "1.5rem",
              opacity: isInView ? 1 : 0,
              transition: "opacity 0.8s ease 0.3s",
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: 4 }}>🌳 Tree Equivalence</div>
            <div style={{ fontSize: "2rem", fontWeight: 800, color: "#00ff88", marginBottom: 4 }}>
              <CountUp target={84} inView={isInView} />
            </div>
            <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", marginBottom: "1.25rem" }}>
              trees planted equivalent
            </div>
            {/* Tree grid */}
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {treeRows.map((row) => (
                <div key={row[0]} style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                  {row.map((treeId) => (
                    <span
                      key={treeId}
                      style={{
                        fontSize: "1.2rem",
                        filter: "drop-shadow(0 0 4px rgba(0,255,136,0.5))",
                        animation: `fadeInUp 0.3s ease ${parseInt(treeId.slice(1)) * 30}ms both`,
                      }}
                    >
                      🌳
                    </span>
                  ))}
                </div>
              ))}
            </div>
            <div style={{ marginTop: "1rem", padding: "0.75rem", background: "rgba(0,255,136,0.06)", borderRadius: 8, border: "1px solid rgba(0,255,136,0.15)", fontSize: "0.82rem", color: "rgba(255,255,255,0.7)" }}>
              🚗 Equivalent to taking <strong style={{ color: "#00ff88" }}>4 cars</strong> off the road for a year
            </div>
          </div>

          {/* CO2 Impact Stats */}
          <div
            className="glass-card"
            style={{
              padding: "1.5rem",
              opacity: isInView ? 1 : 0,
              transition: "opacity 0.8s ease 0.4s",
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: "1.25rem" }}>Monthly CO₂ Reduction</div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={MONTHLY_CO2} margin={{ top: 0, right: 0, left: -30, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: "rgba(0,0,0,0.85)", border: "1px solid rgba(0,255,136,0.2)", borderRadius: 8, padding: "0.5rem 0.75rem" }}
                  labelStyle={{ color: "rgba(255,255,255,0.7)", fontSize: "0.8rem" }}
                  itemStyle={{ color: "#00ff88" }}
                />
                <Bar dataKey="reduced" name="kg CO₂" fill="#00ff8855" stroke="#00ff88" strokeWidth={1.5} radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>

            {/* Impact stats */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: "1rem" }}>
              {[
                { label: "Avg per Month", value: "153 kg", color: "#00ff88" },
                { label: "Best Month", value: "225 kg", color: "#00f5ff" },
                { label: "YoY Improvement", value: "+34%", color: "#a855f7" },
                { label: "Projection 2026", value: "3.2T", color: "#eab308" },
              ].map((s) => (
                <div key={s.label} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 8, padding: "0.6rem", textAlign: "center" }}>
                  <div className="stat-number" style={{ fontSize: "1.1rem", fontWeight: 700, color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
