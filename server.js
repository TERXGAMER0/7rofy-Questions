// server.js
const express = require('express');
const path = require('path');
require('dotenv').config(); // تحميل المتغيرات البيئية من ملف .env

const app = express();
const port = process.env.PORT || 3000;

// خدمة الملفات الثابتة من مجلد client
app.use(express.static(path.join(__dirname, 'client')));

// نقطة نهاية لإرجاع مفاتيح التفعيل من ملف .env
const allowedCodes = process.env.ALLOWED_CODES ? process.env.ALLOWED_CODES.split(",") : [];
app.get('/api/allowed-codes', (req, res) => {
  res.json({ allowedCodes });
});

// إعداد نقطة الدخول الرئيسية لإرسال ملف kllassa.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'kllassa.html'));
});

app.listen(port, () => {
  console.log(`الخادم يعمل على المنفذ ${port}`);
});
