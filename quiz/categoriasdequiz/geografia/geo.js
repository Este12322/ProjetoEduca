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
        question: "Qual é a capital da França?",
        answers: [
            { text: "Paris", correct: true },
            { text: "Londres", correct: false },
            { text: "Berlim", correct: false },
            { text: "Madrid", correct: false }
        ]
    },
    {
        question: "Qual país tem a maior população do mundo?",
        answers: [
            { text: "Índia", correct: false },
            { text: "China", correct: true },
            { text: "Estados Unidos", correct: false },
            { text: "Brasil", correct: false }
        ]
    },
    {
        question: "Qual é o deserto mais extenso do mundo?",
        answers: [
            { text: "Gobi", correct: false },
            { text: "Kalahari", correct: false },
            { text: "Saara", correct: true },
            { text: "Atacama", correct: false }
        ]
    },
    {
        question: "Qual é a montanha mais alta do mundo?",
        answers: [
            { text: "K2", correct: false },
            { text: "Mont Blanc", correct: false },
            { text: "Everest", correct: true },
            { text: "Kangchenjunga", correct: false }
        ]
    },
    {
        question: "Qual é o maior oceano do planeta?",
        answers: [
            { text: "Atlântico", correct: false },
            { text: "Índico", correct: false },
            { text: "Ártico", correct: false },
            { text: "Pacífico", correct: true }
        ]
    },
    {
        question: "Qual é a capital do Japão?",
        answers: [
            { text: "Seul", correct: false },
            { text: "Tóquio", correct: true },
            { text: "Pequim", correct: false },
            { text: "Bangkok", correct: false }
        ]
    },
    {
        question: "Qual país é conhecido como a 'Terra do Sol Nascente'?",
        answers: [
            { text: "Coreia do Sul", correct: false },
            { text: "Japão", correct: true },
            { text: "Tailândia", correct: false },
            { text: "China", correct: false }
        ]
    },
    {
        question: "Qual é o rio mais longo do mundo?",
        answers: [
            { text: "Nilo", correct: false },
            { text: "Yangtze", correct: false },
            { text: "Mississippi", correct: false },
            { text: "Amazonas", correct: true }
        ]
    },
];
