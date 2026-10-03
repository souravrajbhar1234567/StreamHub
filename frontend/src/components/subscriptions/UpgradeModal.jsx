import { Crown, Check } from "lucide-react";
import { Link } from "react-router-dom";
import Modal from "../common/Modal";

export default function UpgradeModal({ isOpen, onClose, feature = "Premium Content" }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Upgrade to Pro">
      <div className="upgrade-modal-content">
        <div className="upgrade-crown-icon">
          <Crown size={48} />
        </div>
        <h3>Unlock {feature}</h3>
        <p>
          This feature is exclusively available to StreamHub Pro and Premium members.
          Upgrade today and enjoy uninterrupted high-definition learning.
        </p>

        <ul className="upgrade-perks">
          <li><Check size={16} /> 1080p & 4K Ultra HD streaming</li>
          <li><Check size={16} /> Offline video downloads</li>
          <li><Check size={16} /> Access to exclusive webinars and live meetings</li>
        </ul>

        <div className="upgrade-modal-actions">
          <button className="btn btn-ghost" onClick={onClose}>
            Maybe Later
          </button>
          <Link to="/plans" className="btn btn-primary" onClick={onClose}>
            View Subscription Plans
          </Link>
        </div>
      </div>
    </Modal>
  );
}
