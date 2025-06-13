// client/app.js

document.addEventListener('DOMContentLoaded', function() {
  console.log("تم تحميل صفحة الأسئلة والأجوبة");

  // عناصر الواجهة
  const questionEl        = document.getElementById('question');
  const answerEl          = document.getElementById('answer');
  const randomBtn         = document.getElementById('random-btn');
  const chooseLetterBtn   = document.getElementById('choose-letter-btn');
  const letterSelectionDiv= document.getElementById('letter-selection');
  const selectedLetterEl  = document.getElementById('selected-letter');
  const secretOverlay     = document.getElementById('secret-overlay');
  const secretSubmit      = document.getElementById('secret-submit');
  const secretCodeInput   = document.getElementById('secret-code');
  const errorMessage      = document.getElementById('error-message');

  let questionsData = [];  // ستُحمّل من ملف النصي
  let selectedLetter= "";

  // قائمة الأحرف
  const letters = ["أ","ب","ت","ث","ج","ح","خ","د","ذ","ر","ز","س","ش","ص","ض","ط","ظ","ع","غ","ف","ق","ك","ل","م","ن","ه","و","ي"];

  // إنشاء أزرار اختيار الحرف ديناميكياً
  letters.forEach(letter => {
    const btn = document.createElement('button');
    btn.className = 'letter-btn';
    btn.textContent = letter;
    btn.addEventListener('click', () => {
      selectedLetter = letter;
      selectedLetterEl.textContent = "الحرف المختار: " + letter;
      letterSelectionDiv.style.display = 'none';
      loadQuestions(letter);
    });
    letterSelectionDiv.appendChild(btn);
  });

  // إظهار/إخفاء قائمة اختيار الحرف
  chooseLetterBtn.addEventListener('click', () => {
    letterSelectionDiv.style.display = (letterSelectionDiv.style.display === 'block') ? 'none' : 'block';
  });

  // عرض سؤال عشوائي
  randomBtn.addEventListener('click', () => {
    if (!selectedLetter) {
      alert("يرجى اختيار حرف أولاً!");
      return;
    }
    if (questionsData.length === 0) {
      alert("لا يوجد أسئلة متاحة لهذا الحرف.");
      return;
    }
    const idx = Math.floor(Math.random() * questionsData.length);
    questionEl.textContent = questionsData[idx].question;
    answerEl.textContent   = questionsData[idx].answer;
  });

  // تحميل الأسئلة من ملف نصي خاص بالحرف
function loadQuestions(letter) {
  // استخدم مساراً يبدأ بشَرطة ويشفّر الحرف العربي
  fetch(`/questions/${encodeURIComponent(letter)}.txt`)
    .then(response => {
      if (!response.ok) throw new Error("خطأ في تحميل الملف: " + letter);
      return response.text();
    })
    .then(data => {
      // البقية كما هي: تفكيك الأسئلة والإجابات في questionsData
      questionsData = [];
      let q = "", a = "";
      data.split(/\r?\n/).forEach(line => {
        if (line.startsWith("السؤال:")) q = line.replace("السؤال:", "").trim();
        else if (line.startsWith("الإجابة:")) {
          a = line.replace("الإجابة:", "").trim();
          if (q && a) {
            questionsData.push({ question: q, answer: a });
            q = ""; a = "";
          }
        }
      });
      if (!questionsData.length) {
        alert("لا توجد أسئلة " + letter + ".txt");
      }
    })
    .catch(err => {
      console.error(err);
      alert("حدث خطأ أثناء تحميل الأسئلة.");
    });
}

  // التحقق من الرمز السري عبر Netlify Function
  secretSubmit.addEventListener('click', () => {
    const code = secretCodeInput.value.trim();
    fetch('/.netlify/functions/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    })
      .then(res => res.json())
      .then(data => {
        if (data.valid) {
          secretOverlay.style.display = 'none';
        } else {
          errorMessage.style.display = 'block';
        }
      })
      .catch(err => {
        console.error("Error during verification:", err);
        alert("فشل الاتصال بخدمة التحقق.");
      });
  });

  // إضافة النصوص الإضافية برمجياً (كما في HTML)
  const plainTexts = [
    { text: "للاستفسار او التواصل على بوت التواصل", x:400, y:750, size:"25px" },
    { text: "النص الثاني", x:200, y:500, size:"0px" },
    { text: "النص الثالث", x:350, y:500, size:"0px" }
  ];
  plainTexts.forEach(item => {
    const div = document.createElement('div');
    div.textContent = item.text;
    div.style = `position:absolute; left:${item.x}px; top:${item.y}px; font-size:${item.size};`;
    document.body.appendChild(div);
  });
  const linkTexts = [
    { text:"اضغط هنا", url:"https://t.me/COM40TSM_bot", x:550, y:800, size:"25px" },
    { text:"الرابط الثاني", url:"https://www.crunchyroll.com/ar", x:200, y:550, size:"0px" },
    { text:"الرابط الثالث", url:"https://www.youtube.com/", x:350, y:550, size:"0px" }
  ];
  linkTexts.forEach(item => {
    const a = document.createElement('a');
    a.textContent = item.text;
    a.href = item.url;
    a.style = `position:absolute; left:${item.x}px; top:${item.y}px; font-size:${item.size}; color:inherit; text-decoration:none;`;
    document.body.appendChild(a);
  });
});
