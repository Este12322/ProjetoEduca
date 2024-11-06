// script.js

// Dados de exemplo para o blog
const blogPosts = [
    {
        date: "20 January, 2024",
        title: "Como Criar um Portfólio de Arte Impressionante",
        excerpt: "Descubra as melhores práticas para criar um portfólio de arte que impressione. Dicas e truques para destacar seu trabalho.",
        image: "images/blog-p-1.jpg"
    },
    {
        date: "22 January, 2024",
        title: "Tendências de Design para 2024",
        excerpt: "Explore as principais tendências de design para 2024 e como você pode aplicá-las em seus projetos.",
        image: "images/blog-p-2.jpg"
    },
    {
        date: "25 January, 2024",
        title: "Como Escolher a Paleta de Cores Perfeita",
        excerpt: "Aprenda a escolher a paleta de cores ideal para seus projetos de design com estas dicas práticas.",
        image: "images/blog-p-3.jpg"
    },
    // Adicione mais postagens conforme necessário
];

// Função para exibir as postagens no blog
function displayBlogPosts() {
    const blogContent = document.querySelector('.blog-content');
    blogContent.innerHTML = ''; // Limpa o conteúdo existente

    blogPosts.forEach(post => {
        const blogItem = document.createElement('div');
        blogItem.classList.add('blog-item');

        blogItem.innerHTML = `
            <div class="blog-img">
                <img src="${post.image}" alt="">
                <span><i class="far fa-heart"></i></span>
            </div>
            <div class="blog-text">
                <span>${post.date}</span>
                <h2>${post.title}</h2>
                <p>${post.excerpt}</p>
                <a href="#">Read More</a>
            </div>
        `;

        blogContent.appendChild(blogItem);
    });
}

// Carregar as postagens ao carregar a página
document.addEventListener('DOMContentLoaded', displayBlogPosts);
