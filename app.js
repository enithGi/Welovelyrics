/*
  WELOVELYRICS — DATOS EDITABLES
  1) Canciones y glosario: edita SONGS.
  2) Preguntas: edita QUIZ_QUESTIONS (3 preguntas de ejemplo).
  3) Videos propios: coloca tus archivos MP4 en /media y cambia las rutas videoSrc / ORDER_VIDEO_SRC.
  No necesitas API ni servicios externos.
*/

// ---------- 1. BIBLIOTECA MUSICAL ----------
const SONGS = [
  {
    id: "twinkle",
    title: "Twinkle, Twinkle, Little Star",
    artist: "Traditional nursery rhyme · Public domain",
    videoSrc: "media/twinkle-completa.mp4", // Video musical completo que acompaña la letra.
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
    ],
    orderExercises: [
      {
        label: "A",
        sentence: "Twinkle twinkle little star",
        videoSrc: "media/twinkle-ordenar.mp4",
        instruction: "Ordena las palabras para formar el verso."
      }
    ]
  },
  {
    id: "sample",
    title: "My Little Sunshine",
    artist: "Texto de ejemplo original · Puedes reemplazarlo",
    videoSrc: "", // Ejemplo: "media/my-little-sunshine.mp4"
    english: "You bring a little light\\nYou make the day feel bright\\nWe sing and learn together\\nAnd make our dreams take flight.",
    spanish: "Traes un poquito de luz\\nHaces que el día brille\\nCantamos y aprendemos juntos\\nY hacemos volar nuestros sueños.",
    vocabulary: [
      { word: "bring", definition: "To take or carry something to a person or place." },
      { word: "bright", definition: "Full of light; easy to see." },
      { word: "together", definition: "With or near another person or people." }
    ],
    // Ejemplo: esta canción tiene tres incisos. Puedes agregar o quitar objetos.
    orderExercises: [
      { label: "A", sentence: "You bring a little light", videoSrc: "media/sol-inciso-a.mp4" },
      { label: "B", sentence: "You make the day feel bright", videoSrc: "media/sol-inciso-b.mp4" },
      { label: "C", sentence: "We sing and learn together", videoSrc: "media/sol-inciso-c.mp4" }
    ]
  }
];

// ---------- 2. ACTIVIDAD DE RELLENAR ESPACIOS ----------
// Cada pregunta tiene su propio videoSrc. Coloca los tres videos en media.

const QUIZ_QUESTIONS = [
  {
    prompt: "Twinkle, twinkle, little _____",
    videoSrc: "media/pregunta-1.mp4", // Video exclusivo de la pregunta 1.
    answer: "star",
    options: ["star", "car", "book", "tree"],
    definition: "A star is a large ball of hot gas in space that gives light."
  },
  {
    prompt: "How I _____ what you are!",
    videoSrc: "media/pregunta-2.mp4", // Video exclusivo de la pregunta 2.
    answer: "wonder",
    options: ["wonder", "dance", "sleep", "open"],
    definition: "To wonder means to think about something because you want to know more."
  },
  {
    prompt: "Like a diamond in the _____.",
    videoSrc: "media/pregunta-3.mp4", // Video exclusivo de la pregunta 3.
    answer: "sky",
    options: ["water", "sky", "garden", "room"],
    definition: "The sky is the space above the Earth where we see the sun, moon and stars."
  }
];

// ---------- 3. ACTIVIDAD DE ORDENAR VERSOS CON VIDEO ----------
// Cada canción define sus propios orderExercises dentro de SONGS.
// Cada inciso puede tener: label, sentence, videoSrc e instruction.

// ---------- LÓGICA DE LA APLICACIÓN ----------
const $ = (selector) => document.querySelector(selector);
let currentSongId = SONGS[0].id;
let questionIndex = 0;
let points = 0;
let answeredCurrent = false;
let bankWords = [];
let answerWords = [];
let draggedWordId = null;
let orderExerciseIndex = 0;
let orderExerciseCompleted = false;

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
      setupOrderExercise();
    });
  });
}

