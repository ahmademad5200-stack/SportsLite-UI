const headerHtmlCode = `
<header id="main-header" class="w-full bg-[#1A1A1A]/95 backdrop-blur-md text-white py-3 px-4 md:px-6 flex justify-between items-center border-b border-gray-800 fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out">
    <div class="flex items-center gap-2 md:gap-3 order-first md:order-none">
        <button id="menu-btn" class="lg:hidden p-1.5 text-white hover:text-[#FF5900] focus:outline-none transition" aria-label="فتح القائمة">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
        <div id="auth-container" class="hidden md:flex items-center gap-2">
            <button class="px-4 py-1.5 bg-[#FF5900] text-white rounded-md hover:bg-orange-600 transition duration-300 text-xs md:text-sm font-bold shadow-lg shadow-orange-500/20 whitespace-nowrap"><a href="sgin.html">إنشاء حساب</a></button>
            <button class="px-4 py-1.5 border border-[#FF5900] text-[#FF5900] rounded-md hover:bg-[#FF5900] hover:text-white transition duration-300 text-xs md:text-sm font-bold whitespace-nowrap"><a href="login.html">تسجيل دخول</a></button>
        </div>
    </div>
    
    <nav class="hidden lg:flex items-center gap-4 xl:gap-5 text-xs xl:text-sm font-medium">
        <div class="nav-item flex flex-col items-center gap-1 cursor-pointer">
            <a href="mybookings.html" class="nav-link text-gray-300 hover:text-[#FF5900] transition duration-300" data-path="mybookings.html">حجوزاتي</a>
            <div class="nav-line h-[2px] w-full bg-gradient-to-r from-orange-300 to-[#FF5900] rounded-full hidden"></div>
        </div>
        <div class="nav-item flex flex-col items-center gap-1 cursor-pointer">
            <a href="contact.html" class="nav-link text-gray-300 hover:text-[#FF5900] transition duration-300" data-path="contact.html">تواصل معنا</a>
            <div class="nav-line h-[2px] w-full bg-gradient-to-r from-orange-300 to-[#FF5900] rounded-full hidden"></div>
        </div>
        <div class="nav-item flex flex-col items-center gap-1 cursor-pointer">
            <a href="healthnews.html" class="nav-link text-gray-300 hover:text-[#FF5900] transition duration-300" data-path="healthnews.html">الانظمة الغذائية</a>
            <div class="nav-line h-[2px] w-full bg-gradient-to-r from-orange-300 to-[#FF5900] rounded-full hidden"></div>
        </div>
        <div class="nav-item flex flex-col items-center gap-1 cursor-pointer">
            <a href="subscribe.html" class="nav-link text-gray-300 hover:text-[#FF5900] transition duration-300" data-path="subscribe.html">الاشتراكات</a>
            <div class="nav-line h-[2px] w-full bg-gradient-to-r from-orange-300 to-[#FF5900] rounded-full hidden"></div>
        </div>
        <div class="nav-item flex flex-col items-center gap-1 cursor-pointer">
            <a href="equipment.html" class="nav-link text-gray-300 hover:text-[#FF5900] transition duration-300" data-path="equipment.html">الاجهزة</a>
            <div class="nav-line h-[2px] w-full bg-gradient-to-r from-orange-300 to-[#FF5900] rounded-full hidden"></div>
        </div>
        <div class="nav-item flex flex-col items-center gap-1 cursor-pointer">
            <a href="halls.html" class="nav-link text-gray-300 hover:text-[#FF5900] transition duration-300" data-path="halls.html">الصالات</a>
            <div class="nav-line h-[2px] w-full bg-gradient-to-r from-orange-300 to-[#FF5900] rounded-full hidden"></div>
        </div>
        <div class="nav-item flex flex-col items-center gap-1 cursor-pointer">
            <a href="trainers.html" class="nav-link text-gray-300 hover:text-[#FF5900] transition duration-300" data-path="trainers.html">المدربين</a>
            <div class="nav-line h-[2px] w-full bg-gradient-to-r from-orange-300 to-[#FF5900] rounded-full hidden"></div>
        </div>
        <div class="nav-item flex flex-col items-center gap-1 cursor-pointer">
            <a href="trainingprogram.html" class="nav-link text-gray-300 hover:text-[#FF5900] transition duration-300" data-path="trainingprogram.html">البرامج</a>
            <div class="nav-line h-[2px] w-full bg-gradient-to-r from-orange-300 to-[#FF5900] rounded-full hidden"></div>
        </div>
        <div class="nav-item flex flex-col items-center gap-1 cursor-pointer">
            <a href="index.html" class="nav-link text-gray-300 hover:text-[#FF5900] transition duration-300" data-path="index.html">رئيسية</a>
            <div class="nav-line h-[2px] w-full bg-gradient-to-r from-orange-300 to-[#FF5900] rounded-full hidden"></div>
        </div>
    </nav>
    
    <div class="flex items-center gap-2 order-last md:order-none">
        <svg class="w-6 h-6 text-[#FF5900] animate-[spin_10s_linear_infinite]" fill="currentColor" viewBox="0 0 24 24"><path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43 1.43 1.43 2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43 1.43-1.43z"/></svg>
        <div class="flex flex-col">
            <h1><p class="text-lg font-bold tracking-wide">Sports <span class="text-[#FF5900]">Lite</span></p></h1>
            <p class="text-[9px] text-gray-400 -mt-1 font-sans">Transform Your Body</p>
        </div>
    </div>
</header>
`;

