// ===================================
// Community page
// ===================================

// Join community form
const communityForm = document.getElementById("communityForm");

if (communityForm) {
    communityForm.addEventListener("submit", function (e) {
        e.preventDefault();

        alert(
            "Thank you for joining the Civic Connect community! We will contact you soon."
        );

        communityForm.reset();
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
// Counter animation
// ===================================

const counters = document.querySelectorAll(".impact-card h3");

function animateCounters() {

    counters.forEach(counter => {

        const target = parseInt(counter.textContent.replace(/[^0-9]/g, ""));

        let count = 0;
        const increment = Math.ceil(target / 80);

        const updateCounter = () => {

            count += increment;

            if (count >= target) {
                counter.textContent = target.toLocaleString() + "+";
            } else {
                counter.textContent = count.toLocaleString() + "+";
                requestAnimationFrame(updateCounter);
            }

        };

        updateCounter();

    });

}

// Trigger counter when section is visible
const impactSection = document.querySelector(".impact-section");

let counterStarted = false;

window.addEventListener("scroll", () => {

    if (!impactSection || counterStarted) return;

    const sectionTop = impactSection.getBoundingClientRect().top;

    if (sectionTop < window.innerHeight - 100) {
        counterStarted = true;
        animateCounters();
    }

});

// ===================================
// Fade-in animation
// ===================================

const cards = document.querySelectorAll(
    ".program-card, .event-card, .leader-card, .impact-card, .testimonial-card"
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