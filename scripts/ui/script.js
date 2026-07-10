// ==========================================
// 1. القائمة الجانبية (Mobile Menu)
// ==========================================
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuOverlay = document.getElementById('menu-overlay');
const body = document.body;

function openMenu() {
    if(mobileMenu) mobileMenu.classList.remove('-translate-x-full');
    if(menuOverlay) {
        menuOverlay.classList.remove('opacity-0');
        menuOverlay.classList.add('opacity-100');
    }
    body.classList.add('overflow-hidden');
}

function closeMenu() {
    if(mobileMenu) mobileMenu.classList.add('-translate-x-full');
    if(menuOverlay) {
        menuOverlay.classList.remove('opacity-100');
        menuOverlay.classList.add('opacity-0');
    }
    body.classList.remove('overflow-hidden');
}

if(menuBtn) menuBtn.addEventListener('click', openMenu);
if(closeBtn) closeBtn.addEventListener('click', closeMenu);
if(menuOverlay) menuOverlay.addEventListener('click', closeMenu);


// ==========================================
// 2. إخفاء زر تسجيل الدخول للمسجلين
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // استخدمنا الـ ID الصحيح للزر الموجود في الصفحة الرئيسية
    const heroLoginContainer = document.getElementById('hero-login-container');
    const traineeId = localStorage.getItem('trainee_id');
    
    // إذا كان مسجل دخول، قم بإخفاء الزر تماماً
    if (traineeId && heroLoginContainer) {
        heroLoginContainer.style.display = 'none'; 
    }
});


// ==========================================
// 3. جلب بيانات المدرب المميز (الأعلى تقييماً)
// ==========================================
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // نستخدم الدالة من ملف trainers-api.js
        if (typeof fetchTrainers === 'function') {
            const trainers = await fetchTrainers();
            
            if (trainers && trainers.length > 0) {
                // ترتيب المدربين من الأعلى تقييماً للأقل
                const topTrainer = trainers.sort((a, b) => parseFloat(b.rating || 0) - parseFloat(a.rating || 0))[0];

                document.getElementById('featured-trainer-name').innerText = topTrainer.name;
                document.getElementById('featured-trainer-desc').innerText = topTrainer.description || `مدرب محترف بخبرة ${topTrainer.years_of_experience || 0} سنوات في مجال ${topTrainer.specialization || 'اللياقة البدنية'}. حقق نتائج مذهلة مع العديد من المتدربين.`;
                
                // جلب صورة المدرب أو وضع صورة افتراضية فخمة
                const imgElement = document.getElementById('featured-trainer-img');
                imgElement.src = topTrainer.image_path || 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=400&q=80';
            } else {
                document.getElementById('featured-trainer-name').innerText = "كابتن أحمد";
                document.getElementById('featured-trainer-desc').innerText = "مدرب لياقة بدنية محترف متخصص في بناء العضلات وتقوية البنية الجسمانية.";
            }
        }
    } catch (e) {
        console.error("خطأ في جلب المدرب المميز:", e);
    }
});


// ==========================================
// 4. تعبئة أراء العملاء (Customer Reviews)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const reviewsContainer = document.getElementById('reviews-container');
    if (!reviewsContainer) return;

    // تعليقات فخمة تليق بصالتك الرياضية
    const reviews = [
        { name: "محمد علي", text: "تجربة رائعة جداً! صالة ممتازة ومدربين على أعلى مستوى. الأجهزة حديثة جداً وأنصح الجميع بالاشتراك هنا.", rating: 5 },
        { name: "خالد سعيد", text: "أفضل جيم اشتركت فيه. الجو العام يشجع على التدريب والاستمرار، والمدربون يتابعونك خطوة بخطوة للوصول لهدفك.", rating: 5 }
    ];

    // رسم التعليقات في الحاوية
    reviewsContainer.innerHTML = reviews.map(r => `
        <div class="bg-[#242424] p-6 md:p-8 rounded-[30px] w-full border-2 border-gray-800 hover:border-[#FF5900] transition duration-300 shadow-xl flex flex-col justify-between">
            <div>
                <div class="flex gap-1 mb-4 text-[#FF5900] text-lg">
                    ${'<i class="fa-solid fa-star"></i>'.repeat(r.rating)}
                </div>
                <p class="text-gray-300 text-sm md:text-base leading-loose mb-6">"${r.text}"</p>
            </div>
            <h4 class="text-white font-bold text-lg border-t border-gray-700 pt-4">- ${r.name}</h4>
        </div>
    `).join('');
});


// ==========================================
// 5. السلايدر الرئيسي (الصور بدلاً من الفيديو)
// ==========================================
const sliderTrack = document.getElementById('sliderTrack');
const prevBtn = document.getElementById('prevSlideBtn');
const nextBtn = document.getElementById('nextSlideBtn');

if (sliderTrack && prevBtn && nextBtn) {
    let currentSlideIndex = 0;
    const totalSlidesCount = sliderTrack.children.length;

    function updateSliderPosition() {
        sliderTrack.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
    }

    nextBtn.addEventListener('click', () => {
        if (currentSlideIndex < totalSlidesCount - 1) {
            currentSlideIndex++; 
        } else {
            currentSlideIndex = 0; 
        }
        updateSliderPosition();
    });

    prevBtn.addEventListener('click', () => {
        if (currentSlideIndex > 0) {
            currentSlideIndex--; 
        } else {
            currentSlideIndex = totalSlidesCount - 1; 
        }
        updateSliderPosition();
    });
}


// ==========================================
// 6. سلايدر أيقونات البرامج (Icon Track)
// ==========================================
const track = document.getElementById('iconTrack');
const leftArrow = document.getElementById('leftArrow');
const rightArrow = document.getElementById('rightArrow');

if (track && leftArrow && rightArrow) {
    const items = track.querySelectorAll('.slide-item');
    let currentIndex = 0;
    let visibleItems = window.innerWidth >= 768 ? 3 : 1; 
    
    window.addEventListener('resize', () => {
        visibleItems = window.innerWidth >= 768 ? 3 : 1;
        updateSlider();
    }); 
    
    function updateSlider() {
        const maxIndex = items.length - visibleItems;
        if (currentIndex > maxIndex) currentIndex = maxIndex;
        if (currentIndex < 0) currentIndex = 0; 
        const percentage = currentIndex * (100 / visibleItems);
        track.style.transform = `translateX(${percentage}%)`;
    } 
    
    leftArrow.addEventListener('click', () => {
        const maxIndex = items.length - visibleItems;
        if (currentIndex < maxIndex) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateSlider(); 
    }); 
    
    rightArrow.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = items.length - visibleItems;
        }
        updateSlider();
    });
}