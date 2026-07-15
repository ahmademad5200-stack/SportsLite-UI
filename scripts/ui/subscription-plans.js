document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('plans-container');
    
    if (typeof fetchSubscriptionPlans !== 'function') return;
    
    const plans = await fetchSubscriptionPlans();

    if (!plans || plans.length === 0) {
        container.innerHTML = '<p class="text-center text-gray-400 w-full">لا توجد خطط اشتراك متاحة حالياً.</p>';
        return;
    }

    // رسم الكروت بتنسيق يسمح بعرض 3 فقط في الشاشة وسحب الباقي
    container.innerHTML = plans.map(plan => `
        <div class="min-w-[100%] md:min-w-[calc(33.333%-1rem)] snap-center bg-[#242424] p-8 rounded-3xl border-2 border-[#333] hover:border-[#FF5900] transition flex flex-col items-center text-center shadow-lg">
            <h3 class="text-2xl font-bold text-white mb-4">${plan.name}</h3>
            <div class="text-[#FF5900] text-3xl font-bold mb-2">مدة: ${plan.duration_days} يوم</div>
            <p class="text-gray-400 mb-6">خصم: ${plan.discount_percentage}%</p>
            
            <button onclick="subscribe(${plan.id}, '${plan.name}')" class="w-full bg-[#FF5900] text-white py-3 rounded-full font-bold hover:bg-orange-600 transition mt-auto">
                اشترك الآن
            </button>
        </div>
    `).join('');

    // برمجة أزرار التقليب يميناً ويساراً
    const slideRightBtn = document.getElementById('slide-right');
    const slideLeftBtn = document.getElementById('slide-left');
    
    if (slideRightBtn && slideLeftBtn) {
        slideRightBtn.addEventListener('click', () => {
            // التمرير لليمين (يعني للكرت السابق في اللغة العربية RTL)
            container.scrollBy({ left: 350, behavior: 'smooth' });
        });
        
        slideLeftBtn.addEventListener('click', () => {
            // التمرير لليسار (يعني للكرت التالي)
            container.scrollBy({ left: -350, behavior: 'smooth' });
        });
    }
});

// دالة الاشتراك مع خدعة الـ LocalStorage
async function subscribe(planId, planName) {
    const traineeId = localStorage.getItem('trainee_id');

    if (!traineeId) {
        showNotification('warning', "يرجى تسجيل الدخول أولاً للاشتراك.");
        setTimeout(() => window.location.href = 'login.html', 1500);
        return;
    }

    Swal.fire({
        title: 'تأكيد الاشتراك',
        text: `هل أنت متأكد أنك تريد الاشتراك في ${planName}؟`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#FF5900',
        cancelButtonColor: '#333',
        confirmButtonText: 'نعم، اشترك!',
        cancelButtonText: 'إلغاء'
    }).then(async (result) => {
        if (result.isConfirmed) {
            
            // === الخدعة: تخزين الباقة في ذاكرة المتصفح ===
            const planData = {
                id: planId,
                name: planName,
                date: new Date().toISOString().split('T')[0] // تاريخ اليوم
            };
            localStorage.setItem('my_active_plan', JSON.stringify(planData));
            
            showNotification('success', "تم الاشتراك بنجاح! سيتم تحويلك إلى حجوزاتك.");
            setTimeout(() => {
                window.location.href = 'mybookings.html';
            }, 2000);
            
        }
    });
}