document.addEventListener('DOMContentLoaded', async () => {
    const slider = document.getElementById('slider');
    const dotsContainer = document.getElementById('pagination-dots');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    let currentPage = 1; 
    const cardsPerPage = 3; 
    let allPrograms = [];
    let totalPages = 0;

    const programs = await fetchPrograms();

    if (!programs || programs.length === 0) {
        slider.innerHTML = '<p class="text-gray-400 text-center w-full text-xl mt-10">لا توجد برامج تدريبية حالياً.</p>';
        dotsContainer.innerHTML = '';
        return;
    }

    allPrograms = programs;
    totalPages = Math.ceil(allPrograms.length / cardsPerPage);

    renderPagination();

    function updateDisplay() {
        slider.innerHTML = ''; 

        const startIndex = (currentPage - 1) * cardsPerPage;
        const endIndex = startIndex + cardsPerPage;
        const currentPrograms = allPrograms.slice(startIndex, endIndex);

        // هنا أضفنا الـ (index) عشان نعرف رقم الكرت الحالي
        currentPrograms.forEach((program, index) => {
            // 1. حساب إجمالي الأيام رياضياً
            const totalDays = (program.weeks_count || 0) * (program.sessions_per_week || 0);
            
            // 2. مصفوفة بأسماء المدربين الستة من قاعدة بياناتك
            const mockTrainers = [
                "أحمد محمود",
                "عمر عبد الله",
                "خالد حسن",
                "الكابتن رامي",
                "طارق زياد",
                "يوسف إبراهيم"
            ];

            // 3. توزيع المدربين بالترتيب على الكروت (حتى لو كانت 100 كرت سيرجع يعيد التوزيع تلقائياً)
            const absoluteIndex = startIndex + index;
            const mockTrainerName = mockTrainers[absoluteIndex % mockTrainers.length];

            const cardHTML = `
                <div class="card-item shrink-0 w-[280px] sm:w-[320px] lg:w-80 bg-[#242424] border-2 border-[#FF5900] rounded-[30px] p-8 flex flex-col items-center text-center transition-transform duration-300">
                    <h2 class="text-white text-2xl font-bold mb-8">${program.title || 'بدون عنوان'}</h2>
                    
                    <div class="flex flex-col gap-5 w-full items-center mb-8 flex-grow">
                        
                        <!-- اسم المدرب الموزع تلقائياً -->
                        <div class="flex items-center gap-3 text-white">
                            <i class="fa-solid fa-user-ninja text-xl text-[#FF5900]"></i>
                            <span class="text-base font-medium">المدرب: ${mockTrainerName}</span>
                        </div>

                        <!-- عدد الأسابيع -->
                        <div class="flex items-center gap-3 text-white">
                            <i class="fa-regular fa-clock text-xl text-[#FF5900]"></i>
                            <span class="text-base font-medium">${program.weeks_count || 0} اسبوع</span>
                        </div>

                        <!-- الجلسات الأسبوعية -->
                        <div class="flex items-center gap-3 text-white">
                            <i class="fa-solid fa-dumbbell text-xl text-[#FF5900]"></i>
                            <span class="text-base font-medium">${program.sessions_per_week || 0} جلسات اسبوعياً</span>
                        </div>

                        <!-- إجمالي الأيام (الحساب الرياضي) -->
                        <div class="flex items-center gap-3 text-white border-t border-gray-600 pt-4 w-full justify-center">
                            <i class="fa-solid fa-calendar-day text-xl text-[#FF5900]"></i>
                            <span class="text-base font-bold">إجمالي الأيام: ${totalDays} يوم</span>
                        </div>

                        <!-- التمارين -->
                        <p class="text-gray-300 text-sm mt-2">${program.assigned_exercises || ''}</p>
                    </div>
                    
                    <button class="start-btn w-full bg-[#FF5900] text-white py-3 rounded-full font-bold text-lg hover:bg-orange-600 shadow-lg mt-auto" data-id="${program.id}" data-title="${program.title}">ابدأ الأن</button>
                </div>
            `;
            slider.insertAdjacentHTML('beforeend', cardHTML);
        });

        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('text-white', index === (currentPage - 1));
            dot.classList.toggle('text-gray-600', index !== (currentPage - 1));
        });

        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === totalPages;

        prevBtn.style.opacity = currentPage === 1 ? '0.3' : '1';
        nextBtn.style.opacity = currentPage === totalPages ? '0.3' : '1';
    }

    function renderPagination() {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalPages; i++) {
            const dotHTML = `<button class="dot text-gray-600 cursor-pointer transition-colors" data-page="${i}">${i + 1}</button>`;
            dotsContainer.insertAdjacentHTML('beforeend', dotHTML);
        }

        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentPage = index + 1;
                updateDisplay();
            });
        });
    }

    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            updateDisplay();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updateDisplay();
        }
    });

    updateDisplay();
});

document.addEventListener('click', async (e) => {
    if (e.target.classList.contains('start-btn')) {
        const programId = e.target.getAttribute('data-id');
        const programTitle = e.target.getAttribute('data-title');
        const traineeId = localStorage.getItem('trainee_id');

        if (!traineeId) {
            showNotification('warning', "يرجى تسجيل الدخول أولاً لتتمكن من حجز البرنامج.");
            window.location.href = 'login.html';
            return;
        }

        Swal.fire({
            title: 'تأكيد الحجز',
            text: `هل أنت مستعد للبدء في برنامج: ${programTitle}؟`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'نعم، ابدأ!',
            cancelButtonText: 'إلغاء'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await enrollInProgram(traineeId, programId);

                if (response && response.ok) {
                    showNotification('success', "بطل! تم تسجيلك في البرنامج بنجاح.");
                    setTimeout(() => window.location.href = 'mybookings.html', 2000);
                } else {
                    showNotification('error', "عذراً، حدث خطأ أثناء الحجز.");
                }
            }
        });
    }
});