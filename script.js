const profile = {
    name: "Muhammad Zinedine Zidane",

    major: "Cyberpreneurship",

    description: "Personal archive of my learning journey.",

    photo: "assets/foto-zidane.jpg",

    about: `
        Website ini merupakan arsip pribadi untuk
        menyimpan berbagai rangkuman materi perkuliahan.

        Semoga setiap catatan menjadi bagian dari
        perjalanan untuk terus berkembang.
    `
};


/* =====================================
   NOTES DATA
   TAMBAHKAN RANGKUMAN DI SINI
===================================== */

const notes = [

    {
        id: 1,

        course: "Cyberpreneurship",

        title: "Pertemuan 1 - Judul Materi",

        summary: `
            Masukkan rangkuman materi di sini.

            Lu bisa menulis beberapa paragraf.
        `,

        createdAt: "2026-11-11"
    },

];


/* =====================================
   HELPER
===================================== */

const $ = (selector) => {
    return document.querySelector(selector);
};


function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        };

        return entities[char];
    });
}


function formatDate(dateString) {
    const date = new Date(dateString + "T00:00:00");

    if (Number.isNaN(date.getTime())) {
        return dateString;
    }

    return date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}


/* =====================================
   PROFILE RENDER
===================================== */

function renderProfile() {

    const nameElement = $("#profileName");
    const majorElement = $("#profileMajor");
    const descriptionElement = $("#profileDescription");
    const photoElement = $("#profilePhoto");
    const aboutElement = $("#aboutDescription");

    if (nameElement) {
        nameElement.textContent = profile.name;
    }

    if (majorElement) {
        majorElement.textContent = profile.major;
    }

    if (descriptionElement) {
        descriptionElement.textContent = profile.description;
    }

    if (photoElement) {
        photoElement.src = profile.photo;
        photoElement.alt = "Foto profil " + profile.name;
    }

    if (aboutElement) {
        aboutElement.textContent = profile.about;
    }

    document.title = profile.name + "'s Notes";
}


/* =====================================
   STATISTICS
===================================== */

function renderStatistics() {

    const totalNotes = $("#totalNotes");
    const totalMeetings = $("#totalMeetings");

    if (totalNotes) {
        totalNotes.textContent = notes.length;
    }

    if (totalMeetings) {
        const meetings = new Set(
            notes.map(note => note.id)
        );

        totalMeetings.textContent = meetings.size;
    }
}


/* =====================================
   EMPTY STATE
===================================== */

function renderEmptyState(message) {

    return `
        <div class="empty-state">

            <span>🌿</span>

            <h3>Belum Ada Rangkuman</h3>

            <p>${escapeHTML(message)}</p>

        </div>
    `;
}


/* =====================================
   NOTES RENDER
===================================== */

function renderNotes(data = notes) {

    const notesList = $("#notesList");
    const resultCount = $("#resultCount");

    if (!notesList) return;

    if (resultCount) {
        resultCount.textContent =
            data.length + " rangkuman";
    }

    if (data.length === 0) {

        const searchInput = $("#searchInput");

        const message = searchInput && searchInput.value.trim()
            ? "Rangkuman yang lu cari belum ditemukan."
            : "Rangkuman akan muncul di sini setelah ditambahkan.";

        notesList.innerHTML = renderEmptyState(message);

        return;
    }

    const sortedNotes = [...data].sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
    });

    notesList.innerHTML = sortedNotes.map(note => {

        return `
            <article class="note-card">

                <div class="note-top">

                    <span class="course-tag">
                        ${escapeHTML(note.course)}
                    </span>

                    <span class="note-date">
                        ${escapeHTML(formatDate(note.createdAt))}
                    </span>

                </div>

                <h3>
                    ${escapeHTML(note.title)}
                </h3>

                <div class="note-body">
                    ${escapeHTML(note.summary).replace(/\n/g, "<br>")}
                </div>

                <div class="note-meta">

                    <span>🌱 ${escapeHTML(note.course)}</span>

                    <span>📖 Pertemuan ${escapeHTML(note.id)}</span>

                </div>

            </article>
        `;

    }).join("");
}


/* =====================================
   SEARCH
===================================== */

function initializeSearch() {

    const searchInput = $("#searchInput");

    if (!searchInput) return;

    searchInput.addEventListener("input", function () {

        const keyword = this.value
            .toLowerCase()
            .trim();

        const filteredNotes = notes.filter(note => {

            const searchableText = [
                note.course,
                note.title,
                note.summary,
                note.id
            ].join(" ").toLowerCase();

            return searchableText.includes(keyword);

        });

        renderNotes(filteredNotes);

    });
}


/* =====================================
   INITIALIZE WEBSITE
===================================== */

function initializeWebsite() {

    renderProfile();

    renderStatistics();

    renderNotes();

    initializeSearch();

    const yearElement = $("#currentYear");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

}


/* =====================================
   START
===================================== */

document.addEventListener(
    "DOMContentLoaded",
    initializeWebsite
);
