import { formatDuration } from "../../utils/formatDuration";

export default function ChatMessage({ message, isOwn }) {
  const time = new Date(message.createdAt || Date.now()).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`chat-message-bubble ${isOwn ? "chat-own" : "chat-peer"}`}>
      <div className="chat-msg-header">
        <span className="chat-sender-name">{message.senderName || "Participant"}</span>
        <span className="chat-time">{time}</span>
      </div>
      <div className="chat-msg-text">{message.message}</div>
      {message.fileUrl && (
        <a
          href={message.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="chat-file-attachment"
        >
          📎 {message.fileName || "Download Attachment"}
        </a>
      )}
    </div>
  );
}
