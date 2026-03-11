document.addEventListener('DOMContentLoaded', () => {
    /* =========================================
       MOBILE MENU TOGGLE
       ========================================= */
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }

    /* =========================================
       SEARCH FUNCTIONALITY
       ========================================= */
    const searchButton = document.querySelector('.search-box button');
    const searchInput = document.querySelector('.search-box input');

    if (searchButton && searchInput) {
        searchButton.addEventListener('click', performSearch);
        
        // Allow pressing "Enter" to search
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    function performSearch() {
        const query = searchInput.value.trim();
        if (query) {
            console.log(`Searching for: ${query}`);
            alert(`You searched for: ${query}\n(Search functionality to be implemented)`);
        }
    }

    /* =========================================
       SMOOTH SCROLLING
       ========================================= */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
    document.getElementById('more-btn').addEventListener('click', function(e) {
    e.preventDefault();
    alert("This page is currently under development. Stay tuned!");
});
});