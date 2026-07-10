document.addEventListener('DOMContentLoaded', () => {
    
    // جلب العناصر من الواجهة
    const submitBtn = document.getElementById('contactSubmitBtn');
    const nameInput = document.getElementById('contactName');
    const emailInput = document.getElementById('contactEmail');
    const phoneInput = document.getElementById('contactPhone');
    const messageInput = document.getElementById('contactMessage');

    if (submitBtn) {
        submitBtn.addEventListener('click', async (e) => {
            e.preventDefault(); 

            // 1. قراءة البيانات
            const nameVal = nameInput.value.trim();
            const emailVal = emailInput.value.trim();
            const phoneVal = phoneInput.value.trim();
            const messageVal = messageInput.value.trim();

            // 2. التحقق من الواجهة (UI Validation)
            if (nameVal.length < 3) {
                showNotification('warning', "يرجى إدخال اسم صحيح (3 أحرف على الأقل).");
                nameInput.focus();
                return; 
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailVal)) {
                showNotification('warning', "يرجى إدخال بريد إلكتروني صحيح.");
                emailInput.focus();
                return;
            }

            if (!messageVal) {
                showNotification('warning', "يرجى كتابة موضوع أو رسالة.");
                messageInput.focus();
                return;
            }

            // 3. تجهيز البيانات للإرسال
            const payload = {
                name: nameVal,
                email: emailVal,
                phone: phoneVal, 
                message_text: messageVal
            };

            // 4. تفاعل الواجهة: تغيير حالة الزر
            submitBtn.innerText = "جاري الإرسال...";
            submitBtn.disabled = true;

            // 5. استدعاء الـ API
            const response = await sendMessageToAPI(payload);

            // 6. تفاعل الواجهة بناءً على رد السيرفر
            if (response.ok) {
                showNotification('success', "تم إرسال رسالتك بنجاح! شكراً لتواصلك معنا.");
                
                // تفريغ الحقول
                nameInput.value = '';
                emailInput.value = '';
                phoneInput.value = '';
                messageInput.value = '';
            } else {
                // إظهار الخطأ القادم من السيرفر
                showNotification('error', response.data?.message || "حدث خطأ أثناء إرسال الرسالة.");
            }

            // 7. إعادة الزر لحالته الطبيعية
            submitBtn.innerText = "إرسال";
            submitBtn.disabled = false;
        });
    }
});