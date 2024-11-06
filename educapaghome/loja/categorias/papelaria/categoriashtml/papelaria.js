const carousel = document.querySelector('.carousel');
const prevBtn = document.querySelector('.carousel-control.prev');
const nextBtn = document.querySelector('.carousel-control.next');
let currentSlide = 0;

const totalItems = document.querySelectorAll('.category-item').length;
const visibleItems = 5; // Agora mostra 4 itens visíveis
const itemWidth = document.querySelector('.category-item').offsetWidth + 20; // Largura do item + gap

// Duplicar os itens para criar o loop
const firstItems = [...document.querySelectorAll('.category-item')].slice(0, visibleItems);
firstItems.forEach(item => {
    const clone = item.cloneNode(true);
    carousel.appendChild(clone); // Clona os primeiros itens no final para criar o efeito de loop
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
    currentSlide++;
    moveCarousel();
    
    // Voltar ao início sem transição quando chegar ao final
    if (currentSlide === totalItems) {
        setTimeout(() => {
            carousel.style.transition = 'none'; // Remove a transição
            currentSlide = 0;
            carousel.style.transform = `translateX(0px)`; // Volta ao início
        }, 500); // Tempo igual ao da transição (0.5s)
    }
});

// Movimento automático (opcional)
setInterval(() => {
    currentSlide++;
    moveCarousel();
    
    if (currentSlide === totalItems) {
        setTimeout(() => {
            carousel.style.transition = 'none';
            currentSlide = 0;
            carousel.style.transform = `translateX(0px)`;
        }, 500);
    }
}, 3000); // Tempo de 3 segundos para rotação automática
