async function translateText(text, sourceLang, targetLang) {
  const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`);
  const data = await response.json();
  return data.responseData.translatedText;
}

chrome.storage.sync.get(["sourceLang", "targetLang"], ({ sourceLang, targetLang }) => {
  document.body.innerHTML = document.body.innerHTML.replace(/>([^<]+)</g, async (match, p1) => {
    const translated = await translateText(p1, sourceLang, targetLang);
    return `>${translated}<`;
  });
});
