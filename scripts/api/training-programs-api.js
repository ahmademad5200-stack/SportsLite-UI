// /scripts/api/training-programs-api.js

async function fetchPrograms() {
    try {
        const response = await fetch('https://sportslite.app/api/v1/training-programs/'); 
        const result = await response.json();
        const data = result.data ? result.data : (Array.isArray(result) ? result : []);
        return data;
    } catch (error) {
        console.error('خطأ في الاتصال بالخادم:', error);
        return null;
    }
}

async function enrollInProgram(traineeId, programId) {
    try {
        // نستخدم نفس الطريقة الأصلية التي كانت تعمل عندك
        const response = await fetch('https://sportslite.app/api/v1/trainee-programs/', {
            method: 'POST',
            body: JSON.stringify({ 
                trainee_id: traineeId, 
                program_id: programId 
            })
        });
        return response;
    } catch (error) {
        console.error('خطأ في الاتصال بالخادم أثناء الحجز:', error);
        return null;
    }
}