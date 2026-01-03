// This listener waits for you to click the extension icon
chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.create({
    url: "welcome.html",
  });
  console.log("Welcome page opened successfully!");
});

// This still runs when you first install/reload the extension
chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.create({
    url: "welcome.html",
  });
});
