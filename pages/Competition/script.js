document.addEventListener('DOMContentLoaded', () => {
    const compGrid = document.getElementById('compGrid');
    const searchInput = document.getElementById('searchInput');
    let allCompetitions = [];

    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            allCompetitions = data.competitions;
            displayCompetitions(allCompetitions);
        })
        .catch(error => console.error('Error loading competitions:', error));

    function displayCompetitions(comps) {
        compGrid.innerHTML = comps.map(item => `
            <a href="${item.link}" class="comp-card-link">
                <article class="comp-card">
                    <span class="tag">${item.tag}</span>
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <div class="comp-meta">
                        <span>Status:</span>
                        <span class="status-pill ${item.statusClass}">${item.status}</span>
                    </div>
                </article>
            </a>
        `).join('');
    }

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filtered = allCompetitions.filter(comp => 
            comp.title.toLowerCase().includes(searchTerm) || 
            comp.tag.toLowerCase().includes(searchTerm)
        );
        displayCompetitions(filtered);
    });
});