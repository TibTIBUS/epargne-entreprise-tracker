import { DEFAULT_SETTINGS } from './constants.js';

const STORAGE_KEY = 'epargneEntrepriseData.v2';

// Shape canonique unique de l'état applicatif. TOUTE fonction qui retourne
// des données de l'app doit respecter exactement cette forme :
//   { operations: Array, settings: { ...DEFAULT_SETTINGS } }
// Ne jamais retourner une variante partielle (ex: sans `settings`) : c'est
// exactement ce qui a causé le crash au premier chargement dans la v1.
const emptyState = () => ({
  operations: [],
  settings: { ...DEFAULT_SETTINGS }
});

export const loadData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyState();

    const parsed = JSON.parse(raw);

    return {
      operations: Array.isArray(parsed.operations) ? parsed.operations : [],
      settings: { ...DEFAULT_SETTINGS, ...(parsed.settings || {}) }
    };
  } catch (error) {
    console.error('Erreur lors du chargement des données :', error);
    return emptyState();
  }
};

export const saveData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des données :', error);
    return false;
  }
};

export const exportDataAsJson = (data) => JSON.stringify(data, null, 2);

export const importDataFromJson = (jsonString) => {
  try {
    const parsed = JSON.parse(jsonString);
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
      throw new Error('Format invalide');
    }
    const safe = {
      operations: Array.isArray(parsed.operations) ? parsed.operations : [],
      settings: { ...DEFAULT_SETTINGS, ...(parsed.settings || {}) }
    };
    saveData(safe);
    return safe;
  } catch (error) {
    console.error("Erreur lors de l'import :", error);
    return null;
  }
};

export const clearData = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Erreur lors de la suppression :', error);
    return false;
  }
};
