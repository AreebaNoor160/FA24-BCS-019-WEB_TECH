
const quantity = document.getElementById("quantity");

const decreaseButton = document.getElementById("decrease");
const increaseButton = document.getElementById("increase");

let count = 1;

increaseButton.addEventListener("click", function () {
    count++;

    quantity.textContent = count;
});

decreaseButton.addEventListener("click", function () {
    if (count > 1) {
        count--;
    }

    quantity.textContent = count;
});
