// AUTHENTICATION 
function secureLogin() {
    const u = document.getElementById("user").value;
    const p = document.getElementById("pass").value;
    const loginBox = document.getElementById("login");
    const error = document.getElementById("loginError");

    if (u === "mmm" && p === "1234") {
        if (audioCtx.state === 'suspended') audioCtx.resume();
        loginBox.classList.add("fade-out");
        setTimeout(() => {
            loginBox.style.display = "none";
            loginBox.classList.remove("fade-out");
        }, 500);
        playSound(880, 'sine', 0.8, 0.1);
        logFeed("Operator Session Validated: " + u.toUpperCase());
    } else {
        error.style.display = "block";
        error.classList.add("shake");
        setTimeout(() => { error.classList.remove("shake"); }, 500);
        playSound(100, 'sawtooth', 0.4, 0.1);
    }
}

function lockDashboard() {
    const loginBox = document.getElementById("login");
    loginBox.style.display = "flex";
    loginBox.classList.add("fade-in");
    setTimeout(() => loginBox.classList.remove("fade-in"), 500);
}