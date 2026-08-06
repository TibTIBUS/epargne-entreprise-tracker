import React, { createContext, useContext, useState, useEffect } from 'react';
import { loadData, saveData, exportData, importData, clearAllData } from '../utils/storage';
import { 
  getTotalContributions, 
  getTotalAbondement, 
  getMarketGain, 
  getTotalGain, 
  getGainPercentage,
  getYearlyChartData,
  getYearEndProjection,
  getTenYearProjection,
  getBlockingInfo
} from '../utils/calculations';
import { DEFAULT_SETTINGS } from '../utils/constants';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [appData, setAppData] = useState(() => loadData());

  // Sauvegarder automatiquement dans localStorage
  useEffect(() => {
    saveData(appData);
  }, [appData]);

  // Méthodes de mise à jour
  const addOperation = (operation) => {
    setAppData(prev => ({
      ...prev,
      operations: [...prev.operations, operation]
    }));
  };

  const updateOperations = (newOperations) => {
    setAppData(prev => ({
      ...prev,
      operations: newOperations
    }));
  };

  const updateSettings = (newSettings) => {
    setAppData(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        ...newSettings
      }
    }));
  };

  // Getters dérivés
  const totalContributions = getTotalContributions(appData.operations);
  const totalAbondement = getTotalAbondement(appData.operations);
  const currentValueOp = appData.operations
    .filter(op => op.type === 'marketUpdate')
    .sort((a, b) => new Date(b.date) - new Date(a.date))[0];
  
  const currentValue = currentValueOp ? currentValueOp.amount : 
    totalContributions + totalAbondement; // Valeur initiale si pas de mise à jour de marché
    
  const marketGain = getMarketGain(currentValue, totalContributions, totalAbondement);
  const totalGain = getTotalGain(marketGain, totalAbondement);
  const gainPercentage = getGainPercentage(totalGain, totalContributions);
  
const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1; // 1-12
  
  const yearlyChartData = getYearlyChartData(appData.operations, currentYear);
  const yearEndProjection = getYearEndProjection(appData.settings, appData.operations, currentYear, currentMonth);
  const tenYearProjection = getTenYearProjection(appData.settings, appData.operations, currentYear);
  const blockingInfo = getBlockingInfo(appData.operations);
  
  // Calcul du total des versements personnels YTD (mois écoulés de l'année en cours)
  const ytdPersonalContributions = yearlyChartData
    .slice(0, currentMonth - 1) // mois 0 à currentMonth-2
    .reduce((sum, month) => sum + month.contributions, 0);
  
  // Abondement reçu YTD = min(YTD personal × ratio, plafond annuel)
  const ytdAbondementReceived = Math.min(
    ytdPersonalContributions * appData.settings.ABONDMENT_RATIO,
    appData.settings.ABONDMENT_ANNUAL_CAP
  );
  
  const value = {
    // État
    ...appData,
    
    // Données dérivées
    totalContributions,
    totalAbondement,
    currentValue,
    marketGain,
    totalGain,
    gainPercentage,
    yearlyChartData,
    yearEndProjection,
    tenYearProjection,
    blockingInfo,
    ytdAbondementReceived,
    currentYear,
    currentMonth,
    
    // Actions
    addOperation,
    updateOperations,
    updateSettings,
    exportData: () => exportData(appData),
    importData: (json) => {
      const success = importData(json);
      if (success) {
        setAppData(loadData());
      }
      return success;
    },
    clearAllData: () => {
      const success = clearAllData();
      if (success) {
        setAppData(loadData());
      }
      return success;
    }
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp doit être utilisé dans AppProvider');
  }
  return context;
};