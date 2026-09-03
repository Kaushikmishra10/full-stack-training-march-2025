const form = document.getElementById("registerForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");

function showError(input, message) {
    const error = input.nextElementSibling;
    error.textContent = message;
}

function clearError(input) {
    const error = input.nextElementSibling;
    error.textContent = "";
}

function validateName() {
    if (nameInput.value.trim() === "") {
        showError(nameInput, "Name cannot be empty");
        return false;
    }
    if (nameInput.value.length < 3) {
        showError(nameInput, "Minimum 3 characters required");
        return false;
    }
    clearError(nameInput);
    return true;
}

function validateEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value.trim() === "") {
        showError(emailInput, "Email cannot be empty");
        return false;
    }
    if (!emailRegex.test(emailInput.value)) {
        showError(emailInput, "Enter a valid email");
        return false;
    }
    clearError(emailInput);
    return true;
}

function validatePassword() {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;
    if (passwordInput.value.trim() === "") {
        showError(passwordInput, "Password cannot be empty");
        return false;
    }
    if (!passwordRegex.test(passwordInput.value)) {
        showError(passwordInput, "Must have uppercase, lowercase, digit & special character");
        return false;
    }
    clearError(passwordInput);
    return true;
}

function validateConfirmPassword() {
    if (confirmPasswordInput.value !== passwordInput.value) {
        showError(confirmPasswordInput, "Passwords do not match");
        return false;
    }
    clearError(confirmPasswordInput);
    return true;
}

nameInput.addEventListener("input", validateName);
emailInput.addEventListener("blur", validateEmail);
passwordInput.addEventListener("input", validatePassword);
confirmPasswordInput.addEventListener("input", validateConfirmPassword);

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const isValid =
        validateName() &&
        validateEmail() &&
        validatePassword() &&
        validateConfirmPassword();

    if (isValid) {
        alert("Registration Successful");
        form.reset();
    }
});
