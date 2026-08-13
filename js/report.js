// ===============================
// Civic Connect - Report Page
// ===============================

const reportForm = document.getElementById("reportForm");
const imageInput = document.getElementById("image");
const imagePreview = document.getElementById("imagePreview");
const successModal = document.getElementById("successModal");
const closeModal = document.getElementById("closeModal");

// ===============================
// Image Preview
// ===============================

imageInput.addEventListener("change", function () {
    const file = this.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {
        imagePreview.innerHTML = `
            <img src="${e.target.result}" alt="Preview">
        `;
    };

    reader.readAsDataURL(file);
});
// ===============================
// Interactive Map
// ===============================

const map = L.map("reportMap").setView([22.5726, 88.3639], 11);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

let marker = null;

map.on("click", function (e) {

    const { lat, lng } = e.latlng;

    if (marker) {
        map.removeLayer(marker);
    }

    marker = L.marker([lat, lng]).addTo(map);

    document.getElementById("selectedLocation").value =
        `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
});

// ===============================
// Submit Form
// ===============================

reportForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const category = document.getElementById("category").value;
    const location = document.getElementById("location").value.trim();
    const description = document.getElementById("description").value.trim();

    const severity = document.querySelector(
        'input[name="severity"]:checked'
    ).value;

    let image = "";

    const previewImage = imagePreview.querySelector("img");

    if (previewImage) {
        image = previewImage.src;
    }

    const issue = {
        id: Date.now(),
        title,
        category,
        location,
        description,
        severity,
        image,
        status: "Pending",
        date: new Date().toLocaleDateString("en-IN")
    };

    const issues = JSON.parse(localStorage.getItem("civic_issues")) || [];

    issues.push(issue);

    localStorage.setItem("civic_issues", JSON.stringify(issues));

    successModal.style.display = "flex";

    reportForm.reset();
    imagePreview.innerHTML = "";
});

// ===============================
// Close Modal
// ===============================

closeModal.addEventListener("click", function () {
    successModal.style.display = "none";

    window.location.href = "dashboard.html";
});

// ===============================
// Close modal when clicking outside
// ===============================

successModal.addEventListener("click", function (e) {
    if (e.target === successModal) {
        successModal.style.display = "none";
    }
});