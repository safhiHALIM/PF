function loadSection(section) {
    fetch(`${section}.html`)
        .then(response => response.text())
        .then(data => {
            document.getElementById('content').innerHTML = data;
        })
        .catch(error => console.error('Error loading section:', error));
}

// Charger la section Home par défaut
document.addEventListener('DOMContentLoaded', function() {
    loadSection('home');
});
