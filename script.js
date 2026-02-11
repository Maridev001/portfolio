// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Form submission
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! I will respond soon.');
    e.target.reset();
});

// Project Modals
const projectData = {
    fundraisin: {
        title: 'Fund Raisin',
        description: 'A comprehensive web3 platform designed for transparent and efficient fund management and fundraising in the blockchain ecosystem.',
        role: 'Product Manager',
        responsibilities: [
            'Leading product strategy and roadmap development',
            'Coordinating multidisciplinary teams (development, design, marketing)',
            'Stakeholder communication and alignment',
            'Product launch execution with measurable KPIs',
            'User research and feature prioritization'
        ],
        technologies: ['Web3', 'Blockchain', 'Smart Contracts', 'DeFi'],
        impact: 'Successfully launched platform with significant user adoption in the blockchain fundraising space',
        links: [
            { text: 'Visit Fund Raisin', url: 'https://fundraisin.app' }
        ]
    },
    redbridge: {
        title: 'Redbridge',
        description: 'A bridge technology solution connecting different blockchain ecosystems and technologies, enabling seamless integration and interoperability.',
        role: 'Project Manager',
        responsibilities: [
            'Coordination between development teams',
            'Task management and sprint planning',
            'Administrative oversight and project documentation',
            'Timeline management and milestone tracking',
            'Resource allocation and team supervision'
        ],
        technologies: ['Bridge Technology', 'Blockchain', 'Cross-chain Integration'],
        impact: 'Ensured smooth project execution and timely delivery through effective team coordination and task management',
        links: [
            { text: 'Visit Redbridge Demo', url: 'https://redbridge-demo.red.dev/' },
            { text: 'Visit red.dev', url: 'https://red.dev' }
        ]
    }
};

function openModal(projectId) {
    const modal = document.getElementById('modal-overlay');
    const modalBody = document.getElementById('modal-body');
    const project = projectData[projectId];

    if (!project) return;

    modalBody.innerHTML = `
        <h2>${project.title}</h2>
        <p class="modal-description">${project.description}</p>

        <div class="modal-section">
            <h3>My Role</h3>
            <p class="role-badge">${project.role}</p>
        </div>

        <div class="modal-section">
            <h3>Key Responsibilities</h3>
            <ul class="responsibilities-list">
                ${project.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
            </ul>
        </div>

        <div class="modal-section">
            <h3>Technologies & Focus Areas</h3>
            <div class="tech-tags">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
        </div>

        <div class="modal-section">
            <h3>Impact</h3>
            <p>${project.impact}</p>
        </div>

        <div class="modal-section">
            <h3>Project Links</h3>
            <div class="project-links">
                ${project.links.map(link => `
                    <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="modal-link">
                        ${link.text} →
                    </a>
                `).join('')}
            </div>
        </div>
    `;

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('modal-overlay');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
        closeCertModal();
        closeCVModal();
    }
});

// Certificate Modal Functions
const certFiles = {
    'capm': 'certificates/Certificate_10714057_05112025.pdf',
    'google-pm': 'certificates/08c_PM_Profesional_certificate.pdf',
    'ux-design': 'certificates/UED Adobe XD_2021.pdf',
    'web-design': 'certificates/Freecodecamp cert.pdf'
};

function openCertModal(certId) {
    const modal = document.getElementById('cert-modal-overlay');
    const modalBody = document.getElementById('cert-modal-body');

    if (certFiles[certId]) {
        modalBody.innerHTML = `
            <iframe src="${certFiles[certId]}"
                    type="application/pdf"
                    width="100%"
                    height="100%"
                    style="border: none; border-radius: 10px;">
            </iframe>
        `;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeCertModal() {
    const modal = document.getElementById('cert-modal-overlay');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// CV Modal Functions
function openCVModal() {
    const modal = document.getElementById('cv-modal-overlay');
    const modalBody = document.getElementById('cv-modal-body');

    modalBody.innerHTML = `
        <iframe src="certificates/PM_Resume_2024.pdf"
                type="application/pdf"
                width="100%"
                height="100%"
                style="border: none; border-radius: 10px;">
        </iframe>
    `;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeCVModal() {
    const modal = document.getElementById('cv-modal-overlay');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Smooth scroll with offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 70;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});
