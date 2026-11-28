
const searchInput = document.getElementById("searchInput");

const products = document.querySelectorAll("#productList li");

const noResults = document.getElementById("noResults");

searchInput.addEventListener("input", function () {

    const searchText = searchInput.value.toLowerCase().trim();

    let found = false;

    products.forEach(function (product) {

        const productName = product.textContent.toLowerCase();

        if (productName.includes(searchText)) {

            product.style.display = "";

            found = true;

        } else {

            product.style.display = "none";

        }

    });

    if (found) {
        noResults.style.display = "none";
    } else {
        noResults.style.display = "block";
    }

});
