async function loginUser(email, password) {
    try {
        const res = await apiRequest("/auth/login", "POST", { email, password });

        if (res.token) {
            localStorage.setItem("token", res.token);
            window.location.href = "dashboard.html";
        } else {
            alert(res.message || "Login failed");
        }
    } catch (error) {
        console.error("Login error:", error);
        alert("An error occurred during login");
    }
}

async function registerUser(username, email, password) {
    try {
        const res = await apiRequest("/auth/register", "POST", { username, email, password });

        if (res.message.includes("successfully")) {
            alert("Registration successful! Please login.");
            window.location.href = "login.html";
        } else {
            alert(res.message || "Registration failed");
        }
    } catch (error) {
        console.error("Registration error:", error);
        alert("An error occurred during registration");
    }
}

function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}