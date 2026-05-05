const pronouns = [
  { key: "ana", ru: "я", ar: "أَنَا" },
  { key: "nahnu", ru: "мы", ar: "نَحْنُ" },
  { key: "anta", ru: "ты м.", ar: "أَنْتَ" },
  { key: "anti", ru: "ты ж.", ar: "أَنْتِ" },
  { key: "antuma", ru: "вы двое", ar: "أَنْتُمَا" },
  { key: "antum", ru: "вы м.", ar: "أَنْتُمْ" },
  { key: "antunna", ru: "вы ж.", ar: "أَنْتُنَّ" },
  { key: "huwa", ru: "он", ar: "هُوَ" },
  { key: "hiya", ru: "она", ar: "هِيَ" },
  { key: "huma_m", ru: "они двое м.", ar: "هُمَا" },
  { key: "huma_f", ru: "они две ж.", ar: "هُمَا" },
  { key: "hum", ru: "они м.", ar: "هُمْ" },
  { key: "hunna", ru: "они ж.", ar: "هُنَّ" }
];

const tenses = [
  { key: "past", ru: "Прошедшее время" },
  { key: "present", ru: "Настоящее время" },
  { key: "future", ru: "Будущее время" }
];

const verbs = [
  {
    ru: "делать",
    base: "فَعَلَ",
    past: {
      ana: "فَعَلْتُ",
      nahnu: "فَعَلْنَا",
      anta: "فَعَلْتَ",
      anti: "فَعَلْتِ",
      antuma: "فَعَلْتُمَا",
      antum: "فَعَلْتُمْ",
      antunna: "فَعَلْتُنَّ",
      huwa: "فَعَلَ",
      hiya: "فَعَلَتْ",
      huma_m: "فَعَلَا",
      huma_f: "فَعَلَتَا",
      hum: "فَعَلُوا",
      hunna: "فَعَلْنَ"
    },
    present: {
      ana: "أَفْعَلُ",
      nahnu: "نَفْعَلُ",
      anta: "تَفْعَلُ",
      anti: "تَفْعَلِينَ",
      antuma: "تَفْعَلَانِ",
      antum: "تَفْعَلُونَ",
      antunna: "تَفْعَلْنَ",
      huwa: "يَفْعَلُ",
      hiya: "تَفْعَلُ",
      huma_m: "يَفْعَلَانِ",
      huma_f: "تَفْعَلَانِ",
      hum: "يَفْعَلُونَ",
      hunna: "يَفْعَلْنَ"
    }
  },
  {
    ru: "писать",
    base: "كَتَبَ",
    past: {
      ana: "كَتَبْتُ",
      nahnu: "كَتَبْنَا",
      anta: "كَتَبْتَ",
      anti: "كَتَبْتِ",
      antuma: "كَتَبْتُمَا",
      antum: "كَتَبْتُمْ",
      antunna: "كَتَبْتُنَّ",
      huwa: "كَتَبَ",
      hiya: "كَتَبَتْ",
      huma_m: "كَتَبَا",
      huma_f: "كَتَبَتَا",
      hum: "كَتَبُوا",
      hunna: "كَتَبْنَ"
    },
    present: {
      ana: "أَكْتُبُ",
      nahnu: "نَكْتُبُ",
      anta: "تَكْتُبُ",
      anti: "تَكْتُبِينَ",
      antuma: "تَكْتُبَانِ",
      antum: "تَكْتُبُونَ",
      antunna: "تَكْتُبْنَ",
      huwa: "يَكْتُبُ",
      hiya: "تَكْتُبُ",
      huma_m: "يَكْتُبَانِ",
      huma_f: "تَكْتُبَانِ",
      hum: "يَكْتُبُونَ",
      hunna: "يَكْتُبْنَ"
    }
  },
  {
    ru: "знать",
    base: "عَلِمَ",
    past: {
      ana: "عَلِمْتُ",
      nahnu: "عَلِمْنَا",
      anta: "عَلِمْتَ",
      anti: "عَلِمْتِ",
      antuma: "عَلِمْتُمَا",
      antum: "عَلِمْتُمْ",
      antunna: "عَلِمْتُنَّ",
      huwa: "عَلِمَ",
      hiya: "عَلِمَتْ",
      huma_m: "عَلِمَا",
      huma_f: "عَلِمَتَا",
      hum: "عَلِمُوا",
      hunna: "عَلِمْنَ"
    },
    present: {
      ana: "أَعْلَمُ",
      nahnu: "نَعْلَمُ",
      anta: "تَعْلَمُ",
      anti: "تَعْلَمِينَ",
      antuma: "تَعْلَمَانِ",
      antum: "تَعْلَمُونَ",
      antunna: "تَعْلَمْنَ",
      huwa: "يَعْلَمُ",
      hiya: "تَعْلَمُ",
      huma_m: "يَعْلَمَانِ",
      huma_f: "تَعْلَمَانِ",
      hum: "يَعْلَمُونَ",
      hunna: "يَعْلَمْنَ"
    }
  },
  {
    ru: "идти",
    base: "ذَهَبَ",
    past: {
      ana: "ذَهَبْتُ",
      nahnu: "ذَهَبْنَا",
      anta: "ذَهَبْتَ",
      anti: "ذَهَبْتِ",
      antuma: "ذَهَبْتُمَا",
      antum: "ذَهَبْتُمْ",
      antunna: "ذَهَبْتُنَّ",
      huwa: "ذَهَبَ",
      hiya: "ذَهَبَتْ",
      huma_m: "ذَهَبَا",
      huma_f: "ذَهَبَتَا",
      hum: "ذَهَبُوا",
      hunna: "ذَهَبْنَ"
    },
    present: {
      ana: "أَذْهَبُ",
      nahnu: "نَذْهَبُ",
      anta: "تَذْهَبُ",
      anti: "تَذْهَبِينَ",
      antuma: "تَذْهَبَانِ",
      antum: "تَذْهَبُونَ",
      antunna: "تَذْهَبْنَ",
      huwa: "يَذْهَبُ",
      hiya: "تَذْهَبُ",
      huma_m: "يَذْهَبَانِ",
      huma_f: "تَذْهَبَانِ",
      hum: "يَذْهَبُونَ",
      hunna: "يَذْهَبْنَ"
    }
  },
  {
    ru: "открывать",
    base: "فَتَحَ",
    past: {
      ana: "فَتَحْتُ",
      nahnu: "فَتَحْنَا",
      anta: "فَتَحْتَ",
      anti: "فَتَحْتِ",
      antuma: "فَتَحْتُمَا",
      antum: "فَتَحْتُمْ",
      antunna: "فَتَحْتُنَّ",
      huwa: "فَتَحَ",
      hiya: "فَتَحَتْ",
      huma_m: "فَتَحَا",
      huma_f: "فَتَحَتَا",
      hum: "فَتَحُوا",
      hunna: "فَتَحْنَ"
    },
    present: {
      ana: "أَفْتَحُ",
      nahnu: "نَفْتَحُ",
      anta: "تَفْتَحُ",
      anti: "تَفْتَحِينَ",
      antuma: "تَفْتَحَانِ",
      antum: "تَفْتَحُونَ",
      antunna: "تَفْتَحْنَ",
      huwa: "يَفْتَحُ",
      hiya: "تَفْتَحُ",
      huma_m: "يَفْتَحَانِ",
      huma_f: "تَفْتَحَانِ",
      hum: "يَفْتَحُونَ",
      hunna: "يَفْتَحْنَ"
    }
  },
  {
    ru: "читать",
    base: "قَرَأَ",
    past: {
      ana: "قَرَأْتُ",
      nahnu: "قَرَأْنَا",
      anta: "قَرَأْتَ",
      anti: "قَرَأْتِ",
      antuma: "قَرَأْتُمَا",
      antum: "قَرَأْتُمْ",
      antunna: "قَرَأْتُنَّ",
      huwa: "قَرَأَ",
      hiya: "قَرَأَتْ",
      huma_m: "قَرَآ",
      huma_f: "قَرَأَتَا",
      hum: "قَرَأُوا",
      hunna: "قَرَأْنَ"
    },
    present: {
      ana: "أَقْرَأُ",
      nahnu: "نَقْرَأُ",
      anta: "تَقْرَأُ",
      anti: "تَقْرَئِينَ",
      antuma: "تَقْرَآنِ",
      antum: "تَقْرَأُونَ",
      antunna: "تَقْرَأْنَ",
      huwa: "يَقْرَأُ",
      hiya: "تَقْرَأُ",
      huma_m: "يَقْرَآنِ",
      huma_f: "تَقْرَآنِ",
      hum: "يَقْرَأُونَ",
      hunna: "يَقْرَأْنَ"
    }
  }
];

