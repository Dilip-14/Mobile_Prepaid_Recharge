

document.addEventListener("DOMContentLoaded", function () {
    let username = localStorage.getItem("username");
    let userDisplay = document.getElementById("usernameDisplay");
    let userLink = document.getElementById("usernameLink");
    let personIcon = '<i class="bi bi-person-circle"></i>';

    if (username) {
        userDisplay.innerHTML = username;
        userLink.href = "profile_page.html";
    } else {
        userDisplay.innerHTML = personIcon;
        userLink.href = "#";
        userLink.addEventListener("click", showLoginPopup);
    }
});

function showLoginPopup() {
    document.getElementById('popup-overlay').style.display = 'block';
    document.getElementById('login-popup').style.display = 'block';
}

function hidePopups() {
    document.getElementById('popup-overlay').style.display = 'none';
    document.getElementById('login-popup').style.display = 'none';
    document.getElementById('otp-popup').style.display = 'none';
    document.getElementById('popup-mobileno').value = '';
    document.getElementById('otp-input').value = '';
    document.getElementById('popup-phoneerror').style.display = 'none';
    document.getElementById('otp-error').style.display = 'none';
}

function generateOTP() {
    let phoneInput = document.getElementById('popup-mobileno').value;
    let phonePattern = /^\d{10}$/;

    if (!phonePattern.test(phoneInput)) {
        document.getElementById('popup-phoneerror').textContent = 'Enter a valid 10-digit number.';
        document.getElementById('popup-phoneerror').style.display = 'block';
    } else {
        document.getElementById('popup-phoneerror').style.display = 'none';
        document.getElementById('login-popup').style.display = 'none';
        document.getElementById('otp-popup').style.display = 'block';
    }
}

function validateOTP() {
    let otpInput = document.getElementById("otp-input").value;
    let registeredUser = {
        mobileNumber: "9876543210",
        otp: "12345",
        username: "Dilip"
    };
    localStorage.setItem("registeredUser", JSON.stringify(registeredUser));

    if (otpInput === registeredUser.otp) {
        localStorage.setItem("username", registeredUser.username);
        window.location.href = "profile_page.html";
    } else {
        document.getElementById("otp-error").textContent = "Invalid OTP. Try again.";
        document.getElementById("otp-error").style.display = "block";
    }
}
