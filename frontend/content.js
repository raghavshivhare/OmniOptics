// content.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getSelectedText") {
    // This grabs exactly what the user has highlighted with their mouse
    const selectedText = window.getSelection().toString();
    sendResponse({ text: selectedText });
  }
});
