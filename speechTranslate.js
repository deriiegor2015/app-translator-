// Розпізнавання голосу
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "es"; // мова співрозмовника (наприклад, іспанська)
recognition.interimResults = false;

recognition.onresult = async (event) => {
  const text = event.results[0][0].transcript;
  console.log("Оригінал:", text);

  // Переклад
  const translated = await translateText(text, "es", "uk");
  console.log("Переклад:", translated);

  // Озвучування перекладу українською
  speakText(translated, "uk-UA");
};

recognition.start();

// Функція перекладу
async function translateText(text, sourceLang, targetLang) {
  const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`);
  const data = await response.json();
  return data.responseData.translatedText;
}

// Озвучування перекладу
function speakText(text, lang) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  speechSynthesis.speak(utterance);
}
