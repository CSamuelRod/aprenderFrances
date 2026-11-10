import { LEVELS, LEVEL_ORDER } from "./data.js";
import { loadState, saveState, exportState, importState } from "./storage.js";
import { isDue, reviewCard } from "./cards.js";

let state = loadState();
let currentExercise = 0;
let chosenWords = [];
let currentCard = null;
let cardRevealed = false;

const $ = (selector) => document.querySelector(selector);

function persist() {
  saveState(state);
  renderStats();
  renderLevels();
}

function getLevel() {
  return LEVELS[state.selectedLevel] || LEVELS.A1;
}

function getWords() {
  const builtIn = getLevel().words.map(([fr, es]) => ({
    fr, es, custom: false
  }));

  const custom = state.customWords
    .filter(word => word.level === state.selectedLevel)
    .map(word => ({ ...word, custom: true }));

  return [...builtIn, ...custom];
}

function levelProgress(levelId) {
  const lessons = LEVELS[levelId].lessons;
  const completed = lessons.filter(
    lesson => state.completed.includes(lesson.id)
  ).length;

  return {
    completed,
    total: lessons.length,
    percent: Math.round((completed / lessons.length) * 100)
  };
}

function renderStats() {
  $("#points").textContent = state.points;
  $("#streak").textContent = state.streak;
  $("#completedCount").textContent = state.completed.length;

  const due = getWords().filter(word =>
    isDue(state, state.selectedLevel, word.fr)
  ).length;

  $("#dueCount").textContent = due;
}

function renderLevels() {
  $("#levelGrid").innerHTML = LEVEL_ORDER.map(id => {
    const level = LEVELS[id];
    const progress = levelProgress(id);
    const selected = state.selectedLevel === id;

    return `
      <button class="level-card ${selected ? "selected" : ""}"
        style="--level-color:${level.color}" data-level="${id}">
        <h3>${id}</h3>
        <strong>${level.name}</strong>
        <p>${level.description}</p>
        <div class="level-progress">
          <span style="width:${progress.percent}%"></span>
        </div>
        <div class="level-meta">
          <span>${progress.completed}/${progress.total} lecciones</span>
          <strong>${progress.percent}%</strong>
        </div>
        <small>${selected ? "✓ Nivel seleccionado" : "Elegir nivel"}</small>
      </button>
    `;
  }).join("");

  $("#levelSummary").textContent = `Nivel seleccionado: ${state.selectedLevel}`;
  $("#homeLevelTitle").textContent = `Nivel ${state.selectedLevel} · ${getLevel().name}`;

  document.querySelectorAll("[data-level]").forEach(button => {
    button.addEventListener("click", () => {
      state.selectedLevel = button.dataset.level;
      currentExercise = 0;
      chosenWords = [];
      currentCard = null;
      cardRevealed = false;
      persist();
      renderAll();
    });
  });
}

function updateStreak() {
  const today = new Date().toISOString().slice(0, 10);

  if (state.lastStudy === today) return;

  const yesterday = new Date(Date.now() - 86400000)
    .toISOString().slice(0, 10);

  state.streak = state.lastStudy === yesterday
    ? state.streak + 1
    : 1;

  state.lastStudy = today;
}

function markLesson(id) {
  if (state.completed.includes(id)) return;

  state.completed.push(id);
  state.points += 20;
  updateStreak();
  persist();
  renderAll();
}

function renderHome() {
  const level = getLevel();
  const progress = levelProgress(state.selectedLevel);

  const next = level.lessons.find(
    lesson => !state.completed.includes(lesson.id)
  );

  $("#homeContent").innerHTML = `
    <div class="home-card">
      <h3>Tu progreso en ${state.selectedLevel}</h3>
      <p>${progress.completed} de ${progress.total} lecciones completadas</p>
      <div class="level-progress">
        <span style="width:${progress.percent}%;background:${level.color}"></span>
      </div>
      <p><strong>${progress.percent}%</strong> del nivel completado</p>
    </div>

    <div class="home-card">
      <h3>${next ? "Continúa por aquí" : "¡Nivel completado! 🎉"}</h3>
      <p>${next ? next.title : "Has terminado todas las lecciones de este nivel."}</p>
      ${next ? `<button class="primary-btn" id="continueBtn">Continuar aprendiendo</button>` : ""}
    </div>

    <div class="home-card">
      <h3>Verbos importantes de ${state.selectedLevel}</h3>
      <p>${level.verbs.join(" · ")}</p>
    </div>

    <div class="home-card">
      <h3>Consejo del día 💡</h3>
      <p>Intenta aprender entre 5 y 10 palabras nuevas al día y repasa las anteriores. La constancia es más importante que estudiar muchas horas de golpe.</p>
    </div>
  `;

  $("#continueBtn")?.addEventListener("click", () => {
    showPage("lessons");
  });
}

