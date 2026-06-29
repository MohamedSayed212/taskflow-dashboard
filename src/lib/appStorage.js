import { createDefaultAppData } from "./defaultAppData";

const STORAGE_KEY = "taskflow-app-state";

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

export function loadAppData() {
  const defaultData = createDefaultAppData();

  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return clone(defaultData);
    }

    const parsedData = JSON.parse(saved);

    // Merge saved data with defaults so missing fields never break the app.
    return {
      ...clone(defaultData),
      ...parsedData,
    };
  } catch {
    return clone(defaultData);
  }
}

export function saveAppData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.warn("Could not save app data:", error);
  }
}

export function clearAppData() {
  localStorage.removeItem(STORAGE_KEY);
}

// Old names kept so old imports still work.
export const loadPersistedAppData = loadAppData;
export const persistAppData = saveAppData;
export const clearPersistedAppData = clearAppData;
