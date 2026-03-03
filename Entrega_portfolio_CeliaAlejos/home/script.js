document.addEventListener('DOMContentLoaded', () => {
    const projectsContainer = document.getElementById('projects-container');

    // Carga de proyectos desde JSON
    const loadProjects = async () => {
        try {
            const response = await fetch('projects.json');
            const projects = await response.json();
            renderProjects(projects);
            observeElements(); 
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const renderProjects = (projects) => {
        projectsContainer.innerHTML = projects.map(project => `
            <div class="project-card">
                <a href="${project.link}" class="project-link-wrapper">
                    <div class="project-card-inner">
                        <div class="project-image-container">
                            <div class="scrolling-wrapper">
                                <img src="${project.image}" alt="${project.title}">
                                <img src="${project.image}" alt="" aria-hidden="true">
                            </div>
                        </div>
                        <p class="project-caption">${project.title}, <em>${project.year}</em></p>
                    </div>
                </a>
            </div>
        `).join('');
    };

    // Observador único para bio y tarjetas
    const observeElements = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('visible');
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.bio-container, .project-card').forEach(el => observer.observe(el));
    };

    // Smooth scroll universal
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            document.querySelector(anchor.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
        });
    });

    loadProjects();
});