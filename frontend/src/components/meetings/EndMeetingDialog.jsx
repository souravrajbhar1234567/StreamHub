import Modal from "../common/Modal";

export default function EndMeetingDialog({
  isOpen,
  onClose,
  isHost,
  onLeave,
  onEndForAll,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Leave Meeting?">
      <div className="end-meeting-dialog-content">
        <p>Would you like to leave this meeting, or end the meeting for all participants?</p>
        <div className="end-meeting-actions">
          <button className="btn btn-ghost" onClick={onClose}>
            Stay in Call
          </button>
          <button className="btn btn-secondary" onClick={onLeave}>
            Leave Meeting
          </button>
          {isHost && (
            <button className="btn btn-danger" onClick={onEndForAll}>
              End for All
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
}
