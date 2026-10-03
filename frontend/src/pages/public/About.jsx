import { PlaySquare, Shield, Users, Sparkles, CheckCircle } from "lucide-react";

export default function About() {
  return (
    <div className="page-container">
      <section className="section-heading text-center">
        <span className="eyebrow">ABOUT STREAMHUB</span>
        <h1>Empowering Modern Video & Learning</h1>
        <p className="max-w-2xl mx-auto">
          StreamHub is an all-in-one platform built for creators, teams, and learners.
          We provide high-fidelity streaming, WebRTC meeting rooms, offline access,
          and robust community discussions in one unified hub.
        </p>
      </section>

      <div className="about-grid mt-10">
        <div className="about-card">
          <PlaySquare className="text-purple-400 mb-3" size={32} />
          <h3>Ultra HD Streaming</h3>
          <p>
            Experience lightning fast buffering, adaptive resolution switches up to 4K,
            and precise progress bookmarking across all your devices.
          </p>
        </div>

        <div className="about-card">
          <Users className="text-indigo-400 mb-3" size={32} />
          <h3>Interactive Meetings</h3>
          <p>
            Host secure peer-to-peer and group conference calls directly in your browser
            with screen sharing, audio controls, and real-time chat.
          </p>
        </div>

        <div className="about-card">
          <Shield className="text-pink-400 mb-3" size={32} />
          <h3>Bank-Grade Security</h3>
          <p>
            Industry standard encryption, 2FA OTP verification, trusted device tracking,
            and role-based permission safeguards for your peace of mind.
          </p>
        </div>
      </div>

      <div className="tech-stack-section mt-14">
        <h2>Built with Modern Architecture</h2>
        <div className="tech-badges-row">
          <span className="tech-badge">React 19</span>
          <span className="tech-badge">Node.js Express 5</span>
          <span className="tech-badge">MongoDB Atlas</span>
          <span className="tech-badge">Socket.IO</span>
          <span className="tech-badge">WebRTC</span>
          <span className="tech-badge">Razorpay Payments</span>
          <span className="tech-badge">Tailwind CSS</span>
        </div>
      </div>
    </div>
  );
}
