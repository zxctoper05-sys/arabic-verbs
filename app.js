const pronouns = [
  { key: "ana", ar: "أَنَا" },
  { key: "nahnu", ar: "نَحْنُ" },
  { key: "anta", ar: "أَنْتَ" },
  { key: "anti", ar: "أَنْتِ" },
  { key: "antuma", ar: "أَنْتُمَا" },
  { key: "antum", ar: "أَنْتُمْ" },
  { key: "antunna", ar: "أَنْتُنَّ" },
  { key: "huwa", ar: "هُوَ" },
  { key: "hiya", ar: "هِيَ" },
  { key: "huma_m", ar: "هُمَا" },
  { key: "huma_f", ar: "هُمَا" },
  { key: "hum", ar: "هُمْ" },
  { key: "hunna", ar: "هُنَّ" }
];

const tenses = [
  { key: "past", ru: "Прошедшее время" },
  { key: "present", ru: "Настоящее время" },
  { key: "future", ru: "Будущее время" }
];

const STORAGE_KEYS = {
  learnCorrect: "arabicLearnCorrect",
  learnTotal: "arabicLearnTotal",
  testCorrect: "arabicTestCorrect",
  testTotal: "arabicTestTotal",
  favorites: "arabicFavorites"
};

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
    .replace(/[^\u0621-\u064Aа-яёa-z0-9 ]/gi, "")
    .trim();
}

function getVowelMark(vowel) {
  if (vowel === "a") return "َ";
  if (vowel === "i") return "ِ";
  return "ُ";
}

function generateRegularVerb(root, ru = "арабский глагол", presentVowel = "u") {
  root = normalizeArabic(root);

  const [f, a, l] = [...root];
  const base = `${f}َ${a}َ${l}َ`;
  const stemPast = `${f}َ${a}َ${l}`;
  const v = getVowelMark(presentVowel);
  const stemPresent = `${f}ْ${a}${v}${l}`;

  const past = {
    ana: `${stemPast}ْتُ`,
    nahnu: `${stemPast}ْنَا`,
    anta: `${stemPast}ْتَ`,
    anti: `${stemPast}ْتِ`,
    antuma: `${stemPast}ْتُمَا`,
    antum: `${stemPast}ْتُمْ`,
    antunna: `${stemPast}ْتُنَّ`,
    huwa: base,
    hiya: `${stemPast}َتْ`,
    huma_m: `${stemPast}َا`,
    huma_f: `${stemPast}َتَا`,
    hum: `${stemPast}ُوا`,
    hunna: `${stemPast}ْنَ`
  };

  const present = {
    ana: `أَ${stemPresent}ُ`,
    nahnu: `نَ${stemPresent}ُ`,
    anta: `تَ${stemPresent}ُ`,
    anti: `تَ${stemPresent}ِينَ`,
    antuma: `تَ${stemPresent}َانِ`,
    antum: `تَ${stemPresent}ُونَ`,
    antunna: `تَ${stemPresent}ْنَ`,
    huwa: `يَ${stemPresent}ُ`,
    hiya: `تَ${stemPresent}ُ`,
    huma_m: `يَ${stemPresent}َانِ`,
    huma_f: `تَ${stemPresent}َانِ`,
    hum: `يَ${stemPresent}ُونَ`,
    hunna: `يَ${stemPresent}ْنَ`
  };

  const future = {};

  pronouns.forEach(p => {
    future[p.key] = `سَ${present[p.key]}`;
  });

  return {
    ru,
    root,
    base,
    past,
    present,
    future
  };
}

function generateVerb(item) {
  return generateRegularVerb(item.root, item.ru, item.presentVowel);
}

const verbs = VERB_DICTIONARY.map(generateVerb);

let currentIndex = 0;
let tense = "past";

