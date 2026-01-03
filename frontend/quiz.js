const questions = [
  {
    q: "Where does the 'looks' (UI) live?",
    o: ["Presentation Tier", "Logic Tier", "Data Tier"],
    a: 0,
  },
  {
    q: "What file is the extension's 'map'?",
    o: ["content.js", "manifest.json", "popup.html"],
    a: 1,
  },
  {
    q: "OCR processing happens in the...",
    o: ["Data Tier", "Presentation Tier", "Logic Tier"],
    a: 2,
  },
  {
    q: "Where is scan history stored?",
    o: ["Logic Tier", "Data Tier", "Presentation Tier"],
    a: 1,
  },
  {
    q: "To update code, you must ___ the page.",
    o: ["Close", "Refresh", "Mute"],
    a: 1,
  },
];

let currentQ = 0;

function loadQuestion() {
  const q = questions[currentQ];

  // Update question counter
  document.getElementById("counter").innerText = `Question ${currentQ + 1} of ${
    questions.length
  }`;

  // Update question text with animation
  const questionEl = document.getElementById("question-text");
  questionEl.style.animation = "none";
  setTimeout(() => {
    questionEl.innerText = q.q;
    questionEl.style.animation = "slideInLeft 0.4s ease-out";
  }, 10);

  const list = document.getElementById("options-list");
  list.innerHTML = "";

  q.o.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.innerText = opt;
    btn.onclick = () => handleAnswer(i, btn);
    list.appendChild(btn);
  });

  document.getElementById("progress-fill").style.width = `${
    ((currentQ + 1) / questions.length) * 100
  }%`;
}

function handleAnswer(choice, buttonEl) {
  const buttons = document.querySelectorAll(".option-btn");

  // Disable all buttons during animation
  buttons.forEach((btn) => (btn.style.pointerEvents = "none"));

  if (choice === questions[currentQ].a) {
    // Correct answer
    buttonEl.classList.add("correct");

    setTimeout(() => {
      currentQ++;
      if (currentQ < questions.length) {
        loadQuestion();
      } else {
        // Quiz completed - show success animation
        const card = document.querySelector(".card");
        card.style.animation = "successPulse 0.6s ease";

        // Save that quiz is completed
        setTimeout(() => {
          chrome.storage.local.set({ quizCompleted: true }, () => {
            window.location.href = "popup.html";
          });
        }, 600);
      }
    }, 600);
  } else {
    // Wrong answer - shake animation
    buttonEl.classList.add("wrong");

    // Vibrate if supported
    if (navigator.vibrate) {
      navigator.vibrate([50, 100, 50]);
    }

    setTimeout(() => {
      buttonEl.classList.remove("wrong");
      buttons.forEach((btn) => (btn.style.pointerEvents = "auto"));
    }, 500);
  }
}

loadQuestion();
