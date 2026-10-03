import { Paperclip } from "lucide-react";
import { useRef } from "react";

export default function FileShare({ onFileSelected }) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && onFileSelected) {
      onFileSelected(file);
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <button
        type="button"
        className="icon-btn"
        title="Share File"
        onClick={() => fileInputRef.current?.click()}
      >
        <Paperclip size={18} />
      </button>
    </>
  );
}
