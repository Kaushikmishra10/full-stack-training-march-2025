let cart = [];
let total = 0;

function addToCart(item, price) {
    cart.push({ item, price });
    total += price;
    displayCart();
}

function displayCart() {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";

    cart.forEach((product, index) => {
        let li = document.createElement("li");
        li.innerHTML = `
            ${product.item} - ₹${product.price}
            <button onclick="removeItem(${index})">❌</button>
        `;
        cartItems.appendChild(li);
    });

    document.getElementById("total").innerText = total;
}

function removeItem(index) {
    total -= cart[index].price;
    cart.splice(index, 1);
    displayCart();
}

function clearCart() {
    cart = [];
    total = 0;
    displayCart();
}

function placeOrder() {
    if (cart.length === 0) {
        alert("Cart is empty!");
        return;
    }
    alert("Order placed successfully! 🍽️");
    clearCart();
}
