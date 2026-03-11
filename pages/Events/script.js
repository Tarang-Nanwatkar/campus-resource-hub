document.addEventListener('DOMContentLoaded', () => {
    const universityGrid = document.getElementById('universityGrid');
    const clubGrid = document.getElementById('clubGrid');

    fetch('data.json')
        .then(res => {
            if (!res.ok) throw new Error("Could not load JSON data");
            return res.json();
        })
        .then(data => {
            renderUniversityEvents(data.universityEvents);
            renderClubActivities(data.clubActivities);
        })
        .catch(err => console.error(err));

    function renderUniversityEvents(events) {
        universityGrid.innerHTML = events.map(event => `
            <a href="${event.link}" class="card-link">
                <div class="event-card">
                    <div class="date-box">
                        <span class="day">${event.day}</span>
                        <span class="month">${event.month}</span>
                    </div>
                    <div class="event-details">
                        <span class="event-category ${event.categoryClass}">${event.category}</span>
                        <h3 class="event-title">${event.title}</h3>
                        <p class="event-desc">${event.desc}</p>
                        <div class="event-meta">
                            <span><i class="far fa-clock"></i> ${event.time}</span>
                            <span><i class="fas fa-map-marker-alt"></i> ${event.location}</span>
                        </div>
                    </div>
                </div>
            </a>
        `).join('');
    }

    function renderClubActivities(clubs) {
        clubGrid.innerHTML = clubs.map(club => `
            <a href="${club.link}" class="card-link">
                <div class="club-card">
                    <div class="club-icon" style="background: ${club.iconBg}; color: ${club.iconColor};">
                        <i class="fas ${club.icon}"></i>
                    </div>
                    <span class="club-name">${club.club}</span>
                    <h3 class="club-event-title">${club.title}</h3>
                    <div class="club-meta">
                        <p><i class="far fa-calendar-alt"></i> ${club.meta}</p>
                        ${club.location ? `<p><i class="fas fa-map-marker-alt"></i> ${club.location}</p>` : ''}
                    </div>
                    <span class="club-action">${club.actionText} <i class="fas fa-arrow-right"></i></span>
                </div>
            </a>
        `).join('');
    }
});