function renderLessons() {
  const lessons = getLevel().lessons;

  $("#lessonsContent").innerHTML = lessons.map(lesson => {
    const done = state.completed.includes(lesson.id);

    return `
      <article class="lesson-card">
        <small>${lesson.topic}</small>
        <h3>${lesson.title}</h3>
        <p>${lesson.explanation}</p>
        <div class="lesson-example">
          <strong>Regla:</strong>
          ${lesson.rule}
        </div>
        <div class="lesson-example">
          <strong>Ejemplos:</strong>
          ${lesson.example.replace(/\n/g, "<br>")}
        </div>
        <p><strong>Practica:</strong> ${lesson.task}</p>
        <button class="${done ? "secondary-btn" : "primary-btn"}"
          data-complete="${lesson.id}" ${done ? "disabled" : ""}>
          ${done ? "✓ Lección completada" : "Marcar como completada (+20 puntos)"}
        </button>
      </article>
    `;
  }).join("");

  document.querySelectorAll("[data-complete]").forEach(button => {
    button.addEventListener("click", () => markLesson(button.dataset.complete));
  });
}

function renderVocabulary() {
  const search = ($("#searchWord").value || "").toLowerCase();

  const words = getWords().filter(word =>
    word.fr.toLowerCase().includes(search) ||
    word.es.toLowerCase().includes(search)
  );

  $("#vocabularyContent").innerHTML = `
    <div class="word-grid">
      ${words.map(word => `
        <article class="word-card">
          <strong>${escapeHTML(word.fr)}</strong>
          <span>${escapeHTML(word.es)}</span>
          <small>${word.custom ? "Mi palabra" : state.selectedLevel}</small>
        </article>
      `).join("")}
    </div>
    ${words.length ? "" : "<p>No se han encontrado palabras.</p>"}
  `;
}

function renderCards() {
  const words = getWords();
  const due = words.filter(word =>
    isDue(state, state.selectedLevel, word.fr)
  );

  if (!currentCard || !due.some(w => w.fr === currentCard.fr)) {
    currentCard = due[0] || null;
    cardRevealed = false;
  }

  if (!currentCard) {
    $("#cardsContent").innerHTML = `
      <div class="exercise-card">
        <h3>¡Todo repasado! 🎉</h3>
        <p>No tienes tarjetas pendientes de este nivel.</p>
        <p>Vuelve mañana para seguir practicando.</p>
      </div>
    `;
    return;
  }

  $("#cardsContent").innerHTML = `
    <p class="muted">Nivel ${state.selectedLevel} · ${due.length} tarjetas pendientes</p>
    <div class="flashcard">
      <div class="front">${escapeHTML(currentCard.fr)}</div>
      ${cardRevealed ? `<div class="back">${escapeHTML(currentCard.es)}</div>` : ""}
    </div>
    <div class="flash-actions">
      ${!cardRevealed
        ? `<button class="primary-btn" id="revealCard">Mostrar traducción</button>`
        : `
          <button class="danger-btn" data-review="again">Otra vez</button>
          <button class="secondary-btn" data-review="hard">Difícil</button>
          <button class="primary-btn" data-review="good">Bien</button>
          <button class="primary-btn" data-review="easy">Fácil</button>
        `
      }
    </div>
  `;

  $("#revealCard")?.addEventListener("click", () => {
    cardRevealed = true;
    renderCards();
  });

  document.querySelectorAll("[data-review]").forEach(button => {
    button.addEventListener("click", () => {
      reviewCard(state, state.selectedLevel, currentCard.fr, button.dataset.review);
      state.points += button.dataset.review === "again" ? 0 : 2;
      updateStreak();
      currentCard = null;
      cardRevealed = false;
      persist();
      renderCards();
    });
  });
}