function renderLibrary() {
  const song = SONGS.find(item => item.id === currentSongId) || SONGS[0];
  $("#songTitle").textContent = song.title;
  $("#songArtist").textContent = song.artist;
  $("#englishLyrics").textContent = song.english;
  $("#spanishLyrics").textContent = song.spanish;

  const libraryVideo = $("#librarySongVideo");
  const libraryVideoPlaceholder = $("#libraryVideoPlaceholder");
  libraryVideo.pause();
  if (song.videoSrc && song.videoSrc.trim()) {
    libraryVideo.src = song.videoSrc;
    libraryVideo.hidden = false;
    libraryVideoPlaceholder.hidden = true;
    libraryVideo.load();
  } else {
    libraryVideo.pause();
    libraryVideo.removeAttribute("src");
    libraryVideo.load();
    libraryVideo.hidden = true;
    libraryVideoPlaceholder.hidden = false;
  }
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

function setupQuestionVideo(source) {
  const video = $("#songVideo");
  const placeholder = $("#videoPlaceholder");
  video.pause();
  if (source && source.trim()) {
    video.src = source;
    video.style.display = "block";
    placeholder.hidden = true;
    video.load();
  } else {
    video.removeAttribute("src");
    video.load();
    video.style.display = "none";
    placeholder.hidden = false;
  }
}

function renderQuestion() {
  const question = QUIZ_QUESTIONS[questionIndex];
  setupQuestionVideo(question.videoSrc || "");
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

function getCurrentOrderExercises() {
  const song = SONGS.find(item => item.id === currentSongId) || SONGS[0];
  return Array.isArray(song.orderExercises) ? song.orderExercises : [];
}

function setupOrderExercise() {
  const exercises = getCurrentOrderExercises();
  orderExerciseIndex = 0;
  orderExerciseCompleted = false;
  if (!exercises.length) {
    const video = $("#verseVideo");
    video.pause();
    video.removeAttribute("src");
    video.load();
    video.style.display = "none";
    $("#orderVideoPlaceholder").hidden = false;
    $("#orderVideoPlaceholder").querySelector("strong").textContent = "No hay incisos configurados";
    $("#orderVideoPlaceholder").querySelector("small").textContent = "Agrega orderExercises a esta canción en app.js";
    $("#orderIncisoCounter").textContent = "SIN INCISOS";
    $("#orderInstruction").textContent = "Esta canción todavía no tiene ejercicios para ordenar.";
    bankWords = [];
    answerWords = [];
    renderWordAreas();
    $("#checkOrder").disabled = true;
    $("#nextOrderExercise").hidden = true;
    $("#orderFeedback").textContent = "";
    return;
  }
  $("#checkOrder").disabled = false;
  renderOrderExercise();
}

function renderOrderExercise() {
  const exercises = getCurrentOrderExercises();
  const exercise = exercises[orderExerciseIndex];
  if (!exercise) return;
  const video = $("#verseVideo");
  video.pause();
  if (exercise.videoSrc && exercise.videoSrc.trim()) {
    video.src = exercise.videoSrc;
    video.style.display = "block";
    $("#orderVideoPlaceholder").hidden = true;
    video.load();
  } else {
    video.removeAttribute("src");
    video.load();
    video.style.display = "none";
    $("#orderVideoPlaceholder").hidden = false;
    $("#orderVideoPlaceholder").querySelector("strong").textContent = "Your video goes here";
    $("#orderVideoPlaceholder").querySelector("small").textContent = "Agrega un video para este inciso en app.js";
  }
  $("#orderIncisoCounter").textContent = `INCISO ${exercise.label || String.fromCharCode(65 + orderExerciseIndex)} / ${exercises.length}`;
  $("#orderInstruction").textContent = exercise.instruction || "Toca una nube para añadirla a tu frase. Toca una palabra de tu respuesta para devolverla.";
  const words = exercise.sentence.trim().split(/\s+/);
  bankWords = words.map((word, index) => ({ id: `w${index}`, word }));
  // Mezcla las palabras para que el estudiante tenga que ordenarlas.
  for (let i = bankWords.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [bankWords[i], bankWords[j]] = [bankWords[j], bankWords[i]];
  }
  answerWords = [];
  orderExerciseCompleted = false;
  $("#orderFeedback").textContent = "";
  $("#orderFeedback").className = "feedback";
  $("#checkOrder").disabled = false;
  $("#nextOrderExercise").hidden = true;
  renderWordAreas();
}

function nextOrderExercise() {
  const exercises = getCurrentOrderExercises();
  if (!orderExerciseCompleted) return;
  if (orderExerciseIndex < exercises.length - 1) {
    orderExerciseIndex++;
    renderOrderExercise();
  } else {
    $("#orderFeedback").textContent = "¡Terminaste todos los incisos de esta canción! 🎉";
    $("#orderFeedback").className = "feedback";
    $("#nextOrderExercise").hidden = true;
    $("#nextOrderExercise").textContent = "Actividad completada ✓";
  }
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
  const exercises = getCurrentOrderExercises();
  const exercise = exercises[orderExerciseIndex];
  if (!exercise) return;
  const correct = exercise.sentence.trim().split(/\s+/);
  const attempt = answerWords.map(item => item.word);
  if (attempt.length !== correct.length) {
    feedback.textContent = "Primero coloca todas las palabras en tu oración.";
    feedback.className = "feedback error";
    return;
  }
  if (attempt.every((word, index) => word === correct[index])) {
    orderExerciseCompleted = true;
    feedback.textContent = "¡Perfecto! 🎉 Has ordenado el inciso correctamente.";
    feedback.className = "feedback";
    $("#checkOrder").disabled = true;
    $("#nextOrderExercise").hidden = false;
    $("#nextOrderExercise").textContent = orderExerciseIndex === exercises.length - 1 ? "Finalizar actividad ✓" : "Siguiente inciso →";
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
  renderQuestion();
  setupOrderExercise();
  enableDropZone($("#answerZone"), "answer");
  enableDropZone($("#wordBank"), "bank");
  $("#nextQuestion").addEventListener("click", nextQuestion);
  $("#restartQuiz").addEventListener("click", restartQuiz);
  $("#checkOrder").addEventListener("click", checkOrder);
  $("#clearOrder").addEventListener("click", clearOrder);
  $("#nextOrderExercise").addEventListener("click", nextOrderExercise);
  initMenu();
});
