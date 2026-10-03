import { useState, useEffect } from "react";
import Modal from "../common/Modal";

export default function MeetingSettings({ isOpen, onClose }) {
  const [audioDevices, setAudioDevices] = useState([]);
  const [videoDevices, setVideoDevices] = useState([]);

  useEffect(() => {
    if (!navigator.mediaDevices?.enumerateDevices) return;
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      setAudioDevices(devices.filter((d) => d.kind === "audioinput"));
      setVideoDevices(devices.filter((d) => d.kind === "videoinput"));
    });
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Audio & Video Settings">
      <div className="meeting-settings-form">
        <div className="form-group">
          <label>Microphone</label>
          <select className="form-input">
            {audioDevices.length > 0 ? (
              audioDevices.map((d, i) => (
                <option key={d.deviceId || i} value={d.deviceId}>
                  {d.label || `Microphone ${i + 1}`}
                </option>
              ))
            ) : (
              <option>Default System Microphone</option>
            )}
          </select>
        </div>

        <div className="form-group">
          <label>Camera</label>
          <select className="form-input">
            {videoDevices.length > 0 ? (
              videoDevices.map((d, i) => (
                <option key={d.deviceId || i} value={d.deviceId}>
                  {d.label || `Camera ${i + 1}`}
                </option>
              ))
            ) : (
              <option>Default Integrated Camera</option>
            )}
          </select>
        </div>

        <div className="modal-actions">
          <button className="btn btn-primary" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </Modal>
  );
}
