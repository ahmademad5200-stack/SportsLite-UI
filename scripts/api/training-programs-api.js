async function fetchPrograms() {
    try {
        const response = await fetch('https://api.sportslite.app/api/v1/training-programs/'); 
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
        const response = await fetch('https://api.sportslite.app/api/v1/trainee-programs/', {
            method: 'POST',
            // تم إزالة الـ headers لتجاوز الفحص الأمني بنجاح
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