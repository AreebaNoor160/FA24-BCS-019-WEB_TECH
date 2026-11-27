
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

if (searchInput) {
    searchInput.addEventListener("input", searchProducts);
}
let cart = JSON.parse(localStorage.getItem("cart")) || [];


function updateCartCount() {

    const cartCount = document.getElementById("cartCount");

    if (cartCount) {

        const totalItems = cart.reduce(function(total, item) {
            return total + item.quantity;
        }, 0);

        cartCount.textContent = totalItems;
    }

}
function saveCart() {

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

}
function addToCart(product, quantity) {

    
    const existingProduct = cart.find(function(item) {
        return item.id === product.id;
    });

    if (existingProduct) {

        existingProduct.quantity += quantity;

    } else {

        // Add new product
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });

    }

    saveCart();

    alert(product.name + " added to cart!");
}

let productsData = [];

const artProducts = document.getElementById("artProducts");
const jewelryProducts = document.getElementById("jewelryProducts");
const bookProducts = document.getElementById("bookProducts");


// Load products from JSON
if (artProducts) {

    fetch("products.json")

        .then(function(response) {

            if (!response.ok) {
                throw new Error("Products file not found");
            }

            return response.json();

        })

        .then(function(products) {

            productsData = products;

            products.forEach(function(product) {

                // Create product card
                const card = document.createElement("div");

                card.classList.add("gallery");
                card.classList.add("cat-" + product.category);


                // Product HTML
                card.innerHTML = `
                    <img
                        src="${product.image}"
                        alt="${product.name}"
                    >

                    <div class="para">

                        <h6>${product.name}</h6>

                        <h4>USD ${product.price}</h4>

                    </div>

                    <button
                        type="button"
                        class="add-cart-btn"
                        data-id="${product.id}">
                        Add to Cart
                    </button>
                `;


                // Select category container
                let categoryContainer;

                if (product.category === "art") {
                    categoryContainer = artProducts;
                }

                else if (product.category === "jewelry") {
                    categoryContainer = jewelryProducts;
                }

                else if (product.category === "books") {
                    categoryContainer = bookProducts;
                }


                // Add product to its category
                if (categoryContainer) {
                    categoryContainer.appendChild(card);
                }

            });
            searchProducts();
        })

        .catch(function(error) {

            console.error("Error loading products:", error);

        });}





updateCartCount();

const productCards = document.querySelectorAll(".gallery");

if (artProducts) {

    artProducts.parentElement.parentElement
        .addEventListener("click", function(event) {

            const button = event.target.closest(".add-cart-btn");

            if (!button) {
                return;
            }

            const productId = button.dataset.id;

            // Find selected product from JSON data
            const product = productsData.find(function(item) {
                return String(item.id) === productId;
            });

            if (product) {

                addToCart({
                    id: String(product.id),
                    name: product.name,
                    price: product.price,
                    image: product.image
                }, 1);

            }

        });

}

const basketButton = document.querySelector(".basket-button");

if (basketButton) {

    basketButton.addEventListener("click", function() {

        // Get product name
        const productName = document.querySelector(
            ".product-description"
        ).textContent.trim();


        // Get product price
        const priceText = document.querySelector(".pro2 h2").textContent;

        const priceMatch = priceText.match(/\d+(?:\.\d+)?/g);

        const productPrice = Number(
            priceMatch[priceMatch.length - 1]
        );


        // Get product image
        const productImage = document.querySelector(
            ".pro1 img"
        ).getAttribute("src");


        // Get selected quantity
        const quantity = Number(
            document.getElementById("quantity").value
        );


        // Create product object
        const product = {
            id: "family-tree-magnet",
            name: productName,
            price: productPrice,
            image: productImage
        };


        // Add product to cart
        addToCart(product, quantity);

    });

}

const cartItems = document.getElementById("cartItems");

const cartTotal = document.getElementById("cartTotal");


