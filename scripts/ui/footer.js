const footerHtmlCode = `
<footer class="relative w-full bg-cover bg-center bg-no-repeat mt-20" style="background-image: url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80');" dir="rtl">
    <div class="absolute inset-0 bg-black/80"></div>
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-16 md:pt-20 pb-8 md:pb-12">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-8 gap-y-12 lg:gap-8">
            
            <div class="flex flex-col h-full">
                <h3 class="text-[#FF5900] text-base sm:text-lg lg:text-xl font-bold mb-5 lg:mb-8">معلومات تواصل</h3>
                <ul class="flex flex-col gap-4 lg:gap-6 text-white text-xs sm:text-sm lg:text-lg">
                    <li class="flex items-start lg:items-center gap-2 lg:gap-4">
                        <i class="fa-solid fa-location-dot text-[#FF5900] text-lg lg:text-xl"></i>
                        <span class="leading-snug">سوريا , حلب , المحافظة</span>
                    </li>
                    <li class="flex items-center gap-2 lg:gap-4">
                        <i class="fa-solid fa-phone text-[#FF5900] text-lg lg:text-xl"></i>
                        <span dir="ltr">0963 933333333</span>
                    </li>
                    <li class="flex items-center gap-2 lg:gap-4">
                        <i class="fa-solid fa-envelope text-[#FF5900] text-lg lg:text-xl"></i>
                        <span dir="ltr" class="text-xs sm:text-sm lg:text-base break-all">Sports Lite @gmail.com</span>
                    </li>
                </ul>
            </div>
        
            <div class="flex flex-col">
                <h3 class="text-[#FF5900] text-base sm:text-lg lg:text-xl font-bold mb-5 lg:mb-8">الدعم و التواصل</h3>
                <ul class="flex flex-col gap-4 lg:gap-5 text-white text-sm sm:text-base lg:text-lg">
                    <li><a href="#" class="hover:text-[#FF5900] transition duration-300">سياسة الخصوصية</a></li>
                    <li><a href="#" class="hover:text-[#FF5900] transition duration-300">الاسئلة الشائعة</a></li>
                    <li><a href="#" class="hover:text-[#FF5900] transition duration-300">الشروط والأحكام</a></li>
                    <li><a href="contact.html" class="hover:text-[#FF5900] transition duration-300">تواصل معنا</a></li>
                </ul>
            </div>
        
            <div class="flex flex-col">
                <h3 class="text-[#FF5900] text-base sm:text-lg lg:text-xl font-bold mb-5 lg:mb-8">الروابط السريعة</h3>
                <ul class="flex flex-col gap-4 lg:gap-5 text-white text-sm sm:text-base lg:text-lg">
                    <li><a href="index.html" class="hover:text-[#FF5900] transition duration-300">الرئيسية</a></li>
                    <li><a href="trainingprogram.html" class="hover:text-[#FF5900] transition duration-300">البرامج</a></li>
                    <li><a href="trainers.html" class="hover:text-[#FF5900] transition duration-300">المدربين</a></li>
                    <li><a href="healthnews.html" class="hover:text-[#FF5900] transition duration-300">الاخبار</a></li>
                </ul>
            </div>
        
            <div class="flex flex-col gap-4 lg:gap-6">
                <div class="flex items-center gap-2 lg:gap-3 w-fit" dir="ltr">
                    <svg class="w-6 h-6 lg:w-7 lg:h-7 text-[#FF5900] animate-[spin_10s_linear_infinite]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43 1.43 1.43 2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43 1.43-1.43z"/>
                    </svg>
                    <div class="flex flex-col text-left">
                        <p class="text-base sm:text-lg lg:text-xl font-bold tracking-wide text-white">Sports <span class="text-[#FF5900]">Lite</span></p>
                        <p class="text-[9px] sm:text-[10px] lg:text-[11px] text-gray-300 -mt-1 font-sans whitespace-nowrap">Transform Your Body</p>
                    </div>
                </div>
                <p class="text-white text-xs sm:text-sm lg:text-lg leading-[1.8] lg:leading-[2.2] text-right">
                    أكثر من مجرد نادي رياضي، نحن مجتمع يهتم بصحتك وقوتك.
                    ابدأ رحلتك نحو القوة والصحة معنا. ودعنا نوفر لك بيئة تدريب مثالية.
                </p>
            </div>
        </div>
    </div>
    <div class="relative z-10 w-full border-t border-[#FF5900]/30 bg-black/60 py-4 mt-4 lg:mt-0">
        <div class="max-w-7xl mx-auto px-4 flex justify-center items-center gap-2">
            <p class="text-gray-300 text-xs sm:text-sm md:text-base tracking-wide">
                جميع الحقوق محفوظة <span class="text-white font-sans">Sports Lite</span>
            </p>
            <div class="text-[#FF5900] font-sans font-bold flex items-center gap-1">
                <span class="text-sm md:text-base">2026</span>
                <span class="text-base md:text-lg">&copy;</span>
            </div>
        </div>
    </div>
</footer>
`;

document.getElementById("footer").innerHTML = footerHtmlCode;