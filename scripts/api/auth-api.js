const AUTH_BASE_URL = 'https://sportslite.app/api/v1/auth';

async function loginUser(email, password) {
    try {
        const response = await fetch(`${AUTH_BASE_URL}/login.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const result = await response.json();
        return { ok: response.ok, data: result };
    } catch (error) {
        return { ok: false, data: { message: "خطأ في الاتصال بالسيرفر" } };
    }
}

async function registerUser(fullName, email, phone, password) {
    try {
        const response = await fetch(`${AUTH_BASE_URL}/register.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                full_name: fullName, 
                email: email, 
                phone: phone, 
                password: password,
                gender: 'Male' 
            })
        });
        const result = await response.json();
        return { ok: response.ok, data: result };
    } catch (error) {
        return { ok: false, data: { message: "خطأ في الاتصال بالسيرفر" } };
    }
}