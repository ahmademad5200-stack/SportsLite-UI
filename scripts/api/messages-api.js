const API_BASE_URL = 'https://sportslite.app/api/v1';

async function sendMessageToAPI(payload) {
    try {
        const response = await fetch(`${API_BASE_URL}/messages/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        
        // إرجاع حالة الطلب والداتا معاً لتسهيل الفحص في الـ UI
        return { ok: response.ok, data: data }; 
        
    } catch (error) {
        console.error('API Error in sendMessageToAPI:', error);
        return { ok: false, data: { message: "حدث خطأ في الاتصال بالسيرفر." } };
    }
}