// ===================================
// Explore page
// ===================================

const issuesGrid = document.getElementById("issuesGrid");
const resultsCount = document.getElementById("resultsCount");
const emptyState = document.getElementById("emptyState");

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const statusFilter = document.getElementById("statusFilter");
const severityFilter = document.getElementById("severityFilter");
const clearFilters = document.getElementById("clearFilters");

// Modal elements
const issueModal = document.getElementById("issueModal");
const closeModal = document.getElementById("closeModal");

const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalStatus = document.getElementById("modalStatus");
const modalCategory = document.getElementById("modalCategory");
const modalLocation = document.getElementById("modalLocation");
const modalDate = document.getElementById("modalDate");
const modalSeverity = document.getElementById("modalSeverity");
const modalDescription = document.getElementById("modalDescription");

// ===================================
// Load reports
// ===================================

let allIssues = JSON.parse(localStorage.getItem("civic_issues")) || [];

renderIssues(allIssues);

// ===================================
// Render cards
// ===================================

function renderIssues(issues) {

    issuesGrid.innerHTML = "";

    resultsCount.textContent = `${issues.length} report${issues.length !== 1 ? "s" : ""} found`;

    if (issues.length === 0) {
        emptyState.style.display = "block";
        return;
    }

    emptyState.style.display = "none";

    issues.forEach(issue => {

        const card = document.createElement("div");
        card.className = "issue-card";

        const statusClass =
            issue.status === "Resolved"
                ? "status-resolved"
                : issue.status === "In Progress"
                    ? "status-progress"
                    : "status-pending";

        const imageHTML = issue.image
            ? `<img src="${issue.image}" alt="Issue image">`
            : `<img src="assets/images/hero-city.svg" alt="Default image">`;

        card.innerHTML = `
            <div class="issue-image">
                ${imageHTML}
            </div>

            <div class="issue-content">

                <div class="issue-top">
                    <span class="category-badge">${issue.category}</span>
                    <span class="status-badge ${statusClass}">${issue.status}</span>
                </div>

                <h3 class="issue-title">${issue.title}</h3>

                <p class="issue-description">
                    ${issue.description.substring(0, 110)}...
                </p>

                <div class="issue-meta">
                    <div>
                        <i class="fas fa-location-dot"></i>
                        ${issue.location}
                    </div>

                    <div>
                        <i class="fas fa-calendar"></i>
                        ${issue.date}
                    </div>
                </div>

                <div class="issue-footer">
                    <span class="severity ${issue.severity.toLowerCase()}">
                        ${issue.severity} severity
                    </span>

                    <span class="view-details">
                        View details
                    </span>
                </div>

            </div>
        `;

        card.addEventListener("click", () => openModal(issue));

        issuesGrid.appendChild(card);
    });
}

// ===================================
// Filters
// ===================================

function applyFilters() {

    const search = searchInput.value.toLowerCase();

    const category = categoryFilter.value;
    const status = statusFilter.value;
    const severity = severityFilter.value;

    const filtered = allIssues.filter(issue => {

        const matchesSearch =
            issue.title.toLowerCase().includes(search) ||
            issue.location.toLowerCase().includes(search) ||
            issue.category.toLowerCase().includes(search);

        const matchesCategory =
            !category || issue.category === category;

        const matchesStatus =
            !status || issue.status === status;

        const matchesSeverity =
            !severity || issue.severity === severity;

        return (
            matchesSearch &&
            matchesCategory &&
            matchesStatus &&
            matchesSeverity
        );
    });

    renderIssues(filtered);
}

searchInput.addEventListener("input", applyFilters);
categoryFilter.addEventListener("change", applyFilters);
statusFilter.addEventListener("change", applyFilters);
severityFilter.addEventListener("change", applyFilters);

// ===================================
// Clear filters
// ===================================

clearFilters.addEventListener("click", () => {

    searchInput.value = "";
    categoryFilter.value = "";
    statusFilter.value = "";
    severityFilter.value = "";

    renderIssues(allIssues);
});

// ===================================
// Modal
// ===================================

function openModal(issue) {

    modalTitle.textContent = issue.title;
    modalCategory.textContent = issue.category;
    modalLocation.textContent = issue.location;
    modalDate.textContent = issue.date;
    modalSeverity.textContent = issue.severity;
    modalDescription.textContent = issue.description;

    const statusClass =
        issue.status === "Resolved"
            ? "status-resolved"
            : issue.status === "In Progress"
                ? "status-progress"
                : "status-pending";

    modalStatus.className = `status-badge ${statusClass}`;
    modalStatus.textContent = issue.status;

    modalImage.innerHTML = issue.image
        ? `<img src="${issue.image}" alt="Issue image">`
        : `<img src="assets/images/hero-city.svg" alt="Default image">`;

    issueModal.style.display = "flex";
}

closeModal.addEventListener("click", () => {
    issueModal.style.display = "none";
});

issueModal.addEventListener("click", (e) => {
    if (e.target === issueModal) {
        issueModal.style.display = "none";
    }
});

// ===================================
// Escape key closes modal
// ===================================

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        issueModal.style.display = "none";
    }
});