document.getElementById("header").innerHTML = headerHtmlCode;

// 1. تحديد الرابط النشط
const currentPath = window.location.pathname.split("/").pop() || "index.html";
document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('data-path') === currentPath) {
        link.classList.add('text-[#FF5900]', 'font-bold');
        link.classList.remove('text-gray-300');
        link.nextElementSibling.classList.remove('hidden');
    }
});

// 2. تغيير الهيدر حسب تسجيل الدخول
document.addEventListener('DOMContentLoaded', () => {
    const authContainer = document.getElementById("auth-container");
    const userName = localStorage.getItem('trainee_name');
    const userId = localStorage.getItem('trainee_id');

    if (userName && userId && authContainer) {
        const firstName = userName.split(' ')[0];
        const firstLetter = firstName.charAt(0).toUpperCase();

        authContainer.innerHTML = `
            <div class="flex items-center gap-2 bg-[#242424] border border-gray-700/50 rounded-md pr-1.5 pl-2.5 py-1 shadow-md transition-all hover:border-[#FF5900]/50">
                <div class="w-6 h-6 rounded-md bg-gradient-to-tr from-[#FF5900] to-orange-400 flex items-center justify-center text-white font-bold text-xs shadow-sm">${firstLetter}</div>
                <span class="text-white font-bold text-xs tracking-wide">${firstName}</span>
                <div class="w-[1px] h-3 bg-gray-600 mx-1"></div>
                <button id="logout-btn" class="text-gray-400 hover:text-red-500 transition-colors duration-300 focus:outline-none" title="تسجيل خروج">
                    <i class="fa-solid fa-arrow-right-from-bracket text-sm"></i>
                </button>
            </div>
        `;
        
        document.getElementById('logout-btn').addEventListener('click', () => {
            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    title: 'تسجيل الخروج',
                    text: "هل أنت متأكد أنك تريد تسجيل الخروج؟",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#FF5900',
                    cancelButtonColor: '#333',
                    confirmButtonText: 'نعم، أخرجني',
                    cancelButtonText: 'إلغاء'
                }).then((result) => {
                    if (result.isConfirmed) {
                        localStorage.removeItem('trainee_id');
                        localStorage.removeItem('trainee_name');
                        location.reload();
                    }
                });
            } else {
                localStorage.removeItem('trainee_id');
                localStorage.removeItem('trainee_name');
                location.reload();
            }
        });
    }
});

// 3. إخفاء وإظهار الهيدر عند التمرير (النزول والطلوع)
let lastScrollTop = 0;
const mainHeader = document.getElementById('main-header');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // عند النزول للأسفل: اخفاء الهيدر
        mainHeader.classList.add('-translate-y-full');
    } else {
        // عند الطلوع للأعلى: إظهار الهيدر
        mainHeader.classList.remove('-translate-y-full');
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; 
});