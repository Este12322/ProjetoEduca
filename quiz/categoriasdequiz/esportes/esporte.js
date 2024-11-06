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
        question: "Qual destes esportes é jogado com uma bola oval?",
        answers: [
            { text: "Futebol", correct: false },
            { text: "Rugby", correct: true },
            { text: "Basquete", correct: false },
            { text: "Voleibol", correct: false }
        ]
    },
    {
        question: "Qual atleta é conhecido como o 'Rei do Futebol'?",
        answers: [
            { text: "Pelé", correct: true },
            { text: "Maradona", correct: false },
            { text: "Messi", correct: false },
            { text: "Cristiano Ronaldo", correct: false }
        ]
    },
    {
        question: "Qual destes esportes é jogado em uma quadra?",
        answers: [
            { text: "Natação", correct: false },
            { text: "Futebol", correct: false },
            { text: "Tênis", correct: true },
            { text: "Canoagem", correct: false }
        ]
    },
    {
        question: "Qual destes países é conhecido por sua tradição no futebol?",
        answers: [
            { text: "Canadá", correct: false },
            { text: "África do Sul", correct: false },
            { text: "Índia", correct: false },
            { text: "Brasil", correct: true }
        ]
    },
    {
        question: "Qual destes esportes é uma competição olímpica?",
        answers: [
            { text: "Canoagem", correct: true },
            { text: "Críquete", correct: false },
            { text: "Futebol Americano", correct: false },
            { text: "Rugby", correct: false }
        ]
    },
    {
        question: "Quem é conhecido como um dos maiores nadadores da história?",
        answers: [
            { text: "Usain Bolt", correct: false },
            { text: "Roger Federer", correct: false },
            { text: "Michael Phelps", correct: true },
            { text: "Lionel Messi", correct: false }
        ]
    },
    {
        question: "Qual destes esportes utiliza raquetes?",
        answers: [
            { text: "Squash", correct: true },
            { text: "Golfe", correct: false },
            { text: "Futebol", correct: false },
            { text: "Rugby", correct: false }
        ]
    },
    {
        question: "Qual destes é considerado um esporte de inverno?",
        answers: [
            { text: "Surf", correct: false },
            { text: "Esqui", correct: true },
            { text: "Futebol", correct: false },
            { text: "Voleibol", correct: false }
        ]
    },
];
