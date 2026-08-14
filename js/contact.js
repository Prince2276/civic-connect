// ===================================
// Contact page
// ===================================

// Initialize map
const map = L.map("contactMap").setView([22.5726, 88.4335], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

// Marker
L.marker([22.5726, 88.4335])
    .addTo(map)
    .bindPopup("<b>Civic Connect</b><br>Salt Lake Sector V, Kolkata")
    .openPopup();

// ===================================
// Contact form
// ===================================

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        alert(
            "Thank you for contacting Civic Connect! We will get back to you within 24 hours."
        );

        contactForm.reset();
    });
}

// ===================================
// Smooth scroll
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            e.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });
        }

    });
});

// ===================================
// Fade-in animation
// ===================================

const cards = document.querySelectorAll(
    ".info-card, .faq-card, .contact-form-card, .contact-map-card"
);

cards.forEach((card, index) => {

    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";

    setTimeout(() => {

        card.style.transition = "all 0.5s ease";
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";

    }, index * 80);

});