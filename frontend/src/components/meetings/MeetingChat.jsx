import { useState, useRef, useEffect } from "react";
import { Send, X, MessageSquare } from "lucide-react";
import ChatMessage from "./ChatMessage";

export default function MeetingChat({
  isOpen,
  onClose,
  messages = [],
  onSendMessage,
  currentUser,
}) {
  const [text, setText] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSendMessage(text);
    setText("");
  };

  return (
    <div className="meeting-chat-panel">
      <div className="meeting-chat-header">
        <div className="flex items-center gap-2">
          <MessageSquare size={18} />
          <h4>In-Call Messages</h4>
        </div>
        <button className="icon-btn" onClick={onClose} aria-label="Close chat">
          <X size={18} />
        </button>
      </div>

      <div className="meeting-chat-messages">
        {messages.length === 0 ? (
          <p className="empty-chat-text">No messages yet. Send a message to everyone in the room.</p>
        ) : (
          messages.map((msg, i) => (
            <ChatMessage
              key={msg._id || i}
              message={msg}
              isOwn={msg.senderName === currentUser?.name}
            />
          ))
        )}
        <div ref={endRef} />
      </div>

      <form className="meeting-chat-input-bar" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Send a message to everyone..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" className="btn btn-primary btn-sm" disabled={!text.trim()}>
          <Send size={15} />
        </button>
      </form>
    </div>
  );
}
