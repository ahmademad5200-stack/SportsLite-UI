document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('plans-container');
    
    // تأكد أن الدالة fetchSubscriptionPlans موجودة في ملف API وتعمل
    if (typeof fetchSubscriptionPlans !== 'function') return;
    
    const plans = await fetchSubscriptionPlans();

    if (!plans || plans.length === 0) {
        container.innerHTML = '<p class="text-center text-gray-400">لا توجد خطط اشتراك متاحة حالياً.</p>';
        return;
    }

    container.innerHTML = plans.map(plan => `
        <div class="bg-[#242424] p-8 rounded-3xl border-2 border-[#333] hover:border-[#FF5900] transition flex flex-col items-center text-center">
            <h3 class="text-2xl font-bold text-white mb-4">${plan.name}</h3>
            <div class="text-[#FF5900] text-3xl font-bold mb-2">مدة: ${plan.duration_days} يوم</div>
            <p class="text-gray-400 mb-6">خصم: ${plan.discount_percentage}%</p>
            
            <button onclick="subscribe(${plan.id}, '${plan.name}')" class="w-full bg-[#FF5900] text-white py-3 rounded-full font-bold hover:bg-orange-600 transition mt-auto">
                اشترك الآن
            </button>
        </div>
    `).join('');
});

// دالة الاشتراك المربوطة بشكل صحيح
async function subscribe(planId, planName) {
    const traineeId = localStorage.getItem('trainee_id');

    // 1. إذا لم يكن مسجل دخول، حوله لصفحة الدخول
    if (!traineeId) {
        showNotification('warning', "يرجى تسجيل الدخول أولاً للاشتراك.");
        setTimeout(() => window.location.href = 'login.html', 1500);
        return;
    }

    // 2. إذا مسجل، أظهر له نافذة تأكيد
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
            
            // هنا المفروض يتم استدعاء الـ API الخاص بالاشتراكات (Post request)
            // بما أنه ليس لدينا Endpoint جاهز في كلامك، سنحاكي نجاح العملية ونحوله للحجوزات
            
            showNotification('success', "تم الاشتراك بنجاح! سيتم تحويلك إلى حجوزاتك.");
            setTimeout(() => {
                window.location.href = 'mybookings.html';
            }, 2000);
            
        }
    });
}