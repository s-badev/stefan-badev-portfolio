export type Lang = "en" | "bg";
export type Localized = { en: string; bg: string };

export const links = {
  github: "https://github.com/s-badev",
  linkedin: "https://www.linkedin.com/in/stefan-badev-788460158/",
  email: "stefan.badev@yahoo.com",
  phoneDisplay: "+359 884 56 66 06",
  phoneHref: "tel:+359884566606",
};

export const cv = {
  en: { available: true, path: "/cv/stefan-badev-cv-en.pdf", label: "English CV" },
  bg: { available: false, path: null as string | null, label: "Българско CV" },
};

export type Project = {
  id: string;
  category: "ai" | "automation" | "web";
  kind: "coded" | "low-code" | "no-code";
  featured: boolean;
  title: string;
  subtitle: Localized;
  label?: Localized;
  problem: Localized;
  highlights: { en: string[]; bg: string[] };
  workflow: string[];
  technologies: string[];
  evidence: { image: string | null; caption: Localized };
  githubUrl: string | null;
  liveUrl: string | null;
};

export const projects: Project[] = [
  {
    id: "pdf-ai-assistant",
    category: "ai",
    kind: "coded",
    featured: true,
    title: "PDF AI Assistant",
    subtitle: { en: "RAG-based document question answering", bg: "Отговори на въпроси по документи с RAG" },
    problem: {
      en: "Make information inside PDF documents searchable and answer questions using retrieved document context rather than relying only on the model's general knowledge.",
      bg: "Информацията в PDF документи да стане търсима, а отговорите да се базират на извлечен контекст от документа, а не само на общите знания на модела.",
    },
    highlights: {
      en: [
        "PDF extraction and chunking pipeline",
        "OpenAI embeddings stored in ChromaDB",
        "Similarity retrieval with LLM-generated answers grounded in retrieved context",
        "Multimodal output: text, generated image and audio",
      ],
      bg: [
        "Pipeline за извличане и разделяне (chunking) на PDF текст",
        "OpenAI embeddings, съхранени в ChromaDB",
        "Similarity retrieval и LLM отговори, обосновани с извлечения контекст",
        "Мултимодален изход: текст, генерирано изображение и аудио",
      ],
    },
    workflow: ["PDF", "Extract", "Chunk", "Embed", "ChromaDB", "Retrieve", "LLM", "Grounded Answer"],
    technologies: ["Python", "OpenAI API", "text-embedding-3-small", "ChromaDB", "pypdf", "gTTS", "Pillow"],
    evidence: { image: null, caption: { en: "Architecture diagram · execution screenshot", bg: "Архитектурна диаграма · екран от изпълнение" } },
    githubUrl: "https://github.com/s-badev/pdf-ai-assistant-rag",
    liveUrl: null,
  },
  {
    id: "career-strategist",
    category: "ai",
    kind: "coded",
    featured: true,
    title: "AI Career Project Strategist",
    subtitle: { en: "Multi-agent AI workflow", bg: "Мулти-агентен AI workflow" },
    problem: {
      en: "Turn career and project input into structured project recommendations through multiple specialised AI workflow stages and human review.",
      bg: "Превръщане на информация за кариера и цели в структурирани препоръки за проекти чрез няколко специализирани AI етапа и човешки преглед.",
    },
    highlights: {
      en: [
        "Stateful LangGraph workflow with Career Analyst, Project Architect and Reviewer stages",
        "Human-in-the-loop review before the final response",
        "Structured final output with workflow memory / checkpointing",
      ],
      bg: [
        "Stateful LangGraph workflow с етапи Career Analyst, Project Architect и Reviewer",
        "Human-in-the-loop преглед преди финалния отговор",
        "Структуриран финален резултат с памет / checkpointing на workflow-а",
      ],
    },
    workflow: ["User Request", "Career Analyst", "Project Architect", "Reviewer", "Human Review", "Final Response"],
    technologies: ["Python", "LangGraph", "LangChain", "OpenAI API"],
    evidence: { image: null, caption: { en: "Workflow diagram · HITL / structured output", bg: "Workflow диаграма · HITL / структуриран изход" } },
    githubUrl: "https://github.com/s-badev/ai-career-project-strategist-langgraph",
    liveUrl: null,
  },
  {
    id: "make-email-automation",
    category: "automation",
    kind: "low-code",
    featured: true,
    title: "AI Email Automation — Make",
    subtitle: { en: "AI-assisted workflow automation", bg: "AI-асистирана автоматизация на процеси" },
    problem: {
      en: "A multi-step AI-assisted automation workflow connecting incoming email, an OpenAI processing step, structured logging and multi-channel notifications.",
      bg: "Многостъпков AI-асистиран workflow, който свързва входящ имейл, обработка с OpenAI, структурирано логване и известия в няколко канала.",
    },
    highlights: { en: [], bg: [] },
    workflow: ["Gmail", "OpenAI", "Google Sheets", "Discord", "Telegram"],
    technologies: ["Make", "Gmail", "OpenAI", "Google Sheets", "Discord", "Telegram"],
    evidence: { image: null, caption: { en: "Make scenario screenshot", bg: "Екран от Make сценария" } },
    githubUrl: null,
    liveUrl: null,
  },
  {
    id: "zapier-inbox-alert",
    category: "automation",
    kind: "no-code",
    featured: false,
    title: "Zapier Inbox Alert Bot",
    subtitle: { en: "No-code workflow automation", bg: "No-code автоматизация" },
    label: { en: "SoftUni AI Adoption coursework · 2025", bg: "Курс AI Adoption, SoftUni · 2025" },
    problem: {
      en: "React to incoming email, send notifications through messaging services and log relevant email information into Google Sheets.",
      bg: "Реагира на входящ имейл, изпраща известия през месинджъри и записва ключова информация в Google Sheets.",
    },
    highlights: { en: [], bg: [] },
    workflow: ["Gmail", "Webhooks by Zapier", "Telegram", "Google Sheets", "Discord"],
    technologies: ["Zapier"],
    evidence: { image: null, caption: { en: "Zap screenshot", bg: "Екран от Zap-а" } },
    githubUrl: null,
    liveUrl: null,
  },
  {
    id: "zapier-vitamin-chatbot",
    category: "automation",
    kind: "no-code",
    featured: false,
    title: "Zapier Vitamin Consultant Chatbot",
    subtitle: { en: "No-code chatbot workflow", bg: "No-code чатбот workflow" },
    label: { en: "SoftUni AI Adoption coursework · 2025", bg: "Курс AI Adoption, SoftUni · 2025" },
    problem: {
      en: "A Zapier Chatbot with a knowledge base of 25+ products that collects name, email, selected product, quantity and date, stores them in Zapier Tables and syncs them to Google Sheets.",
      bg: "Zapier Chatbot с база знания от 25+ продукта, който събира име, имейл, продукт, количество и дата, записва ги в Zapier Tables и ги синхронизира с Google Sheets.",
    },
    highlights: { en: [], bg: [] },
    workflow: ["Chatbot", "Knowledge Base", "Lead Capture", "Zapier Tables", "Google Sheets"],
    technologies: ["Zapier Chatbots", "Zapier Tables", "Google Sheets"],
    evidence: { image: null, caption: { en: "Chatbot / Zap screenshot", bg: "Екран от чатбота / Zap-а" } },
    githubUrl: null,
    liveUrl: null,
  },
  {
    id: "chefos-recipes",
    category: "web",
    kind: "coded",
    featured: true,
    title: "Chefo's Recipes",
    subtitle: { en: "Full-stack recipe platform", bg: "Full-stack платформа за рецепти" },
    problem: {
      en: "Build a full-stack recipe platform with shared web/mobile architecture, persistent data and role-based functionality.",
      bg: "Full-stack платформа за рецепти със споделена web/mobile архитектура, постоянни данни и функционалност според ролята.",
    },
    highlights: {
      en: [
        "Next.js web app and Expo / React Native client with shared TypeScript types",
        "Separate database package on Neon PostgreSQL with Drizzle ORM and API routes",
        "Role-based access, favourites and responsive recipe browsing",
      ],
      bg: [
        "Next.js уеб приложение и Expo / React Native клиент със споделени TypeScript типове",
        "Отделен database пакет с Neon PostgreSQL, Drizzle ORM и API routes",
        "Достъп според ролята, любими и responsive разглеждане на рецепти",
      ],
    },
    workflow: ["Next.js / Expo", "API routes", "Drizzle ORM", "Neon PostgreSQL"],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Expo", "Drizzle ORM", "Neon PostgreSQL"],
    evidence: { image: null, caption: { en: "Product screenshot", bg: "Екран от продукта" } },
    githubUrl: "https://github.com/s-badev/chefos-recipes-fullstack",
    liveUrl: "https://chefos-recipes.netlify.app",
  },
  {
    id: "freshbox",
    category: "web",
    kind: "coded",
    featured: false,
    title: "FreshBox",
    subtitle: { en: "E-commerce web application", bg: "E-commerce уеб приложение" },
    problem: {
      en: "Build a functional e-commerce experience with authentication, product management, shopping flow and backend persistence.",
      bg: "Функционален онлайн магазин с автентикация, управление на продукти, процес на поръчка и съхранение на данни.",
    },
    highlights: {
      en: [
        "Product catalogue with search, category filtering, cart, checkout and order history",
        "Admin functionality for product management",
        "Supabase backend: PostgreSQL, Auth, Storage and Row Level Security, deployed on Netlify",
      ],
      bg: [
        "Каталог с търсене, филтри по категории, количка, поръчка и история на поръчките",
        "Админ функционалност за управление на продукти",
        "Supabase backend: PostgreSQL, Auth, Storage и Row Level Security, deploy в Netlify",
      ],
    },
    workflow: ["Vite client", "Supabase Auth", "PostgreSQL + RLS", "Storage", "Netlify"],
    technologies: ["JavaScript", "Vite", "Bootstrap", "Supabase", "PostgreSQL", "Netlify"],
    evidence: { image: null, caption: { en: "Product screenshot", bg: "Екран от продукта" } },
    githubUrl: "https://github.com/s-badev/FreshBox",
    liveUrl: "https://freshbox-bg.netlify.app",
  },
  {
    id: "bookbuddy",
    category: "web",
    kind: "coded",
    featured: false,
    title: "BookBuddy",
    subtitle: { en: "Personal reading tracker", bg: "Личен тракер за четене" },
    problem: {
      en: "Create a browser-based application for organising a personal book library and tracking actual reading progress.",
      bg: "Браузърно приложение за организиране на лична библиотека и проследяване на реалния напредък в четенето.",
    },
    highlights: {
      en: [
        "Personal library with add, edit and delete functionality",
        "Title/author search, filters and sorting",
        "Reading logs and recent activity",
        "Reading statistics and progress tracking",
        "Weekly reading goals and daily streaks",
        "Reading challenges",
        "Persistent settings and data using localStorage",
        "Light / dark / system theme support",
      ],
      bg: [
        "Лична библиотека с добавяне, редакция и изтриване",
        "Търсене по заглавие/автор, филтри и сортиране",
        "Дневник на четенето и последна активност",
        "Статистика и проследяване на напредъка",
        "Седмични цели и дневни серии",
        "Предизвикателства за четене",
        "Постоянни настройки и данни чрез localStorage",
        "Светла / тъмна / системна тема",
      ],
    },
    workflow: ["Library data", "Reading logs", "Progress/statistics", "Goals/streaks", "localStorage persistence"],
    technologies: ["JavaScript", "HTML", "CSS", "localStorage"],
    evidence: { image: null, caption: { en: "Product screenshot", bg: "Екран от продукта" } },
    githubUrl: "https://github.com/s-badev/BookBuddy",
    liveUrl: null,
  },
];

