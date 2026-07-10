// scripts/app.js

// دالة التنبيهات الموحدة (سأستخدمها بدلاً من alert)
function showNotification(type, message) {
    Swal.fire({
        icon: type, // 'success', 'error', 'warning'
        title: message,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
    });
}