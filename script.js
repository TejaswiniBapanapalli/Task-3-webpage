// QUIZ LOGIC
const quizData = [
  {
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "High Tech Machine Learning", "Home Tool Markup Language"],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "Which CSS property changes text color?",
    options: ["font-style", "color", "text-decoration"],
    answer: "color"
  },
  {
    question: "Which keyword is used to declare a variable in JavaScript?",
    options: ["var", "int", "string"],
    answer: "var"
  }
];

let currentQuestion = 0;
let score = 0;

const quizContainer = document.getElementById("quiz-container");
const result = document.getElementById("result");
const nextBtn = document.getElementById("next-btn");

function loadQuiz() {
  result.innerText = "";
  const q = quizData[currentQuestion];
  quizContainer.innerHTML = `
    <h3>${q.question}</h3>
    ${q.options.map(opt => 
      `<button class="option-btn" onclick="checkAnswer('${opt}')">${opt}</button>`
    ).join("")}
  `;
}

function checkAnswer(selected) {
  const correct = quizData[currentQuestion].answer;
  if (selected === correct) {
    score++;
    result.innerText = "✅ Correct!";
  } else {
    result.innerText = `❌ Wrong! Correct Answer: ${correct}`;
  }
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuiz();
  } else {
    quizContainer.innerHTML = `<h3>Quiz Finished!</h3><p>Your Score: ${score}/${quizData.length}</p>`;
    nextBtn.style.display = "none";
  }
});

// Load first question
loadQuiz();

// API FETCH LOGIC (Random Joke)
async function getJoke() {
  const response = await fetch("https://icanhazdadjoke.com/", {
    headers: { "Accept": "application/json" }
  });
  const data = await response.json();
  document.getElementById("joke").innerText = data.joke;
}

// Load a joke on page load
getJoke();
