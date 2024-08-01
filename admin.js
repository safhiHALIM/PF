document.addEventListener('DOMContentLoaded', function() {
    loadArticles();

    document.getElementById('blogForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const index = document.getElementById('editIndex').value;
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        const image = document.getElementById('image').value;
        const video = document.getElementById('video').value;
        const isValidated = document.getElementById('isValidated').value === 'true';

        const articles = JSON.parse(localStorage.getItem('articles')) || [];

        if (index === '') {
            articles.push({ title, content, image, video, isValidated });
        } else {
            articles[index] = { title, content, image, video, isValidated };
        }

        localStorage.setItem('articles', JSON.stringify(articles));
        document.getElementById('blogForm').reset();
        document.getElementById('editIndex').value = '';
        document.getElementById('isValidated').value = 'false'; // Réinitialiser la valeur par défaut
        document.getElementById('saveBtn').textContent = 'Ajouter Article';
        loadArticles();
    });
});

function loadArticles() {
    const articlesList = document.getElementById('articlesList');
    const articles = JSON.parse(localStorage.getItem('articles')) || [];
    articlesList.innerHTML = '';

    articles.forEach((article, index) => {
        const articleDiv = document.createElement('div');
        articleDiv.classList.add('col-md-6');
        articleDiv.innerHTML = `
            <div class="card mb-4">
                ${article.video ? `<div class="embed-responsive embed-responsive-16by9">
                                    <iframe class="embed-responsive-item" src="${article.video}" allowfullscreen></iframe>
                                    </div>` : ''}
                ${article.image ? `<img src="${article.image}" class="card-img-top" alt="Article Image">` : ''}
                <div class="card-body">
                    <h5 class="card-title">${article.title}</h5>
                    <p class="card-text">${article.content}</p>
                    <button class="btn btn-warning btn-sm" onclick="editArticle(${index})">Modifier</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteArticle(${index})">Supprimer</button>
                    ${!article.isValidated ? `<button class="btn btn-success btn-sm" onclick="validateArticle(${index})">Valider</button>` : ''}
                </div>
            </div>
        `;
        articlesList.appendChild(articleDiv);
    });
}

function editArticle(index) {
    const articles = JSON.parse(localStorage.getItem('articles')) || [];
    const article = articles[index];

    document.getElementById('title').value = article.title;
    document.getElementById('content').value = article.content;
    document.getElementById('image').value = article.image;
    document.getElementById('video').value = article.video;
    document.getElementById('editIndex').value = index;
    document.getElementById('isValidated').value = article.isValidated;
    document.getElementById('saveBtn').textContent = 'Modifier Article';
}

function deleteArticle(index) {
    const articles = JSON.parse(localStorage.getItem('articles')) || [];
    articles.splice(index, 1);
    localStorage.setItem('articles', JSON.stringify(articles));
    loadArticles();
}

function validateArticle(index) {
    const articles = JSON.parse(localStorage.getItem('articles')) || [];
    articles[index].isValidated = true;
    localStorage.setItem('articles', JSON.stringify(articles));
    loadArticles();
}