verbs.forEach(verb => {
  verb.future = {};
  pronouns.forEach(pronoun => {
    verb.future[pronoun.key] = "سَ" + verb.present[pronoun.key];
  });
});

let currentIndex = 0;
let tense = "past";

let learnCorrect = 0;
let learnTotal = 0;
let testCorrect = 0;
let testTotal = 0;

let timerInterval = null;
let timeLeft = 120;
let testActive = false;

const mainVerb = document.getElementById("mainVerb");
const mainTranslation = document.getElementById("mainTranslation");
const tenseSelect = document.getElementById("tenseSelect");
const conjugationList = document.getElementById("conjugationList");

const verbSearch = document.getElementById("verbSearch");
const searchResults = document.getElementById("searchResults");

function normalizeArabic(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/[ًٌٍَُِّْٰـ]/g, "")
    .replace(/[إأآا]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ؤ/g, "و")
    .replace(/ئ/g, "ي")
    .replace(/ة/g, "ه")
    .trim();
}

function getVerbSearchText(verb) {
  return normalizeArabic([
    verb.ru,
    verb.base,
    ...Object.values(verb.past),
    ...Object.values(verb.present),
    ...Object.values(verb.future)
  ].join(" "));
}

function keepScroll(callback) {
  const y = window.scrollY;
  callback();
  requestAnimationFrame(() => window.scrollTo(0, y));
}