let learnCorrect = Number(localStorage.getItem(STORAGE_KEYS.learnCorrect)) || 0;
let learnTotal = Number(localStorage.getItem(STORAGE_KEYS.learnTotal)) || 0;
let testCorrect = Number(localStorage.getItem(STORAGE_KEYS.testCorrect)) || 0;
let testTotal = Number(localStorage.getItem(STORAGE_KEYS.testTotal)) || 0;
let favorites = JSON.parse(localStorage.getItem(STORAGE_KEYS.favorites) || "[]");

let timerInterval = null;
let timeLeft = 120;
let testActive = false;

const mainVerb = document.getElementById("mainVerb");
const mainTranslation = document.getElementById("mainTranslation");
const tenseSelect = document.getElementById("tenseSelect");
const conjugationList = document.getElementById("conjugationList");
const verbSearch = document.getElementById("verbSearch");
const searchResults = document.getElementById("searchResults");
const favoriteBtn = document.getElementById("favoriteBtn");
const favoritesList = document.getElementById("favoritesList");
const favoritesCount = document.getElementById("favoritesCount");
const practiceSource = document.getElementById("practiceSource");
const practiceTense = document.getElementById("practiceTense");
const practiceDirection = document.getElementById("practiceDirection");

function saveProgress() {
  localStorage.setItem(STORAGE_KEYS.learnCorrect, learnCorrect);
  localStorage.setItem(STORAGE_KEYS.learnTotal, learnTotal);
  localStorage.setItem(STORAGE_KEYS.testCorrect, testCorrect);
  localStorage.setItem(STORAGE_KEYS.testTotal, testTotal);
  localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(favorites));
}

function setArabicFontSize(size) {
  document.documentElement.style.setProperty("--arabic-size", `${size}px`);
  document.getElementById("fontValue").textContent = `${size}px`;
}

function renderVerb() {
  const verb = verbs[currentIndex];

  mainVerb.textContent = verb.base;
  mainTranslation.textContent = verb.ru;

  renderConjugations();
  renderFavoriteButton();
}

function renderConjugations() {
  const verb = verbs[currentIndex];
  conjugationList.innerHTML = "";

  pronouns.forEach(pronoun => {
    const item = document.createElement("div");
    item.className = "conj-item";

    item.innerHTML = `
      <div class="arabic conj-pronoun">${pronoun.ar}</div>
      <div class="arabic conj-form">${verb[tense][pronoun.key]}</div>
    `;

    conjugationList.appendChild(item);
  });
}

function renderFavoriteButton() {
  const verb = verbs[currentIndex];

  favoriteBtn.textContent = favorites.includes(verb.root)
    ? "Убрать из избранного"
    : "Добавить в избранное";
}

function toggleFavorite() {
  const verb = verbs[currentIndex];

  favorites = [...new Set(favorites)];

  if (favorites.includes(verb.root)) {
    favorites = favorites.filter(root => root !== verb.root);
  } else {
    favorites.push(verb.root);
  }

  favorites = [...new Set(favorites)];

  saveProgress();
  renderFavoriteButton();
  renderFavoritesList();
}

