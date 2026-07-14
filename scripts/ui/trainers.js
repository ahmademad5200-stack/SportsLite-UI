// /scripts/ui/trainers.js

const modal = document.getElementById('trainerModal');
let trainersList = [];
let selectedTrainerId = null;
let selectedTime = null;

document.addEventListener('DOMContentLoaded', async () => {
    const grid = document.getElementById('trainers-grid');
    const data = await fetchTrainers(); // من ملف trainers-api.js
    
    if (!data) {
        grid.innerHTML = '<p class="text-red-500 text-center w-full col-span-full">حدث خطأ في الاتصال بالخادم.</p>';
        return;
    } else if (data.length === 0) {
        grid.innerHTML = '<p class="text-gray-400 text-center w-full col-span-full">لا يوجد مدربين متاحين حالياً.</p>';
        return;
    }

    trainersList = data;
    renderTrainers(trainersList);
});

function renderTrainers(trainers) {
    const grid = document.getElementById('trainers-grid');
    grid.innerHTML = ''; 

    trainers.forEach((trainer, index) => {
        const imageUrl = trainer.image_path ? trainer.image_path : 'https://via.placeholder.com/150';
        const name = trainer.name || 'مدرب';
        const experience = trainer.years_of_experience || 0;
        const rating = parseFloat(trainer.rating || 0);

        let starsHTML = '';
        for(let i = 1; i <= 5; i++) {
            starsHTML += (i <= Math.round(rating)) 
                ? '<i class="fa-solid fa-star text-[#FF5900]"></i>' 
                : '<i class="fa-solid fa-star text-gray-600"></i>';
        }

        const cardHTML = `
            <div class="bg-[#242424] border-2 border-[#FF5900] rounded-[20px] p-6 flex flex-col items-center text-center card-glow transition-all duration-300">
                <div class="w-24 h-24 rounded-full p-1 border-2 border-[#FF5900] mb-4">
                    <img src="${imageUrl}" alt="${name}" class="w-full h-full object-cover object-[50%_30%] rounded-full">
                </div>
                <h3 class="text-white text-xl font-bold mb-2">${name}</h3>
                <div class="flex items-center gap-1 text-sm mb-2">${starsHTML}</div>
                <p class="text-gray-300 text-sm font-medium mb-8">خبرة ${experience} سنوات</p>
                <button onclick="openModal(${index})" class="w-full mt-auto bg-[#FF5900] text-white py-3 rounded-full font-bold text-lg hover:bg-orange-600 transition duration-300">
                    حجز جلسة
                </button>
            </div>
        `;
        grid.insertAdjacentHTML('beforeend', cardHTML);
    });
}

function openModal(trainerIndex) {
    const trainer = trainersList[trainerIndex];
    if (!trainer) return;

    document.getElementById('modal-img').src = trainer.image_path || 'https://via.placeholder.com/400';
    document.getElementById('modal-name').innerText = trainer.name;
    document.getElementById('modal-specialization').innerText = `مدرب معتمد لـ (${trainer.specialization})`;
    document.getElementById('modal-experience').innerText = `أكثر من ${trainer.years_of_experience} سنوات خبرة. \n ${trainer.description}`;

    document.getElementById('modal-programs').innerHTML = `
        <button class="bg-[#E5E5E5] text-black border-[3px] border-[#FF5900] px-5 py-2.5 rounded-md font-bold text-sm hover:bg-gray-300 transition cursor-default">
            ${trainer.specialization}
        </button>
    `;

    selectedTrainerId = trainer.id;
    selectedTime = null;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden'; 
    setupTimeSelection(); 
}

function closeModal() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = ''; 
}

function setupTimeSelection() {
    const timeSlots = document.querySelectorAll('#trainerModal .grid-cols-6 > div.bg-\\[\\#E5E5E5\\], #trainerModal .grid-cols-6 > div.bg-\\[\\#FF5900\\]');
    timeSlots.forEach(s => {
        s.classList.remove('bg-[#FF5900]', 'text-white');
        s.classList.add('bg-[#E5E5E5]', 'text-black');
    });

    timeSlots.forEach(slot => {
        slot.classList.add('cursor-pointer', 'transition');
        slot.onclick = function() {
            timeSlots.forEach(s => {
                s.classList.remove('bg-[#FF5900]', 'text-white');
                s.classList.add('bg-[#E5E5E5]', 'text-black');
            });
            this.classList.remove('bg-[#E5E5E5]', 'text-black');
            this.classList.add('bg-[#FF5900]', 'text-white');
            selectedTime = this.innerText; 
        };
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const bookBtn = document.getElementById('book-btn');
    if (bookBtn) {
        bookBtn.addEventListener('click', async () => {
            const currentTraineeId = localStorage.getItem('trainee_id');
            if (!currentTraineeId) {
                showNotification('warning', "يرجى تسجيل الدخول أولاً.");
                window.location.href = 'login.html';
                return;
            }
            if (!selectedTime || !selectedTrainerId) {
                showNotification('warning', "الرجاء اختيار وقت الجلسة أولاً!");
                return;
            }

            const bookingData = {
                plan_id: 1,
                trainee_id: currentTraineeId,
                trainer_id: selectedTrainerId,
                start_date: new Date().toISOString().split('T')[0],
                preferred_timing: selectedTime
            };

            bookBtn.innerText = "جاري الحجز...";
            bookBtn.disabled = true;

            try {
                const response = await fetch('https://api.sportslite.app/api/v1/bookings/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(bookingData)
                });
                
                if (response.ok) {
                    showNotification('success', "🎉 تم الحجز بنجاح!");
                    closeModal();
                    setTimeout(() => window.location.href = 'mybookings.html', 1500);
                } else {
                    showNotification('error', "فشل الحجز.");
                }
            } catch (error) {
                showNotification('error', "خطأ في الاتصال بالخادم.");
            } finally {
                bookBtn.innerText = "حجز جلسة";
                bookBtn.disabled = false;
            }
        });
    }
});