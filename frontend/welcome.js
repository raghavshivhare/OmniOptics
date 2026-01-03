// welcome.js
document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("btn");

  startBtn.addEventListener("click", () => {
    // ADHD Tip: Immediate feedback
    startBtn.innerText = "Let's go! 🚀";

    // After a tiny delay, move to the quiz
    setTimeout(() => {
      window.location.href = "quiz.html";
    }, 300);
  });
});
