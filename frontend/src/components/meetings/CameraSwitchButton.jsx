import { SwitchCamera } from "lucide-react";

export default function CameraSwitchButton({ onSwitch }) {
  return (
    <button
      className="meeting-control-btn btn-secondary"
      onClick={onSwitch}
      title="Switch Camera (Mobile)"
    >
      <SwitchCamera size={20} />
    </button>
  );
}
