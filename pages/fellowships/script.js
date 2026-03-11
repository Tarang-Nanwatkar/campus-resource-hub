document.addEventListener('DOMContentLoaded', () => {
    const roleGrid = document.getElementById('role-grid');
    const resultCount = document.getElementById('result-count');
    const searchBar = document.getElementById('search-bar');
    const checkboxes = document.querySelectorAll('.checkbox-group input');
    const clearBtn = document.getElementById('clear-filters');

    let opportunities = [];

    // Fetch Data
    fetch('data.json')
        .then(res => {
            if (!res.ok) throw new Error("Could not find the JSON file");
            return res.json();
        })
        .then(data => {
            opportunities = data.opportunities; 
            displayRoles(opportunities);
        })
        .catch(err => {
            console.error("Error loading roles:", err);
            roleGrid.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-exclamation-triangle" style="font-size: 2rem; color: #ef4444; margin-bottom: 1rem; display: block;"></i>
                    <p>Error loading opportunities. Please ensure you are using a local server (like Live Server in VS Code).</p>
                </div>`;
        });

    // Display Function
    function displayRoles(roles) {
        if (roles.length === 0) {
            roleGrid.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search" style="font-size: 2.5rem; margin-bottom: 1rem; color: #cbd5e1; display: block;"></i>
                    <p style="font-weight: 600; color: #64748b;">No opportunities match your filters.</p>
                    <p style="font-size: 0.9rem; color: #94a3b8;">Try a different keyword or clear the filters.</p>
                </div>`;
            resultCount.textContent = "Showing 0 opportunities";
            return;
        }

        roleGrid.innerHTML = roles.map(role => {
            const modeIcon = role.workMode === 'Remote' ? 'fa-laptop-house' : 'fa-map-marker-alt';
            
            return `
                <article class="card">
                    <div class="card-header">
                        <span class="provider-badge ${role.providerClass}">${role.provider}</span>
                    </div>
                    <span class="company-name">${role.company}</span>
                    <h3>${role.title}</h3>
                    
                    <div class="role-details">
                        <span><i class="fas ${modeIcon}"></i> ${role.location}</span>
                        <span><i class="fas fa-clock"></i> ${role.duration}</span>
                    </div>

                    <p class="desc">${role.description}</p>
                    
                    <div class="tags">
                        ${role.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>

                    <div class="card-footer">
                        <span class="deadline"><i class="far fa-calendar-alt"></i> Closes: ${role.deadline}</span>
                        <a href="${role.link}" class="apply-btn">View Details</a>
                    </div>
                </article>
            `;
        }).join('');
        
        resultCount.textContent = `Showing ${roles.length} opportunities`;
    }

    // Filter
    function filterRoles() {
        const searchTerm = searchBar.value.toLowerCase();
        
        const activeFilters = Array.from(checkboxes)
            .filter(i => i.checked)
            .map(i => i.value);

        const filtered = opportunities.filter(role => {
            const matchesSearch = role.title.toLowerCase().includes(searchTerm) || 
                                 role.company.toLowerCase().includes(searchTerm);
            
            const matchesType = activeFilters.length === 0 || 
                               activeFilters.includes(role.type) || 
                               activeFilters.includes(role.duration) || 
                               activeFilters.includes(role.workMode);

            return matchesSearch && matchesType;
        });

        displayRoles(filtered);
    }

    // Event Listeners
    searchBar.addEventListener('input', filterRoles);
    
    checkboxes.forEach(cb => {
        cb.addEventListener('change', filterRoles);
    });

    clearBtn.addEventListener('click', () => {
        searchBar.value = '';
        checkboxes.forEach(cb => cb.checked = false);
        displayRoles(opportunities);
    });
});