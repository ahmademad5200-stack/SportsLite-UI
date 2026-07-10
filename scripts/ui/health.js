document.addEventListener('DOMContentLoaded', async () => {
    const articlesGrid = document.getElementById('articles-grid');
    const pageNumbersContainer = document.getElementById('page-numbers');
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');

    let currentPage = 1;
    // تم تعديل هذا الرقم لـ 8 حتى تظهر كل مقالاتك في صفحة واحدة
    const itemsPerPage = 8; 
    let allArticles = [];

    // 1. استدعاء البيانات من ملف الـ API
    const fetchedData = await fetchHealthNews();
    
    // التحقق من حالة البيانات
    if (fetchedData === null) {
        articlesGrid.innerHTML = '<p class="text-red-500 text-center w-full col-span-1 md:col-span-2">حدث خطأ أثناء جلب البيانات.</p>';
        return; 
    } else if (fetchedData.length === 0) {
        articlesGrid.innerHTML = '<p class="text-gray-400 text-center w-full col-span-1 md:col-span-2 py-8">لا توجد مقالات حالياً.</p>';
        return; 
    } else {
        allArticles = fetchedData; 
        updateDisplay(); 
    }

    // 2. دالة تحديث العرض (بدون فلترة)
    function updateDisplay() {
        const totalPages = Math.ceil(allArticles.length / itemsPerPage) || 1;
        if (currentPage > totalPages) currentPage = totalPages;

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const articlesToShow = allArticles.slice(startIndex, endIndex);

        renderArticles(articlesToShow);
        renderPagination(totalPages);
    }

    // 3. دالة رسم الكروت
    function renderArticles(articles) {
        articlesGrid.innerHTML = ''; 

        articles.forEach(article => {
            const imageUrl = article.image_path ? article.image_path : 'https://via.placeholder.com/400x300?text=No+Image';
            const title = article.title || 'بدون عنوان';
            const description = article.description || '';

            const cardHTML = `
                <div class="article-card relative w-full h-[220px] md:h-[280px] rounded-2xl overflow-hidden group cursor-pointer shadow-lg border border-gray-800 transition-all duration-500">
                    <img src="${imageUrl}" alt="${title}" class="w-full h-full object-cover transition duration-700 group-hover:scale-105">
                    <div class="absolute inset-0 bg-gradient-to-t from-[#121212] via-black/60 to-transparent flex flex-col justify-end items-center pb-6 text-center px-4">
                        <h3 class="text-lg md:text-2xl font-bold text-white mb-2">${title}</h3>
                        <p class="text-gray-300 text-xs md:text-sm line-clamp-2">${description}</p>
                    </div>
                </div>
            `;
            articlesGrid.insertAdjacentHTML('beforeend', cardHTML);
        });
    }

    // 4. دالة رسم أزرار الترقيم
    function renderPagination(totalPages) {
        pageNumbersContainer.innerHTML = '';
        
        // إخفاء الأسهم إذا كانت المقالات تكفي لصفحة واحدة فقط
        if(totalPages <= 1) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
            return;
        } else {
            prevBtn.style.display = 'block';
            nextBtn.style.display = 'block';
        }

        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement('button');
            btn.innerText = i;
            
            if (i === currentPage) {
                btn.className = 'flex items-center justify-center w-6 h-6 rounded-full bg-white text-black font-bold text-xs transition-colors cursor-pointer';
            } else {
                btn.className = 'flex items-center justify-center w-6 h-6 rounded-full bg-transparent text-gray-500 hover:text-white font-bold text-xs transition-colors cursor-pointer';
            }

            btn.addEventListener('click', () => {
                currentPage = i;
                updateDisplay();
                document.getElementById('articles-grid').scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
            pageNumbersContainer.appendChild(btn);
        }

        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === totalPages;
    }

    // 5. أحداث أسهم التقليب
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updateDisplay();
        }
    });

    nextBtn.addEventListener('click', () => {
        const totalPages = Math.ceil(allArticles.length / itemsPerPage);
        
        if (currentPage < totalPages) {
            currentPage++;
            updateDisplay();
        }
    });
});