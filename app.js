/*
  WELOVELYRICS — DATOS EDITABLES
  Cada canción contiene su letra, vocabulario, preguntas y ejercicios para ordenar.
  Para agregar canciones, añade otro objeto dentro de SONGS.
*/

// ---------- 1. BIBLIOTECA MUSICAL ----------
const SONGS = [
  {
    id: "twinkle",
    title: "Twinkle, Twinkle, Little Star",
    artist: "Traditional nursery rhyme · Public domain",
    videoSrc: "media/twinkle-completa.mp4",
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
    ],
    quizQuestions: [
      {
        prompt: "Twinkle, twinkle, little _____",
        videoSrc: "media/pregunta-1.mp4",
        answer: "star",
        options: ["star", "car", "book", "tree"],
        definition: "A star is a large ball of hot gas in space that gives light."
      },
      {
        prompt: "How I _____ what you are!",
        videoSrc: "media/pregunta-2.mp4",
        answer: "wonder",
        options: ["wonder", "dance", "sleep", "open"],
        definition: "To wonder means to think about something because you want to know more."
      },
      {
        prompt: "Like a diamond in the _____.",
        videoSrc: "media/pregunta-3.mp4",
        answer: "sky",
        options: ["water", "sky", "garden", "room"],
        definition: "The sky is the space above the Earth where we see the sun, moon and stars."
      }
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
    id: "old-macdonald",
    title: "Old MacDonald Had a Farm",
    artist: "Traditional nursery rhyme · Public domain",
    videoSrc: "media/oldmacdonald-completa.mp4",
    english: [
      "Old MacDonald had a farm, E-I-E-I-O",
      "And on his farm he had a cow, E-I-E-I-O",
      "With a moo-moo here and a moo-moo there",
      "Here a moo, there a moo, everywhere a moo-moo",
      "Old MacDonald had a farm, E-I-E-I-O",
      "",
      "Old MacDonald had a farm, E-I-E-I-O",
      "And on his farm he had a chicken, E-I-E-I-O",
      "With a cluck-cluck here and a cluck-cluck there",
      "Here a cluck, there a cluck, everywhere a cluck-cluck",
      "Old MacDonald had a farm, E-I-E-I-O",
      "",
      "Old MacDonald had a farm, E-I-E-I-O",
      "And on his farm he had a sheep, E-I-E-I-O",
      "With a baa-baa here and a baa-baa there",
      "Here a baa, there a baa, everywhere a baa-baa",
      "Old MacDonald had a farm, E-I-E-I-O",
      "",
      "Old MacDonald had a farm, E-I-E-I-O",
      "And on his farm he had a pig, E-I-E-I-O",
      "With an oink-oink here and an oink-oink there",
      "Here an oink, there an oink, everywhere an oink-oink",
      "Old MacDonald had a farm, E-I-E-I-O",
      "",
      "Old MacDonald had a farm, E-I-E-I-O",
      "And on his farm he had a duck, E-I-E-I-O",
      "With a quack-quack here and a quack-quack there",
      "Here a quack, there a quack, everywhere a quack-quack",
      "Old MacDonald had a farm, E-I-E-I-O"
    ].join("\n"),
    spanish: [
      "El viejo MacDonald tenía una granja, i-ai-i-ai-ou",
      "Y en su granja tenía una vaca, i-ai-i-ai-ou",
      "Con un mu-mu aquí y un mu-mu allá",
      "Aquí un mu, allá un mu, por todas partes mu-mu",
      "El viejo MacDonald tenía una granja, i-ai-i-ai-ou",
      "",
      "El viejo MacDonald tenía una granja, i-ai-i-ai-ou",
      "Y en su granja tenía una gallina, i-ai-i-ai-ou",
      "Con un clo-clo aquí y un clo-clo allá",
      "Aquí un clo, allá un clo, por todas partes clo-clo",
      "El viejo MacDonald tenía una granja, i-ai-i-ai-ou",
      "",
      "El viejo MacDonald tenía una granja, i-ai-i-ai-ou",
      "Y en su granja tenía una oveja, i-ai-i-ai-ou",
      "Con un bee-bee aquí y un bee-bee allá",
      "Aquí un bee, allá un bee, por todas partes bee-bee",
      "El viejo MacDonald tenía una granja, i-ai-i-ai-ou",
      "",
      "El viejo MacDonald tenía una granja, i-ai-i-ai-ou",
      "Y en su granja tenía un cerdo, i-ai-i-ai-ou",
      "Con un oinc-oinc aquí y un oinc-oinc allá",
      "Aquí un oinc, allá un oinc, por todas partes oinc-oinc",
      "El viejo MacDonald tenía una granja, i-ai-i-ai-ou",
      "",
      "El viejo MacDonald tenía una granja, i-ai-i-ai-ou",
      "Y en su granja tenía un pato, i-ai-i-ai-ou",
      "Con un cuac-cuac aquí y un cuac-cuac allá",
      "Aquí un cuac, allá un cuac, por todas partes cuac-cuac",
      "El viejo MacDonald tenía una granja, i-ai-i-ai-ou"
    ].join("\n"),
    vocabulary: [
      { word: "Cow", definition: "Vaca" },
      { word: "Duck", definition: "Pato" },
      { word: "Donkey", definition: "Burro" },
      { word: "Chicken", definition: "Gallina" },
      { word: "Dog", definition: "Perro" },
      { word: "Sheep", definition: "Oveja" },
      { word: "Farm", definition: "Granja" },
      { word: "Animal sounds", definition: "Sonidos de animales" }
    ],
    quizQuestions: [
      {
        prompt: "Old MacDonald had a _____",
        videoSrc: "media/oldmacdonald-p1.mp4",
        answer: "farm",
        options: ["farm", "house", "school", "garden"],
        definition: "An area of land where crops are grown or animals are raised."
      },
      {
        prompt: "And on that farm he had some _____",
        videoSrc: "media/oldmacdonald-p2.mp4",
        answer: "chickens",
        options: ["chickens", "dogs", "horses", "ducks"],
        definition: "Birds that are commonly raised on farms for their eggs."
      },
      {
        prompt: "And on that farm he had a _____",
        videoSrc: "media/oldmacdonald-p3.mp4",
        answer: "sheep",
        options: ["sheep", "cow", "pig", "duck"],
        definition: "A farm animal that produces wool."
      }
    ],
    orderExercises: [
      {
        label: "A",
        sentence: "Old MacDonald had a farm",
        videoSrc: "media/oldmacdonald-nubes.mp3",
        instruction: "Ordena las palabras para formar la oración."
      }
    ]
  },
  {
    id: "i-like-to-draw",
    title: "I Like to Draw",
    artist: "Canción educativa · Shapes and colors",
    videoSrc: "media/draw-completa.mp4",
    english: [
      "I like to draw.",
      "Let's draw with red.",
      "Come draw with me.",
      "Let's draw a square.",
      "A red square!",
      "",
      "I like to draw.",
      "Let's draw with green.",
      "Come draw with me.",
      "Let's draw a triangle.",
      "A green triangle!",
      "",
      "I like to draw.",
      "Let's draw with blue.",
      "Come draw with me.",
      "Let's draw a circle.",
      "A blue circle!",
      "",
      "I like to draw.",
      "Let's draw with yellow.",
      "Come draw with me.",
      "Let's draw a rectangle.",
      "A yellow rectangle!",
      "",
      "I like to draw.",
      "Let's draw with pink.",
      "Come draw with me.",
      "Let's draw a heart.",
      "A pink heart!"
    ].join("\n"),
    spanish: [
      "Me gusta dibujar.",
      "Vamos a dibujar con rojo.",
      "Ven a dibujar conmigo.",
      "Vamos a dibujar un cuadrado.",
      "¡Un cuadrado rojo!",
      "",
      "Me gusta dibujar.",
      "Vamos a dibujar con verde.",
      "Ven a dibujar conmigo.",
      "Vamos a dibujar un triángulo.",
      "¡Un triángulo verde!",
      "",
      "Me gusta dibujar.",
      "Vamos a dibujar con azul.",
      "Ven a dibujar conmigo.",
      "Vamos a dibujar un círculo.",
      "¡Un círculo azul!",
      "",
      "Me gusta dibujar.",
      "Vamos a dibujar con amarillo.",
      "Ven a dibujar conmigo.",
      "Vamos a dibujar un rectángulo.",
      "¡Un rectángulo amarillo!",
      "",
      "Me gusta dibujar.",
      "Vamos a dibujar con rosado.",
      "Ven a dibujar conmigo.",
      "Vamos a dibujar un corazón.",
      "¡Un corazón rosado!"
    ].join("\n"),
    vocabulary: [
      { word: "Red", definition: "Rojo" },
      { word: "Green", definition: "Verde" },
      { word: "Blue", definition: "Azul" },
      { word: "Yellow", definition: "Amarillo" },
      { word: "Pink", definition: "Rosa" },
      { word: "Square", definition: "Cuadrado" },
      { word: "Triangle", definition: "Triángulo" },
      { word: "Circle", definition: "Círculo" },
      { word: "Rectangle", definition: "Rectángulo" },
      { word: "Heart", definition: "Corazón" }
    ],
    quizQuestions: [
      {
        prompt: "Let's draw a _____",
        videoSrc: "media/draw-p1.mp4",
        answer: "square",
        options: ["square", "circle", "triangle", "heart"],
        definition: "A shape with four equal sides and four corners."
      },
      {
        prompt: "Let's draw a _____",
        videoSrc: "media/draw-p2.mp4",
        answer: "triangle",
        options: ["circle", "rectangle", "triangle", "square"],
        definition: "A shape with three sides and three corners."
      },
      {
        prompt: "A blue _____",
        videoSrc: "media/draw-p3.mp4",
        answer: "circle",
        options: ["square", "circle", "heart", "triangle"],
        definition: "A round shape with no corners."
      }
    ],
    orderExercises: [
      {
        label: "A",
        sentence: "A blue circle",
        videoSrc: "media/draw-nubes.mp3",
        instruction: "Ordena las palabras para formar la oración."
      }
    ]
  },

];

