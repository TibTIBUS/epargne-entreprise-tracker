import { LABELS } from './constants.js';

/**
 * Calcule l'abondement pour une année donnée
 * @param {number} annualContributions - Total des versements personnels sur l'année
 * @returns {number} Abondement calculé (plafonné)
 */
export const calculateAbondement = (annualContributions) => {
  const rawAbondement = annualContributions * 1.5;
  return Math.min(rawAbondement, 2500); // Plafond annuel dur
};

/**
 * Calcule le total des versements personnels à partir de l'historique
 * @param {Array} operations - Historique des opérations
 * @returns {number} Total des versements personnels
 */
export const getTotalContributions = (operations) => {
  return operations
    .filter(op => op.type === 'contribution')
    .reduce((sum, op) => sum + (op.amount || 0), 0);
};

/**
 * Calcule le total des abondements à partir de l'historique
 * @param {Array} operations - Historique des opérations
 * @returns {number} Total des abondements
 */
export const getTotalAbondement = (operations) => {
  return operations
    .filter(op => op.type === 'abondement')
    .reduce((sum, op) => sum + (op.amount || 0), 0);
};

/**
 * Calcule la plus-value de marché
 * @param {number} currentValue - Valeur actuelle totale
 * @param {number} totalContributions - Total des versements personnels
 * @param {number} totalAbondement - Total des abondements
 * @returns {number} Plus-value de marché (peut être négative)
 */
export const getMarketGain = (currentValue, totalContributions, totalAbondement) => {
  const investedCapital = totalContributions + totalAbondement;
  return currentValue - investedCapital;
};

/**
 * Calcule la plus-value totale (abondement + plus-value de marché)
 * @param {number} marketGain - Plus-value de marché
 * @param {number} totalAbondement - Total des abondements
 * @returns {number} Plus-value totale
 */
export const getTotalGain = (marketGain, totalAbondement) => {
  return totalAbondement + marketGain;
};

/**
 * Calcule le pourcentage de plus-value totale
 * @param {number} totalGain - Plus-value totale
 * @param {number} totalContributions - Total des versements personnels
 * @returns {number} Pourcentage de plus-value (0 si pas de versements)
 */
export const getGainPercentage = (totalGain, totalContributions) => {
  if (totalContributions === 0) return 0;
  return (totalGain / totalContributions) * 100;
};

/**
 * Génère les données pour le graphique annuel (année en cours)
 * @param {Array} operations - Historique des opérations
 * @param {number} currentYear - Année en cours
 * @returns {Object} Données formatées pour Recharts
 */
export const getYearlyChartData = (operations, currentYear) => {
  // Initialiser les mois de l'année en cours
  const months = Array.from({ length: 12 }, (_, i) => ({
    month: i + 1,
    contributions: 0,
    abondement: 0,
    marketGain: 0,
    total: 0
  }));

  // Agréger les opérations par mois
  operations.forEach(op => {
    const opDate = new Date(op.date);
    if (opDate.getFullYear() === currentYear) {
      const monthIndex = opDate.getMonth(); // 0-11
      const monthData = months[monthIndex];
      
      if (op.type === 'contribution') {
        monthData.contributions += op.amount || 0;
      } else if (op.type === 'abondement') {
        monthData.abondement += op.amount || 0;
      } else if (op.type === 'marketUpdate') {
        // Pour les mises à jour de marché, on attribue la variation au mois
        monthData.marketGain += op.amount || 0;
      }
    }
  });

  // Calculer les totaux cumulés
  let cumContributions = 0;
  let cumAbondement = 0;
  let cumMarketGain = 0;
  
  return months.map(month => {
    cumContributions += month.contributions;
    cumAbondement += month.abondement;
    cumMarketGain += month.marketGain;
    
    return {
      month: month.month,
      contributions: cumContributions,
      abondement: cumAbondement,
      marketGain: cumMarketGain,
      total: cumContributions + cumAbondement + cumMarketGain
    };
  });
};

/**
 * Génère les données pour la prévision fin d'année
 * @param {Object} settings - Paramètres de l'application
 * @param {Array} operations - Historique des opérations
 * @param {number} currentYear - Année en cours
 * @param {number} currentMonth - Mois en cours (1-12)
 * @returns {Object} Données de prévision
 */
