const API_URL = "http://localhost:5000";

async function apiRequest(endpoint, method = "GET", body = null) {
    const token = localStorage.getItem("token");
    
    const options = {
        method,
        headers: { 
            "Content-Type": "application/json"
        }
    };

    if (token) {
        options.headers["Authorization"] = `Bearer ${token}`;
    }

    if (body) {
        options.body = JSON.stringify(body);
    }

    console.log(`🚀 Requesting: ${method} ${API_URL + endpoint}`, body ? body : "");
    const res = await fetch(API_URL + endpoint, options);
    console.log(`📩 Response Status: ${res.status}`);
    
    if (res.status === 401 && !endpoint.includes("/auth/login")) {
        localStorage.removeItem("token");
        window.location.href = "login.html";
        return;
    }

    return res.json();
}