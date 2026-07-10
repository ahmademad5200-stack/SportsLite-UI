document.addEventListener('DOMContentLoaded', () => {
    fetchEquipment();
});

async function fetchEquipment() {
    try {
        // ⚠️ تأكد من وضع الرابط الفعلي للاستضافة الخاصة بك هنا
        const response = await fetch('https://sportslite.app/api/v1/equipment/'); 
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        // التأكد من أن حالة الاستجابة نجاح
        if (result && result.status === 'success') {
            
            // استخراج الكروت (بسبب تنسيق الـ PHP الذي يرسل الأرقام كـ keys)
            const equipmentsArray = Object.keys(result)
                .filter(key => !isNaN(key)) // تجاهل status و message وأخذ الأرقام فقط
                .map(key => result[key]);   // تحويلها لمصفوفة عادية
            
            // إرسال المصفوفة لدالة العرض
            renderEquipment(equipmentsArray);
            
        } else {
            console.error("لم يتم العثور على بيانات أو حدث خطأ:", result.message);
        }
        
    } catch (error) {
        console.error("حدث خطأ أثناء جلب البيانات:", error);
    }
}

function renderEquipment(equipments) {
    const container = document.getElementById('equipment-container');
    container.innerHTML = ''; // تفريغ الحاوية قبل الإضافة

    equipments.forEach(item => {
        // إنشاء الهيكل لكل كرت بناءً على البيانات القادمة من قاعدة البيانات
        const cardHTML = `
            <div class="bg-[#242424] rounded-xl overflow-hidden shadow-lg border border-gray-800 flex flex-col">
                <div class="w-full h-[220px] bg-gray-600/20 p-0 flex items-center justify-center">
                    <img src="${item.image_path}" alt="${item.name}" class="w-full h-full object-cover">
                </div>
                <div class="bg-[#1A1A1A] py-3 text-center w-full">
                    <h3 class="text-white font-bold text-lg">${item.name}</h3>
                </div>
                <div class="p-6 flex flex-col gap-6 flex-1 justify-between">
                    <div class="flex items-center justify-between w-full">
                        <span class="text-gray-200 font-medium text-sm md:text-base">${item.target_muscles}</span>
                        <div class="w-4 h-4 rounded-full bg-green-600 shadow-[0_0_8px_rgba(22,163,74,0.6)]"></div>
                    </div>
                    <button onclick="openDeviceModal('${item.name}', '${item.usage_image_path}', '${item.usage_instructions}')" 
                            class="w-full max-w-[200px] mx-auto bg-[#FF5900] text-white py-2.5 rounded-full font-bold text-lg hover:bg-orange-600 transition shadow-lg">
                        التفاصيل
                    </button>
                </div>
            </div>
        `;
        
        // إضافة الكرت إلى الحاوية
        container.insertAdjacentHTML('beforeend', cardHTML);
    });
}