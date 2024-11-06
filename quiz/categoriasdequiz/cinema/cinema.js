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
      question: "Qual filme ganhou o Oscar de Melhor Filme em 1994?",
      answers: [
        { text: "Pulp Fiction", correct: false },
        { text: "Forrest Gump", correct: true },
        { text: "O Rei Leão", correct: false },
        { text: "Cidadão Kane", correct: false }
      ]
    },
    {
      question: "Quem dirigiu o filme 'Titanic'?",
      answers: [
        { text: "Steven Spielberg", correct: false },
        { text: "James Cameron", correct: true },
        { text: "Martin Scorsese", correct: false },
        { text: "Ridley Scott", correct: false }
      ]
    },
    {
      question: "Qual é o nome do personagem principal em 'O Senhor dos Anéis'?",
      answers: [
        { text: "Gandalf", correct: false },
        { text: "Frodo Bolseiro", correct: true },
        { text: "Gollum", correct: false },
        { text: "Legolas", correct: false }
      ]
    },
    {
      question: "Qual filme é conhecido pela frase 'Vou fazer uma oferta que ele não pode recusar'?",
      answers: [
        { text: "O Poderoso Chefão", correct: true },
        { text: "Scarface", correct: false },
        { text: "Os Intocáveis", correct: false },
        { text: "Cães de Aluguel", correct: false }
      ]
    },
    {
      question: "Quem é o famoso agente secreto britânico interpretado por Daniel Craig?",
      answers: [
        { text: "Ethan Hunt", correct: false },
        { text: "Jason Bourne", correct: false },
        { text: "James Bond", correct: true },
        { text: "Jack Ryan", correct: false }
      ]
    },
    {
      question: "Qual é o nome do filme de animação da Pixar sobre um ratinho cozinheiro?",
      answers: [
        { text: "Os Incríveis", correct: false },
        { text: "Monstros S.A.", correct: false },
        { text: "Procurando Nemo", correct: false },
        { text: "Ratatouille", correct: true }
      ]
    },
    {
      question: "Qual filme de 1977 é considerado o primeiro da saga 'Star Wars'?",
      answers: [
        { text: "O Retorno de Jedi", correct: false },
        { text: "Uma Nova Esperança", correct: true },
        { text: "O Império Contra-Ataca", correct: false },
        { text: "Os Últimos Jedi", correct: false }
      ]
    },
    {
      question: "Quem interpretou o Coringa em 'Coringa' (2019)?",
      answers: [
        { text: "Jack Nicholson", correct: false },
        { text: "Joaquin Phoenix", correct: true },
        { text: "Heath Ledger", correct: false },
        { text: "Jared Leto", correct: false }
      ]
    },
    {
      question: "Qual filme tem como protagonista um robô chamado Wall-E?",
      answers: [
        { text: "Os Incríveis", correct: false },
        { text: "Ratatouille", correct: false },
        { text: "Wall-E", correct: true },
        { text: "Procurando Nemo", correct: false }
      ]
    },
    {
      question: "Quem foi a primeira mulher a ganhar um Oscar de Melhor Direção?",
      answers: [
        { text: "Greta Gerwig", correct: false },
        { text: "Kathryn Bigelow", correct: true },
        { text: "Jane Campion", correct: false },
        { text: "Sofia Coppola", correct: false }
      ]
    },
];
