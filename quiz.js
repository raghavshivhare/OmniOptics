const questions = [
    { q: "Where does the 'looks' (UI) live?", o: ["Presentation Tier", "Logic Tier", "Data Tier"], a: 0 },
    { q: "What file is the extension's 'map'?", o: ["content.js", "manifest.json", "popup.html"], a: 1 },
    { q: "OCR processing happens in the...", o: ["Data Tier", "Presentation Tier", "Logic Tier"], a: 2 },
    { q: "Where is scan history stored?", o: ["Logic Tier", "Data Tier", "Presentation Tier"], a: 1 },
    { q: "To update code, you must ___ the page.", o: ["Close", "Refresh", "Mute"], a: 1 }
];

let currentQ = 0;

function loadQuestion() {
    const q = questions[currentQ];
    document.getElementById("question-text").innerText = q.q;
    const list = document.getElementById("options-list");
    list.innerHTML = "";
   
    q.o.forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        btn.innerText = opt;
        btn.onclick = () => handleAnswer(i);
        list.appendChild(btn);
    });

    document.getElementById("progress-fill").style.width = `${((currentQ + 1) / questions.length) * 100}%`;
}

function handleAnswer(choice) {
    if (choice === questions[currentQ].a) {
        currentQ++;
        if (currentQ < questions.length) {
            loadQuestion();
        } else {
            // Success! Go to the main tool
            window.location.href = "popup.html";
        }
    } else {
        alert("Not quite! Try that one again. 🧠");
    }
}

loadQuestion();