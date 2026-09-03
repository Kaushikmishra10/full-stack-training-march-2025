const apiURL = "https://fakestoreapi.com/users";
const statusText = document.getElementById("status");
const table = document.getElementById("usersTable");
const tableBody = document.getElementById("tableBody");

function fetchUsers() {
    statusText.textContent = "Loading users...";
    statusText.classList.remove("error");

    fetch(apiURL)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch users");
            }
            return response.json();
        })
        .then(users => {
            statusText.style.display = "none";
            table.style.display = "table";
            displayUsers(users);
        })
        .catch(error => {
            statusText.textContent = "Error loading users. Please try again.";
            statusText.classList.add("error");
        });
}

function displayUsers(users) {
    tableBody.innerHTML = "";

    users.forEach((user, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td> <td>${user.name.firstname} ${user.name.lastname}</td> <td>${user.username}</td> <td>${user.email}</td> <td>${user.address.city}</td>`;

        tableBody.appendChild(row);
    });
}

fetchUsers();