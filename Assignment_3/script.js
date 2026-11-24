
const searchInput = document.getElementById("searchInput");

function searchProducts() {
    const searchText = searchInput.value.toLowerCase().trim();
    const products = document.querySelectorAll(".gallery");

    products.forEach(function(product) {
        const productName = product.querySelector("h6")
            .textContent.toLowerCase();
        if (productName.includes(searchText)) {
             product.style.display = "";
        } else {
            product.style.display = "none";
        }
    });
}
searchInput.addEventListener("input", searchProducts);
