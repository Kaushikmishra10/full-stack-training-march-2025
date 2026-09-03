const users = [
    { id: 1, name: "Anand", role: "Admin", active: true },
    { id: 2, name: "Riya", role: "Editor", active: false },
    { id: 3, name: "Karan", role: "Viewer", active: true },
    { id: 4, name: "Meera", role: "Editor", active: true }
];

users.sort((a, b) => a.name.localeCompare(b.name));

const tableBody = document.getElementById("tabledata");

users.forEach(user => {
    const row = document.createElement("tr");

    const idCell = document.createElement("td");
    idCell.textContent = user.id;

    const nameCell = document.createElement("td");
    nameCell.textContent = user.name;

    const roleCell = document.createElement("td");
    roleCell.textContent = user.role;

    const activeCell = document.createElement("td");
    activeCell.textContent = user.active ? "Yes" : "No";

    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(roleCell);
    row.appendChild(activeCell);

    tableBody.appendChild(row);
});

const totalUsers = users.length;
const activeUsers = users.filter(user => user.active).length;
const inactiveUsers = totalUsers - activeUsers;

const summary = document.getElementById("summary");
summary.textContent = `Total Users: ${totalUsers} | Active: ${activeUsers} | Inactive: ${inactiveUsers}`;