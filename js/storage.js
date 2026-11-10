// storage.js
// Este archivo gestiona el almacenamiento de los datos.
// Los datos se guardan en el navegador mediante localStorage.

const STORAGE_KEY = "mon-francais-v2";

// Recupera los datos guardados al abrir la academia.
export function loadState(defaultWords) {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (saved && typeof saved === "object") {
      return {
        ...saved,
        words: Array.isArray(saved.words) ? saved.words : defaultWords
      };
    }
  } catch (error) {
    console.warn("No se pudo leer el progreso guardado:", error);
  }

  // Si no hay datos anteriores, empieza con los datos iniciales.
  return {
    words: defaultWords,
    errors: [],
    points: 0,
    streak: 0,
    lastStudy: null,
    theme: "light",
    orderIndex: 0
  };
}

// Guarda el estado completo de la academia.
export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error("No se pudo guardar el progreso:", error);
  }
}

// Genera un archivo JSON descargable con todos los datos.
export function exportState(state) {
  const backup = {
    app: "Mon Français",
    version: 2,
    exportedAt: new Date().toISOString(),
    state
  };

  const blob = new Blob(
    [JSON.stringify(backup, null, 2)],
    { type: "application/json" }
  );

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `mon-francais-backup-${new Date().toISOString().slice(0, 10)}.json`;

  link.click();
  URL.revokeObjectURL(url);
}

// Lee y valida una copia JSON seleccionada por el usuario.
export async function importState(file) {
  const parsed = JSON.parse(await file.text());
  const imported = parsed.state || parsed;

  if (
    !imported ||
    !Array.isArray(imported.words) ||
    !Array.isArray(imported.errors)
  ) {
    throw new Error(
      "El JSON no tiene el formato de una copia de Mon Français."
    );
  }

  return imported;
}