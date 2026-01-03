document.getElementById("simplifyBtn").addEventListener("click", async () => {
  const resultDiv = document.getElementById("result");
  const button = document.getElementById("simplifyBtn");

  // Add loading state
  button.disabled = true;
  button.classList.add("processing");
  resultDiv.className = "loading";
  resultDiv.innerHTML =
    '<span class="loading">Processing with Gemini AI...</span>';

  try {
    // 1. Get the current active tab
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    // 2. Execute script directly to get selected text (more reliable than messaging)
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => window.getSelection().toString(),
    });

    const selectedText = results[0].result;

    if (!selectedText || selectedText.trim() === "") {
      resultDiv.className = "error";
      resultDiv.innerHTML = "Please highlight some text first!";
      button.disabled = false;
      button.classList.remove("processing");

      // Vibrate if supported
      if (navigator.vibrate) {
        navigator.vibrate(200);
      }
      return;
    }

    // 3. Send that text to your Python Backend
    const backendResponse = await fetch("http://127.0.0.1:8000/process", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: selectedText,
        profile: { style: "bullets", level: "easy" },
      }),
    });

    const data = await backendResponse.json();

    // 4. Show the transformed text to the user
    if (data.status === "success") {
      resultDiv.className = "success";
      resultDiv.innerText = data.data;

      // Success vibration
      if (navigator.vibrate) {
        navigator.vibrate([50, 100, 50]);
      }
    } else {
      resultDiv.className = "error";
      resultDiv.innerHTML = "Error: " + (data.message || "Unknown error");
    }
  } catch (error) {
    console.error("Error:", error);
    resultDiv.className = "error";
    resultDiv.innerHTML =
      "Could not connect to Backend.<br><br>Make sure Uvicorn is running:<br><code>cd backend && python main.py</code>";

    // Error vibration
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100, 50, 100]);
    }
  } finally {
    // Re-enable button
    button.disabled = false;
    button.classList.remove("processing");
  }
});
