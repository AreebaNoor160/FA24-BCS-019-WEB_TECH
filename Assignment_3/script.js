
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


// Update count when page loads
updateCartCount();

const productCards = document.querySelectorAll(".gallery");

productCards.forEach(function(card, index) {

    const productName = card.querySelector("h6").textContent.trim();

    const priceText = card.querySelector("h4").textContent;

    const productPrice = Number(
        priceText.replace("USD", "").trim()
    );

    const productImage = card.querySelector("img").getAttribute("src");

    const button = document.createElement("button");

    button.type = "button";
    button.textContent = "Add to Cart";
    button.className = "add-cart-btn";


    // Add click event
    button.addEventListener("click", function() {

        const product = {
            id: "product-" + index,
            name: productName,
            price: productPrice,
            image: productImage
        };

        addToCart(product, 1);

    });

    card.appendChild(button);

});
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

}
