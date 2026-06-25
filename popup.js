document.getElementById("save").addEventListener("click", () => {
  const sourceLang = document.getElementById("sourceLang").value;
  const targetLang = document.getElementById("targetLang").value;
  chrome.storage.sync.set({ sourceLang, targetLang });
});
