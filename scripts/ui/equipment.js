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

// قاموس لربط أسماء الأجهزة بصور الـ GIF المناسبة من موقع fitnessprogramer
// يمكنك تعديل الروابط لاحقاً ببساطة إذا أردت تغيير أي حركة
// قاموس الـ GIF للأجهزة
// القاموس المحدث بروابط شغالة 100%
const equipmentGifs = {
    "Incline Bench": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Incline-Barbell-Bench-Press.gif",
    "Assisted Dip": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Rear-Delt-Machine-Flys.gif", // تم التحديث
    "Multi-Gym": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Cable-Crossover.gif",
    "Iso-Lateral Chest": "https://fitnessprogramer.com/wp-content/uploads/2022/02/Dumbbell-Chest-Supported-Lateral-Raises.gif", // تم التحديث
    "Leg Press": "https://fitnessprogramer.com/wp-content/uploads/2015/11/Leg-Press.gif",
    "Seated Chest": "https://fitnessprogramer.com/wp-content/uploads/2022/02/Seated-Cable-Close-Grip-Chest-Press.gif", // تم التحديث
    "Functional": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Cable-Crossover.gif",
    "Wall-Mounted Cable": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Pushdown.gif", // تم التحديث
    "Leg Extension": "https://fitnessprogramer.com/wp-content/uploads/2021/02/LEG-EXTENSION.gif", // تم التحديث
    "default": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Workout.gif"
};

function getGifForEquipment(name) {
    for (const key in equipmentGifs) {
        if (name.toLowerCase().includes(key.toLowerCase())) {
            return equipmentGifs[key];
        }
    }
    return equipmentGifs["default"];
}

const deviceModal = document.getElementById('deviceModal');

function openDeviceModal(name, imagePath, instructions) {
    document.getElementById('modal-title').textContent = name;
    
    const modalImage = document.getElementById('modal-image');
    modalImage.src = getGifForEquipment(name);
    
    // حركة أمان: في حال تعطل أي رابط مستقبلاً، سيتم عرض الصورة الافتراضية فوراً
    modalImage.onerror = function() {
        this.src = equipmentGifs["default"];
    };

    modalImage.className = 'h-[160px] md:h-[200px] mt-6 mb-4 object-contain rounded-xl'; 
    modalImage.style.display = 'block';

    const instructionsContainer = document.getElementById('modal-instructions');
    instructionsContainer.innerHTML = ''; 
    
    let cleanText = instructions.replace(/^\d+[\.\-]\s*/, '').trim();

    let steps = cleanText.split(/[،,\.]/);
    if (steps.length <= 1) {
        steps = cleanText.split(/\s+و\s+/);
    }

    steps.forEach(step => {
        if (step.trim().length > 5) {
            const li = document.createElement('li');
            li.className = "mb-3 pb-2 border-b border-gray-700/50 last:border-0"; 
            li.textContent = step.trim();
            instructionsContainer.appendChild(li);
        }
    });

    if (instructionsContainer.children.length === 0) {
        const li = document.createElement('li');
        li.textContent = cleanText;
        instructionsContainer.appendChild(li);
    }

    deviceModal.classList.remove('hidden');
    deviceModal.classList.add('flex'); 
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