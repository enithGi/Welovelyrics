/*
  WELOVELYRICS — CORREGIDO Y CONECTADO A /media
*/

// ---------- 1. BIBLIOTECA MUSICAL ----------
const SONGS = [
  {
    id: "twinkle",
    title: "Twinkle, Twinkle, Little Star",
    artist: "Traditional nursery rhyme · Public domain",
    video: "", // Si luego subes la canción completa, pon: "media/twinkle-completa.mp4"
    english: [
      "Twinkle, twinkle, little star,",
      "How I wonder what you are!",
      "Up above the world so high,",
      "Like a diamond in the sky."
    ].join("\n"),
    spanish: [
      "Brilla, brilla, pequeña estrella,",
      "¡Cuánto me pregunto qué eres!",
      "Allá arriba, tan alto en el cielo,",
      "Como un diamante en el firmamento."
    ].join("\n"),
    vocabulary: [
      { word: "twinkle", definition: "To shine with a small, quick light." },
      { word: "wonder", definition: "To think about something and want to know more." },
      { word: "above", definition: "In a higher place than something else." }
    ]
  },
  {
    id: "sample",
    title: "My Little Sunshine",
    artist: "Texto de ejemplo original · Puedes reemplazarlo",
    video: "",
    english: "You bring a little light\nYou make the day feel bright\nWe sing and learn together\nAnd make our dreams take flight.",
    spanish: "Traes un poquito de luz\nHaces que el día brille\nCantamos y aprendemos juntos\nY hacemos volar nuestros sueños.",
    vocabulary: [
      { word: "bring", definition: "To take or carry something to a person or place." },
      { word: "bright", definition: "Full of light; easy to see." },
      { word: "together", definition: "With or near another person or people." }
    ]
  }
];

// ---------- 2. ACTIVIDAD DE RELLENAR ESPACIOS (3 VIDEOS) ----------
const QUIZ_QUESTIONS = [
  {
    video: "media/twinkle-p1.mp4",
    prompt: "Twinkle, twinkle, _____ star",
    answer: "little",
    options: ["little", "big", "blue", "fast"],
    definition: "Little means small in size or amount."
  },
  {
    video: "media/twinkle-p2.mp4",
    prompt: "How I _____ what you are!",
    answer: "wonder",
    options: ["wonder", "dance", "sleep", "open"],
    definition: "To wonder means to think about something because you want to know more."
  },
  {
    video: "media/twinkle-p3.mp4",
    prompt: "Like a _____ in the sky.",
    answer: "diamond",
    options: ["diamond", "cloud", "bird", "plane"],
    definition: "A diamond is a very hard, clear, and precious stone that shines brightly."
  }
];

// ---------- 3. ACTIVIDAD DE ORDENAR VERSOS (CON VIDEO) ----------
const ORDER_EXERCISES = [
  {
    video: "media/twinkle-nubes.mp4",
    words: ["little", "star", "Twinkle", "twinkle"],
    correct: ["Twinkle", "twinkle", "little", "star"],
    instruction: "Toca o arrastra las nubes para formar el verso que escuchas en el video."
  }
];

// ---------- LÓGICA DE LA APLICACIÓN ----------
const $ = (selector) => document.querySelector(selector);
let currentSongId = SONGS[0].id;
let questionIndex = 0;
let orderIndex = 0;
let points = 0;
let answeredCurrent = false;
let bankWords = [];
let answerWords = [];
let draggedWordId = null;

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "'"
  })[char]);
}

function setupHeaderAndFooter() {
  const menuToggle = $("#menuToggle");
  const mainNav = $("#mainNav");
  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const expanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!expanded));
      mainNav.classList.toggle("open");
    });
  }
  if ($("#currentYear")) {
    $("#currentYear").textContent = new Date().getFullYear();
  }
}

function renderSongList() {
  $("#songCount").textContent = SONGS.length;
  $("#songList").innerHTML = SONGS.map(song => `
    <button class="song-choice ${song.id === currentSongId ? "active" : ""}" data-song="${escapeHTML(song.id)}">
      ${escapeHTML(song.title)}
      <small>${escapeHTML(song.artist)}</small>
    </button>`).join("");
  document.querySelectorAll(".song-choice").forEach(button => {
    button.addEventListener("click", () => {
      currentSongId = button.dataset.song;
      renderLibrary();
    });
  });
}