function renderVerb() {
  const verb = verbs[currentIndex];

  mainVerb.textContent = verb.base;
  mainTranslation.textContent = verb.ru;

  renderConjugations();
}

function renderConjugations() {
  const verb = verbs[currentIndex];

  conjugationList.innerHTML = "";

  pronouns.forEach((pronoun, index) => {
    const item = document.createElement("div");
    item.className = "conj-item";
    item.style.animationDelay = `${index * 0.03}s`;

    item.innerHTML = `
      <div class="arabic conj-pronoun">${pronoun.ar}</div>
      <div class="arabic conj-form">${verb[tense][pronoun.key]}</div>
    `;

    conjugationList.appendChild(item);
  });
}

function renderSearchResults(query) {
  searchResults.innerHTML = "";

  const value = normalizeArabic(query);

  if (!value) return;

  const found = verbs.filter(verb => {
    const searchText = getVerbSearchText(verb);
    return searchText.includes(value);
  });

  found.slice(0, 8).forEach(verb => {
    const index = verbs.indexOf(verb);

    const item = document.createElement("button");
    item.className = "search-result";
    item.type = "button";

    item.innerHTML = `
      <span class="arabic">${verb.base}</span>
      ${verb.ru}
    `;

    item.onclick = () => {
      currentIndex = index;
      verbSearch.value = "";
      searchResults.innerHTML = "";
      renderVerb();
    };

    searchResults.appendChild(item);
  });

  if (found.length === 0) {
    searchResults.innerHTML = `<div class="search-result">Ничего не найдено</div>`;
  }
}

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function getRandomTask() {
  const verb = randomItem(verbs);
  const taskTense = randomItem(tenses);
  const pronoun = randomItem(pronouns);
  const form = verb[taskTense.key][pronoun.key];

  const wrong = shuffle(
    pronouns.filter(item => item.key !== pronoun.key)
  ).slice(0, 3);

  const options = shuffle([pronoun, ...wrong]);

  return {
    verb,
    tense: taskTense.key,
    tenseRu: taskTense.ru,
    pronoun,
    form,
    options
  };
}

function updateStats() {
  const learnAcc = learnTotal ? Math.round((learnCorrect / learnTotal) * 100) : 0;
  const testAcc = testTotal ? Math.round((testCorrect / testTotal) * 100) : 0;

  document.getElementById("learnScore").textContent = `${learnCorrect} / ${learnTotal}`;
  document.getElementById("learnAccuracy").textContent = `${learnAcc}%`;
  document.getElementById("learnPercent").textContent = `${learnAcc}%`;
  document.getElementById("learnBar").style.width = `${learnAcc}%`;

  document.getElementById("testScore").textContent = `${testCorrect} / ${testTotal}`;
  document.getElementById("testAccuracy").textContent = `${testAcc}%`;
  document.getElementById("testPercent").textContent = `${testAcc}%`;
  document.getElementById("testBar").style.width = `${testAcc}%`;
}

function removeCorrectBox(mode) {
  const oldBox = document.getElementById(`${mode}CorrectBox`);
  if (oldBox) oldBox.remove();
}

function removeTenseBox(mode) {
  const oldBox = document.getElementById(`${mode}TenseBox`);
  if (oldBox) oldBox.remove();
}

function showTaskTense(mode, task) {
  removeTenseBox(mode);

  const box = document.createElement("div");
  box.className = "task-tense";
  box.id = `${mode}TenseBox`;
  box.textContent = task.tenseRu;

  const question = document.getElementById(
    mode === "learn" ? "learnQuestion" : "testQuestion"
  );

  question.before(box);
}

function showCorrectAnswer(mode, task) {
  removeCorrectBox(mode);

  const box = document.createElement("div");
  box.className = "correct-box";
  box.id = `${mode}CorrectBox`;

  box.innerHTML = `
    Правильный ответ:
    <span class="arabic">${task.pronoun.ar}</span>
  `;

  const question = document.getElementById(
    mode === "learn" ? "learnQuestion" : "testQuestion"
  );

  question.after(box);
}

