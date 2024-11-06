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
        question: "Qual ingrediente é essencial para fazer pão?",
        answers: [
            { text: "Farinha", correct: true },
            { text: "Açúcar", correct: false },
            { text: "Sal", correct: false },
            { text: "Ovo", correct: false }
        ]
    },
    {
        question: "Qual prato é tradicionalmente associado à cozinha italiana?",
        answers: [
            { text: "Sushi", correct: false },
            { text: "Pizza", correct: true },
            { text: "Taco", correct: false },
            { text: "Curry", correct: false }
        ]
    },
    {
        question: "Qual é o principal ingrediente do guacamole?",
        answers: [
            { text: "Tomate", correct: false },
            { text: "Cebola", correct: false },
            { text: "Abacate", correct: true },
            { text: "Pimenta", correct: false }
        ]
    },
    {
        question: "Qual técnica de cozimento envolve a imersão de alimentos em água fervente?",
        answers: [
            { text: "Grelhar", correct: false },
            { text: "Fritar", correct: false },
            { text: "Escaldar", correct: true },
            { text: "Assar", correct: false }
        ]
    },
    {
        question: "Qual é o principal ingrediente da maionese?",
        answers: [
            { text: "Mostarda", correct: false },
            { text: "Óleo", correct: true },
            { text: "Vinagre", correct: false },
            { text: "Sal", correct: false }
        ]
    },
    {
        question: "Qual é o prato feito com arroz e frutos do mar, originário da Espanha?",
        answers: [
            { text: "Risoto", correct: false },
            { text: "Paella", correct: true },
            { text: "Biryani", correct: false },
            { text: "Fried Rice", correct: false }
        ]
    },
    {
        question: "Qual é o nome do doce francês feito de claras de ovo e açúcar?",
        answers: [
            { text: "Crème brûlée", correct: false },
            { text: "Mousse", correct: false },
            { text: "Merengue", correct: true },
            { text: "Éclair", correct: false }
        ]
    },
    {
        question: "Qual é a bebida tradicional feita a partir da fermentação de uvas?",
        answers: [
            { text: "Cerveja", correct: false },
            { text: "Vinho", correct: true },
            { text: "Sidra", correct: false },
            { text: "Champanhe", correct: false }
        ]
    },
];
