// When extension is first installed or updated
chrome.runtime.onInstalled.addListener(() => {
  // Check if quiz is already done
  chrome.storage.local.get(["quizCompleted"], (result) => {
    if (!result.quizCompleted) {
      // First time - show welcome flow
      chrome.tabs.create({
        url: "welcome.html",
      });
    }
    // If already completed, do nothing - default_popup will handle it
  });
});
