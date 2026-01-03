// welcome.js
document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("btn");

  // Add hover sound effect (optional - can be removed if too much)
  startBtn.addEventListener("mouseenter", () => {
    startBtn.style.transform = "translateY(-2px) scale(1.02)";
  });

  startBtn.addEventListener("mouseleave", () => {
    startBtn.style.transform = "";
  });

  startBtn.addEventListener("click", () => {
    // Immediate visual feedback
    startBtn.innerText = "Let's go!";
    startBtn.style.pointerEvents = "none";

    // Haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }

    // Add scale animation
    startBtn.style.transform = "scale(0.95)";

    setTimeout(() => {
      startBtn.style.transform = "scale(1)";
    }, 100);

    // Navigate to quiz with slight delay for animation
    setTimeout(() => {
      window.location.href = "quiz.html";
    }, 400);
  });
});
