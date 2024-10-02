const carousel = document.querySelector('.carousel');
const prevBtn = document.querySelector('.carousel-control.prev');
const nextBtn = document.querySelector('.carousel-control.next');
let currentSlide = 0;
let currentHighlightedIndex = -1; // Indica a imagem atualmente em destaque

const totalItems = document.querySelectorAll('.category-item').length;
const visibleItems = 5; // Número de itens visíveis
let itemWidth = document.querySelector('.category-item').offsetWidth + 20; // Largura do item + gap

// Duplicar os itens para criar o loop
const firstItems = [...document.querySelectorAll('.category-item')].slice(0, visibleItems);
firstItems.forEach(item => {
    const clone = item.cloneNode(true);
    carousel.appendChild(clone); // Clona os primeiros itens no final
});

// Função para mover o carrossel
function moveCarousel() {
    carousel.style.transition = 'transform 0.5s ease-in-out';
    carousel.style.transform = `translateX(-${currentSlide * itemWidth}px)`;
}

// Setas de controle
prevBtn.addEventListener('click', () => {
    if (currentSlide > 0) {
        currentSlide--;
        moveCarousel();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentSlide < totalItems - visibleItems) {
        currentSlide++;
        moveCarousel();
    }
});

// Função para destacar a imagem
function selectImage(selectedIndex) {
    const items = document.querySelectorAll('.category-item');
    
    // Destaca a imagem selecionada
    if (currentHighlightedIndex !== -1) {
        items[currentHighlightedIndex].classList.remove('selected', 'blur'); // Remove destaque e blur da anterior
    }

    currentHighlightedIndex = selectedIndex; // Atualiza o índice da imagem em destaque
    items[selectedIndex].classList.add('selected'); // Adiciona classe de destaque

    // Aplica blur nas outras imagens
    items.forEach((item, index) => {
        if (index !== selectedIndex) {
            item.classList.add('blur');
        }
    });
}

// Adiciona eventos de clique para cada item do carrossel
document.querySelectorAll('.category-item').forEach((item, index) => {
    item.addEventListener('click', () => selectImage(index));
});

// Atualiza o carrossel na mudança de tamanho da janela
window.addEventListener('resize', () => {
    itemWidth = document.querySelector('.category-item').offsetWidth + 20; // Atualiza a largura
    moveCarousel(); // Ajusta a posição
});
