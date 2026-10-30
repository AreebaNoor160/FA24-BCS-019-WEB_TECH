
// Get all product cards
const products = document.querySelectorAll(".gallery");

// Check each product
products.forEach(function(product) {

    // Get product price
    const priceText = product.querySelector("h4").textContent;

    // Convert price text into number
    const price = Number(priceText.replace("USD", "").trim());

    // Check if price is greater than 1900
    if (price > 1900) {

        // Create Premium label
        const label = document.createElement("span");

        label.textContent = "Premium";

        // Add label inside product card
        product.appendChild(label);
    }

});

const searchInput = document.getElementById("searchInput");
const noProducts = document.getElementById("noProducts");

function filterProducts() {

    // Get search text
    const searchText = searchInput.value.toLowerCase();

    // Get selected category
    const selectedFilter = document.querySelector(
        'input[name="category"]:checked'
    );

    // Get all product cards
    const products = document.querySelectorAll(".gallery");

    let visibleCount = 0;

    products.forEach(function(product) {

        // Get product name
        const productName = product.querySelector("h6")
            .textContent.toLowerCase();

        // Check search match
        const matchesSearch = productName.includes(searchText);

        // Check category match
        let matchesCategory = true;

        if (selectedFilter.id !== "filter-all") {

            const category = selectedFilter.id.replace("filter-", "");

            matchesCategory = product.classList.contains("cat-" + category);
        }

        // Show only if both conditions match
        if (matchesSearch && matchesCategory) {
            product.style.display = "";
            visibleCount++;
        } 
        else {
            product.style.display = "none";
        }

    });

    // Show or hide no products message
    if (visibleCount === 0) {
        noProducts.style.display = "block";
    } 
    else {
        noProducts.style.display = "none";
    }

}

// Run search whenever user types
searchInput.addEventListener("input", filterProducts);

// Run filter whenever category changes
const categoryFilters = document.querySelectorAll(
    'input[name="category"]'
);

categoryFilters.forEach(function(filter) {
    filter.addEventListener("change", filterProducts);
});

const sortBtn = document.getElementById("sortBtn");
const productGrid = document.getElementById("productGrid");

let ascending = true;

sortBtn.addEventListener("click", function() {

    // Get existing product cards
    const products = Array.from(
        productGrid.querySelectorAll(".gallery")
    );

    // Sort products according to price
    products.sort(function(a, b) {

        const priceA = Number(
            a.querySelector("h4").textContent.replace("USD", "").trim()
        );

        const priceB = Number(
            b.querySelector("h4").textContent.replace("USD", "").trim()
        );

        if (ascending) {
            return priceA - priceB;
        } else {
            return priceB - priceA;
        }

    });

    // Move existing cards into sorted order
    products.forEach(function(product) {
        productGrid.appendChild(product);
    });

    // Change sorting direction for next click
    ascending = !ascending;

});
