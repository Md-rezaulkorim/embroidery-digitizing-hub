// ================= PORTFOLIO FILTER =================

const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const filter = button.dataset.filter;

        portfolioItems.forEach(item => {

            const categories = item.dataset.category;

            if (filter === "all" || categories.includes(filter)) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }

        });

    });

});


// ================= CONTACT FORM =================

const contactForm = document.querySelector(".contact-form");

contactForm.addEventListener("submit", function(event) {

    event.preventDefault();

    alert("Thank you! Your message has been received.");

    contactForm.reset();

});


// ================= CONSOLE =================

console.log(
    "Embroidery Digitizing Hub is running successfully!"
);