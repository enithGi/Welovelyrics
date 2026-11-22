/*
  WELOVELYRICS — DATOS EDITABLES
  1) Canciones y glosario: edita SONGS.
  2) Preguntas: edita QUIZ_QUESTIONS (3 preguntas de ejemplo).
  3) Archivos propios: coloca tus archivos en /media y cambia VIDEO_SRC / AUDIO_SRC.
  No necesitas API ni servicios externos.
*/

// ---------- 1. BIBLIOTECA MUSICAL ----------
const SONGS = [
  {
    id: "twinkle",
    title: "Twinkle, Twinkle, Little Star",
    artist: "Traditional nursery rhyme · Public domain",
    english: [
      "Twinkle, twinkle, little star,",
      "How I wonder what you are!",
      "Up above the world so high,",
      "Like a diamond in the sky."
    ].join("\\n"),
    spanish: [
      "Brilla, brilla, pequeña estrella,",
      "¡Cuánto me pregunto qué eres!",
      "Allá arriba, tan alto en el cielo,",
      "Como un diamante en el firmamento."
    ].join("\\n"),
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
    english: "You bring a little light\\nYou make the day feel bright\\nWe sing and learn together\\nAnd make our dreams take flight.",
    spanish: "Traes un poquito de luz\\nHaces que el día brille\\nCantamos y aprendemos juntos\\nY hacemos volar nuestros sueños.",
    vocabulary: [
      { word: "bring", definition: "To take or carry something to a person or place." },
      { word: "bright", definition: "Full of light; easy to see." },
      { word: "together", definition: "With or near another person or people." }
    ]
  }
];

// ---------- 2. ACTIVIDAD DE RELLENAR ESPACIOS ----------
// Pon los videos en la carpeta media y escribe aquí la ruta, por ejemplo:
// const VIDEO_SRC = "media/mi-cancion.mp4";
const VIDEO_SRC = ""; // Vacío = muestra el espacio de video sin archivo.

const QUIZ_QUESTIONS = [
  {
    prompt: "Twinkle, twinkle, little _____",
    answer: "star",
    options: ["star", "car", "book", "tree"],
    definition: "A star is a large ball of hot gas in space that gives light."
  },
  {
    prompt: "How I _____ what you are!",
    answer: "wonder",
    options: ["wonder", "dance", "sleep", "open"],
    definition: "To wonder means to think about something because you want to know more."
  },
  {
    prompt: "Like a diamond in the _____.",
    answer: "sky",
    options: ["water", "sky", "garden", "room"],
    definition: "The sky is the space above the Earth where we see the sun, moon and stars."
  }
];

// ---------- 3. ACTIVIDAD DE ORDENAR VERSOS ----------
// Pon tu audio en media y cambia la ruta, por ejemplo:
// const AUDIO_SRC = "media/mi-fragmento.mp3";
const AUDIO_SRC = ""; // Vacío = el reproductor queda preparado, sin audio cargado.

const ORDER_EXERCISE = {
  words: ["little", "star", "Twinkle", "twinkle"],
  correct: ["Twinkle", "twinkle", "little", "star"],
  // Ejemplo de verso de dominio público. Puedes cambiarlo por una frase propia.
  instruction: "Ordena las palabras para formar el verso."
};

// ---------- LÓGICA DE LA APLICACIÓN ----------
const $ = (selector) => document.querySelector(selector);
let currentSongId = SONGS[0].id;
let questionIndex = 0;
let points = 0;
let answeredCurrent = false;
let bankWords = [];
let answerWords = [];
let draggedWordId = null;

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
  renderSongList();
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[char]);
}

function setupVideo() {
  const video = $("#songVideo");
  if (VIDEO_SRC.trim()) {
    video.src = VIDEO_SRC;
    $("#videoPlaceholder").hidden = true;
    video.style.display = "block";
  } else {
    video.removeAttribute("src");
    video.load();
    video.style.display = "none";
    $("#videoPlaceholder").hidden = false;
  }
}

