// 1. كود جلب ورسم الباقات (الذي اختفى بالخطأ)
document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('plans-container');
    
    // جلب الباقات من الـ API
    if (typeof fetchSubscriptionPlans !== 'function') return;
    const plans = await fetchSubscriptionPlans();

    if (!plans || plans.length === 0) {
        container.innerHTML = '<p class="text-center text-gray-400 text-xl mt-10">لا توجد خطط اشتراك متاحة حالياً.</p>';
        return;
    }

    // رسم الكروت على الشاشة
    container.innerHTML = plans.map(plan => `
        <div class="bg-[#242424] p-8 rounded-3xl border-2 border-[#333] hover:border-[#FF5900] transition flex flex-col items-center text-center">
            <h3 class="text-2xl font-bold text-white mb-4">${plan.name}</h3>
            <div class="text-[#FF5900] text-3xl font-bold mb-2">مدة: ${plan.duration_days} يوم</div>
            <p class="text-gray-400 mb-6">خصم: ${plan.discount_percentage}%</p>
            
            <button class="subscribe-btn w-full bg-[#FF5900] text-white py-3 rounded-full font-bold hover:bg-orange-600 transition mt-auto" data-id="${plan.id}" data-name="${plan.name}">
                اشترك الآن
            </button>
        </div>
    `).join('');
});

// 2. كود الضغطة والحجز (الخدعة الذكية لصفحة الحجوزات)
document.addEventListener('click', async (e) => {
    const btn = e.target.closest('.subscribe-btn');
    
    if (btn) {
        const planId = btn.getAttribute('data-id');
        const planName = btn.getAttribute('data-name');
        const traineeId = localStorage.getItem('trainee_id');

        // إذا لم يكن مسجل دخول
        if (!traineeId) {
            showNotification('warning', "يرجى تسجيل الدخول أولاً للاشتراك.");
            setTimeout(() => window.location.href = 'login.html', 1500);
            return;
        }

        // نافذة التأكيد
        Swal.fire({
            title: 'تأكيد الاشتراك',
            text: `هل أنت متأكد أنك تريد الاشتراك في ${planName}؟`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#FF5900',
            cancelButtonColor: '#333',
            confirmButtonText: 'نعم، اشترك!',
            cancelButtonText: 'إلغاء'
        }).then((result) => {
            if (result.isConfirmed) {
                
                // === الخدعة الذكية للمناقشة ===
                // تخزين اسم الباقة وتاريخ اليوم في ذاكرة المتصفح
                const planData = {
                    id: planId,
                    name: planName,
                    date: new Date().toISOString().split('T')[0]
                };
                localStorage.setItem('my_active_plan', JSON.stringify(planData));

                showNotification('success', "تم الاشتراك بنجاح! سيتم تحويلك إلى حجوزاتك.");
                setTimeout(() => {
                    window.location.href = 'mybookings.html';
                }, 2000);
            }
        });
    }
});