export const journey: { years: string; title: Localized; note: Localized }[] = [
  { years: "2008–2017", title: { en: "National Library", bg: "Национална библиотека" }, note: { en: "Long-term structured, detail-oriented work", bg: "Дългогодишна структурирана работа с внимание към детайла" } },
  { years: "2018–2019", title: { en: "Technical Assistant / IT Support", bg: "Технически асистент / IT поддръжка" }, note: { en: "Hands-on technical troubleshooting", bg: "Практическо решаване на технически проблеми" } },
  { years: "2020–2023", title: { en: "QA Tester · uTest", bg: "QA тестер · uTest" }, note: { en: "Testing, bug reporting, quality mindset", bg: "Тестване, докладване на бъгове, фокус върху качеството" } },
  { years: "2023–now", title: { en: "Independent Contractor", bg: "Независим изпълнител" }, note: { en: "Alongside learning and building software", bg: "Паралелно с обучение и създаване на софтуер" } },
  { years: "2024–now", title: { en: "AI & automation projects", bg: "AI и автоматизационни проекти" }, note: { en: "SoftUni training + portfolio work", bg: "Обучение в SoftUni + портфолио проекти" } },
];

export const t = {
  en: {
    skip: "Skip to content",
    role: "Junior AI & Automation Developer",
    location: "Sofia, Bulgaria",
    positioning: "LLM Integrations · RAG · AI Agents · Workflow Automation · Full-Stack Development",
    statement: "Building practical AI integrations, RAG systems, agent workflows and automation-oriented software products.",
    viewWork: "View Work",
    downloadCv: "Download CV",
    nav: { ai: "AI Projects", automation: "Automation Work", web: "Web Projects", how: "How I Work", journey: "Journey", cv: "CV", contact: "Contact" },
    eyebrow: { ai: "Selected AI work", automation: "Workflow automation", web: "Full-stack builds", how: "Process", journey: "Career path", cv: "Document", contact: "Get in touch" },
    available: "Sofia, Bulgaria · Open to junior roles",
    problem: "Problem",
    built: "What I built",
    how: "How it works",
    stack: "Stack",
    evidence: "Evidence",
    liveDemo: "Live Demo",
    viewCode: "View Code",
    newTab: "(opens in a new tab)",
    kinds: { coded: "Coded project", "low-code": "Low-code automation", "no-code": "No-code automation" },
    automationIntro: "Workflow automation built with low-code / no-code platforms — distinct from the coded software projects.",
    howIWork: [
      "I define the architecture and data flow first.",
      "I use AI-assisted coding tools — Claude Code, Cursor, GitHub Copilot, Augment Code — during implementation.",
      "Then I review, test and refine the result myself.",
      "My QA background means testing is part of the build, not an afterthought.",
    ],
    cvIntro: "My current CV as a PDF.",
    preview: "Preview",
    download: "Download",
    contactIntro: "Open to junior roles in AI integration, automation and full-stack development.",
    email: "Email",
    phone: "Phone",
    footer: "Stefan Badev · Sofia, Bulgaria",
  },
  bg: {
    skip: "Към съдържанието",
    role: "Junior AI & Automation Developer",
    location: "София, България",
    positioning: "LLM интеграции · RAG · AI агенти · Автоматизация на процеси · Full-Stack разработка",
    statement: "Създавам практични AI интеграции, RAG системи, агентни workflow-и и софтуер, ориентиран към автоматизация.",
    viewWork: "Виж проектите",
    downloadCv: "Изтегли CV",
    nav: { ai: "AI проекти", automation: "Автоматизации", web: "Уеб проекти", how: "Как работя", journey: "Път", cv: "CV", contact: "Контакт" },
    eyebrow: { ai: "Избрани AI проекти", automation: "Автоматизация на процеси", web: "Full-stack проекти", how: "Подход", journey: "Професионален път", cv: "Документ", contact: "Връзка" },
    available: "София, България · Отворен за junior позиции",
    problem: "Проблем",
    built: "Какво изградих",
    how: "Как работи",
    stack: "Технологии",
    evidence: "Доказателство",
    liveDemo: "Демо",
    viewCode: "Код",
    newTab: "(отваря се в нов раздел)",
    kinds: { coded: "Кодиран проект", "low-code": "Low-code автоматизация", "no-code": "No-code автоматизация" },
    automationIntro: "Автоматизации, изградени с low-code / no-code платформи — отделно от кодираните софтуерни проекти.",
    howIWork: [
      "Първо дефинирам архитектурата и потока на данните.",
      "По време на имплементацията използвам AI инструменти — Claude Code, Cursor, GitHub Copilot, Augment Code.",
      "След това сам преглеждам, тествам и доизпипвам резултата.",
      "QA опитът ми прави тестването част от разработката, а не последна стъпка.",
    ],
    cvIntro: "Актуалното ми CV в PDF формат.",
    preview: "Преглед",
    download: "Изтегли",
    contactIntro: "Отворен съм за junior позиции в AI интеграции, автоматизация и full-stack разработка.",
    email: "Имейл",
    phone: "Телефон",
    footer: "Стефан Бадев · София, България",
  },
};

export const sections = ["ai", "web", "automation", "how", "journey", "cv", "contact"] as const;
export type SectionId = (typeof sections)[number];
