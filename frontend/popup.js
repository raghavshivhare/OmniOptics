// Views
const initialView = document.getElementById("initialView");
const loadingView = document.getElementById("loadingView");
const resultView = document.getElementById("resultView");

// Elements
const simplifyBtn = document.getElementById("simplifyBtn");
const backBtn = document.getElementById("backBtn");
const copyBtn = document.getElementById("copyBtn");
const shareBtn = document.getElementById("shareBtn");
const resultContent = document.getElementById("resultContent");

let simplifiedText = "";

// Show specific view
function showView(view) {
  initialView.classList.remove("hidden");
  loadingView.classList.remove("visible");
  resultView.classList.remove("visible");

  if (view === "initial") {
    initialView.classList.remove("hidden");
  } else if (view === "loading") {
    initialView.classList.add("hidden");
    loadingView.classList.add("visible");
  } else if (view === "result") {
    initialView.classList.add("hidden");
    resultView.classList.add("visible");
  }
}

// Main simplify function
simplifyBtn.addEventListener("click", async () => {
  showView("loading");

  try {
    // Get active tab
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    // Get selected text
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => window.getSelection().toString(),
    });

    const selectedText = results[0].result;

    if (!selectedText || selectedText.trim() === "") {
      showView("initial");

      // Show error feedback
      simplifyBtn.textContent = "Please select text first!";
      simplifyBtn.style.background = "#ef4444";

      setTimeout(() => {
        simplifyBtn.textContent = "Simplify Selected Text";
        simplifyBtn.style.background = "";
      }, 2000);

      if (navigator.vibrate) {
        navigator.vibrate(200);
      }
      return;
    }

    // Call backend
    const response = await fetch("https://omnioptics.onrender.com/process", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: selectedText,
        profile: { style: "bullets", level: "easy" },
      }),
    });

    const data = await response.json();

    if (data.status === "success") {
      simplifiedText = data.data;
      resultContent.textContent = simplifiedText;
      showView("result");

      if (navigator.vibrate) {
        navigator.vibrate([50, 100, 50]);
      }
    } else {
      throw new Error(data.message || "Unknown error");
    }
  } catch (error) {
    console.error("Error:", error);
    showView("initial");

    // Show error
    simplifyBtn.textContent = "Connection failed!";
    simplifyBtn.style.background = "#ef4444";

    setTimeout(() => {
      simplifyBtn.textContent = "Simplify Selected Text";
      simplifyBtn.style.background = "";
    }, 3000);

    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100]);
    }
  }
});

// Back button
backBtn.addEventListener("click", () => {
  showView("initial");
  simplifiedText = "";
  resultContent.textContent = "";
});

// Copy button
copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(simplifiedText);

    const originalText = copyBtn.textContent;
    copyBtn.textContent = "Copied!";
    copyBtn.style.background = "#10b981";
    copyBtn.style.color = "white";

    setTimeout(() => {
      copyBtn.textContent = originalText;
      copyBtn.style.background = "";
      copyBtn.style.color = "";
    }, 1500);

    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  } catch (error) {
    console.error("Copy failed:", error);
  }
});

// Share button
shareBtn.addEventListener("click", async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: "Simplified Text - OmniOptics",
        text: simplifiedText,
      });
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Share failed:", error);
        // Fallback to copy
        copyBtn.click();
      }
    }
  } else {
    // Fallback to copy if share not supported
    copyBtn.click();
  }
});