function makeAnswerButton(option, task, mode) {
  const btn = document.createElement("button");
  btn.className = "btn answer";
  btn.dataset.key = option.key;

  btn.innerHTML = `<span class="arabic arabic-answer">${option.ar}</span>`;

  btn.onclick = () => {
    btn.blur();

    if (mode === "test" && !testActive) return;

    keepScroll(() => {
      const box = document.getElementById(
        mode === "learn" ? "learnAnswers" : "testAnswers"
      );

      const buttons = box.querySelectorAll("button");

      buttons.forEach(button => {
        button.disabled = true;
      });

      const isCorrect = option.key === task.pronoun.key;

      if (mode === "learn") {
        learnTotal++;
        if (isCorrect) learnCorrect++;
      } else {
        testTotal++;
        if (isCorrect) testCorrect++;
      }

      buttons.forEach(button => {
        if (button.dataset.key === task.pronoun.key) {
          button.classList.add("correct");
        }
      });

      if (!isCorrect) {
        btn.classList.add("wrong");
      }

      showCorrectAnswer(mode, task);
      updateStats();
    });

    setTimeout(() => {
      keepScroll(() => {
        if (mode === "learn") renderLearnTask();
        if (mode === "test" && testActive) renderTestTask();
      });
    }, 1300);
  };

  return btn;
}

function renderLearnTask() {
  removeCorrectBox("learn");
  removeTenseBox("learn");

  const task = getRandomTask();

  document.getElementById("learnQuestion").textContent = task.form;
  showTaskTense("learn", task);

  const box = document.getElementById("learnAnswers");
  box.innerHTML = "";

  task.options.forEach(option => {
    box.appendChild(makeAnswerButton(option, task, "learn"));
  });
}

function renderTestTask() {
  if (!testActive) return;

  removeCorrectBox("test");
  removeTenseBox("test");

  const task = getRandomTask();

  document.getElementById("testQuestion").textContent = task.form;
  showTaskTense("test", task);

  const box = document.getElementById("testAnswers");
  box.innerHTML = "";

  task.options.forEach(option => {
    box.appendChild(makeAnswerButton(option, task, "test"));
  });
}

function openLearn() {
  closePanels(false);
  document.getElementById("learnPanel").classList.add("active");
  renderLearnTask();
}

function openTest() {
  closePanels(false);

  const selectedTime = Number(document.getElementById("testTime").value);

  document.getElementById("testPanel").classList.add("active");

  testCorrect = 0;
  testTotal = 0;
  timeLeft = selectedTime;
  testActive = true;

  resetTestButtons();
  updateStats();
  updateTimerText();
  renderTestTask();
  startTimer();
}

function startTimer() {
  clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    if (!testActive) {
      clearInterval(timerInterval);
      return;
    }

    timeLeft--;
    updateTimerText();

    if (timeLeft <= 0) {
      endTest("Время вышло");
    }
  }, 1000);
}

function updateTimerText() {
  const min = Math.floor(timeLeft / 60);
  const sec = String(timeLeft % 60).padStart(2, "0");

  document.getElementById("timer").textContent = `${min}:${sec}`;
}

function endTest(message = "Тест завершён") {
  testActive = false;
  clearInterval(timerInterval);
  removeCorrectBox("test");
  removeTenseBox("test");

  document.getElementById("testQuestion").textContent = message;
  document.getElementById("testAnswers").innerHTML = "";

  document.getElementById("finishTest").disabled = true;
}

function resetTestButtons() {
  document.getElementById("finishTest").disabled = false;
}

function closePanels(stopTimer = true) {
  document.getElementById("learnPanel").classList.remove("active");
  document.getElementById("testPanel").classList.remove("active");

  if (stopTimer) {
    testActive = false;
    clearInterval(timerInterval);
  }
}

document.getElementById("prevBtn").onclick = () => {
  currentIndex = (currentIndex - 1 + verbs.length) % verbs.length;
  renderVerb();
};

document.getElementById("nextBtn").onclick = () => {
  currentIndex = (currentIndex + 1) % verbs.length;
  renderVerb();
};

tenseSelect.onchange = () => {
  tense = tenseSelect.value;
  renderVerb();
};

document.getElementById("learnBtn").onclick = openLearn;
document.getElementById("testBtn").onclick = openTest;

document.getElementById("skipTest").onclick = () => {
  openTest();
};

document.getElementById("finishTest").onclick = () => {
  endTest("Тест завершён");
};

document.getElementById("testTime").onchange = event => {
  if (!testActive) {
    timeLeft = Number(event.target.value);
    updateTimerText();
  }
};

document.getElementById("fontRange").oninput = event => {
  const size = event.target.value;

  document.documentElement.style.setProperty("--arabic-size", `${size}px`);
  document.getElementById("fontValue").textContent = `${size}px`;
};

if (verbSearch) {
  verbSearch.addEventListener("input", event => {
    renderSearchResults(event.target.value);
  });
}

renderVerb();
updateStats();
updateTimerText();
