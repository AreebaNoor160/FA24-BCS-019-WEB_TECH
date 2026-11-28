const emailInput = document.getElementById("email");

const message = document.getElementById("message");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

emailInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        const email = emailInput.value.trim();

        if (email === "") {

            message.textContent = "";

            message.className = "";

        } 
        else if (emailRegex.test(email)) {

            message.textContent = "✓ Valid email address";

            message.className = "valid";

        } 
        else {

            message.textContent = "✗ Invalid email address";

            message.className = "invalid";

        }

    }

});