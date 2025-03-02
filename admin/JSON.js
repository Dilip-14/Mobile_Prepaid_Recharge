// JSON.js
function getUsersFromLocalStorage() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

function saveUserToLocalStorage(user) {
    const users = getUsersFromLocalStorage();
    const existingUserIndex = users.findIndex(u => u.userId === user.userId);
    if (existingUserIndex >= 0) {
        users[existingUserIndex] = user; // Update existing user
    } else {
        users.push(user); // Add new user
    }
    localStorage.setItem('users', JSON.stringify(users));
}

function deleteUserFromLocalStorage(userId) {
    let users = getUsersFromLocalStorage();
    users = users.filter(u => u.userId !== userId);
    localStorage.setItem('users', JSON.stringify(users));
}

function getUserFromLocalStorage(userId) {
    const users = getUsersFromLocalStorage();
    return users.find(u => u.userId === userId);
}