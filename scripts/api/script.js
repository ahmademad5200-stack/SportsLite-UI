
document.addEventListener('DOMContentLoaded', () => {
    const reviewsContainer = document.getElementById('reviews-container');
// أضفنا ?t=1 لكسر الكاش
const apiUrl = 'https://sportslite.app/api/v1/reviews/?t=' + new Date().getTime();

    fetch(apiUrl)
        .then(response => response.json())
        .then(result => {
            reviewsContainer.innerHTML = ''; 

            const reviews = Object.keys(result)
                .filter(key => !isNaN(key))
                .map(key => result[key]);

            if (reviews.length > 0) {
                reviews.forEach(review => {
                    // 👇 هذا السطر لمراقبة الحقول القادمة من السيرفر واكتشاف المشكلة فوراً
                    console.log("حقول المراجعة الحالية:", review); 

                    // استخدام الاسم القادم من الباك إند
                    const clientName = review.trainee_name || "عميل Sports Lite";

                    const cardHTML = `
                    <div class="flex-1 bg-[#2C2C2C] border border-gray-300 rounded-[20px] p-5 md:p-6 flex flex-col justify-between min-h-[160px] md:min-h-[180px]">
                        <div class="flex justify-between items-center w-full mb-4">
                            <div class="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#FF5900] flex items-center justify-center shrink-0">
                                <svg class="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 6L7 18H11L14 6H10Z M17 6L14 18H18L21 6H17Z" fill="#FF5900"/>
                                </svg>
                            </div>
                            <div class="px-4 py-1 md:px-5 md:py-1.5 border border-white rounded-full">
                                <span class="text-white text-xs md:text-sm font-medium tracking-wide">${clientName}</span>
                            </div>
                        </div>
                        <p class="text-white text-sm sm:text-base md:text-lg leading-relaxed text-right">
                            ${review.text_content}
                        </p>
                    </div>
                    `;
                    reviewsContainer.insertAdjacentHTML('beforeend', cardHTML);
                });
            } else {
                reviewsContainer.innerHTML = '<p class="text-white text-center w-full">لا توجد آراء لعرضها حالياً.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching reviews:', error);
        });
});