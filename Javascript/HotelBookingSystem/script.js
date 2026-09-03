let booking = [];
let total = 0;

function changeQty(id, value) {
    let qty = parseInt(document.getElementById(id).innerText);
    qty += value;
    if (qty < 0) qty = 0;
    document.getElementById(id).innerText = qty;
}

function addRoom(name, price, qtyId) {
    const qty = parseInt(document.getElementById(qtyId).innerText);
    if (qty === 0) {
        alert("Select number of rooms");
        return;
    }

    booking.push({ name, price, qty });
    document.getElementById(qtyId).innerText = 0;
    calculateTotal();
}

function calculateNights() {
    const checkin = document.getElementById("checkin").value;
    const checkout = document.getElementById("checkout").value;

    if (!checkin || !checkout) return 0;

    const inDate = new Date(checkin);
    const outDate = new Date(checkout);
    const diff = (outDate - inDate) / (1000 * 60 * 60 * 24);
    return diff > 0 ? diff : 0;
}

function calculateTotal() {
    const nights = calculateNights();
    document.getElementById("nights").innerText = nights;

    total = booking.reduce((sum, room) =>
        sum + room.price * room.qty * nights, 0);

    displayBooking();
}

function displayBooking() {
    const list = document.getElementById("booking-items");
    list.innerHTML = "";

    booking.forEach(room => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${room.name} × ${room.qty}
            <span>₹${room.price * room.qty}</span>
        `;
        list.appendChild(li);
    });

    document.getElementById("total").innerText = total;
}

document.getElementById("checkin").addEventListener("change", calculateTotal);
document.getElementById("checkout").addEventListener("change", calculateTotal);

function confirmBooking() {
    if (booking.length === 0) {
        alert("No rooms selected");
        return;
    }
    if (calculateNights() === 0) {
        alert("Select valid dates");
        return;
    }
    alert("🎉 Booking confirmed! Enjoy your stay.");
    booking = [];
    total = 0;
    displayBooking();
}
