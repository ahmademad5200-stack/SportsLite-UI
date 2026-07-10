document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('login-btn');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    loginBtn.addEventListener('click', async () => {
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (!email || !password) {
            Swal.fire({ icon: 'warning', title: 'تنبيه', text: 'يرجى تعبئة جميع الحقول!', confirmButtonColor: '#FF5900' });
            return;
        }

        loginBtn.innerText = "جاري الدخول...";
        loginBtn.disabled = true;
        
        // استدعاء دالة الـ API
        const result = await loginUser(email, password);

        if (result.ok) {
            // نجح الدخول
            const userData = result.data.user || result.data;
            
            localStorage.setItem('trainee_id', userData.id);
            localStorage.setItem('trainee_name', userData.name);
            
            Swal.fire({ icon: 'success', title: 'نجاح', text: 'أهلاً بك مجدداً!', confirmButtonColor: '#FF5900', timer: 1500 });
            setTimeout(() => { window.location.href = "index.html"; }, 1500);
        } else {
            // فشل الدخول
            Swal.fire({ icon: 'error', title: 'خطأ', text: result.data.message || "فشل تسجيل الدخول", confirmButtonColor: '#FF5900' });
        }

        loginBtn.innerText = "تسجيل دخول";
        loginBtn.disabled = false;
    });
});