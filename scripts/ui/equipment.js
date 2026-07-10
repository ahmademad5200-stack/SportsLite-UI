// const deviceModal = document.getElementById('deviceModal');

// function openDeviceModal() {
//     deviceModal.classList.remove('hidden');
//     deviceModal.classList.add('modal-active');
//     // منع التمرير في الصفحة الخلفية
//     document.body.style.overflow = 'hidden'; 
// }
// function closeDeviceModal() {
//     deviceModal.classList.add('hidden');
//     deviceModal.classList.remove('modal-active');
//     // استعادة التمرير
//     document.body.style.overflow = ''; 
// }
// // إغلاق النافذة عند الضغط على المساحة المعتمة خارجها
// window.onclick = function(event) {
//     if (event.target === deviceModal) {
//         closeDeviceModal();
//     }
// }


const deviceModal = document.getElementById('deviceModal');

// تعديل الدالة لتستقبل بيانات الجهاز
function openDeviceModal(name, imagePath, instructions) {
    // 1. تحديث محتوى الـ Modal بالبيانات المستلمة
    document.getElementById('modal-title').textContent = name;
    document.getElementById('modal-image').src = imagePath;
    
    // تقسيم التعليمات إذا كانت تحتوي على نقاط، أو عرضها كما هي
    // (افتراض أن التعليمات في قاعدة البيانات نص واحد طويل)
    const instructionsContainer = document.getElementById('modal-instructions');
    instructionsContainer.innerHTML = ''; // تفريغ المحتوى القديم
    
    // إنشاء عنصر li للتعليمات (يمكنك تحسين هذا إذا كانت التعليمات مفصولة بفواصل في الـ DB)
    const li = document.createElement('li');
    li.textContent = instructions;
    instructionsContainer.appendChild(li);

    // 2. إظهار الـ Modal
    deviceModal.classList.remove('hidden');
    deviceModal.classList.add('flex'); // استخدمنا flex ليظهر في المنتصف
    document.body.style.overflow = 'hidden'; 
}

function closeDeviceModal() {
    deviceModal.classList.add('hidden');
    deviceModal.classList.remove('flex');
    document.body.style.overflow = ''; 
}

window.onclick = function(event) {
    if (event.target === deviceModal) {
        closeDeviceModal();
    }
}