function renderFavoritesList() {
  favorites = [...new Set(favorites)];

  const favoriteVerbs = favorites
    .map(root => verbs.find(verb => verb.root === root))
    .filter(Boolean);

  favoritesCount.textContent = favoriteVerbs.length;

  if (!favoriteVerbs.length) {
    favoritesList.textContent = "Пока пусто";
    saveProgress();
    return;
  }

  favoritesList.innerHTML = "";

  favoriteVerbs.forEach(verb => {
    const item = document.createElement("button");
    item.className = "favorite-chip";
    item.type = "button";

    item.innerHTML = `
      <span class="arabic">${verb.base}</span>
      <span>${verb.ru}</span>
    `;

    item.onclick = () => {
      currentIndex = verbs.indexOf(verb);
      renderVerb();
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    favoritesList.appendChild(item);
  });

  saveProgress();
}

function getVerbSearchText(verb) {
  return normalizeArabic([
    verb.ru,
    verb.root,
    verb.base,
    ...Object.values(verb.past),
    ...Object.values(verb.present),
    ...Object.values(verb.future)
  ].join(" "));
}

function isArabicThreeLetterRoot(value) {
  return /^[\u0621-\u064A]{3}$/.test(value);
}

function findOrGenerateVerb(query) {
  const clean = normalizeArabic(query);

  const existing = verbs.find(verb => getVerbSearchText(verb).includes(clean));
  if (existing) return existing;

  if (isArabicThreeLetterRoot(clean)) {
    const generated = generateRegularVerb(clean);
    verbs.push(generated);
    return generated;
  }

  return null;
}

function addSearchButton(verb) {
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
}

function renderSearchResults(query) {
  searchResults.innerHTML = "";

  const value = normalizeArabic(query);
  if (!value) return;

  const found = verbs.filter(verb => getVerbSearchText(verb).includes(value));

  found.slice(0, 8).forEach(addSearchButton);

  if (found.length === 0) {
    const generated = findOrGenerateVerb(value);

    if (generated) {
      addSearchButton(generated);
    } else {
      searchResults.innerHTML = `<div class="search-result">Ничего не найдено</div>`;
    }
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

favoriteBtn.onclick = toggleFavorite;

if (verbSearch) {
  verbSearch.addEventListener("input", event => {
    renderSearchResults(event.target.value);
  });
}

document.getElementById("fontRange").addEventListener("input", e => {
  setArabicFontSize(e.target.value);
});

setArabicFontSize(54);
renderVerb();
renderFavoritesList();

function closePanels() {
  document.getElementById("learnPanel").classList.remove("active");
  document.getElementById("testPanel").classList.remove("active");
}

window.closePanels = closePanels;

document.getElementById("learnBtn").onclick = openLearn;
document.getElementById("testBtn").onclick = openTest;
document.getElementById("skipTest").onclick = openTest;

document.getElementById("finishTest").onclick = () => {
  endTest("Тест завершён");
};

function getPracticeVerbs() {
  if (practiceSource.value === "favorites") {
    const favoriteVerbs = verbs.filter(verb => favorites.includes(verb.root));
    return favoriteVerbs.length ? favoriteVerbs : verbs;
  }

  return verbs;
}

function getPracticeTenses() {
  if (practiceTense.value === "all") return tenses;
  return tenses.filter(item => item.key === practiceTense.value);
}

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function getRandomTask() {
  const verb = randomItem(getPracticeVerbs());
  const taskTense = randomItem(getPracticeTenses());
  const pronoun = randomItem(pronouns);
  const form = verb[taskTense.key][pronoun.key];
  const direction = practiceDirection.value;

  let options;

  if (direction === "pronoun-to-form" || direction === "typing") {
    const wrongPronouns = shuffle(pronouns.filter(p => p.key !== pronoun.key)).slice(0, 3);

    options = shuffle([pronoun, ...wrongPronouns]).map(p => ({
      key: p.key,
      ar: verb[taskTense.key][p.key]
    }));
  } else {
    const wrong = shuffle(pronouns.filter(p => p.key !== pronoun.key)).slice(0, 3);
    options = shuffle([pronoun, ...wrong]);
  }

  return {
    verb,
    tense: taskTense.key,
    tenseRu: taskTense.ru,
    pronoun,
    form,
    options,
    direction
  };
}

function updateStats() {
  document.getElementById("learnScore").textContent = `${learnCorrect} / ${learnTotal}`;
  document.getElementById("testScore").textContent = `${testCorrect} / ${testTotal}`;
  saveProgress();
}

function compareArabicAnswer(userAnswer, correctAnswer) {
  return normalizeArabic(userAnswer) === normalizeArabic(correctAnswer);
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

  const correctText = task.direction === "form-to-pronoun"
    ? task.pronoun.ar
    : task.form;

  box.innerHTML = `
    Правильный ответ:
    <span class="arabic">${correctText}</span>
  `;

  const question = document.getElementById(
    mode === "learn" ? "learnQuestion" : "testQuestion"
  );

  question.after(box);
}

function renderQuestionText(task) {
  if (task.direction === "pronoun-to-form" || task.direction === "typing") {
    return task.pronoun.ar;
  }

  return task.form;
}

function makeAnswerButton(option, task, mode) {
  const btn = document.createElement("button");
  btn.className = "btn answer";
  btn.dataset.key = option.key;
  btn.innerHTML = `<span class="arabic arabic-answer">${option.ar}</span>`;

  btn.onclick = () => {
    btn.blur();

    if (mode === "test" && !testActive) return;

    const box = document.getElementById(
      mode === "learn" ? "learnAnswers" : "testAnswers"
    );

    const buttons = box.querySelectorAll("button");
    buttons.forEach(button => button.disabled = true);

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

    setTimeout(() => {
      if (mode === "learn") renderLearnTask();
      if (mode === "test" && testActive) renderTestTask();
    }, 1300);
  };

  return btn;
}

function renderTypingAnswer(box, task, mode) {
  const wrapper = document.createElement("div");
  wrapper.className = "typing-box";

  const input = document.createElement("input");
  input.className = "typing-input";
  input.type = "text";
  input.placeholder = "اكتب الإجابة";

  const checkBtn = document.createElement("button");
  checkBtn.className = "btn btn-yellow";
  checkBtn.textContent = "Проверить";

  const result = document.createElement("div");
  result.className = "typing-result";

  wrapper.appendChild(input);
  wrapper.appendChild(checkBtn);
  wrapper.appendChild(result);
  box.appendChild(wrapper);

  checkBtn.onclick = () => {
    if (mode === "test" && !testActive) return;

    const isCorrect = compareArabicAnswer(input.value, task.form);

    input.disabled = true;
    checkBtn.disabled = true;

    if (mode === "learn") {
      learnTotal++;
      if (isCorrect) learnCorrect++;
    }

    if (mode === "test") {
      testTotal++;
      if (isCorrect) testCorrect++;
    }

    result.textContent = isCorrect ? "Правильно" : "Неправильно";
    showCorrectAnswer(mode, task);
    updateStats();

    setTimeout(() => {
      if (mode === "learn") renderLearnTask();
      if (mode === "test" && testActive) renderTestTask();
    }, 1400);
  };

  input.addEventListener("keydown", event => {
    if (event.key === "Enter") checkBtn.click();
  });

  setTimeout(() => input.focus(), 100);
}

function renderLearnTask() {
  removeCorrectBox("learn");
  removeTenseBox("learn");

  const task = getRandomTask();

  document.getElementById("learnQuestion").textContent = renderQuestionText(task);
  showTaskTense("learn", task);

  const box = document.getElementById("learnAnswers");
  box.innerHTML = "";

  if (task.direction === "typing") {
    renderTypingAnswer(box, task, "learn");
    return;
  }

  task.options.forEach(option => {
    box.appendChild(makeAnswerButton(option, task, "learn"));
  });
}

function renderTestTask() {
  if (!testActive) return;

  removeCorrectBox("test");
  removeTenseBox("test");

  const task = getRandomTask();

  document.getElementById("testQuestion").textContent = renderQuestionText(task);
  showTaskTense("test", task);

  const box = document.getElementById("testAnswers");
  box.innerHTML = "";

  if (task.direction === "typing") {
    renderTypingAnswer(box, task, "test");
    return;
  }

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

window.closePanels = closePanels;

document.getElementById("learnBtn").onclick = openLearn;
document.getElementById("testBtn").onclick = openTest;
document.getElementById("skipTest").onclick = openTest;

document.getElementById("finishTest").onclick = () => {
  endTest("Тест завершён");
};

document.getElementById("testTime").onchange = event => {
  if (!testActive) {
    timeLeft = Number(event.target.value);
    updateTimerText();
  }
};

updateStats();
updateTimerText();
