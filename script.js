function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

/* ---------------------------------------------------------------
   PROJECT DETAILS
   One entry per project card. The key matches the card's
   data-project attribute, so adding a project means adding a card
   in index.html and one entry here — nothing else changes.
--------------------------------------------------------------- */

const PROJECTS = {
    "finance-tracker": {
        eyebrow: "Personal project",
        title: "Student Finance Tracker",
        meta: ["Solo build", "2026", "Vanilla JavaScript"],
        summary:
            "A web app that helps students keep track of income and expenses without a spreadsheet. Transactions are logged, filtered and searched in the browser, and the dashboard turns them into a running balance plus cashflow and category charts.",
        highlights: [
            "Dashboard with balance, income/expense overview and live charts",
            "Search and filter across every logged transaction",
            "Export the full ledger as CSV or JSON",
            "Dark/light theme that remembers your preference",
            "Demo dataset so the app is useful the second it opens",
        ],
        tech: ["HTML", "CSS", "JavaScript", "Charts", "Responsive Design"],
        links: [
            { label: "Github", href: "https://github.com/ndavid-arch/Student-Finance-Tracker" },
            { label: "Live Demo", href: "https://www.finance.sftracker.tech/" },
        ],
    },

    nutritrack: {
        eyebrow: "Full-stack project",
        title: "NutriTrack",
        meta: ["Solo build", "2026", "Node.js + PostgreSQL"],
        summary:
            "A calorie tracking and meal planning app built on real nutrition data. It queries the Edamam Food Database for thousands of foods, logs them against a personal daily target, and reports progress over the week.",
        highlights: [
            "Authentication with password rules and validated email domains",
            "Food search returning real calories, protein, carbs, fat and fibre",
            "Dietary filters — vegan, gluten-free, keto, paleo and more",
            "Meal planner across breakfast, lunch and dinner with a daily goal bar",
            "Search results cached in PostgreSQL to cut API calls and speed up repeats",
            "Deployed behind an Nginx load balancer with PM2 and a Let's Encrypt certificate",
        ],
        tech: [
            "Node.js",
            "Express",
            "PostgreSQL",
            "Edamam API",
            "Chart.js",
            "Nginx",
            "PM2",
        ],
        links: [
            { label: "Github", href: "https://github.com/ndavid-arch/NutriTrack" },
            { label: "Live Demo", href: "https://nutritrack.sftracker.tech/" },
        ],
    },

    gosmart: {
        eyebrow: "Team project — Project Lead",
        title: "GoSmart",
        meta: ["Project Lead / Integration", "2026", "Django + React"],
        summary:
            "Real-time bus tracking for the Kimironko corridor in Kigali. Commuters have no reliable way to know when the next bus arrives, which pushes them onto more expensive taxi-motos. GoSmart puts passengers, drivers and admins in one web app, with live positions on a map and arrival alerts.",
        highlights: [
            "Three roles — passenger, driver and admin — behind JWT authentication",
            "Live GPS tracking that flips a bus to offline after two minutes of silence",
            "ETA from haversine distance, plus automatic delay logging against the timetable",
            "Web Push alerts when a bus nears your stop or runs late",
            "Boarding verified on-device: your location is compared to the bus and never uploaded",
            "Guests can browse routes and ETAs; only writes require an account",
        ],
        tech: [
            "Django",
            "Django REST Framework",
            "JWT",
            "MySQL",
            "React",
            "Vite",
            "Leaflet",
            "Web Push",
        ],
        links: [{ label: "Github", href: "https://github.com/ndavid-arch/GoooSmart" }],
        note:
            "Planned and shipped through GitHub Projects — 16 issues and 8 pull requests, each commit closing the issue it belonged to.",
    },

    "urban-mobility": {
        eyebrow: "Team project — Data Engineer",
        title: "Urban Mobility Data Explorer",
        meta: ["Data Engineer", "2026", "Python + PostgreSQL"],
        summary:
            "A full data pipeline over real NYC Taxi & Limousine Commission records for January 2019. I owned the cleaning and feature engineering stage: 7.67 million raw rows in, 7.28 million analysis-ready rows out, with every dropped record accounted for in an audit log.",
        highlights: [
            "Seven-stage pandas pipeline — type mapping, date filtering, outlier bounds, foreign-key validation, deduplication and feature engineering",
            "Every threshold justified against real rules, from the NYC minimum fare to the legal passenger maximum",
            "Seven engineered features including trip duration, fare per mile, airport flag and tip percentage",
            "Top-10 busiest pickup zones found with a hand-written MinHeap — O(m log k) instead of sorting everything",
            "Normalised PostgreSQL star schema behind a Flask REST API and a Leaflet dashboard",
        ],
        tech: [
            "Python",
            "pandas",
            "PostgreSQL",
            "Flask",
            "Leaflet",
            "Chart.js",
            "ETL",
        ],
        links: [
            {
                label: "Github",
                href: "https://github.com/AdukNyang/urban_mobility_data_explorer_Team_1",
            },
            {
                label: "Live Demo",
                href: "https://urban-mobility-data-explorer-team-1-1.onrender.com/",
            },
        ],
    },

    "python-basics": {
        eyebrow: "Team project — Fundamentals",
        title: "Python Fundamentals",
        meta: ["Team of 8", "2025", "Pure Python"],
        summary:
            "An early team exercise in writing Python that other people can pick up. The program collects a user's name and age, converts both to binary, builds a personalised message and saves it to a file — split across four modules so each teammate owned one.",
        highlights: [
            "Characters converted to 8-bit ASCII binary with ord() and format specifiers",
            "Input validation loops that keep asking until the value is usable",
            "File writing and reading wrapped in try/except so a missing file never crashes the run",
            "Four separate modules with a single entry point — my share was the helper functions",
        ],
        tech: ["Python", "File I/O", "Error Handling", "Modular Design"],
        links: [
            {
                label: "Github",
                href: "https://github.com/Bol-Dau/Group_activity---Python_basics_Team_1",
            },
        ],
    },
};

