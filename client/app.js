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
      const allowedCodes = [
 
      ];
      if(allowedCodes.includes(code)) {
        secretOverlay.style.display = 'none';
      } else {
        errorMessage.style.display = 'block';
      }
    });

    // ========================================================
    // الإضافات الجديدة: إضافة ثلاث نصوص ثابتة وثلاثة نصوص قابلة للنقر للتوجيه إلى الصفحة المطلوبة
    // ========================================================

    // تكوين النصوص الثابتة (يمكن تعديل النص والحجم والإحداثيات هنا)
    const staticTextsConfig = [
      { text: "نص 1", fontSize: "16px", top: "80%", left: "10%" },
      { text: "نص 2", fontSize: "18px", top: "85%", left: "40%" },
      { text: "نص 3", fontSize: "20px", top: "90%", left: "70%" }
    ];

    staticTextsConfig.forEach(config => {
      let div = document.createElement('div');
      div.textContent = config.text;
      div.style.position = 'absolute';
      div.style.fontSize = config.fontSize;
      div.style.top = config.top;
      div.style.left = config.left;
      // يمكن إضافة تنسيقات إضافية هنا إذا لزم الأمر
      document.body.appendChild(div);
    });

    // تكوين النصوص القابلة للنقر للتوجيه (يمكن تعديل النص والحجم والإحداثيات هنا)
    const linkTextsConfig = [
      { text: "رابط 1", fontSize: "16px", top: "80%", left: "30%" },
      { text: "رابط 2", fontSize: "18px", top: "85%", left: "60%" },
      { text: "رابط 3", fontSize: "20px", top: "90%", left: "80%" }
    ];

    linkTextsConfig.forEach(config => {
      let a = document.createElement('a');
      a.textContent = config.text;
      a.href = "https://7rofy.up.railway.app";
      a.style.position = 'absolute';
      a.style.fontSize = config.fontSize;
      a.style.top = config.top;
      a.style.left = config.left;
      a.style.color = 'blue';  // تحديد لون النص القابل للنقر
      a.style.cursor = 'pointer';
      // يمكن إضافة المزيد من التنسيقات حسب الحاجة
      document.body.appendChild(a);
    });
});