function renderLibrary() {
  const song = SONGS.find(item => item.id === currentSongId) || SONGS[0];
  $("#songTitle").textContent = song.title;
  $("#songArtist").textContent = song.artist;
  $("#englishLyrics").textContent = song.english;
  $("#spanishLyrics").textContent = song.spanish;
  $("#glossaryList").innerHTML = song.vocabulary.map(item => `
    <div class="glossary-item"><strong>${escapeHTML(item.word)}</strong><span>${escapeHTML(item.definition)}</span></div>
  `).join("");

  const libVideo = $("#librarySongVideo");
  const libPlaceholder = $("#libraryVideoPlaceholder");
  if (song.video && song.video.trim()) {
    libVideo.src = song.video;
    libVideo.load();
    libVideo.hidden = false;
    libVideo.style.display = "block";
    libPlaceholder.hidden = true;
  } else {
    libVideo.removeAttribute("src");
    libVideo.hidden = true;
    libVideo.style.display = "none";
    libPlaceholder.hidden = false;
  }

  renderSongList();
}

function loadQuestionVideo(videoPath) {
  const video = $("#songVideo");
  const placeholder = $("#videoPlaceholder");
  if (videoPath && videoPath.trim()) {
    video.src = videoPath;
    video.load();
    placeholder.hidden = true;
    video.style.display = "block";
  } else {
    video.removeAttribute("src");
    video.load();
    video.style.display = "none";
    placeholder.hidden = false;
  }
}

function renderQuestion() {
  const question = QUIZ_QUESTIONS[questionIndex];
  answeredCurrent = false;
  loadQuestionVideo(question.video);

  $("#questionCounter").textContent = `PREGUNTA ${questionIndex + 1} / ${QUIZ_QUESTIONS.length}`;
  $("#questionPrompt").textContent = "¿Qué palabra falta en el fragmento?";
  $("#lyricPrompt").innerHTML = escapeHTML(question.prompt).replace("_____", "<b>_____</b>");
  $("#answerFeedback").textContent = "";
  $("#answerFeedback").className = "feedback";
  $("#nextQuestion").disabled = true;
  $("#nextQuestion").innerHTML = questionIndex === QUIZ_QUESTIONS.length - 1 ? "Ver resultado ✓" : "Siguiente pregunta <span>→</span>";
  $("#answerOptions").innerHTML = question.options.map(option => `
    <button class="option-button" type="button" data-option="${escapeHTML(option)}">${escapeHTML(option)}</button>
  `).join("");
  document.querySelectorAll(".option-button").forEach(button => {
    button.addEventListener("click", () => checkAnswer(button.dataset.option, button));
  });
  updateProgress();
}

function checkAnswer(selected, button) {
  if (answeredCurrent) return;
  const question = QUIZ_QUESTIONS[questionIndex];
  if (selected === question.answer) {
    answeredCurrent = true;
    points += 10;
    button.classList.add("correct");
    $("#answerFeedback").textContent = `¡Correcto! +10 puntos. ${question.definition}`;
    $("#answerFeedback").className = "feedback";
    $("#nextQuestion").disabled = false;
    $("#rewardMessage").textContent = "🌟 ¡Excelente trabajo!";
    document.querySelectorAll(".option-button").forEach(option => option.disabled = true);
    updateProgress();
  } else {
    button.classList.add("wrong");
    button.disabled = true;
    $("#answerFeedback").textContent = "¡Casi! Inténtalo con otra opción.";
    $("#answerFeedback").className = "feedback error";
  }
}

function updateProgress() {
  $("#pointsNumber").textContent = points;
  $("#quizProgress").style.width = `${(questionIndex + (answeredCurrent ? 1 : 0)) / QUIZ_QUESTIONS.length * 100}%`;
  $("#progressText").textContent = `${questionIndex + (answeredCurrent ? 1 : 0)} de ${QUIZ_QUESTIONS.length} preguntas completadas.`;
}

function nextQuestion() {
  if (!answeredCurrent) return;
  if (questionIndex < QUIZ_QUESTIONS.length - 1) {
    questionIndex++;
    renderQuestion();
  } else {
    $("#questionPrompt").textContent = "¡Reto completado!";
    $("#lyricPrompt").innerHTML = "<b>YOU DID IT!</b>";
    $("#answerOptions").innerHTML = "";
    $("#answerFeedback").textContent = `Terminaste con ${points} puntos. ¡Sigue practicando!`;
    $("#nextQuestion").disabled = true;
    $("#nextQuestion").textContent = "Actividad completada ✓";
    $("#rewardMessage").textContent = "🏆 ¡Gran trabajo!";
    $("#quizProgress").style.width = "100%";
    $("#progressText").textContent = "¡Completaste todas las preguntas!";
  }
}

function restartQuiz() {
  questionIndex = 0;
  points = 0;
  renderQuestion();
  $("#rewardMessage").textContent = "🌟 ¡Tú puedes!";
}

