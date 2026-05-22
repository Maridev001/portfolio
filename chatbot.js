const chatFlow = {
    welcome: {
        bot: "Hi! 👋 I'm here to help you learn more about Marianna's work and services.\n\nWhat would you like to know?",
        options: [
            { text: "What services do you offer?", next: "services" },
            { text: "How does the process work?", next: "process" },
            { text: "What's your experience?", next: "experience" },
            { text: "How do I get in touch?", next: "contact" }
        ]
    },

    services: {
        bot: "Marianna offers three support packages depending on what your team needs:\n\n• Operational Coordination Support\n• Startup Operations Management\n• Fractional Operations Partner\n\nWant to know more about any of them?",
        options: [
            { text: "Operational Coordination Support", next: "service1" },
            { text: "Startup Operations Management", next: "service2" },
            { text: "Fractional Operations Partner", next: "service3" },
            { text: "← Back", next: "welcome" }
        ]
    },

    service1: {
        bot: "Operational Coordination Support is the lightest-touch option — ideal for teams that need structure without the overhead.\n\nIncludes: sprint & task tracking, team sync facilitation, communication flow setup, and light documentation.",
        options: [
            { text: "Book a call to discuss", next: "book" },
            { text: "← See other services", next: "services" },
            { text: "← Start over", next: "welcome" }
        ]
    },

    service2: {
        bot: "Startup Operations Management is full-cycle operational support for growing teams.\n\nIncludes: workflow design & documentation, cross-team coordination, process rollout & adoption, and KPI tracking & reporting.",
        options: [
            { text: "Book a call to discuss", next: "book" },
            { text: "← See other services", next: "services" },
            { text: "← Start over", next: "welcome" }
        ]
    },

    service3: {
        bot: "The Fractional Operations Partner is an ongoing embedded role for founders who need operational leadership without a full-time hire.\n\nIncludes: strategic process design, team enablement & alignment, operational leadership, and ongoing iteration.",
        options: [
            { text: "Book a call to discuss", next: "book" },
            { text: "← See other services", next: "services" },
            { text: "← Start over", next: "welcome" }
        ]
    },

    process: {
        bot: "The process is simple and structured:\n\n01 → Discovery Call — we talk about where things stand and what's creating friction.\n\n02 → Operational Assessment — mapping your workflows, communication patterns, and task ownership.\n\n03 → Workflow & Team Alignment — building structure and coordinating across priorities.\n\n04 → Ongoing Support — iterating as your team grows.",
        options: [
            { text: "Book a discovery call", next: "book" },
            { text: "← Back", next: "welcome" }
        ]
    },

    experience: {
        bot: "Marianna has 5+ years of experience in startup environments, working across UX, product ownership, and operations.\n\nKey projects:\n• Fund Raisin — PM for a Web3 fundraising platform.\n• red·bridge — Project coordination for a Zcash ↔ Avalanche blockchain bridge.\n\nShe's also CAPM certified by the PMI.",
        options: [
            { text: "Tell me about Fund Raisin", next: "exp_fr" },
            { text: "Tell me about red·bridge", next: "exp_rb" },
            { text: "← Back", next: "welcome" }
        ]
    },

    exp_fr: {
        bot: "Fund Raisin is a fundraising platform where creators launch campaigns and offer digital art as rewards for supporters.\n\nMarianna served as embedded Project Manager — handling roadmap tracking, QA coordination, cross-team communication, and stakeholder reporting.",
        options: [
            { text: "← Back to experience", next: "experience" },
            { text: "← Start over", next: "welcome" }
        ]
    },

    exp_rb: {
        bot: "red·bridge is a blockchain bridge between Zcash and Avalanche.\n\nMarianna coordinated the distributed development team — setting up task management, sprint planning, documentation, and communication flows across the full project lifecycle.",
        options: [
            { text: "← Back to experience", next: "experience" },
            { text: "← Start over", next: "welcome" }
        ]
    },

    contact: {
        bot: "You can reach Marianna here:\n\n📧 mariprofessional@outlook.com\n📱 +34 674-837-224 (WhatsApp)\n💼 LinkedIn: linkedin.com/in/majoalfig\n\nOr book a video call directly — it's the fastest way to get started.",
        options: [
            { text: "Book a video call →", next: "book" },
            { text: "← Back", next: "welcome" }
        ]
    },

    book: {
        bot: "Great! You can pick a time that works for you directly on Marianna's calendar. 📅",
        options: [
            { text: "Open booking page →", next: "open_cal" },
            { text: "← Start over", next: "welcome" }
        ]
    }
};

function toggleChat() {
    const win = document.getElementById('chatWindow');
    const isOpen = win.classList.contains('open');
    win.classList.toggle('open');
    if (!isOpen && document.getElementById('chatMessages').children.length === 0) {
        renderStep('welcome');
    }
}

function renderStep(key) {
    const step = chatFlow[key];
    if (!step) return;

    const messages = document.getElementById('chatMessages');
    const options = document.getElementById('chatOptions');

    const msg = document.createElement('div');
    msg.className = 'chat-msg bot';
    msg.textContent = step.bot;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;

    options.innerHTML = '';
    step.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'chat-opt-btn';
        btn.textContent = opt.text;
        btn.onclick = () => selectOption(opt);
        options.appendChild(btn);
    });
}

function selectOption(opt) {
    const messages = document.getElementById('chatMessages');

    const userMsg = document.createElement('div');
    userMsg.className = 'chat-msg user';
    userMsg.textContent = opt.text;
    messages.appendChild(userMsg);
    messages.scrollTop = messages.scrollHeight;

    if (opt.next === 'open_cal') {
        window.open('https://cal.com/mari-reddev', '_blank');
        renderStep('welcome');
        return;
    }

    setTimeout(() => renderStep(opt.next), 300);
}