// Check whether current page is cart.html
if (cartItems) {

   
function renderCart() {

    // Check if cart is empty
    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">

                <h3>Your cart is empty!</h3>

                <p>Add some products to your cart.</p>

                <a href="index.html">
                    Continue Shopping
                </a>

            </div>
        `;

    } else {

        // Display cart products using map()
        const cartHTML = cart.map(function(item) {

            return `
                <div class="cart-item">

                    <!-- Product Image -->
                    <img
                        src="${item.image}"
                        alt="${item.name}"
                        class="cart-product-image"
                    >

                    <!-- Product Information -->
                    <div class="cart-product-info">

                        <h4>${item.name}</h4>

                        <p class="cart-price">
                            USD ${item.price.toFixed(2)}
                        </p>

                        <!-- Quantity Controls -->
                        <div class="quantity-controls">

                            <button
                                type="button"
                                class="quantity-btn"
                                data-action="decrease"
                                data-id="${item.id}"
                            >
                                -
                            </button>

                            <span>${item.quantity}</span>

                            <button
                                type="button"
                                class="quantity-btn"
                                data-action="increase"
                                data-id="${item.id}"
                            >
                                +
                            </button>

                        </div>

                        <!-- Product Subtotal -->
                        <p class="cart-subtotal">
                            Subtotal:
                            USD ${(item.price * item.quantity).toFixed(2)}
                        </p>

                        <!-- Remove Product -->
                        <button
                            type="button"
                            class="remove-btn"
                            data-action="remove"
                            data-id="${item.id}"
                        >
                            Remove
                        </button>

                    </div>

                </div>
            `;

        }).join("");

        // Display products inside cart
        cartItems.innerHTML = cartHTML;

    }


    // Calculate total price using reduce()
    const totalPrice = cart.reduce(function(total, item) {

        return total + (item.price * item.quantity);

    }, 0);


    // Update first total
    cartTotal.textContent = totalPrice.toFixed(2);


    // Update second total
    const cartTotalCopy = document.getElementById("cartTotalCopy");

    if (cartTotalCopy) {

        cartTotalCopy.textContent = totalPrice.toFixed(2);

    }


    // Update header cart count
    updateCartCount();

}

    cartItems.addEventListener("click", function(event) {

        const button = event.target.closest("button");

        if (!button) {
            return;
        }

        const action = button.dataset.action;

        const productId = button.dataset.id;


        // Increase quantity
        if (action === "increase") {

            cart = cart.map(function(item) {

                if (item.id === productId) {

                    return {
                        ...item,
                        quantity: item.quantity + 1
                    };

                }

                return item;

            });

        }
        if (action === "decrease") {

            cart = cart.map(function(item) {

                if (item.id === productId) {

                    return {
                        ...item,
                        quantity: Math.max(1, item.quantity - 1)
                    };

                }

                return item;

            });

        }
        if (action === "remove") {

            cart = cart.filter(function(item) {

                return item.id !== productId;

            });

        }
        saveCart();
        renderCart();

    });
    renderCart();

    // Checkout button
    const checkoutBtn = document.getElementById("checkoutBtn");

    const checkoutForm = document.getElementById("checkoutForm");


    // Open checkout form
    if (checkoutBtn && checkoutForm) {

        checkoutBtn.addEventListener("click", function() {

            if (cart.length === 0) {

                alert("Your cart is empty!");

                return;

            }

            checkoutForm.hidden = false;

            checkoutForm.scrollIntoView({
                behavior: "smooth"
            });

        });

    }

    // Checkout form validation
    if (checkoutForm) {

        checkoutForm.addEventListener("submit", function(event) {

            // Prevent form submission initially
            event.preventDefault();


            // Get input values
            const name = document.getElementById("customerName")
                .value.trim();

            const email = document.getElementById("customerEmail")
                .value.trim();

            const phone = document.getElementById("customerPhone")
                .value.trim();

            const address = document.getElementById("customerAddress")
                .value.trim();


            // Get error elements
            const nameError = document.getElementById("nameError");

            const emailError = document.getElementById("emailError");

            const phoneError = document.getElementById("phoneError");

            const addressError = document.getElementById("addressError");

            const checkoutMessage = document.getElementById("checkoutMessage");


            // Clear previous errors
            nameError.textContent = "";

            emailError.textContent = "";

            phoneError.textContent = "";

            addressError.textContent = "";

            checkoutMessage.textContent = "";


            // Regular expressions
            const nameRegex = /^[A-Za-z][A-Za-z\s'-]{1,49}$/;

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

            const phoneRegex = /^\+?[0-9]{10,15}$/;


            let isValid = true;


            // Validate name
            if (!nameRegex.test(name)) {

                nameError.textContent =
                    "Please enter a valid name.";

                isValid = false;

            }


            // Validate email
            if (!emailRegex.test(email)) {

                emailError.textContent =
                    "Please enter a valid email address.";

                isValid = false;

            }


            // Validate phone
            if (!phoneRegex.test(phone)) {

                phoneError.textContent =
                    "Enter a valid phone number with 10 to 15 digits.";

                isValid = false;

            }


            // Validate address
            if (address === "") {

                addressError.textContent =
                    "Please enter your delivery address.";

                isValid = false;

            }


            // Stop if validation fails
            if (!isValid) {

                return;

            }


            // Show success message
            checkoutMessage.textContent =
                "Your checkout details are valid!";

            checkoutMessage.style.color = "green";

        });

    }


}
