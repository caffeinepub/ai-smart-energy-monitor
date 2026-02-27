import { useState } from "react";
import { Send, Mail, User, MessageSquare, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";
import { useInView } from "../hooks/useInView";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { actor } = useActor();
  const { ref, isInView } = useInView();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      if (actor) {
        await actor.submitContactMessage({
          name,
          email,
          message,
          timestamp: BigInt(Date.now()),
        });
      }
      setSent(true);
      toast.success("Message sent! We'll respond within 24 hours.");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" style={{ background: "rgba(168,85,247,0.02)" }}>
      <div className="section-container" ref={ref}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <h2 className="section-heading gradient-text">Get In Touch</h2>
          <p className="section-subheading">Have questions or want to implement AI energy monitoring? We'd love to hear from you.</p>
        </div>

        <div
          style={{
            maxWidth: 680,
            margin: "0 auto",
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s ease",
          }}
        >
          <div
            className="glass-card-strong"
            style={{
              padding: "2.5rem",
              boxShadow: "0 0 60px rgba(168,85,247,0.08), 0 0 120px rgba(0,245,255,0.05)",
              border: "1px solid rgba(168,85,247,0.15)",
            }}
          >
            {sent ? (
              <div style={{ textAlign: "center", padding: "2rem 0" }}>
                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background: "rgba(0,255,136,0.1)",
                    border: "1px solid rgba(0,255,136,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1.5rem",
                    boxShadow: "0 0 30px rgba(0,255,136,0.2)",
                  }}
                >
                  <CheckCircle size={40} color="#00ff88" />
                </div>
                <h3 style={{ fontWeight: 800, fontSize: "1.5rem", marginBottom: 8 }}>Message Sent!</h3>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
                  Thank you for reaching out. We'll get back to you within 24 hours.
                </p>
                <button type="button" className="neon-btn" onClick={() => setSent(false)}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {/* Name */}
                <div>
                  <label htmlFor="contact-name" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.82rem", color: "rgba(255,255,255,0.55)", marginBottom: 8 }}>
                    <User size={14} />
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    className="glass-input"
                    placeholder="Mounika Reddy"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.82rem", color: "rgba(255,255,255,0.55)", marginBottom: 8 }}>
                    <Mail size={14} />
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    className="glass-input"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.82rem", color: "rgba(255,255,255,0.55)", marginBottom: 8 }}>
                    <MessageSquare size={14} />
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    className="glass-input"
                    placeholder="Tell us about your energy monitoring needs..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    required
                    style={{ resize: "vertical", minHeight: 100 }}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="neon-btn"
                  disabled={loading}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    opacity: loading ? 0.7 : 1,
                    cursor: loading ? "not-allowed" : "pointer",
                  }}
                >
                  {loading ? (
                    <>
                      <div
                        style={{
                          width: 16,
                          height: 16,
                          border: "2px solid rgba(0,245,255,0.3)",
                          borderTopColor: "#00f5ff",
                          borderRadius: "50%",
                          animation: "spin-slow 0.8s linear infinite",
                        }}
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
