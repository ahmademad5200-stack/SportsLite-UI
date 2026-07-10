document.addEventListener('DOMContentLoaded', () => {
    const registerBtn = document.getElementById('register-btn');
    const fullNameInput = document.getElementById('full_name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const passwordInput = document.getElementById('password');

    registerBtn.addEventListener('click', async () => {
        const fullName = fullNameInput.value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();
        const password = passwordInput.value.trim();

        // 1. التحقق من الحقول
        if (!fullName || !email || !phone || !password) {
            Swal.fire({ icon: 'warning', title: 'تنبيه', text: 'يرجى تعبئة جميع الحقول!', confirmButtonColor: '#FF5900' });
            return;
        }

        registerBtn.innerText = "جاري إنشاء الحساب...";
        registerBtn.disabled = true;

        // 2. إرسال الطلب للسيرفر
        const result = await registerUser(fullName, email, phone, password);

        // 3. معالجة الرد
        if (result.ok) {
            const userData = result.data.user || result.data;
            
            // حفظ بيانات المستخدم الجديد فوراً ليكون مسجل دخول
            if (userData && userData.id) {
                localStorage.setItem('trainee_id', userData.id);
                localStorage.setItem('trainee_name', userData.name || fullName);
            }
            
            Swal.fire({ icon: 'success', title: 'تهانينا', text: 'تم إنشاء الحساب بنجاح! أهلاً بك في SportSLite.', confirmButtonColor: '#FF5900', timer: 2000 });
            setTimeout(() => { window.location.href = "index.html"; }, 2000);
        } else {
            Swal.fire({ icon: 'error', title: 'فشل الإنشاء', text: result.data.message || 'حدث خطأ أثناء إنشاء الحساب. قد يكون البريد مستخدماً بالفعل.', confirmButtonColor: '#FF5900' });
        }

        registerBtn.innerText = "إنشاء حساب";
        registerBtn.disabled = false;
    });
});