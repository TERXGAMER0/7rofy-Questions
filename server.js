// server/server.js

const express = require('express');
const path = require('path');
require('dotenv').config(); // تحميل المتغيرات البيئية من ملف .env

const app = express();
const port = process.env.PORT || 3000;

// خدمة الملفات الثابتة الموجودة في مجلد client
app.use(express.static(path.join(__dirname, '../client')));

// إضافة نقطة نهاية لإرجاع مفاتيح التفعيل من ملف .env
// تأكد أن المتغير ALLOWED_CODES يحتوي على المفاتيح مفصولة بفاصلة
const allowedCodes = process.env.ALLOWED_CODES.split(",");
app.get('/api/allowed-codes', (req, res) => {
  res.json({ allowedCodes });
});

// إعداد نقطة الدخول (الرابط الجذر) لإرسال ملف index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

// بدء تشغيل الخادم
app.listen(port, () => {
  console.log(`الخادم يعمل على المنفذ ${port}`);
});
