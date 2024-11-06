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
    question: "Quem foi o primeiro presidente dos Estados Unidos?",
    answers: [
      { text: "George Washington", correct: true },
      { text: "Thomas Jefferson", correct: false },
      { text: "Abraham Lincoln", correct: false },
      { text: "John Adams", correct: false }
    ]
  },
  {
    question: "Qual civilização construiu as pirâmides do Egito?",
    answers: [
      { text: "Maia", correct: false },
      { text: "Egípcia", correct: true },
      { text: "Inca", correct: false },
      { text: "Suméria", correct: false }
    ]
  },
  {
    question: "Em que ano ocorreu a Revolução Francesa?",
    answers: [
      { text: "1776", correct: false },
      { text: "1799", correct: false },
      { text: "1804", correct: false },
      { text: "1789", correct: true }
    ]
  },
  {
    question: "Quem foi o autor da teoria da evolução?",
    answers: [
      { text: "Albert Einstein", correct: false },
      { text: "Charles Darwin", correct: true },
      { text: "Isaac Newton", correct: false },
      { text: "Galileu Galilei", correct: false }
    ]
  },
  {
    question: "Qual foi o principal motivo da queda do Muro de Berlim?",
    answers: [
      { text: "Guerra Fria", correct: false },
      { text: "Reformas políticas", correct: true },
      { text: "Unificação da Alemanha", correct: false },
      { text: "Crise econômica", correct: false }
    ]
  },
  {
    question: "Quem foi a rainha da Inglaterra durante a maior parte do século XIX?",
    answers: [
      { text: "Elizabeth I", correct: false },
      { text: "Maria I", correct: false },
      { text: "Victoria", correct: true },
      { text: "Anne", correct: false }
    ]
  },
  {
    question: "Qual foi a primeira civilização a usar a escrita?",
    answers: [
      { text: "Mesopotâmia", correct: true },
      { text: "Egito", correct: false },
      { text: "China", correct: false },
      { text: "Grecia", correct: false }
    ]
  },
  {
    question: "Quem descobriu a América?",
    answers: [
      { text: "Pedro Álvares Cabral", correct: false },
      { text: "Vasco da Gama", correct: false },
      { text: "Ferdinando Magalhães", correct: false },
      { text: "Cristóvão Colombo", correct: true }
    ]
  },
];
