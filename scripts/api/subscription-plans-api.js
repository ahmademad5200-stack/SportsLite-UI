async function fetchSubscriptionPlans() {
    try {
        const response = await fetch('https://sportslite.app/api/v1/subscription-plans/');
        const result = await response.json();
        
        // بما أن البيانات ليست داخل .data، سنحول الـ object إلى مصفوفة ونحذف مفاتيح الـ status والـ message
        const plansArray = Object.keys(result)
            .filter(key => !isNaN(key)) // نأخذ فقط المفاتيح التي هي أرقام (0, 1, 2)
            .map(key => result[key]); // نضعهم في مصفوفة
            
        return plansArray;
    } catch (error) {
        console.error('خطأ في جلب الاشتراكات:', error);
        return [];
    }
}