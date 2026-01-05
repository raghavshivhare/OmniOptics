const questions = [
  {
    q: "How do you prefer to read complex text?",
    o: [
      "Bullet points and short sentences",
      "Full paragraphs with context",
      "Summary with key highlights",
    ],
    noCorrect: true,
  },
  {
    q: "What distracts you most while reading?",
    o: [
      "Long paragraphs of text",
      "Too many colors and visuals",
      "Unfamiliar vocabulary",
    ],
    noCorrect: true,
  },
  {
    q: "How would you like simplified text formatted?",
    o: [
      "Numbered list with main ideas",
      "Short paragraphs",
      "Single sentence per point",
    ],
    noCorrect: true,
  },
  {
    q: "When reading, do you prefer:",
    o: [
      "Simple language only",
      "Brief technical terms",
      "Mix of simple and detailed",
    ],
    noCorrect: true,
  },
  {
    q: "What helps you understand text better?",
    o: [
      "Clear structure and spacing",
      "Examples and real-world context",
      "Bold important words",
    ],
    noCorrect: true,
  },
];

let currentQ = 0;
let userAnswers = {};

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

  // Highlight selected option
  buttonEl.classList.add("correct");

  // Store user's answer
  userAnswers[currentQ] = {
    question: questions[currentQ].q,
    selectedOption: questions[currentQ].o[choice],
    optionIndex: choice,
  };

  // Move to next question or complete quiz
  setTimeout(() => {
    currentQ++;
    if (currentQ < questions.length) {
      loadQuestion();
    } else {
      // Quiz completed - save preferences and redirect
      chrome.storage.local.set(
        {
          quizCompleted: true,
          readingPreferences: userAnswers,
        },
        () => {
          window.location.href = "popup.html";
        }
      );
    }
  }, 600);
}

loadQuestion();
