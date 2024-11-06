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
            question: "Qual é a empresa criadora do iPhone?",
            answers: [
                { text: "Samsung", correct: false },
                { text: "Apple", correct: true },
                { text: "Nokia", correct: false },
                { text: "Microsoft", correct: false }
            ]
        },
        {
            question: "O que é um 'byte'?",
            answers: [
                { text: "Uma unidade de dados", correct: true },
                { text: "Um tipo de software", correct: false },
                { text: "Um modelo de computador", correct: false },
                { text: "Um sistema operacional", correct: false }
            ]
        },
        {
            question: "Qual é o nome do sistema operacional da Microsoft?",
            answers: [
                { text: "Linux", correct: false },
                { text: "MacOS", correct: false },
                { text: "Android", correct: false },
                { text: "Windows", correct: true }
            ]
        },
        {
            question: "Qual é a rede social mais popular do mundo?",
            answers: [
                { text: "Twitter", correct: false },
                { text: "Instagram", correct: false },
                { text: "Facebook", correct: true },
                { text: "LinkedIn", correct: false }
            ]
        },
        {
            question: "O que significa a sigla 'AI' em tecnologia?",
            answers: [
                { text: "Artificial Intelligence", correct: true },
                { text: "Automatic Information", correct: false },
                { text: "Advanced Interface", correct: false },
                { text: "Algorithm Improvement", correct: false }
            ]
        },
        {
            question: "Qual é a linguagem de programação mais popular atualmente?",
            answers: [
                { text: "Java", correct: false },
                { text: "C++", correct: false },
                { text: "Ruby", correct: false },
                { text: "Python", correct: true }
            ]
        },
        {
            question: "Qual é a principal função de um navegador de internet?",
            answers: [
                { text: "Armazenar dados", correct: false },
                { text: "Proteger vírus", correct: false },
                { text: "Acessar sites", correct: true },
                { text: "Desenhar gráficos", correct: false }
            ]
        },
        {
            question: "O que é 'cloud computing'?",
            answers: [
                { text: "Armazenamento local", correct: false },
                { text: "Armazenamento em nuvem", correct: true },
                { text: "Computação quântica", correct: false },
                { text: "Redes sociais", correct: false }
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
