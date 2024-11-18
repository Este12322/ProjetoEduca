const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
let cards;
let interval;
let firstCard = false;
let secondCard = false;

// Itens do jogo (cartas)
const items = [
  { name: "bee", image: "bee.png" },
  { name: "crocodile", image: "crocodile.png" },
  { name: "macaw", image: "macaw.png" },
  { name: "gorilla", image: "gorilla.png" },
  { name: "tiger", image: "tiger.png" },
  { name: "monkey", image: "monkey.png" },
  { name: "chameleon", image: "chameleon.png" },
  { name: "piranha", image: "piranha.png" },
  { name: "anaconda", image: "anaconda.png" },
  { name: "sloth", image: "sloth.png" },
  { name: "cockatoo", image: "cockatoo.png" },
  { name: "toucan", image: "toucan.png" },
];

// Variáveis do tempo e movimentos
let seconds = 0,
  minutes = 0;
let movesCount = 0,
  winCount = 0;

// Função para gerar o tempo
const timeGenerator = () => {
  seconds += 1;
  if (seconds >= 60) {
    minutes += 1;
    seconds = 0;
  }
  let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
  timeValue.innerHTML = `<span>Tempo:</span>${minutesValue}:${secondsValue}`;
};

// Função para contar os movimentos
const movesCounter = () => {
  movesCount += 1;
  moves.innerHTML = `<span>Movimentos:</span>${movesCount}`;
};

// Função para gerar cartas aleatórias (embaralhamento)
const generateRandom = (size = 4) => {
  let tempArray = [...items];
  let cardValues = [];
  size = (size * size) / 2; // O número de pares de cartas será metade do tamanho
  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * tempArray.length);
    cardValues.push(tempArray[randomIndex]);
    tempArray.splice(randomIndex, 1); // Remove o item para não repetir
  }
  return cardValues;
};

// Função para criar o grid de cartas
const matrixGenerator = (cardValues, size = 4) => {
  gameContainer.innerHTML = ""; // Limpa as cartas anteriores
  cardValues = [...cardValues, ...cardValues]; // Duplicamos as cartas para ter pares
  cardValues.sort(() => Math.random() - 0.5); // Embaralha as cartas

  // Cria o grid de cartas
  for (let i = 0; i < size * size; i++) {
    gameContainer.innerHTML += `
      <div class="card-container" data-card-value="${cardValues[i].name}">
        <div class="card-before">?</div>
        <div class="card-after">
          <img src="${cardValues[i].image}" class="image" />
        </div>
      </div>
    `;
  }

  // Organiza o grid de cartas
  gameContainer.style.gridTemplateColumns = `repeat(${size}, auto)`;

  // Adiciona eventos de clique nas cartas
  cards = document.querySelectorAll(".card-container");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      if (!card.classList.contains("matched")) { // Ignora as cartas já pareadas
        card.classList.add("flipped"); // Vira a carta
        if (!firstCard) { // Se não há uma primeira carta
          firstCard = card;
          firstCardValue = card.getAttribute("data-card-value");
        } else {
          movesCounter(); // Conta o movimento
          secondCard = card;
          let secondCardValue = card.getAttribute("data-card-value");
          if (firstCardValue === secondCardValue) { // Se as cartas combinarem
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            firstCard = false;
            winCount += 1;
            if (winCount === Math.floor(cardValues.length / 2)) { // Se todas as cartas forem combinadas
              result.innerHTML = `<h2>Parabéns Você Ganhou!</h2>
                                  <h4>Movimentos: ${movesCount}</h4>`;
              stopGame();
            }
          } else { // Se as cartas não combinarem
            let [tempFirst, tempSecond] = [firstCard, secondCard];
            firstCard = false;
            secondCard = false;
            setTimeout(() => {
              tempFirst.classList.remove("flipped");
              tempSecond.classList.remove("flipped");
            }, 1000); // Dá tempo para o jogador ver a carta
          }
        }
      }
    });
  });
};

// Função para parar o jogo
const stopGame = () => {
  clearInterval(interval); // Para o cronômetro
  stopButton.classList.remove("hide"); // Mostra o botão de reiniciar
};

// Função para reiniciar o jogo
stopButton.addEventListener("click", () => {
  // Resetar variáveis de tempo, movimentos e estado do jogo
  seconds = 0;
  minutes = 0;
  movesCount = 0;
  winCount = 0;
  result.innerHTML = "";
  timeValue.innerHTML = `<span>Tempo:</span>00:00`;

  // Vira todas as cartas de volta
  cards.forEach(card => {
    card.classList.remove("flipped", "matched");
  });

  // Reiniciar o jogo com um novo conjunto de cartas
  matrixGenerator(generateRandom(), 4);

  // Reiniciar o cronômetro
  interval = setInterval(timeGenerator, 1000);

  // Esconder o botão de reiniciar
  stopButton.classList.add("hide");
});

// Começar o jogo automaticamente ao carregar a página
window.onload = () => {
  matrixGenerator(generateRandom(), 4); // Inicia com um novo conjunto de cartas
  interval = setInterval(timeGenerator, 1000); // Inicia o cronômetro
};

const StopButton = document.getElementById("stop");

// Função para recarregar a página quando o botão "Reiniciar" for clicado
stopButton.addEventListener("click", () => {
  location.reload();  // Isso recarrega a página e reinicia o jogo
});
const checkWin = (cardValues) => {
  if (winCount === Math.floor(cardValues.length / 2)) {
    // Exibe a mensagem de vitória
    result.innerHTML = `<h2>Parabéns! Você venceu!</h2>
    <h4>Movimentos: ${movesCount}</h4>
    <p>Você completou o jogo. Clique em "Reiniciar" para jogar novamente.</p>`;
    
    // Exibe o botão de reiniciar
    stopButton.classList.remove("hide");
  }
};

