// دالة مسؤولة فقط عن الاتصال بالخادم وجلب البيانات
async function fetchHealthNews() {
    try {
        // ⚠️ تأكد أن هذا المسار يطابق مسار ملف الـ PHP الخاص بك
        const response = await fetch('https://sportslite.app/api/v1/news/'); 
        const result = await response.json();

        if (response.ok && result.data) {
            return result.data; // إرجاع مصفوفة البيانات بنجاح
        } else {
            console.error('لم يتم العثور على بيانات:', result.message);
            return []; // إرجاع مصفوفة فارغة في حال عدم وجود بيانات
        }
    } catch (error) {
        console.error('خطأ في الاتصال بالخادم:', error);
        return null; // إرجاع null للدلالة على فشل الاتصال تماماً
    }
}