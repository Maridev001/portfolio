// Language toggle
const langToggle = document.getElementById('langToggle');
const langs = ['en', 'es', 'ca'];
const langFlags = { en: 'EN', es: 'ESP', ca: 'CAT' };
let currentLang = localStorage.getItem('lang') || 'en';

function applyTranslations(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
    langToggle.textContent = langFlags[lang];
    localStorage.setItem('lang', lang);
    currentLang = lang;
}

applyTranslations(currentLang);

langToggle.addEventListener('click', () => {
    const next = langs[(langs.indexOf(currentLang) + 1) % langs.length];
    applyTranslations(next);
});

// Dark mode toggle
const themeToggle = document.getElementById('themeToggle');
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});

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

// Form submission via Web3Forms
document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const submitBtn = form.querySelector('.submit-button');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form)
        });
        const data = await response.json();
        if (data.success) {
            alert('Thank you for your message! I will respond soon.');
            form.reset();
        } else {
            alert('Something went wrong. Please try again or email me directly.');
        }
    } catch (error) {
        alert('Something went wrong. Please try again or email me directly.');
    }
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
});

// Project Modals
const projectData = {
    fundraisin: {
        title: 'Fund Raisin',
        description: 'A web3 fundraising platform where I served as embedded Project Manager — coordinating across teams and keeping the product moving from roadmap to release.',
        role: 'Product Owner → Project Management',
        responsibilities: [
            'Structured product roadmaps and sprint priorities to maintain execution clarity.',
            'Coordinated communication across development, design and marketing teams.',
            'Maintained alignment between stakeholders through regular progress communication.',
            'Launch planning and execution',
            'Feature prioritization based on user feedback and team capacity'
        ],
        technologies: ['Web3', 'Blockchain', 'Cross-team Coordination', 'Product Operations', 'Workflow Management','Remote Teams'],
        impact: 'Helped maintain operational clarity and cross-functional coordination throughout product development and launch, supporting the team in moving from planning to execution in a fast-paced startup environment.',
        links: [
            { text: 'Explore the Project', url: 'https://www.fundraisin.app' }
        ]
    },
    redbridge: {
        title: 'Redbridge',
        description: 'A blockchain bridge product requiring tight coordination between distributed technical teams, clear task ownership, and consistent progress tracking.',
        role: 'Project Manager',
        responsibilities: [
            'Tracking project milestones and task progress',
            'Task management, sprint planning, and backlog organization',
            'Project documentation and operational oversight',
            'Maintain visibility across priorities and deliverables',
            'Clear communication flow between technical leads and stakeholders'
        ],
        technologies: ['Bridge Technology', 'Blockchain', 'Task Coordination'],
        impact: 'Kept a complex, distributed team on track through structured coordination and clear communication throughout the project lifecycle.',
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
        closeServiceModal();
        closePMIModal();
    }
});

// PMI Modal
function openPMIModal() {
    const modal = document.getElementById('pmi-modal-overlay');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closePMIModal() {
    const modal = document.getElementById('pmi-modal-overlay');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Service Modals
const serviceData = {
    service1: {
        title: 'Operational Coordination Support',
        description: 'Light-touch coordination for teams that need structure without the overhead. I step in to organize task flow, facilitate syncs, and keep things from slipping.',
        items: [
            'Sprint & task tracking',
            'Team sync facilitation',
            'Communication flow setup',
            'Light documentation'
        ],
        cta: { text: 'Explore Support →', url: '#contact', external: false }
    },
    service2: {
        title: 'Startup Operations Management',
        description: 'Full-cycle operational support for growing teams. I design workflows, build documentation, and coordinate across people and priorities so your team can focus on building.',
        items: [
            'Workflow design & documentation',
            'Cross-team coordination',
            'Process rollout & adoption',
            'KPI tracking & reporting'
        ],
        cta: { text: 'Book a Video Call →', url: 'https://cal.com/mari-reddev', external: true }
    },
    service3: {
        title: 'Fractional Operations Partner',
        description: 'An ongoing embedded partner for founders who need operational leadership without a full-time hire. Strategy, structure, and continuity — for the long haul.',
        items: [
            'Strategic process design',
            'Team enablement & alignment',
            'Operational leadership',
            'Ongoing iteration & improvement'
        ],
        cta: { text: 'Discuss Partnership →', url: '#contact', external: false }
    }
};

function openServiceModal(serviceId) {
    const modal = document.getElementById('service-modal-overlay');
    const modalBody = document.getElementById('service-modal-body');
    const service = serviceData[serviceId];
    if (!service) return;

    modalBody.innerHTML = `
        <h2>${service.title}</h2>
        <p class="modal-description">${service.description}</p>
        <div class="modal-section">
            <h3>What's included</h3>
            <ul class="responsibilities-list">
                ${service.items.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>
        <div class="modal-section">
            <a href="${service.cta.url}" ${service.cta.external ? 'target="_blank" rel="noopener noreferrer"' : ''} class="modal-link" onclick="closeServiceModal()">
                ${service.cta.text}
            </a>
        </div>
    `;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeServiceModal() {
    const modal = document.getElementById('service-modal-overlay');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

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

// Values accordion
document.querySelectorAll('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
        const item = trigger.closest('.accordion-item');
        item.classList.toggle('is-open');
    });
});

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