export const getYearEndProjection = (settings, operations, currentYear, currentMonth) => {
  const { BASE_CONTRIBUTION, CONTRIBUTIONS_PER_YEAR, ABONDMENT_RATIO, ABONDMENT_ANNUAL_CAP, DEFAULT_RETURN_RATE } = settings;
  
  // Calculer ce qui a déjà été versé cette année
  const yearlyOperations = operations.filter(op => {
    const opDate = new Date(op.date);
    return opDate.getFullYear() === currentYear;
  });
  
  const contributionsYTD = getTotalContributions(yearlyOperations);
  const abondementYTD = getTotalAbondement(yearlyOperations);
  
  // Calculer ce qui reste à verser cette année
  const remainingContributionOps = Math.max(0, CONTRIBUTIONS_PER_YEAR - yearlyOperations.filter(op => op.type === 'contribution').length);
  const remainingContributions = remainingContributionOps * BASE_CONTRIBUTION;
  const projectedAnnualContributions = contributionsYTD + remainingContributions;
  
  // Calculer l'abondement projeté pour l'année
  const projectedAbondement = Math.min(projectedAnnualContributions * ABONDMENT_RATIO, ABONDMENT_ANNUAL_CAP);
  
  // Capital investi projeté à fin d'année
  const investedCapitalProjected = projectedAnnualContributions + projectedAbondement;
  
  // Valeur actuelle (dernière opération de marché ou valeur initiale)
  const currentValueOp = operations
    .filter(op => op.type === 'marketUpdate')
    .sort((a, b) => new Date(b.date) - new Date(a.date))[0];
  
  const currentValue = currentValueOp ? currentValueOp.amount : 
    getTotalContributions(operations) + getTotalAbondement(operations); // Valeur initiale si pas de mise à jour
  
  // Plus-value de marché actuelle
  const currentMarketGain = getMarketGain(currentValue, getTotalContributions(operations), getTotalAbondement(operations));
  
  // Projection avec rendement annuel
  const monthlyReturnRate = DEFAULT_RETURN_RATE / 12;
  const monthsRemaining = 12 - currentMonth;
  
  // Apports mensuels restants (versements + abondement proportionnel)
  const monthlyContribution = BASE_CONTRIBUTION;
  const monthlyAbondement = Math.min(monthlyContribution * ABONDMENT_RATIO, ABONDMENT_ANNUAL_CAP / CONTRIBUTIONS_PER_YEAR);
  const monthlyTotalInput = monthlyContribution + monthlyAbondement;
  
  let projectedValue = currentValue;
  
  for (let m = 0; m < monthsRemaining; m++) {
    // Ajouter les apports du mois
    projectedValue += monthlyTotalInput;
    // Appliquer le rendement
    projectedValue *= (1 + monthlyReturnRate);
  }
  
  const projectedGain = projectedValue - investedCapitalProjected;
  
  return {
    projectedContributions: projectedAnnualContributions,
    projectedAbondement: projectedAbondement,
    projectedTotal: projectedValue,
    projectedGain: projectedGain,
    gainPercentage: (projectedGain / projectedAnnualContributions) * 100 || 0
  };
};

/**
 * Génère les données pour la prévision sur 10 ans
 * @param {Object} settings - Paramètres de l'application
 * @param {Array} operations - Historique des opérations
 * @param {number} currentYear - Année en cours
 * @returns {Object} Données de prévision décennale
 */
export const getTenYearProjection = (settings, operations, currentYear) => {
  const { BASE_CONTRIBUTION, CONTRIBUTIONS_PER_YEAR, ABONDMENT_RATIO, ABONDMENT_ANNUAL_CAP } = settings;
  
  const annualContribution = BASE_CONTRIBUTION * CONTRIBUTIONS_PER_YEAR;
  const annualAbondement = Math.min(annualContribution * ABONDMENT_RATIO, ABONDMENT_ANNUAL_CAP);
  const annualTotalInput = annualContribution + annualAbondement;
  
  // Capital actuel (versements + abondement historiques + plus-value de marché)
  const historicalContributions = getTotalContributions(operations);
  const historicalAbondement = getTotalAbondement(operations);
  const currentValueOp = operations
    .filter(op => op.type === 'marketUpdate')
    .sort((a, b) => new Date(b.date) - new Date(a.date))[0];
  
  const currentValue = currentValueOp ? currentValueOp.amount : historicalContributions + historicalAbondement;
  
  // Générer année par année
  const projectionData = [];
  let accumulatedValue = currentValue;
  
  for (let year = 0; year < 10; year++) {
    const yearLabel = currentYear + year + 1;
    
    // Appliquer les apports annuels
    accumulatedValue += annualTotalInput;
    
    // Appliquer un rendement annuel composé (en utilisant le taux moyen par défaut)
    // Pour simplifier, on utilise un rendement fixe annuel - en pratique on pourrait varier
    const annualReturnRate = 0.04; // Utiliser le taux moyen par défaut
    accumulatedValue *= (1 + annualReturnRate);
    
    projectionData.push({
      year: yearLabel,
      value: accumulatedValue
    });
  }
  
  return projectionData;
};

/**
 * Calcule les dates de disponibilité pour le blocage de 5 ans
 * @param {Array} operations - Historique des opérations
 * @returns {Object} Statistiques de disponibilité
 */
export const getBlockingInfo = (operations) => {
  const BLOCKING_YEARS = 5;
  const today = new Date();
  
  // Filtrer seulement les versements (car l'abondement suit les versements)
  const contributionOps = operations.filter(op => op.type === 'contribution');
  
  if (contributionOps.length === 0) {
    return {
      availableNow: 0,
      blockingDetails: [],
      nextAvailableDate: null
    };
  }
  
  let availableNow = 0;
  const blockingDetails = [];
  
  contributionOps.forEach(op => {
    const opDate = new Date(op.date);
    const availableDate = new Date(opDate);
    availableDate.setFullYear(availableDate.getFullYear() + BLOCKING_YEARS);
    
    const isAvailable = availableDate <= today;
    const amount = op.amount || 0;
    
    if (isAvailable) {
      availableNow += amount;
    }
    
    blockingDetails.push({
      date: opDate,
      amount,
      availableDate,
      isAvailable
    });
  });
  
  // Trouver la prochaine date de disponibilité
  const futureAvailabilities = blockingDetails
    .filter(detail => !detail.isAvailable)
    .sort((a, b) => a.availableDate - b.availableDate);
  
  const nextAvailableDate = futureAvailabilities.length > 0 
    ? futureAvailabilities[0].availableDate 
    : null;
  
  return {
    availableNow,
    blockingDetails,
    nextAvailableDate
  };
};