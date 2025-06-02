const questions = [
    {
      question: "What is the capital of France?",
      answers: ["Madrid", "Berlin", "Paris", "Lisbon"],
      correct: 2,
    },
    {
      question: "Which language runs in a web browser?",
      answers: ["Python", "Java", "C", "JavaScript"],
      correct: 3,
    },
    {
      question: "What does CSS stand for?",
      answers: ["Computer Style Sheets", "Cascading Style Sheets", "Colorful Style Syntax", "Creative Style Syntax"],
      correct: 1,
    }
  ];
  
  const startBtn = document.getElementById("start-btn");
  const quizContainer = document.getElementById("quiz-container");
  const questionEl = document.getElementById("question");
  const answersEl = document.getElementById("answers");
  const nextBtn = document.getElementById("next-btn");
  const resultEl = document.getElementById("result");
  const retryBtn = document.getElementById("retry-btn");
  
  let currentQuestion = 0;
  let score = 0;
  
  startBtn.addEventListener("click", () => {
    document.getElementById("start-screen").classList.add("hidden");
    quizContainer.classList.remove("hidden");
    showQuestion();
  });
  
  nextBtn.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  });
  
  retryBtn.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    resultEl.classList.add("hidden");
    retryBtn.classList.add("hidden");
    quizContainer.classList.remove("hidden");
    showQuestion();
  });
  
  function showQuestion() {
    const q = questions[currentQuestion];
    questionEl.textContent = q.question;
    answersEl.innerHTML = "";
  
    q.answers.forEach((answer, index) => {
      const btn = document.createElement("button");
      btn.textContent = answer;
      btn.className = "bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-left";
      btn.addEventListener("click", () => checkAnswer(index));
      answersEl.appendChild(btn);
    });
  
    nextBtn.disabled = true;
    nextBtn.classList.add("opacity-50", "cursor-not-allowed");
  }
  
  function checkAnswer(selected) {
    const q = questions[currentQuestion];
    const buttons = answersEl.querySelectorAll("button");
  
    buttons.forEach((btn, i) => {
      btn.disabled = true;
      if (i === q.correct) {
        btn.classList.add("bg-green-600");
      } else if (i === selected) {
        btn.classList.add("bg-red-600");
      }
    });
  
    if (selected === q.correct) score++;
  
    nextBtn.disabled = false;
    nextBtn.classList.remove("opacity-50", "cursor-not-allowed");
  }
  
  function showResult() {
    quizContainer.classList.add("hidden");
    resultEl.classList.remove("hidden");
    resultEl.textContent = `Quiz Completed! You scored ${score} out of ${questions.length}.`;
    retryBtn.classList.remove("hidden");
  }
  