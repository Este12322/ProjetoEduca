document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.slider');
    const slides = document.querySelector('.slide');
    const slideWidth = document.querySelector('.retangulo').offsetWidth + 15; // largura do retângulo + margem
    let index = 0;

    document.querySelector('.next').addEventListener('click', () => {
        if (index < slides.children.length - 1) {
            index++;
            slider.style.transform = `translateX(-${index * slideWidth}px)`;
        }
    });

    document.querySelector('.prev').addEventListener('click', () => {
        if (index > 0) {
            index--;
            slider.style.transform = `translateX(-${index * slideWidth}px)`;
        }
    });
});

let index = 0;
        const images = document.querySelectorAll('#carousel img');
        const totalImages = images.length;
        let interval;

        function startCarousel() {
            interval = setInterval(() => {
                index = (index + 1) % totalImages;
                document.getElementById('carousel').style.transform = `translateX(${-index * 300}px)`;
            }, 2000);
        }

        function stopCarousel() {
            clearInterval(interval);
        }

        document.getElementById('stop').addEventListener('click', stopCarousel);
        document.getElementById('start').addEventListener('click', startCarousel);

        // Inicia o carrossel automaticamente
        // startCarousel();
