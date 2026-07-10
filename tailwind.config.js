/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./**/*.{html,js}"],
    theme: {
      extend: {
        fontFamily: {
          // سمينا الخط هنا tajawal لكي نستخدمه ككلاس
          'tajawal': ['"Tajawal"', 'sans-serif'],
        }
      },
    },
    plugins: [],
  }