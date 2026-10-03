import { Link } from "react-router-dom";
import { PlaySquare, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <Link to="/" className="brand">
            <span className="brand-icon">
              <PlaySquare size={20} />
            </span>
            Stream<span>Hub</span>
          </Link>
          <p className="footer-tagline">
            Next-generation video streaming, learning, and real-time communication platform.
          </p>
        </div>

        <div className="footer-nav">
          <div className="footer-col">
            <h4>Explore</h4>
            <Link to="/videos">Browse Videos</Link>
            <Link to="/plans">Pricing & Plans</Link>
            <Link to="/meetings/join">Join Meeting</Link>
          </div>

          <div className="footer-col">
            <h4>Account</h4>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/subscription">My Subscription</Link>
            <Link to="/downloads">Downloads</Link>
            <Link to="/profile">Profile Settings</Link>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact Support</Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} StreamHub Platform. Built for excellence.</p>
      </div>
    </footer>
  );
}
