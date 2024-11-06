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
        question: "Quem escreveu 'Dom Casmurro'?",
        answers: [
            { text: "Machado de Assis", correct: true },
            { text: "Joaquim Manuel de Macedo", correct: false },
            { text: "José de Alencar", correct: false },
            { text: "Eça de Queirós", correct: false }
        ]
    },
    {
        question: "Qual é o autor de '1984'?",
        answers: [
            { text: "Ray Bradbury", correct: false },
            { text: "George Orwell", correct: true },
            { text: "Aldous Huxley", correct: false },
            { text: "Fahrenheit 451", correct: false }
        ]
    },
    {
        question: "Qual obra é considerada um clássico da literatura americana?",
        answers: [
            { text: "O Grande Gatsby", correct: true },
            { text: "Cem Anos de Solidão", correct: false },
            { text: "Orgulho e Preconceito", correct: false },
            { text: "Dom Quixote", correct: false }
        ]
    },
    {
        question: "Quem é o autor de 'A Metamorfose'?",
        answers: [
            { text: "Gabriel García Márquez", correct: false },
            { text: "Fiódor Dostoiévski", correct: false },
            { text: "Franz Kafka", correct: true },
            { text: "Virginia Woolf", correct: false }
        ]
    },
    {
        question: "Qual é o nome da famosa série de livros de J.K. Rowling?",
        answers: [
            { text: "As Crônicas de Nárnia", correct: false },
            { text: "Harry Potter", correct: true },
            { text: "Percy Jackson", correct: false },
            { text: "Senhor dos Anéis", correct: false }
        ]
    },
    {
        question: "Quem escreveu 'O Alquimista'?",
        answers: [
            { text: "Chico Buarque", correct: false },
            { text: "José Saramago", correct: false },
            { text: "Clarice Lispector", correct: false },
            { text: "Paulo Coelho", correct: true }
        ]
    },
    {
        question: "Qual é o tema central de 'A Divina Comédia'?",
        answers: [
            { text: "A busca pela fama", correct: false },
            { text: "A guerra", correct: false },
            { text: "A vida após a morte", correct: true },
            { text: "A política", correct: false }
        ]
    },
    {
        question: "Quem escreveu 'Orgulho e Preconceito'?",
        answers: [
            { text: "Emily Brontë", correct: false },
            { text: "Charlotte Brontë", correct: false },
            { text: "Mary Shelley", correct: false },
            { text: "Jane Austen", correct: true }
        ]
    },
];
