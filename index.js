let questions = [];
let originalQuestions = [];
let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById("question");
const faceIconElement = document.getElementById("faceIcon");
const trophyIconElement = document.getElementById("trophyIcon");
const answerElement = document.getElementById("answer");
const fileUploadStatusElement = document.getElementById("file-upload-status");
const previousAnswersElement = document.getElementById("previous-answers");
const replayButton = document.getElementById("replay-button");
const gameTitle = document.getElementById("game-title");
const winTitle = document.getElementById("win-title");

document.getElementById("file-upload-button").addEventListener("click", () => {
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = ".txt";
  fileInput.click();

  fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    const fileReader = new FileReader();
    questionElement.style.display = "none";
    answerElement.style.display = "none";
    replayButton.style.display = "block";
    fileReader.onload = (e) => {
      originalQuestions = e.target.result
        .split("\n")
        .filter((line) => line.trim() !== "")
        .map((line) => line.split(","));
      gameTitle.textContent = originalQuestions.shift();
      questions = [...originalQuestions]; // Copy the original questions into questions array
      //   console.log(questions);
      fileUploadStatusElement.textContent = `${file.name} selected`;
      faceIconElement.style.display = "none";
      startGame();
      answerElement.focus();
    };

    fileReader.readAsText(file);
  });
});

answerElement.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    event.preventDefault(); // Prevent form submission
    handleFormSubmit();
  }
});

replayButton.addEventListener("click", (event) => {
  event.preventDefault();
  trophyIconElement.style.display = "none";
  winTitle.style.display = "none";
  startGame();
});

function startGame() {
  console.log(originalQuestions);
  questions = JSON.parse(JSON.stringify(originalQuestions)); // Create a deep copy from originalQuestions
  shuffleArray(questions);
  score = 0;
  currentQuestionIndex = 0;
  previousAnswersElement.innerHTML = "";
  questionElement.src = "Logo/faceIcon.png";
  questionElement.style.display = "block";
  answerElement.style.display = "block";
  replayButton.style.display = "none";
  showQuestion();
}

function showQuestion() {
  if (currentQuestionIndex < questions.length) {
    questionElement.textContent = questions[currentQuestionIndex][0];
    answerElement.placeholder = "Enter answer";
  } else {
    trophyIconElement.src = "Logo/trophyIcon.png";
    trophyIconElement.style.display = "block";
    winTitle.style.display = "block";
    // alert(`You've answered all the questions! Your score: ${score}`);
    questionElement.style.display = "none";
    answerElement.style.display = "none";
    replayButton.style.display = "block";
  }
}

function handleFormSubmit() {
  const userAnswer = answerElement.value.trim().toLowerCase();
  const correctAnswer = questions[currentQuestionIndex][1].trim().toLowerCase();
  if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
    score++;
    const listItem = document.createElement("li");
    listItem.textContent = correctAnswer;
    previousAnswersElement.appendChild(listItem);
    currentQuestionIndex++;
    showQuestion();
  } else {
    answerElement.placeholder = "Wrong answer, try again please..";
  }

  answerElement.value = "";
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
