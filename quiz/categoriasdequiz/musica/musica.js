const $startGameButton = document.querySelector(".start-quiz")
const $nextQuestionButton = document.querySelector(".next-question")
const $questionsContainer = document.querySelector(".questions-container")
const $questionText = document.querySelector(".question")
const $answersContainer = document.querySelector(".answers-container")
const $answers = document.querySelectorAll(".answer")

let currentQuestionIndex = 0
let totalCorrect = 0

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)

function startGame() {
  $startGameButton.classList.add("hide")
  $questionsContainer.classList.remove("hide")
  displayNextQuestion()
}

function displayNextQuestion() {
  resetState()
  
  if (questions.length === currentQuestionIndex) {
    return finishGame()
  }

  $questionText.textContent = questions[currentQuestionIndex].question
  questions[currentQuestionIndex].answers.forEach(answer => {
    const newAsnwer = document.createElement("button")
    newAsnwer.classList.add("button", "answer")
    newAsnwer.textContent = answer.text
    if (answer.correct) {
      newAsnwer.dataset.correct = answer.correct
    }
    $answersContainer.appendChild(newAsnwer)

    newAsnwer.addEventListener("click", selectAnswer)
  })
}

function resetState() {
  while($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild)
  }

  document.body.removeAttribute("class")
  $nextQuestionButton.classList.add("hide")
}

function selectAnswer(event) {
  const answerClicked = event.target

  if (answerClicked.dataset.correct) {
    document.body.classList.add("correct")
    totalCorrect++
  } else {
    document.body.classList.add("incorrect") 
  }

  document.querySelectorAll(".answer").forEach(button => {
    button.disabled = true

    if (button.dataset.correct) {
      button.classList.add("correct")
    } else {
      button.classList.add("incorrect")
    }
  })
  
  $nextQuestionButton.classList.remove("hide")
  currentQuestionIndex++
}

function finishGame() {
  const totalQuestions = questions.length;
  const performance = Math.floor(totalCorrect * 100 / totalQuestions);
  
  let message = "";

  switch (true) {
    case (performance >= 90):
      message = "Excelente :)";
      break;
    case (performance >= 70):
      message = "Muito bom :)";
      break;
    case (performance >= 50):
      message = "Bom";
      break;
    default:
      message = "Pode melhorar :(";
  }

  $questionsContainer.innerHTML = 
  `
    <div class="final-message-container">
      <p class="final-message">
        Você acertou ${totalCorrect} de ${totalQuestions} questões!
        <span>Resultado: ${message}</span>
      </p>
      <button 
        onclick="window.location.reload()" 
        class="button"
      >
        Refazer teste
      </button>
    </div>
  `;
}

const questions = [
    {
      question: "Quem é conhecido como o 'Rei do Pop'?",
      answers: [
          { text: "Michael Jackson", correct: true },
        { text: "Elvis Presley", correct: false },
        { text: "Prince", correct: false },
        { text: "Madonna", correct: false }
      ]
    },
    {
      question: "Qual banda lançou a música 'Bohemian Rhapsody'?",
      answers: [
        { text: "The Beatles", correct: false },
        { text: "Queen", correct: true },
        { text: "Led Zeppelin", correct: false },
        { text: "The Rolling Stones", correct: false }
      ]
    },
    {
      question: "Qual é o nome da cantora que ficou famosa com a música 'Hello'?",
      answers: [
        { text: "Adele", correct: true },
        { text: "Beyoncé", correct: false },
        { text: "Taylor Swift", correct: false },
        { text: "Lady Gaga", correct: false }
      ]
    },
    {
      question: "Qual é o nome do famoso festival de música que acontece em Indio, Califórnia?",
      answers: [
        { text: "Glastonbury", correct: false },
        { text: "Lollapalooza", correct: false },
        { text: "Burning Man", correct: false },
        { text: "Coachella", correct: true }
      ]
    },
    {
      question: "Quem compôs a famosa sinfonia 'Nona Sinfonia'?",
      answers: [
          { text: "Brahms", correct: false },
          { text: "Mozart", correct: false },
          { text: "Chopin", correct: false },
          { text: "Beethoven", correct: true }
      ]
    },
    {
      question: "Qual artista é conhecido por seu estilo único e a música 'Shape of You'?",
      answers: [
          { text: "Justin Bieber", correct: false },
          { text: "Shawn Mendes", correct: false },
          { text: "Ed Sheeran", correct: true },
        { text: "Sam Smith", correct: false }
      ]
    },
    {
      question: "Qual é o nome da música tema do filme 'Titanic'?",
      answers: [
          { text: "I Will Always Love You", correct: false },
          { text: "Endless Love", correct: false },
          { text: "Unchained Melody", correct: false },
          { text: "My Heart Will Go On", correct: true }
      ]
    },
    {
      question: "Quem é a famosa cantora conhecida como a 'Rainha do Rock'?",
      answers: [
          { text: "Janis Joplin", correct: false },
          { text: "Whitney Houston", correct: false },
          { text: "Tina Turner", correct: true },
        { text: "Celine Dion", correct: false }
      ]
    },
  ];
  