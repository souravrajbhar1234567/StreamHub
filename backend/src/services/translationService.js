const TRANSLATIONS = {
  es: {
    "Great tutorial! Very helpful.": "¡Gran tutorial! Muy útil.",
    "Thanks for explaining this so clearly.": "Gracias por explicar esto tan claramente.",
  },
  hi: {
    "Great tutorial! Very helpful.": "बहुत बढ़िया ट्यूटोरियल! बहुत मददगार।",
    "Thanks for explaining this so clearly.": "इसे इतनी स्पष्टता से समझाने के लिए धन्यवाद।",
  },
};

export const translateText = async (text, targetLang = "es") => {
  if (TRANSLATIONS[targetLang] && TRANSLATIONS[targetLang][text]) {
    return {
      translatedText: TRANSLATIONS[targetLang][text],
      detectedSourceLanguage: "en",
    };
  }

  // Fallback translation representation
  return {
    translatedText: `[${targetLang.toUpperCase()}] ${text}`,
    detectedSourceLanguage: "en",
  };
};

export default { translateText };