/* ---------------------------------------------------------------
   MODAL
--------------------------------------------------------------- */

const modal = document.getElementById("project-modal");
let lastFocused = null;

function fillList(id, items, render) {
    const el = document.getElementById(id);
    el.innerHTML = "";
    items.forEach((item) => el.appendChild(render(item)));
}

function openProject(key) {
    const project = PROJECTS[key];
    if (!project) return;

    lastFocused = document.activeElement;

    document.getElementById("project-modal-eyebrow").textContent = project.eyebrow;
    document.getElementById("project-modal-title").textContent = project.title;
    document.getElementById("project-modal-summary").textContent = project.summary;

    fillList("project-modal-meta", project.meta, (text) => {
        const li = document.createElement("li");
        li.textContent = text;
        return li;
    });

    const highlights = project.note
        ? project.highlights.concat(project.note)
        : project.highlights;
    fillList("project-modal-highlights", highlights, (text) => {
        const li = document.createElement("li");
        li.textContent = text;
        return li;
    });

    fillList("project-modal-tags", project.tech, (text) => {
        const li = document.createElement("li");
        li.className = "project-tag";
        li.textContent = text;
        return li;
    });

    const links = document.getElementById("project-modal-links");
    links.innerHTML = "";
    project.links.forEach((link) => {
        const a = document.createElement("a");
        a.className = "btn btn-color-2 project-btn";
        a.href = link.href;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.textContent = link.label;
        links.appendChild(a);
    });

    modal.hidden = false;
    document.body.classList.add("modal-open");
    modal.querySelector(".project-modal_close").focus();
}

function closeProject() {
    modal.hidden = true;
    document.body.classList.remove("modal-open");
    if (lastFocused) lastFocused.focus();
}

/* Card clicks: the whole card opens the details, but the Github and
   Live Demo buttons keep doing their own job. */
document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("click", (event) => {
        const linkBtn = event.target.closest("[data-href]");
        if (linkBtn) {
            window.open(linkBtn.dataset.href, "_blank", "noopener");
            return;
        }
        openProject(card.dataset.project);
    });
});

modal.addEventListener("click", (event) => {
    if (event.target.closest("[data-close-modal]")) closeProject();
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) closeProject();
});
