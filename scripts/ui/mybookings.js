async function fetchAndDisplayBookings() {
    const container = document.getElementById('bookings-container');
    const traineeId = localStorage.getItem('trainee_id');

    if (!traineeId) {
        container.innerHTML = '<p class="text-center text-red-500">يرجى تسجيل الدخول لعرض حجوزاتك.</p>';
        return;
    }

    try {
        container.innerHTML = '<p class="text-center text-gray-400">جاري تحميل حجوزاتك...</p>';
        let hasAnyBooking = false;
        let htmlContent = '';

        // === 1. جلب وعرض باقة الاشتراك (الخدعة التي طلبناها) ===
        const activePlanStr = localStorage.getItem('my_active_plan');
        if (activePlanStr) {
            hasAnyBooking = true;
            const activePlan = JSON.parse(activePlanStr);
            htmlContent += `
                <div class="bg-[#242424] p-6 rounded-2xl border-2 border-[#FF5900] flex flex-col md:flex-row justify-between items-center gap-4 mb-6 relative overflow-hidden shadow-[0_0_15px_rgba(255,89,0,0.2)]">
                    <div class="absolute top-0 right-0 bg-[#FF5900] text-white text-xs font-bold px-4 py-1 rounded-bl-lg">باقتك الحالية</div>
                    <div class="text-center md:text-right mt-4 md:mt-0">
                        <h3 class="text-2xl font-bold text-white mb-2">
                            الاشتراك: <span class="text-[#FF5900]">${activePlan.name}</span>
                        </h3>
                        <p class="text-gray-400 text-sm">
                            <i class="fa-regular fa-calendar-check ml-1"></i> تاريخ التفعيل: ${activePlan.date}
                        </p>
                    </div>
                    <div class="flex items-center gap-4 mt-4 md:mt-0">
                        <span class="bg-orange-900/30 text-[#FF5900] px-4 py-1.5 rounded-full text-sm font-bold border border-orange-800">نشط</span>
                        <button onclick="cancelPlan()" class="bg-transparent hover:bg-red-500 text-red-500 hover:text-white px-5 py-2 rounded-xl text-sm font-bold transition border border-red-500">
                            إلغاء الباقة
                        </button>
                    </div>
                </div>
            `;
        }

        // === 2. حجوزات المدربين ===
        const trainersResponse = await fetch('https://api.sportslite.app/api/v1/bookings/');
        const trainersResult = await trainersResponse.json();

        if (trainersResponse.ok && trainersResult.data) {
            const myTrainerBookings = trainersResult.data.filter(b => b.trainee_id == traineeId);
            if (myTrainerBookings.length > 0) {
                hasAnyBooking = true;
                myTrainerBookings.forEach(booking => {
                    htmlContent += `
                        <div class="bg-[#242424] p-6 rounded-2xl border border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4 transition hover:border-blue-500 mb-4">
                            <div class="text-center md:text-right">
                                <h3 class="text-xl font-bold text-white mb-1">
                                    حجز مع الكابتن: <span class="text-blue-400">${booking.trainer_name || 'غير معروف'}</span>
                                </h3>
                                <p class="text-gray-400 text-sm">
                                    <i class="fa-regular fa-calendar-days ml-1"></i> ${booking.start_date || 'غير محدد'} 
                                    <span class="mx-2">|</span> 
                                    <i class="fa-regular fa-clock ml-1"></i> ${booking.preferred_timing || 'غير محدد'}
                                </p>
                            </div>
                            <div class="flex items-center gap-4 mt-4 md:mt-0">
                                <span class="bg-blue-900/30 text-blue-400 px-4 py-1.5 rounded-full text-xs font-bold border border-blue-800">موعد مدرب</span>
                                <button onclick="cancelBooking(${booking.id})" class="bg-transparent hover:bg-red-500 text-red-500 hover:text-white px-5 py-2 rounded-xl text-sm font-bold transition border border-red-500">إلغاء الحجز</button>
                            </div>
                        </div>
                    `;
                });
            }
        }

        // === 3. حجوزات البرامج ===
        const programsResponse = await fetch(`https://api.sportslite.app/api/v1/trainee-programs/?trainee_id=${traineeId}`);
        const programsResult = await programsResponse.json();

        if (programsResponse.ok && programsResult.data) {
            const myPrograms = programsResult.data;
            if (myPrograms.length > 0) {
                hasAnyBooking = true;
                myPrograms.forEach(booking => {
                    const enrollDate = booking.enrollment_date ? booking.enrollment_date.split(' ')[0] : 'غير معروف';
                    htmlContent += `
                        <div class="bg-[#242424] p-6 rounded-2xl border border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4 transition hover:border-[#FF5900] mb-4">
                            <div class="text-center md:text-right">
                                <h3 class="text-xl font-bold text-white mb-2">
                                    برنامج: <span class="text-[#FF5900]">${booking.title || 'بدون عنوان'}</span>
                                </h3>
                                <p class="text-gray-400 text-sm">
                                    <i class="fa-regular fa-calendar-days ml-1"></i> الانضمام: ${enrollDate} 
                                    <span class="mx-2">|</span> 
                                    <i class="fa-regular fa-clock ml-1"></i> المدة: ${booking.weeks_count || 0} أسابيع
                                </p>
                            </div>
                            <div class="flex items-center gap-4 mt-4 md:mt-0">
                                <span class="bg-green-900/30 text-green-400 px-4 py-1.5 rounded-full text-xs font-bold border border-green-800">برنامج تدريبي</span>
                            </div>
                        </div>
                    `;
                });
            }
        }

        container.innerHTML = hasAnyBooking ? htmlContent : '<p class="text-center text-gray-400">لا توجد لديك أي حجوزات أو اشتراكات حالياً.</p>';
    } catch (error) {
        showNotification('error', "حدث خطأ أثناء تحميل الحجوزات.");
    }
}

// دالة لإلغاء الباقة التي برمجناها في الخدعة
window.cancelPlan = function() {
    Swal.fire({
        title: 'إلغاء الباقة؟',
        text: "هل أنت متأكد من إلغاء اشتراكك الحالي؟",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'نعم، إلغاء!'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem('my_active_plan');
            showNotification('success', "تم إلغاء باقتك بنجاح!");
            fetchAndDisplayBookings(); 
        }
    });
};

// دالة الإلغاء الاحترافية (للمدربين) تبقى كما هي
window.cancelBooking = async function(bookingId) {
    Swal.fire({
        title: 'هل أنت متأكد؟',
        text: "لن تتمكن من استعادة هذا الحجز بعد إلغائه!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'نعم، إلغاء!'
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const response = await fetch('https://api.sportslite.app/api/v1/bookings/', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: bookingId })
                });

                if (response.ok) {
                    showNotification('success', "تم الإلغاء بنجاح!");
                    fetchAndDisplayBookings();
                } else {
                    showNotification('error', "فشل إلغاء الحجز.");
                }
            } catch (error) {
                showNotification('error', "خطأ في الاتصال بالسيرفر.");
            }
        }
    });
};

document.addEventListener('DOMContentLoaded', fetchAndDisplayBookings);