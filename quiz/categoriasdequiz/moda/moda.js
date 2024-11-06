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
        question: "Qual estilista é famoso por popularizar o 'little black dress'?",
        answers: [
            { text: "Coco Chanel", correct: true },
            { text: "Christian Dior", correct: false },
            { text: "Giorgio Armani", correct: false },
            { text: "Versace", correct: false }
        ]
    },
    {
        question: "Qual é a tendência de moda que envolve roupas de estilo 'oversized'?",
        answers: [
            { text: "Minimalismo", correct: false },
            { text: "Streetwear", correct: true },
            { text: "Vintage", correct: false },
            { text: "Boho", correct: false }
        ]
    },
    {
        question: "Qual acessório é considerado essencial para completar um look?",
        answers: [
            { text: "Cinto", correct: false },
            { text: "Relógio", correct: false },
            { text: "Bolsas", correct: true },
            { text: "Óculos de sol", correct: false }
        ]
    },
    {
        question: "Qual é o tecido mais comum utilizado para fazer jeans?",
        answers: [
            { text: "Linho", correct: false },
            { text: "Algodão", correct: true },
            { text: "Poliéster", correct: false },
            { text: "Seda", correct: false }
        ]
    },
    {
        question: "Quem é conhecido como o 'Rei da Moda'?",
        answers: [
            { text: "Karl Lagerfeld", correct: false },
            { text: "Giorgio Armani", correct: false },
            { text: "Cristóbal Balenciaga", correct: true },
            { text: "Jean Paul Gaultier", correct: false }
        ]
    },
    {
        question: "Qual é a cor que simboliza a elegância e sofisticação?",
        answers: [
            { text: "Vermelho", correct: false },
            { text: "Preto", correct: true },
            { text: "Branco", correct: false },
            { text: "Azul", correct: false }
        ]
    },
    {
        question: "Qual dos seguintes é um tipo de sapato feminino?",
        answers: [
            { text: "Oxford", correct: false },
            { text: "Stiletto", correct: true },
            { text: "Tênis", correct: false },
            { text: "Botina", correct: false }
        ]
    },
    {
        question: "Qual é o evento mais famoso de moda realizado em Paris?",
        answers: [
            { text: "Fashion Week", correct: true },
            { text: "Met Gala", correct: false },
            { text: "Festival de Cannes", correct: false },
            { text: "Salão do Automóvel", correct: false }
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
