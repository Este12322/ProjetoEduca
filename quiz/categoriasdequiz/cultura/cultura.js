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
      question: "Qual é o maior planeta do sistema solar?",
      answers: [
        { text: "Terra", correct: false },
        { text: "Júpiter", correct: true },
        { text: "Marte", correct: false },
        { text: "Saturno", correct: false }
      ]
    },
    {
      question: "Qual é a capital da França?",
      answers: [
        { text: "Berlim", correct: false },
        { text: "Madri", correct: false },
        { text: "Paris", correct: true },
        { text: "Lisboa", correct: false }
      ]
    },
    {
      question: "Quem escreveu 'Dom Casmurro'?",
      answers: [
        { text: "Machado de Assis", correct: true },
        { text: "Jorge Amado", correct: false },
        { text: "Clarice Lispector", correct: false },
        { text: "Carlos Drummond de Andrade", correct: false }
      ]
    },
    {
      question: "Qual é o elemento químico com o símbolo 'O'?",
      answers: [
        { text: "Ouro", correct: false },
        { text: "Oxigênio", correct: true },
        { text: "Ósmio", correct: false },
        { text: "Oganessônio", correct: false }
      ]
    },
    {
      question: "Em que ano o homem pisou na Lua pela primeira vez?",
      answers: [
        { text: "1965", correct: false },
        { text: "1969", correct: true },
        { text: "1971", correct: false },
        { text: "1975", correct: false }
      ]
    },
    {
      question: "Qual é a língua mais falada no mundo?",
      answers: [
        { text: "Inglês", correct: false },
        { text: "Mandarim", correct: true },
        { text: "Espanhol", correct: false },
        { text: "Hindi", correct: false }
      ]
    },
    {
      question: "Quem pintou a Mona Lisa?",
      answers: [
        { text: "Vincent van Gogh", correct: false },
        { text: "Pablo Picasso", correct: false },
        { text: "Leonardo da Vinci", correct: true },
        { text: "Claude Monet", correct: false }
      ]
    },
    {
      question: "Qual é o rio mais longo do mundo?",
      answers: [
        { text: "Rio Amazonas", correct: false },
        { text: "Rio Yangtze", correct: false },
        { text: "Rio Mississippi", correct: false },
        { text: "Rio Nilo", correct: true }
      ]
    },
  ];
  