// ---------- 2. ACTIVIDAD DE RELLENAR ESPACIOS ----------
// Las preguntas pertenecen a cada canción mediante song.quizQuestions.

// ---------- 3. ACTIVIDAD DE ORDENAR VERSOS ----------
// Cada canción tiene sus propios orderExercises.

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
      questionIndex = 0;
      points = 0;
      renderLibrary();
      renderQuestion();
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

function getCurrentQuizQuestions() {
  const song = SONGS.find(item => item.id === currentSongId) || SONGS[0];
  return Array.isArray(song.quizQuestions) ? song.quizQuestions : [];
}

function renderQuestion() {
  const questions = getCurrentQuizQuestions();

  if (!questions.length) {
    setupQuestionVideo("");
    $("#questionCounter").textContent = "SIN PREGUNTAS";
    $("#questionPrompt").textContent = "Esta canción todavía no tiene preguntas.";
    $("#lyricPrompt").textContent = "";
    $("#answerOptions").innerHTML = "";
    $("#answerFeedback").textContent = "Agrega quizQuestions dentro de esta canción en app.js.";
    $("#answerFeedback").className = "feedback";
    $("#nextQuestion").disabled = true;
    $("#nextQuestion").textContent = "Actividad no disponible";
    $("#quizProgress").style.width = "0%";
    $("#progressText").textContent = "No hay preguntas para esta canción.";
    $("#pointsNumber").textContent = points;
    return;
  }

  if (questionIndex >= questions.length) questionIndex = 0;
  const question = questions[questionIndex];
  setupQuestionVideo(question.videoSrc || "");
  answeredCurrent = false;

  $("#questionCounter").textContent = `PREGUNTA ${questionIndex + 1} / ${questions.length}`;
  $("#questionPrompt").textContent = "¿Qué palabra falta en el fragmento?";
  $("#lyricPrompt").textContent = question.prompt;
  $("#answerFeedback").textContent = "";
  $("#answerFeedback").className = "feedback";
  $("#nextQuestion").disabled = true;
  $("#nextQuestion").textContent = questionIndex === questions.length - 1 ? "Ver resultado ✓" : "Siguiente pregunta →";
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
  const questions = getCurrentQuizQuestions();
  const question = questions[questionIndex];
  if (!question) return;

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
  const questions = getCurrentQuizQuestions();
  $("#pointsNumber").textContent = points;
  if (!questions.length) return;
  $("#quizProgress").style.width = `${(questionIndex + (answeredCurrent ? 1 : 0)) / questions.length * 100}%`;
  $("#progressText").textContent = `${questionIndex + (answeredCurrent ? 1 : 0)} de ${questions.length} preguntas completadas.`;
}

function nextQuestion() {
  if (!answeredCurrent) return;
  const questions = getCurrentQuizQuestions();
  if (questionIndex < questions.length - 1) {
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
