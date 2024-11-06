const $startGameButton = document.querySelector(".start-quiz");
const $nextQuestionButton = document.querySelector(".next-question");
const $questionsContainer = document.querySelector(".questions-container");
const $questionText = document.querySelector(".question");
const $answersContainer = document.querySelector(".answers-container");

let currentQuestionIndex = 0;
let totalCorrect = 0;

$startGameButton.addEventListener("click", startGame);
$nextQuestionButton.addEventListener("click", displayNextQuestion);

const fashionQuestions = [
    {
        question: "Qual é o maior mamífero do mundo?",
        answers: [
            { text: "Elefante", correct: false },
            { text: "Baleia Azul", correct: true },
            { text: "Girafa", correct: false },
            { text: "Tubarão", correct: false }
        ]
    },
    {
        question: "Qual animal é conhecido por ser o melhor amigo do homem?",
        answers: [
            { text: "Gato", correct: false },
            { text: "Pássaro", correct: false },
            { text: "Cachorro", correct: true },
            { text: "Coelho", correct: false }
        ]
    },
    {
        question: "Qual é a ave mais rápida do mundo?",
        answers: [
            { text: "Falcão Peregrino", correct: true },
            { text: "Águia", correct: false },
            { text: "Pavão", correct: false },
            { text: "Corvo", correct: false }
        ]
    },
    {
        question: "Qual mamífero é conhecido por ter a cauda mais longa?",
        answers: [
            { text: "Canguru", correct: false },
            { text: "Tigre", correct: false },
            { text: "Raposa", correct: false },
            { text: "Macaco", correct: true }
        ]
    },
    {
        question: "Qual é o animal terrestre mais rápido?",
        answers: [
            { text: "Leão", correct: false },
            { text: "Cavalo", correct: false },
            { text: "Antílope", correct: false },
            { text: "Guepardo", correct: true }
        ]
    },
    {
        question: "Qual animal é conhecido por mudar de cor?",
        answers: [
            { text: "Lobo", correct: false },
            { text: "Raposa", correct: false },
            { text: "Camaleão", correct: true },
            { text: "Gato", correct: false }
        ]
    },
    {
        question: "Qual é o único mamífero que pode voar?",
        answers: [
            { text: "Esquilo", correct: false },
            { text: "Morcego", correct: true },
            { text: "Pássaro", correct: false },
            { text: "Furão", correct: false }
        ]
    },
    {
        question: "Qual animal é conhecido por ser um excelente nadador?",
        answers: [
            { text: "Tubarão", correct: true },
            { text: "Cavalo", correct: false },
            { text: "Elefante", correct: false },
            { text: "Gato", correct: false }
        ]
    },
];

function startGame() {
    $startGameButton.classList.add("hide");
    $questionsContainer.classList.remove("hide");
    displayNextQuestion();
}

function displayNextQuestion() {
    resetState();
    
    if (fashionQuestions.length === currentQuestionIndex) {
        return finishGame();
    }

    $questionText.textContent = fashionQuestions[currentQuestionIndex].question;
    fashionQuestions[currentQuestionIndex].answers.forEach(answer => {
        const newAnswer = document.createElement("button");
        newAnswer.classList.add("button", "answer");
        newAnswer.textContent = answer.text;
        if (answer.correct) {
            newAnswer.dataset.correct = answer.correct;
        }
        $answersContainer.appendChild(newAnswer);

        newAnswer.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    while ($answersContainer.firstChild) {
        $answersContainer.removeChild($answersContainer.firstChild);
    }

    document.body.removeAttribute("class");
    $nextQuestionButton.classList.add("hide");
}

function selectAnswer(event) {
    const answerClicked = event.target;

    if (answerClicked.dataset.correct) {
        document.body.classList.add("correct");
        totalCorrect++;
    } else {
        document.body.classList.add("incorrect"); 
    }

    document.querySelectorAll(".answer").forEach(button => {
        button.disabled = true;

        if (button.dataset.correct) {
            button.classList.add("correct");
        } else {
            button.classList.add("incorrect");
        }
    });
    
    $nextQuestionButton.classList.remove("hide");
    currentQuestionIndex++;
}

function finishGame() {
    const totalQuestions = fashionQuestions.length;
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