function renderOrdering() {
  const exercises = getLevel().exercises;
  const target = exercises[currentExercise % exercises.length];

  $("#orderingContent").innerHTML = `
    <div class="exercise-card">
      <p class="muted">Ejercicio ${(currentExercise % exercises.length) + 1} de ${exercises.length}</p>
      <h3>Ordena las palabras para formar una frase</h3>
      <div id="answerBank" class="answer-bank"></div>
      <div id="wordBank" class="word-bank"></div>
      <p id="orderingFeedback" class="feedback"></p>
      <button class="secondary-btn" id="resetOrder">Reiniciar</button>
      <button class="primary-btn" id="checkOrder">Comprobar</button>
    </div>
  `;

  let selected = [];

  function draw() {
    $("#answerBank").innerHTML = selected.map((word, i) =>
      `<button class="word-chip" data-remove="${i}">${escapeHTML(word)}</button>`
    ).join("");

    $("#wordBank").innerHTML = target.map((word, i) =>
      selected.includes(i) ? "" :
      `<button class="word-chip" data-word="${i}">${escapeHTML(word)}</button>`
    ).join("");

    document.querySelectorAll("[data-word]").forEach(button => {
      button.addEventListener("click", () => {
        selected.push(Number(button.dataset.word));
        draw();
      });
    });

    document.querySelectorAll("[data-remove]").forEach(button => {
      button.addEventListener("click", () => {
        selected.splice(Number(button.dataset.remove), 1);
        draw();
      });
    });
  }

  draw();

  $("#resetOrder").addEventListener("click", () => {
    selected = [];
    $("#orderingFeedback").textContent = "";
    draw();
  });

  $("#checkOrder").addEventListener("click", () => {
    const answer = selected.map(i => target[i]).join(" ");
    const expected = target.join(" ");

    if (answer === expected) {
      $("#orderingFeedback").textContent = "¡Correcto! 🎉";
      $("#orderingFeedback").style.color = "#35b98b";
      state.points += 10;
      updateStreak();
      persist();

      $("#checkOrder").disabled = true;
      $("#checkOrder").textContent = "¡Bien hecho!";
    } else {
      $("#orderingFeedback").textContent = "No es correcto todavía. ¡Inténtalo de nuevo!";
      $("#orderingFeedback").style.color = "#e16b83";
      addError(answer, expected);
    }
  });
}

function addError(userAnswer, correctAnswer) {
  const exists = state.errors.some(error =>
    error.level === state.selectedLevel &&
    error.userAnswer === userAnswer &&
    error.correctAnswer === correctAnswer
  );

  if (!exists) {
    state.errors.unshift({
      level: state.selectedLevel,
      userAnswer,
      correctAnswer,
      date: new Date().toLocaleDateString("es-ES")
    });
    state.errors = state.errors.slice(0, 100);
    persist();
  }
}

function renderErrors() {
  if (!state.errors.length) {
    $("#errorsContent").innerHTML = `
      <div class="exercise-card">
        <h3>¡Todavía no tienes errores guardados!</h3>
        <p>Cuando te equivoques en un ejercicio, aparecerá aquí para que puedas repasarlo.</p>
      </div>
    `;
    return;
  }

  $("#errorsContent").innerHTML = state.errors.map((error, index) => `
    <article class="error-card">
      <div>
        <small>${error.level} · ${error.date}</small>
        <p>Tu respuesta: ${escapeHTML(error.userAnswer || "Sin respuesta")}</p>
        <strong>Respuesta correcta: ${escapeHTML(error.correctAnswer)}</strong>
      </div>
      <button class="danger-btn" data-delete-error="${index}">Eliminar</button>
    </article>
  `).join("");

  document.querySelectorAll("[data-delete-error]").forEach(button => {
    button.addEventListener("click", () => {
      state.errors.splice(Number(button.dataset.deleteError), 1);
      persist();
      renderErrors();
    });
  });
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

function showPage(page) {
  document.querySelectorAll(".page").forEach(element => {
    element.classList.remove("active");
  });

  document.querySelectorAll(".tab").forEach(element => {
    element.classList.toggle("active", element.dataset.page === page);
  });

  $(`#${page}Page`).classList.add("active");

  if (page === "cards") renderCards();
  if (page === "ordering") renderOrdering();
  if (page === "errors") renderErrors();
}

function renderAll() {
  renderLevels();
  renderStats();
  renderHome();
  renderLessons();
  renderVocabulary();
  renderCards();
  renderErrors();
}

document.querySelectorAll(".tab").forEach(button => {
  button.addEventListener("click", () => showPage(button.dataset.page));
});

$("#searchWord").addEventListener("input", renderVocabulary);

$("#addWordForm").addEventListener("submit", event => {
  event.preventDefault();

  const fr = $("#newFrench").value.trim();
  const es = $("#newSpanish").value.trim();

  if (!fr || !es) return;

  state.customWords.push({
    fr,
    es,
    level: state.selectedLevel
  });

  $("#newFrench").value = "";
  $("#newSpanish").value = "";

  persist();
  renderVocabulary();
});

$("#exportBtn").addEventListener("click", () => exportState(state));

$("#importInput").addEventListener("change", async event => {
  const file = event.target.files[0];
  if (!file) return;

  try {
    const imported = await importState(file);
    state = { ...state, ...imported };

    if (!LEVELS[state.selectedLevel]) state.selectedLevel = "A1";

    persist();
    renderAll();
    alert("¡Progreso importado correctamente!");
  } catch (error) {
    alert(error.message || "No se pudo importar el archivo.");
  }

  event.target.value = "";
});

$("#themeBtn").addEventListener("click", () => {
  state.dark = !state.dark;
  document.body.classList.toggle("dark", state.dark);
  $("#themeBtn").textContent = state.dark ? "☀️" : "🌙";
  persist();
});

document.body.classList.toggle("dark", Boolean(state.dark));
$("#themeBtn").textContent = state.dark ? "☀️" : "🌙";

renderAll();