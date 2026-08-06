import { DEFAULT_SETTINGS } from './constants.js';

const STORAGE_KEY = 'epargneEntrepriseData';

// Structure des données stockées
export const loadData = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      // S'assurer que les paramètres existent (rétrocompatibilité)
      return {
        ...DEFAULT_SETTINGS,
        ...parsed,
        settings: {
          ...DEFAULT_SETTINGS,
          ...(parsed.settings || {})
        }
      };
    }
    return { ...DEFAULT_SETTINGS, operations: [] };
  } catch (error) {
    console.error('Erreur lors du chargement des données:', error);
    return { ...DEFAULT_SETTINGS, operations: [] };
  }
};

export const saveData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des données:', error);
    return false;
  }
};

export const exportData = () => {
  const data = loadData();
  return JSON.stringify(data, null, 2);
};

export const importData = (jsonString) => {
  try {
    const data = JSON.parse(jsonString);
    // Validation basique
    if (typeof data !== 'object' || Array.isArray(data)) {
      throw new Error('Format de données invalide');
    }
    saveData(data);
    return true;
  } catch (error) {
    console.error('Erreur lors de l\'importation des données:', error);
    return false;
  }
};

export const clearAllData = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Erreur lors de la suppression des données:', error);
    return false;
  }
};