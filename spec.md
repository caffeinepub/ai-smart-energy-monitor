# AI Smart Energy Monitoring System

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Full single-page application with dark galaxy theme (black/deep blue/purple gradients)
- Glassmorphism cards with neon glow effects
- Animated starfield background particles
- Smooth scroll and section fade-in animations
- Google Font: Poppins or Montserrat

**Sections:**

1. **Hero / Home Section**
   - Title: "AI Smart Energy Monitoring System"
   - Subtitle: "Optimizing Energy. Empowering the Future."
   - Animated stars background
   - "View Dashboard" neon glowing CTA button

2. **Dashboard Section**
   - Stat cards: Total Energy Consumption (kWh), Cost Savings (₹), Carbon Footprint Reduced, Active Devices
   - Interactive line chart: energy usage with Weekly/Monthly toggle
   - AI Prediction graph
   - Live Energy Savings Counter (animated counter ticking up)

3. **Advanced Features Section**
   - Predictive Load Forecasting card with forecast chart
   - Anomaly Detection with real-time alerts indicator
   - Machine Health Score with gauge/progress visual
   - IoT Integration Architecture diagram/visual
   - Heatmap Visualization (grid-based energy heatmap)
   - Auto Energy Mode toggle UI
   - Visibility Gap Score meter

4. **AI Advisor / Chatbot Section**
   - Chatbot-style UI box titled "AI Energy Advisor"
   - Animated suggestions appearing as chat bubbles:
     - "Turn off AC between 2–4 PM to save ₹120/month."
     - "Switch to LED lights to reduce 30% consumption."
     - "Peak usage detected at 8 PM."
   - AI Recommendation Engine panel with ranked recommendations

5. **Analytics & Optimization Section**
   - Carbon Emission Calculator (interactive inputs + result display)
   - ROI Calculator (inputs for investment, savings output)
   - Net-Zero Optimization Mode panel with toggle and progress
   - Root Cause Analysis Engine (tree/list visual of issues)
   - Energy Efficiency Leaderboard (top 5 devices ranked)

6. **Sustainability Impact Section**
   - CO2 reduction visual indicator
   - Tree equivalent savings graphic with animated count
   - Green animated progress bar

7. **Technology Stack Section**
   - Cards for: AI & Machine Learning, IoT Sensors, Cloud Database, Web Dashboard

8. **Smart Alerts Section**
   - Animated alert cards: High Usage Alert, Unusual Activity Detection, Device Malfunction Warning
   - Anomaly detection badges with pulse animation

9. **Contact Section**
   - Contact form: Name, Email, Message fields + Submit button

10. **Footer**
    - "Developed by Mounika Reddy"
    - © 2026 AI Smart Energy System

### Modify
- None (new project)

### Remove
- None (new project)

## Implementation Plan
1. Set up React app with Poppins font via Google Fonts
2. Create animated starfield background component
3. Build Hero section with glowing CTA button
4. Build Dashboard section with stat cards, Recharts line chart, Weekly/Monthly toggle, live counter
5. Build Advanced Features section (heatmap, health score, IoT arch, auto mode, gap score)
6. Build AI Advisor section with animated chat bubble suggestions
7. Build Analytics section (carbon calc, ROI calc, net-zero, root cause, leaderboard)
8. Build Sustainability Impact section
9. Build Technology Stack section
10. Build Smart Alerts section with pulse animations
11. Build Contact form section
12. Build Footer
13. Add global styles: glassmorphism, glow effects, scroll animations (Intersection Observer)
14. Wire backend APIs for storing contact messages and energy data

## UX Notes
- Dark palette: #000000, #0a0a1a, #0d0d2b, purple/blue gradients
- Glassmorphism: backdrop-filter blur, semi-transparent borders, inner glow
- Neon glow buttons: box-shadow with cyan/purple neon colors
- All sections animate in on scroll (fade + slide up)
- Responsive: mobile-first with Tailwind breakpoints
- Charts: Recharts library (line, area, bar)
- Counters: animated number counting on scroll entry
