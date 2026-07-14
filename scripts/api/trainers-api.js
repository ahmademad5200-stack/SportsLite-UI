async function fetchTrainers() {
    try {
        // تأكد أن المسار صحيح لملف الـ php
        const response = await fetch('https://api.sportslite.app/api/v1/trainers/'); 
        const result = await response.json();

        // بناءً على هيكلة ملف الـ PHP تبعك اللي بيبعت $data
        if (response.ok && result.data) {
            return result.data;
        } else if (response.ok && Array.isArray(result)) {
            return result; // في حال رجعت الداتا كمصفوفة مباشرة
        } else {
            console.error('فشل في قراءة البيانات:', result);
            return [];
        }
    } catch (error) {
        console.error('خطأ في الاتصال بالخادم:', error);
        return null;
    }
}