function renderOrderExercise() {
  const ex = ORDER_EXERCISES[orderIndex];
  const letras = ["A", "B", "C", "D", "E"];
  $("#orderIncisoCounter").textContent = `INCISO ${letras[orderIndex] || orderIndex + 1} / ${ORDER_EXERCISES.length}`;
  $("#orderInstruction").textContent = ex.instruction;

  const verseVideo = $("#verseVideo");
  const orderPlaceholder = $("#orderVideoPlaceholder");
  if (ex.video && ex.video.trim()) {
    verseVideo.src = ex.video;
    verseVideo.load();
    verseVideo.style.display = "block";
    orderPlaceholder.hidden = true;
  } else {
    verseVideo.removeAttribute("src");
    verseVideo.style.display = "none";
    orderPlaceholder.hidden = false;
  }

  $("#nextOrderExercise").hidden = true;
  clearOrder();
}

function clearOrder() {
  const ex = ORDER_EXERCISES[orderIndex];
  bankWords = ex.words.map((text, idx) => ({ id: `w-${idx}`, text }));
  answerWords = [];
  $("#orderFeedback").textContent = "";
  $("#orderFeedback").className = "feedback";
  renderClouds();
}

function renderClouds() {
  const bankEl = $("#wordBank");
  const answerEl = $("#answerZone");

  $("#wordCount").textContent = `${answerWords.length} ${answerWords.length === 1 ? "palabra" : "palabras"}`;

  bankEl.innerHTML = bankWords.map(w => `
${escapeHTML(w.text)}
`).join("");
answerEl.innerHTML = answerWords.length
? answerWords.map(w => <button type="button" class="cloud-word word-chip placed" draggable="true" data-id="${w.id}" data-from="answer">${escapeHTML(w.text)}</button>).join("")
: <span class="drop-hint">Toca o arrastra las palabras aquí…</span>;
document.querySelectorAll(".cloud-word").forEach(btn => {
btn.addEventListener("click", () => {
const id = btn.dataset.id;
const from = btn.dataset.from;
if (from === "bank") {
const idx = bankWords.findIndex(w => w.id === id);
if (idx > -1) answerWords.push(bankWords.splice(idx, 1)[0]);
} else {
const idx = answerWords.findIndex(w => w.id === id);
if (idx > -1) bankWords.push(answerWords.splice(idx, 1)[0]);
}
renderClouds();
});
btn.addEventListener("dragstart", () => {
draggedWordId = btn.dataset.id;
});
});
[bankEl, answerEl].forEach(zone => {
zone.ondragover = (e) => e.preventDefault();
zone.ondrop = (e) => {
e.preventDefault();
if (!draggedWordId) return;
const targetIsAnswer = zone.id === "answerZone";
const inBankIdx = bankWords.findIndex(w => w.id === draggedWordId);
const inAnsIdx = answerWords.findIndex(w => w.id === draggedWordId);
if (targetIsAnswer && inBankIdx > -1) {
answerWords.push(bankWords.splice(inBankIdx, 1)[0]);
} else if (!targetIsAnswer && inAnsIdx > -1) {
bankWords.push(answerWords.splice(inAnsIdx, 1)[0]);
}
draggedWordId = null;
renderClouds();
};
});
}
function checkOrder() {
const ex = ORDER_EXERCISES[orderIndex];
const userSentence = answerWords.map(w => w.text).join(" ");
const correctSentence = ex.correct.join(" ");
if (userSentence === correctSentence) {
points += 15;
updateProgress();
$("#orderFeedback").textContent = "¡Perfecto! +15 puntos. Ordenaste el verso correctamente.";
$("#orderFeedback").className = "feedback";
if (orderIndex < ORDER_EXERCISES.length - 1) {
$("#nextOrderExercise").hidden = false;
}
} else {
$("#orderFeedback").textContent = "Aún no coincide. Mira de nuevo el video y revisa el orden.";
$("#orderFeedback").className = "feedback error";
}
}
function nextOrderExercise() {
if (orderIndex < ORDER_EXERCISES.length - 1) {
orderIndex++;
renderOrderExercise();
}
}
document.addEventListener("DOMContentLoaded", () => {
setupHeaderAndFooter();
renderLibrary();
renderQuestion();
renderOrderExercise();
$("#nextQuestion").addEventListener("click", nextQuestion);
$("#restartQuiz").addEventListener("click", restartQuiz);
$("#checkOrder").addEventListener("click", checkOrder);
$("#clearOrder").addEventListener("click", clearOrder);
$("#nextOrderExercise").addEventListener("click", nextOrderExercise);
});
