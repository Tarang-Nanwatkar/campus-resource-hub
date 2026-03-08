document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('scholarship-grid');
    const searchInput = document.getElementById('search-bar');
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const clearBtn = document.getElementById('clear-filters');
    const countLabel = document.getElementById('result-count');

    let allScholarships = [];

    // Fetch Data
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            allScholarships = data;
            renderScholarships(allScholarships);
        })
        .catch(error => {
            console.error('Error loading data:', error);
            grid.innerHTML = '<p>Error loading scholarships. Please try again later.</p>';
        });

    // Render Function
    function renderScholarships(items) {
        grid.innerHTML = '';

        if (items.length === 0) {
            grid.innerHTML = '<p>No scholarships found matching your criteria.</p>';
            countLabel.textContent = '0 results found';
            return;
        }

        countLabel.textContent = `Showing ${items.length} opportunities`;

        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card';
            
            // Format deadline nicely
            const deadlineDate = new Date(item.deadline);
            const dateString = deadlineDate.toLocaleDateString('en-IN', { 
                day: 'numeric', month: 'short', year: 'numeric' 
            });

            // Create Tags HTML
            const tagsHtml = item.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

            card.innerHTML = `
                <div class="card-header">
                    <span class="provider-badge">${item.provider}</span>
                </div>
                <h3>${item.title}</h3>
                <div class="amount">${item.amount}</div>
                <p class="desc">${item.description}</p>
                <div class="tags">${tagsHtml}</div>
                <div class="card-footer">
                    <div class="deadline">
                        <i class="far fa-clock"></i> Deadline: ${dateString}
                    </div>
                    <a href="#" class="apply-btn">Details</a>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    // Filtering Logic
    function filterData() {
        const query = searchInput.value.toLowerCase();
        
        // Get checked values from specific groups
        const checkedProviders = Array.from(document.querySelectorAll('.filter-group:nth-child(2) input:checked')).map(cb => cb.value);
        const checkedTypes = Array.from(document.querySelectorAll('.filter-group:nth-child(3) input:checked')).map(cb => cb.value);

        const filtered = allScholarships.filter(item => {
            // Search Text Match
            const matchesSearch = item.title.toLowerCase().includes(query) || 
                                  item.provider.toLowerCase().includes(query);
            
            // Category (Provider) Match
            const matchesProvider = checkedProviders.length === 0 || checkedProviders.includes(item.category);

            // Type Match
            const matchesType = checkedTypes.length === 0 || checkedTypes.includes(item.type);

            return matchesSearch && matchesProvider && matchesType;
        });

        renderScholarships(filtered);
    }

    // Event Listeners
    searchInput.addEventListener('input', filterData);
    checkboxes.forEach(box => box.addEventListener('change', filterData));
    
    clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        checkboxes.forEach(box => box.checked = false);
        renderScholarships(allScholarships);
    });
});