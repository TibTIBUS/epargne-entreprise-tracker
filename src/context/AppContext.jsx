import React, { createContext, useContext, useEffect, useState } from 'react';
import { loadData, saveData, clearData, exportDataAsJson, importDataFromJson } from '../utils/storage';
import { DEFAULT_SETTINGS } from '../utils/constants';
import {
  getTotalContributions,
  getTotalAbondement,
  getCurrentValue,
  getTotalGain,
  getGainPercentage,
  getYearlyChartData,
  getYtdAbondement,
  getYearEndProjection,
  getTenYearProjection,
  getBlockingInfo
} from '../utils/calculations';

// IMPORTANT — leçon tirée des bugs précédents :
// 1. Ce contexte n'expose JAMAIS `LABELS`. Les composants importent LABELS
//    directement depuis utils/constants.js. Ne jamais faire
//    `const { LABELS } = useApp()` : ça masquerait silencieusement l'import
//    et planterait au rendu sans erreur de build.
// 2. `appData` a TOUJOURS la forme { operations, settings } (garanti par
//    storage.js). On ne référence jamais une variable `settings` locale non
//    déclarée : tout accès passe explicitement par `appData.settings`.

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [appData, setAppData] = useState(() => loadData());
  const { operations, settings } = appData;

  useEffect(() => {
    saveData(appData);
  }, [appData]);

  const addOperation = (operation) => {
    setAppData((prev) => ({
      ...prev,
      operations: [...prev.operations, { ...operation, id: crypto.randomUUID() }]
    }));
  };

  const removeOperation = (id) => {
    setAppData((prev) => ({
      ...prev,
      operations: prev.operations.filter((op) => op.id !== id)
    }));
  };

  const updateSettings = (partialSettings) => {
    setAppData((prev) => ({
      ...prev,
      settings: { ...prev.settings, ...partialSettings }
    }));
  };

  const resetSettingsToDefault = () => {
    setAppData((prev) => ({ ...prev, settings: { ...DEFAULT_SETTINGS } }));
  };

  const clearAllData = () => {
    const ok = clearData();
    if (ok) setAppData(loadData());
    return ok;
  };

  const exportJson = () => exportDataAsJson(appData);

  const importJson = (jsonString) => {
    const result = importDataFromJson(jsonString);
    if (result) setAppData(result);
    return Boolean(result);
  };

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  const totalContributions = getTotalContributions(operations);
  const totalAbondement = getTotalAbondement(operations);
  const currentValue = getCurrentValue(operations);
  const totalGain = getTotalGain(operations);
  const gainPercentage = getGainPercentage(operations);
  const yearlyChartData = getYearlyChartData(operations, currentYear);
  const ytdAbondement = getYtdAbondement(operations, currentYear);
  const yearEndProjection = getYearEndProjection(operations, settings, currentYear, currentMonth);
  const tenYearProjection = getTenYearProjection(operations, settings, currentYear);
  const blockingInfo = getBlockingInfo(operations, settings.BLOCKING_YEARS);

  const value = {
    operations,
    settings,
    currentYear,
    currentMonth,

    totalContributions,
    totalAbondement,
    currentValue,
    totalGain,
    gainPercentage,
    yearlyChartData,
    ytdAbondement,
    yearEndProjection,
    tenYearProjection,
    blockingInfo,

    addOperation,
    removeOperation,
    updateSettings,
    resetSettingsToDefault,
    clearAllData,
    exportJson,
    importJson
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp() doit être appelé à l\'intérieur de <AppProvider>');
  return ctx;
};
