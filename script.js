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
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[lang] && translations[lang][key]) {
            el.placeholder = translations[lang][key];
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
const modalLabels = {
    en: { role: 'My Role', responsibilities: 'Key Responsibilities', technologies: 'Technologies & Focus Areas', impact: 'Impact', links: 'Project Links', included: "What's included" },
    es: { role: 'Mi Rol', responsibilities: 'Responsabilidades', technologies: 'Tecnologías y Áreas de Trabajo', impact: 'Impacto', links: 'Enlaces', included: 'Qué incluye' },
    ca: { role: 'El meu Rol', responsibilities: 'Responsabilitats', technologies: 'Tecnologies i Àrees de Treball', impact: 'Impacte', links: 'Enllaços', included: 'Què inclou' }
};

const projectData = {
    fundraisin: {
        title: 'Fund Raisin',
        description: {
            en: 'A web3 fundraising platform where I served as embedded Project Manager — coordinating across teams and keeping the product moving from roadmap to release.',
            es: 'Una plataforma de recaudación de fondos web3 donde actué como Project Manager embedded — coordinando entre equipos y manteniendo el producto en movimiento desde el roadmap hasta el lanzamiento.',
            ca: "Una plataforma de finançament col·lectiu web3 on vaig actuar com a Project Manager embedded — coordinant entre equips i mantenint el producte en moviment des del roadmap fins al llançament."
        },
        role: {
            en: 'Product Owner → Project Management',
            es: 'Product Owner → Gestión de Proyectos',
            ca: 'Product Owner → Gestió de Projectes'
        },
        responsibilities: {
            en: ['Structured product roadmaps and sprint priorities to maintain execution clarity.', 'Coordinated communication across development, design and marketing teams.', 'Maintained alignment between stakeholders through regular progress communication.', 'Launch planning and execution', 'Feature prioritization based on user feedback and team capacity'],
            es: ['Estructuré roadmaps de producto y prioridades de sprint para mantener la claridad de ejecución.', 'Coordiné la comunicación entre los equipos de desarrollo, diseño y marketing.', 'Mantuve la alineación entre stakeholders mediante comunicación regular del progreso.', 'Planificación y ejecución del lanzamiento', 'Priorización de funcionalidades basada en feedback de usuarios y capacidad del equipo'],
            ca: ["Vaig estructurar roadmaps de producte i prioritats de sprint per mantenir la claredat d'execució.", 'Vaig coordinar la comunicació entre els equips de desenvolupament, disseny i màrqueting.', 'Vaig mantenir l\'alineació entre stakeholders mitjançant comunicació regular del progrés.', 'Planificació i execució del llançament', "Priorització de funcionalitats basada en feedback d'usuaris i capacitat de l'equip"]
        },
        technologies: ['Web3', 'Blockchain', 'Cross-team Coordination', 'Product Operations', 'Workflow Management', 'Remote Teams'],
        impact: {
            en: 'Helped maintain operational clarity and cross-functional coordination throughout product development and launch, supporting the team in moving from planning to execution in a fast-paced startup environment.',
            es: 'Ayudé a mantener la claridad operativa y la coordinación interfuncional durante el desarrollo del producto y el lanzamiento, apoyando al equipo en pasar de la planificación a la ejecución en un entorno de ritmo acelerado.',
            ca: "Vaig ajudar a mantenir la claredat operativa i la coordinació interfuncional durant el desenvolupament del producte i el llançament, donant suport a l'equip per passar de la planificació a l'execució en un entorn d'alta velocitat."
        },
        links: [
            { text: { en: 'Explore the Project', es: 'Ver el Proyecto', ca: 'Veure el Projecte' }, url: 'https://www.fundraisin.app' }
        ]
    },
    redbridge: {
        title: 'red·bridge',
        description: {
            en: 'A blockchain bridge product requiring tight coordination between distributed technical teams, clear task ownership, and consistent progress tracking.',
            es: 'Un producto de blockchain bridge que requería una coordinación estrecha entre equipos técnicos distribuidos, una clara propiedad de las tareas y un seguimiento constante del progreso.',
            ca: 'Un producte de blockchain bridge que requeria una coordinació estreta entre equips tècnics distribuïts, una propietat clara de les tasques i un seguiment constant del progrés.'
        },
        role: { en: 'Project Manager', es: 'Project Manager', ca: 'Project Manager' },
        responsibilities: {
            en: ['Tracking project milestones and task progress', 'Task management, sprint planning, and backlog organization', 'Project documentation and operational oversight', 'Maintain visibility across priorities and deliverables', 'Clear communication flow between technical leads and stakeholders'],
            es: ['Seguimiento de hitos del proyecto y progreso de tareas', 'Gestión de tareas, planificación de sprints y organización del backlog', 'Documentación del proyecto y supervisión operativa', 'Mantener la visibilidad sobre prioridades y entregables', 'Flujo de comunicación claro entre líderes técnicos y stakeholders'],
            ca: ['Seguiment de fites del projecte i progrés de tasques', 'Gestió de tasques, planificació de sprints i organització del backlog', 'Documentació del projecte i supervisió operativa', 'Mantenir la visibilitat sobre prioritats i lliurables', 'Flux de comunicació clar entre els líders tècnics i els stakeholders']
        },
        technologies: ['Bridge Technology', 'Blockchain', 'Task Coordination'],
        impact: {
            en: 'Kept a complex, distributed team on track through structured coordination and clear communication throughout the project lifecycle.',
            es: 'Mantuve a un equipo complejo y distribuido en marcha mediante una coordinación estructurada y una comunicación clara a lo largo de todo el ciclo de vida del proyecto.',
            ca: 'Vaig mantenir un equip complex i distribuït en marxa mitjançant una coordinació estructurada i una comunicació clara al llarg de tot el cicle de vida del projecte.'
        },
        links: [
            { text: { en: 'Visit red·bridge Demo', es: 'Ver Demo de red·bridge', ca: 'Veure Demo de red·bridge' }, url: 'https://redbridge-demo.red.dev/' },
            { text: { en: 'Visit red.dev', es: 'Visitar red.dev', ca: 'Visitar red.dev' }, url: 'https://red.dev' }
        ]
    }
};

function openModal(projectId) {
    const modal = document.getElementById('modal-overlay');
    const modalBody = document.getElementById('modal-body');
    const project = projectData[projectId];
    const lang = currentLang;
    const labels = modalLabels[lang] || modalLabels.en;

    if (!project) return;

    const desc = typeof project.description === 'object' ? project.description[lang] || project.description.en : project.description;
    const role = typeof project.role === 'object' ? project.role[lang] || project.role.en : project.role;
    const resps = project.responsibilities[lang] || project.responsibilities.en;
    const impact = typeof project.impact === 'object' ? project.impact[lang] || project.impact.en : project.impact;

    modalBody.innerHTML = `
        <h2>${project.title}</h2>
        <p class="modal-description">${desc}</p>

        <div class="modal-section">
            <h3>${labels.role}</h3>
            <p class="role-badge">${role}</p>
        </div>

        <div class="modal-section">
            <h3>${labels.responsibilities}</h3>
            <ul class="responsibilities-list">
                ${resps.map(resp => `<li>${resp}</li>`).join('')}
            </ul>
        </div>

        <div class="modal-section">
            <h3>${labels.technologies}</h3>
            <div class="tech-tags">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
        </div>

        <div class="modal-section">
            <h3>${labels.impact}</h3>
            <p>${impact}</p>
        </div>

        <div class="modal-section">
            <h3>${labels.links}</h3>
            <div class="project-links">
                ${project.links.map(link => `
                    <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="modal-link">
                        ${typeof link.text === 'object' ? link.text[lang] || link.text.en : link.text} →
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
const pmiContent = {
    en: {
        title: 'PMI Member',
        subtitle: 'Project Management Institute',
        aboutTitle: 'About My Membership',
        aboutP1: 'I am an active member of the <strong>PMI Barcelona Chapter</strong> — the local chapter of the Project Management Institute, the world\'s leading association for project management professionals.',
        aboutP2: 'PMI membership connects me to a global community of practitioners, ongoing professional development resources, and the latest standards in project and operations management.',
        certTitle: 'Certification',
        certP: 'I hold the <strong>CAPM (Certified Associate in Project Management)</strong> credential — a globally recognized certification demonstrating knowledge of project management fundamentals and the PMI framework.',
        linkText: 'Visit PMI.org'
    },
    es: {
        title: 'Miembro PMI',
        subtitle: 'Project Management Institute',
        aboutTitle: 'Sobre mi Membresía',
        aboutP1: 'Soy miembro activo del <strong>Capítulo PMI Barcelona</strong> — el capítulo local del Project Management Institute, la asociación líder mundial para profesionales de gestión de proyectos.',
        aboutP2: 'La membresía PMI me conecta con una comunidad global de profesionales, recursos de desarrollo profesional continuo y los últimos estándares en gestión de proyectos y operaciones.',
        certTitle: 'Certificación',
        certP: 'Tengo la certificación <strong>CAPM (Certified Associate in Project Management)</strong> — una certificación reconocida globalmente que demuestra conocimiento de los fundamentos de gestión de proyectos y el marco PMI.',
        linkText: 'Visitar PMI.org'
    },
    ca: {
        title: 'Membre PMI',
        subtitle: 'Project Management Institute',
        aboutTitle: 'Sobre la meva Membresía',
        aboutP1: 'Soc membre actiu del <strong>Capítol PMI Barcelona</strong> — el capítol local del Project Management Institute, l\'associació líder mundial per a professionals de gestió de projectes.',
        aboutP2: 'La membresía PMI em connecta amb una comunitat global de professionals, recursos de desenvolupament professional continu i els últims estàndards en gestió de projectes i operacions.',
        certTitle: 'Certificació',
        certP: 'Tinc la certificació <strong>CAPM (Certified Associate in Project Management)</strong> — una certificació reconeguda globalment que demostra coneixement dels fonaments de gestió de projectes i el marc PMI.',
        linkText: 'Visitar PMI.org'
    }
};

function openPMIModal() {
    const modal = document.getElementById('pmi-modal-overlay');
    const modalBody = document.getElementById('pmi-modal-body');
    const p = pmiContent[currentLang] || pmiContent.en;

    modalBody.innerHTML = `
        <div style="display:flex; align-items:center; gap:1.5rem; margin-bottom:1.5rem;">
            <img src="Membership Badge Download.png" alt="PMI CAPM Badge" style="width:80px; height:80px; border-radius:50%;">
            <div>
                <h2 style="margin:0 0 0.25rem;">${p.title}</h2>
                <p style="margin:0; color:var(--gray-medium);">${p.subtitle}</p>
            </div>
        </div>
        <div class="modal-section">
            <h3>${p.aboutTitle}</h3>
            <p>${p.aboutP1}</p>
            <p style="margin-top:0.75rem;">${p.aboutP2}</p>
        </div>
        <div class="modal-section">
            <h3>${p.certTitle}</h3>
            <p>${p.certP}</p>
        </div>
        <div class="modal-section">
            <a href="https://www.pmi.org" target="_blank" rel="noopener noreferrer" class="modal-link">${p.linkText} →</a>
        </div>
    `;

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
        title: { en: 'Operational Coordination Support', es: 'Coordinación Operativa', ca: 'Coordinació Operativa' },
        description: {
            en: 'Light-touch coordination for teams that need structure without the overhead. I step in to organize task flow, facilitate syncs, and keep things from slipping.',
            es: 'Coordinación ligera para equipos que necesitan estructura sin la burocracia. Me incorporo para organizar el flujo de tareas, facilitar las reuniones de sincronización y evitar que las cosas se pierdan.',
            ca: "Coordinació lleugera per a equips que necessiten estructura sense la burocràcia. M'incorporo per organitzar el flux de tasques, facilitar les reunions de sincronització i evitar que les coses es perdin."
        },
        items: {
            en: ['Sprint & task tracking', 'Team sync facilitation', 'Communication flow setup', 'Light documentation'],
            es: ['Seguimiento de sprints y tareas', 'Facilitación de sincronizaciones de equipo', 'Configuración del flujo de comunicación', 'Documentación ligera'],
            ca: ['Seguiment de sprints i tasques', 'Facilitació de sincronitzacions d\'equip', 'Configuració del flux de comunicació', 'Documentació lleugera']
        },
        cta: { text: { en: 'Explore Support →', es: 'Explorar el Soporte →', ca: 'Explorar el Suport →' }, url: '#contact', external: false }
    },
    service2: {
        title: { en: 'Startup Operations Management', es: 'Gestión de Operaciones', ca: 'Gestió d\'Operacions' },
        description: {
            en: 'Full-cycle operational support for growing teams. I design workflows, build documentation, and coordinate across people and priorities so your team can focus on building.',
            es: 'Soporte operativo de ciclo completo para equipos en crecimiento. Diseño flujos de trabajo, creo documentación y coordino entre personas y prioridades para que tu equipo pueda centrarse en construir.',
            ca: 'Suport operatiu de cicle complet per a equips en creixement. Dissenyo fluxos de treball, creo documentació i coordino entre persones i prioritats perquè el teu equip pugui centrar-se en construir.'
        },
        items: {
            en: ['Workflow design & documentation', 'Cross-team coordination', 'Process rollout & adoption', 'KPI tracking & reporting'],
            es: ['Diseño de flujos y documentación', 'Coordinación entre equipos', 'Implementación y adopción de procesos', 'Seguimiento de KPIs e informes'],
            ca: ['Disseny de fluxos i documentació', 'Coordinació entre equips', 'Implementació i adopció de processos', 'Seguiment de KPIs i informes']
        },
        cta: { text: { en: 'Book a Video Call →', es: 'Reservar Videollamada →', ca: 'Reservar Videotrucada →' }, url: 'https://cal.com/mari-reddev', external: true }
    },
    service3: {
        title: { en: 'Fractional Operations Partner', es: 'Socio Operativo Fraccional', ca: 'Soci Operatiu Fraccional' },
        description: {
            en: 'An ongoing embedded partner for founders who need operational leadership without a full-time hire. Strategy, structure, and continuity — for the long haul.',
            es: 'Un socio operativo integrado de forma continua para fundadores que necesitan liderazgo operacional sin contratar a tiempo completo. Estrategia, estructura y continuidad — a largo plazo.',
            ca: 'Un soci operatiu integrat de forma contínua per a fundadors que necessiten lideratge operacional sense contractar a temps complet. Estratègia, estructura i continuïtat — a llarg termini.'
        },
        items: {
            en: ['Strategic process design', 'Team enablement & alignment', 'Operational leadership', 'Ongoing iteration & improvement'],
            es: ['Diseño estratégico de procesos', 'Capacitación y alineación del equipo', 'Liderazgo operativo', 'Iteración y mejora continua'],
            ca: ['Disseny estratègic de processos', 'Capacitació i alineació de l\'equip', 'Lideratge operatiu', 'Iteració i millora contínua']
        },
        cta: { text: { en: 'Discuss Partnership →', es: 'Hablar de la Colaboración →', ca: 'Parlar de la Col·laboració →' }, url: '#contact', external: false }
    }
};

function openServiceModal(serviceId) {
    const modal = document.getElementById('service-modal-overlay');
    const modalBody = document.getElementById('service-modal-body');
    const service = serviceData[serviceId];
    const lang = currentLang;
    const labels = modalLabels[lang] || modalLabels.en;
    if (!service) return;

    const title = typeof service.title === 'object' ? service.title[lang] || service.title.en : service.title;
    const desc = typeof service.description === 'object' ? service.description[lang] || service.description.en : service.description;
    const items = service.items[lang] || service.items.en;
    const ctaText = typeof service.cta.text === 'object' ? service.cta.text[lang] || service.cta.text.en : service.cta.text;

    modalBody.innerHTML = `
        <h2>${title}</h2>
        <p class="modal-description">${desc}</p>
        <div class="modal-section">
            <h3>${labels.included}</h3>
            <ul class="responsibilities-list">
                ${items.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>
        <div class="modal-section">
            <a href="${service.cta.url}" ${service.cta.external ? 'target="_blank" rel="noopener noreferrer"' : ''} class="modal-link" onclick="closeServiceModal()">
                ${ctaText}
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