function renderQuestion() {
  const question = QUIZ_QUESTIONS[questionIndex];
  answeredCurrent = false;
  $("#questionCounter").textContent = `PREGUNTA ${questionIndex + 1} / ${QUIZ_QUESTIONS.length}`;
  $("#questionPrompt").textContent = "¿Qué palabra falta en el fragmento?";
  $("#lyricPrompt").innerHTML = `${escapeHTML(question.prompt.slice(0, question.prompt.lastIndexOf(" "))) } <b>_____</b>`;
  $("#answerFeedback").textContent = "";
  $("#answerFeedback").className = "feedback";
  $("#nextQuestion").disabled = true;
  $("#nextQuestion").textContent = questionIndex === QUIZ_QUESTIONS.length - 1 ? "Ver resultado ✓" : "Siguiente pregunta →";
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

function setupOrderExercise() {
  const audio = $("#verseAudio");
  if (AUDIO_SRC.trim()) {
    audio.src = AUDIO_SRC;
  } else {
    audio.removeAttribute("src");
    audio.load();
  }
  bankWords = ORDER_EXERCISE.words.map((word, index) => ({ id: `w${index}`, word }));
  answerWords = [];
  renderWordAreas();
}

function createWordButton(item, location) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "cloud-word";
  button.draggable = true;
  button.dataset.wordId = item.id;
  const span = document.createElement("span");
  span.textContent = item.word;
  button.appendChild(span);
  button.addEventListener("click", () => moveWord(item.id, location));
  button.addEventListener("dragstart", event => {
    draggedWordId = item.id;
    event.dataTransfer.setData("text/plain", item.id);
    event.dataTransfer.effectAllowed = "move";
  });
  return button;
}

function renderWordAreas() {
  const bank = $("#wordBank");
  const zone = $("#answerZone");
  bank.innerHTML = "";
  zone.innerHTML = "";
  bankWords.forEach(item => bank.appendChild(createWordButton(item, "bank")));
  answerWords.forEach(item => zone.appendChild(createWordButton(item, "answer")));
  if (answerWords.length === 0) {
    const hint = document.createElement("span");
    hint.className = "drop-hint";
    hint.textContent = "Toca o arrastra las palabras aquí…";
    zone.appendChild(hint);
  }
  $("#wordCount").textContent = `${answerWords.length} palabra${answerWords.length === 1 ? "" : "s"}`;
}

function moveWord(id, from) {
  const source = from === "bank" ? bankWords : answerWords;
  const destination = from === "bank" ? answerWords : bankWords;
  const index = source.findIndex(item => item.id === id);
  if (index < 0) return;
  destination.push(source.splice(index, 1)[0]);
  renderWordAreas();
}

function enableDropZone(zone, destination) {
  zone.addEventListener("dragover", event => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  });
  zone.addEventListener("drop", event => {
    event.preventDefault();
    const id = event.dataTransfer.getData("text/plain") || draggedWordId;
    if (!id) return;
    const source = destination === "answer" ? bankWords : answerWords;
    const target = destination === "answer" ? answerWords : bankWords;
    const index = source.findIndex(item => item.id === id);
    if (index >= 0) {
      target.push(source.splice(index, 1)[0]);
      renderWordAreas();
    }
    draggedWordId = null;
  });
}

function checkOrder() {
  const feedback = $("#orderFeedback");
  const attempt = answerWords.map(item => item.word);
  if (attempt.length !== ORDER_EXERCISE.correct.length) {
    feedback.textContent = "Primero coloca todas las palabras en tu oración.";
    feedback.className = "feedback error";
    return;
  }
  if (attempt.every((word, index) => word === ORDER_EXERCISE.correct[index])) {
    feedback.textContent = "¡Perfecto! 🎉 Has ordenado el verso correctamente.";
    feedback.className = "feedback";
  } else {
    feedback.textContent = "Aún no está en el orden correcto. ¡Prueba otra vez!";
    feedback.className = "feedback error";
  }
}

function clearOrder() {
  bankWords = answerWords.concat(bankWords);
  answerWords = [];
  renderWordAreas();
  $("#orderFeedback").textContent = "";
  $("#orderFeedback").className = "feedback";
}

function initMenu() {
  const toggle = $("#menuToggle");
  const nav = $("#mainNav");
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.textContent = isOpen ? "×" : "☰";
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.textContent = "☰";
  }));
}

document.addEventListener("DOMContentLoaded", () => {
  $("#currentYear").textContent = new Date().getFullYear();
  renderLibrary();
  setupVideo();
  renderQuestion();
  setupOrderExercise();
  enableDropZone($("#answerZone"), "answer");
  enableDropZone($("#wordBank"), "bank");
  $("#nextQuestion").addEventListener("click", nextQuestion);
  $("#restartQuiz").addEventListener("click", restartQuiz);
  $("#checkOrder").addEventListener("click", checkOrder);
  $("#clearOrder").addEventListener("click", clearOrder);
  initMenu();
});
