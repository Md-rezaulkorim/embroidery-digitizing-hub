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

// ==========================================
// LOAD PORTFOLIO FROM SUPABASE
// ==========================================

async function loadPortfolio() {

    const portfolioGrid = document.getElementById("portfolioGrid");

    if (!portfolioGrid) return;

    portfolioGrid.innerHTML = `
        <p style="grid-column: 1 / -1; text-align:center;">
            Loading portfolio...
        </p>
    `;

    try {

        const { data, error } = await supabaseClient
            .from("Portfolio")
            .select("*")
            .order("id", { ascending: false });

        if (error) {
            throw error;
        }

        portfolioGrid.innerHTML = "";

        if (!data || data.length === 0) {

            portfolioGrid.innerHTML = `
                <p style="grid-column: 1 / -1; text-align:center;">
                    No portfolio projects available.
                </p>
            `;

            return;
        }

        data.forEach(project => {

            const category = project.category || "";

            let filterCategory = "";

            if (category === "3D Puff") {
                filterCategory = "puff";
            } 
            else if (category === "Applique") {
                filterCategory = "applique";
            } 
            else if (category === "Logo") {
                filterCategory = "logo";
            } 
            else if (category === "Cap / Hat") {
                filterCategory = "cap";
            }

            const article = document.createElement("article");

            article.className = "portfolio-item";

            article.setAttribute(
                "data-category",
                filterCategory
            );

            article.innerHTML = `

                <div class="portfolio-image">

                    <img
                        src="${project.image_url}"
                        alt="${project.title}"
                        loading="lazy"
                    >

                </div>

                <div class="portfolio-info">

                    <span>
                        ${category}
                    </span>

                    <h3>
                        ${project.title}
                    </h3>

                    <p>
                        ${project.description}
                    </p>

                </div>

            `;

            portfolioGrid.appendChild(article);

        });

    } catch (error) {

        console.error(
            "Portfolio loading error:",
            error
        );

        portfolioGrid.innerHTML = `
            <p style="grid-column: 1 / -1; text-align:center;">
                Unable to load portfolio projects.
            </p>
        `;

    }
}


// Load portfolio when website opens
loadPortfolio();
