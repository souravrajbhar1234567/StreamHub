import { useState } from "react";
import { Languages } from "lucide-react";
import { translateComment } from "../../services/commentApi";

export default function TranslationButton({ originalText, onTranslated }) {
  const [loading, setLoading] = useState(false);
  const [isTranslated, setIsTranslated] = useState(false);

  const handleTranslate = async () => {
    if (isTranslated) {
      onTranslated(originalText, false);
      setIsTranslated(false);
      return;
    }

    try {
      setLoading(true);
      const res = await translateComment(originalText, "es");
      if (res.data?.translatedText) {
        onTranslated(res.data.translatedText, true);
        setIsTranslated(true);
      }
    } catch (err) {
      console.warn("Translation failed:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="comment-action-btn"
      onClick={handleTranslate}
      disabled={loading}
      title="Translate comment"
    >
      <Languages size={14} />
      <span>{loading ? "Translating..." : isTranslated ? "Original" : "Translate"}</span>
    </button>
  );
}
