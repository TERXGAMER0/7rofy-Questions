// client/app.js

document.addEventListener('DOMContentLoaded', function() {
    console.log("تم تحميل صفحة اللعبة الثانية");
  
    // تعريف المتغيرات الأساسية
    const questionEl = document.getElementById('question');
    const answerEl = document.getElementById('answer');
    const randomBtn = document.getElementById('random-btn');
    const chooseLetterBtn = document.getElementById('choose-letter-btn');
    const letterSelectionDiv = document.getElementById('letter-selection');
    const selectedLetterEl = document.getElementById('selected-letter');
  
    let questionsData = [];  // لتخزين الأسئلة والإجابات من الملف النصي
    let selectedLetter = "";
  
    // قائمة الأحرف التي يمكن الاختيار منها
    const letters = ["أ", "ب", "ت", "ث", "ج", "ح", "خ", "د", "ذ", "ر", "ز", "س", "ش", "ص", "ض", "ط", "ظ", "ع", "غ", "ف", "ق", "ك", "ل", "م", "ن", "ه", "و", "ي"];
  
    // إنشاء أزرار اختيار الحرف ديناميكياً وإضافتها إلى الواجهة
    letters.forEach(letter => {
      let btn = document.createElement('button');
      btn.className = 'letter-btn';
      btn.textContent = letter;
      btn.addEventListener('click', function() {
        selectedLetter = letter;
        selectedLetterEl.textContent = "الحرف المختار: " + letter;
        letterSelectionDiv.style.display = 'none';
        loadQuestions(letter);
      });
      letterSelectionDiv.appendChild(btn);
    });
  
    // زر إظهار/إخفاء قائمة اختيار الحرف
    chooseLetterBtn.addEventListener('click', function() {
      if(letterSelectionDiv.style.display === 'none' || letterSelectionDiv.style.display === '') {
        letterSelectionDiv.style.display = 'block';
      } else {
        letterSelectionDiv.style.display = 'none';
      }
    });
  
    // زر عرض سؤال عشوائي
    randomBtn.addEventListener('click', function() {
      if(selectedLetter === "") {
        alert("يرجى اختيار حرف أولاً!");
        return;
      }
      if(questionsData.length === 0) {
        alert("لا يوجد أسئلة متاحة لهذا الحرف.");
        return;
      }
      const randomIndex = Math.floor(Math.random() * questionsData.length);
      const qa = questionsData[randomIndex];
      questionEl.textContent = qa.question;
      answerEl.textContent = qa.answer;
    });
  
    // دالة تحميل الأسئلة من ملف نصي بناءً على الحرف المختار
    function loadQuestions(letter) {
      const fileName = letter + ".txt"; // يُفترض أن لديك ملفات نصية لكل حرف (مثل: "أ.txt")
      fetch(fileName)
        .then(response => {
          if (!response.ok) {
            throw new Error("خطأ في تحميل الملف: " + fileName);
          }
          return response.text();
        })
        .then(data => {
          questionsData = [];
          const lines = data.split(/\r?\n/);
          let currentQuestion = "";
          let currentAnswer = "";
          lines.forEach(line => {
            if(line.startsWith("السؤال:")) {
              currentQuestion = line.replace("السؤال:", "").trim();
            } else if(line.startsWith("الإجابة:")) {
              currentAnswer = line.replace("الإجابة:", "").trim();
              if(currentQuestion !== "" && currentAnswer !== "") {
                questionsData.push({
                  question: currentQuestion,
                  answer: currentAnswer
                });
                currentQuestion = "";
                currentAnswer = "";
              }
            }
          });
          if(questionsData.length === 0) {
            alert("لم يتم العثور على أسئلة في الملف " + fileName);
          }
        })
        .catch(error => {
          console.error(error);
          alert("حدث خطأ أثناء تحميل الأسئلة من الملف: " + fileName);
        });
    }
  
    // التعامل مع واجهة التحقق من الرمز السري
    const secretOverlay = document.getElementById('secret-overlay');
    const secretSubmit = document.getElementById('secret-submit');
    const secretCodeInput = document.getElementById('secret-code');
    const errorMessage = document.getElementById('error-message');
    
    secretSubmit.addEventListener('click', function() {
      const code = secretCodeInput.value.trim();
      // قائمة الرموز المسموح بها للدخول
fetch("/.netlify/functions/verify")
  .then(response => response.json())
  .then(data => {
    const allowedCodes = data.allowedCodes;
    if (allowedCodes.includes(code)) {
      secretOverlay.style.display = 'none';
    } else {
      errorMessage.style.display = 'block';
    }
  })
  .catch(err => {
    console.error("Error fetching allowed codes:", err);
    alert("حدث خطأ أثناء التحقق من الرمز.");
  });

    });

    // === إضافة النصوص الإضافية (قبل انتهاء تحميل الصفحة) ===

    // النصوص العادية (يمكن التحكم بحجمها وموضعها)
    const plainTexts = [
      { text: " للاستفسار او التواصل على بوت التواصل ", x: 400, y: 750, fontSize: "25px" },
      { text: "النص الثاني", x: 200, y: 500, fontSize: "0px" },
      { text: "النص الثالث", x: 350, y: 500, fontSize: "0px" }
    ];
    plainTexts.forEach(item => {
      const div = document.createElement('div');
      div.textContent = item.text;
      div.style.position = 'absolute';
      div.style.left = item.x + 'px';
      div.style.top = item.y + 'px';
      div.style.fontSize = item.fontSize;
      document.body.appendChild(div);
    });
  
    // النصوص التي تعمل كرابط (يمكن التحكم بحجمها وموضعها)
    const linkTexts = [
      { text: "ااضغط هنا", url: "https://t.me/COM40TSM_bot", x: 550, y: 800, fontSize: "25px" },
      { text: "الرابط الثاني", url: "https://www.crunchyroll.com/ar", x: 200, y: 550, fontSize: "0px" },
      { text: "الرابط الثالث", url: "https://www.youtube.com/", x: 350, y: 550, fontSize: "0px" }
    ];
    linkTexts.forEach(item => {
      const a = document.createElement('a');
      a.textContent = item.text;
      a.href = item.url;
      a.style.position = 'absolute';
      a.style.left = item.x + 'px';
      a.style.top = item.y + 'px';
      a.style.fontSize = item.fontSize;
      a.style.color = '#e0e0e0';
      a.style.textDecoration = 'none';
      document.body.appendChild(a);
    });
});
