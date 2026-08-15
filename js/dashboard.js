// ===============================
// Civic Connect - Dashboard
// ===============================

// Load reports from localStorage
const issues = JSON.parse(localStorage.getItem("civic_issues")) || [];

// ===============================
// Stats
// ===============================

const totalReports = issues.length;
const pendingReports = issues.filter(issue => issue.status === "Pending").length;
const resolvedReports = issues.filter(issue => issue.status === "Resolved").length;
const highSeverity = issues.filter(issue => issue.severity === "High").length;

// Update cards
document.getElementById("totalReports").textContent = totalReports;
document.getElementById("pendingReports").textContent = pendingReports;
document.getElementById("resolvedReports").textContent = resolvedReports;
document.getElementById("highSeverity").textContent = highSeverity;

// ===============================
// Recent Reports Table
// ===============================

const tableBody = document.getElementById("recentReportsTable");

if (issues.length === 0) {
    tableBody.innerHTML = `
        <tr>
            <td colspan="5">
                <div class="empty-state">
                    <i class="fas fa-folder-open"></i>
                    <h4>No reports available</h4>
                    <p>Submit your first issue report to see it here.</p>
                </div>
            </td>
        </tr>
    `;
} else {

    // Latest reports first
    const recentIssues = [...issues].reverse().slice(0, 6);

   tableBody.innerHTML = recentIssues.map(issue => `
    <tr>
        <td><strong>${issue.title}</strong></td>
        <td>${issue.category}</td>
        <td>${issue.location}</td>
        <td>
            <span class="badge ${issue.severity.toLowerCase()}">
                ${issue.severity}
            </span>
        </td>
        <td>
            <select class="status-select" data-id="${issue.id}">
                <option value="Pending" ${issue.status === "Pending" ? "selected" : ""}>Pending</option>
                <option value="In Progress" ${issue.status === "In Progress" ? "selected" : ""}>In Progress</option>
                <option value="Resolved" ${issue.status === "Resolved" ? "selected" : ""}>Resolved</option>
            </select>
        </td>
        <td>
  <button class="delete-btn" data-id="${issue.id}">
    <i class="fas fa-trash"></i>
  </button>
</td>
    </tr>
`).join("");
}

// ===============================
// Recent Activity
// ===============================

const activityList = document.getElementById("activityList");

if (issues.length === 0) {

    activityList.innerHTML = `
        <div class="empty-state">
            <i class="fas fa-bell"></i>
            <h4>No recent activity</h4>
            <p>Activity will appear after reports are submitted.</p>
        </div>
    `;

} else {

    const recentActivity = [...issues].reverse().slice(0, 5);

    activityList.innerHTML = recentActivity.map(issue => `
        <div class="activity-item">
            <div class="activity-icon">
                <i class="fas fa-map-marker-alt"></i>
            </div>

            <div class="activity-content">
                <h4>${issue.title}</h4>
                <p>
                    ${issue.category} issue reported at
                    ${issue.location}
                </p>

                <div class="activity-time">
                    ${issue.date}
                </div>
            </div>
        </div>
    `).join("");
}

// ===============================
// Category Chart
// ===============================

const categoryCounts = {};

issues.forEach(issue => {
    categoryCounts[issue.category] =
        (categoryCounts[issue.category] || 0) + 1;
});

const categoryCtx = document.getElementById("categoryChart");

new Chart(categoryCtx, {
    type: "doughnut",
    data: {
        labels: Object.keys(categoryCounts),
        datasets: [{
            data: Object.values(categoryCounts),
            backgroundColor: [
                "#2563EB",
                "#10B981",
                "#F59E0B",
                "#EF4444",
                "#8B5CF6",
                "#06B6D4"
            ],
            borderWidth: 0,
            cutout: "60%"
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    boxWidth: 14,
                    padding: 16,
                    font: {
                        size: 12
                    }
                }
            }
        }
    }
});

// ===============================
// Severity Chart
// ===============================

const severityCounts = {
    Low: 0,
    Medium: 0,
    High: 0
};

issues.forEach(issue => {
    severityCounts[issue.severity]++;
});

const severityCtx = document.getElementById("severityChart");

new Chart(severityCtx, {
    type: "bar",
    data: {
        labels: ["Low", "Medium", "High"],
        datasets: [{
            label: "Reports",
            data: [
                severityCounts.Low,
                severityCounts.Medium,
                severityCounts.High
            ],
            backgroundColor: [
                "#22C55E",
                "#F59E0B",
                "#EF4444"
            ],
            borderRadius: 12
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1
                }
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    }
});

// ===============================
// Export Report Button
// ===============================

const exportButton = document.querySelector(".dashboard-actions .btn-secondary");

if (exportButton) {

    exportButton.addEventListener("click", function () {

        const data = JSON.stringify(issues, null, 2);

        const blob = new Blob([data], {
            type: "application/json"
        });

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");

        a.href = url;
        a.download = "civic-connect-reports.json";

        a.click();

        URL.revokeObjectURL(url);
    });
};

// ===============================
// Update Status
// ===============================

document.querySelectorAll(".status-select").forEach(select => {
    select.addEventListener("change", function () {

        const issueId = Number(this.dataset.id);
        const newStatus = this.value;

        const issues = JSON.parse(localStorage.getItem("civic_issues")) || [];

        const issue = issues.find(i => i.id === issueId);

        if (issue) {
            issue.status = newStatus;
            localStorage.setItem("civic_issues", JSON.stringify(issues));

            // Refresh dashboard
            location.reload();
        }

    });
});

// ===============================
// Update Status
// ===============================

document.querySelectorAll('.status-select').forEach(select => {

    select.addEventListener('change', function () {

        const issueId = Number(this.dataset.id);
        const newStatus = this.value;

        const issues = JSON.parse(localStorage.getItem('civic_issues')) || [];

        const issue = issues.find(item => item.id === issueId);

        if (issue) {
            issue.status = newStatus;
            localStorage.setItem('civic_issues', JSON.stringify(issues));

            // Refresh dashboard to update counts and charts
            location.reload();
        }

    });

});

// ===============================
// Delete Report
// ===============================

document.querySelectorAll('.delete-btn').forEach(button => {
  button.addEventListener('click', function () {
    const issueId = Number(this.dataset.id);

    const confirmDelete = confirm('Are you sure you want to delete this report?');

    if (!confirmDelete) return;

    let issues = JSON.parse(localStorage.getItem('civic_issues')) || [];

    issues = issues.filter(issue => issue.id !== issueId);

    localStorage.setItem('civic_issues', JSON.stringify(issues));

    location.reload();
  });
});