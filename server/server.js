// server.js
const express = require('express');
const path = require('path');
require('dotenv').config(); // تحميل المتغيرات البيئية من ملف .env

const app = express();
const port = process.env.PORT || 3000;

// خدمة الملفات الثابتة من مجلد client
app.use(express.static(path.join(__dirname, 'client')));

// إعداد نقطة الدخول الرئيسية لإرسال ملف العميل المناسب
// يمكنك تعديل الملف هنا (مثلاً kllassa.html أو index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'kllassa.html'));
});

app.listen(port, () => {
  console.log(`الخادم يعمل على المنفذ ${port}`);
});
