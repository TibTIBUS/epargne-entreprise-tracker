// Toutes les fonctions ici sont pures : (données en entrée) -> (résultat).
// Aucune ne dépend du contexte React, ce qui les rend testables isolément
// et évite les bugs de "variable qui n'existe pas dans ce scope".

export const getTotalContributions = (operations) =>
  operations
    .filter((op) => op.type === 'contribution')
    .reduce((sum, op) => sum + (op.amount || 0), 0);

export const getTotalAbondement = (operations) =>
  operations
    .filter((op) => op.type === 'abondement')
    .reduce((sum, op) => sum + (op.amount || 0), 0);

// La valeur actuelle du portefeuille est la dernière opération "marketUpdate"
// saisie (chaque relevé remplace le précédent, il ne s'additionne pas).
export const getCurrentValue = (operations) => {
  const marketUpdates = operations
    .filter((op) => op.type === 'marketUpdate')
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  if (marketUpdates.length > 0) return marketUpdates[0].amount;

  // Pas de relevé de valeur saisi : on suppose que le capital investi
  // (versements + abondement) est la meilleure estimation disponible.
  return getTotalContributions(operations) + getTotalAbondement(operations);
};

export const getMarketGain = (operations) => {
  const currentValue = getCurrentValue(operations);
  const invested = getTotalContributions(operations) + getTotalAbondement(operations);
  return currentValue - invested;
};

// Plus-value totale = abondement (gain acquis dès réception) + plus-value de marché.
export const getTotalGain = (operations) => {
  const marketGain = getMarketGain(operations);
  const totalAbondement = getTotalAbondement(operations);
  return totalAbondement + marketGain;
};

export const getGainPercentage = (operations) => {
  const totalContributions = getTotalContributions(operations);
  if (totalContributions === 0) return 0;
  return (getTotalGain(operations) / totalContributions) * 100;
};

// Données mensuelles cumulées pour l'année donnée (pour le graphique).
export const getYearlyChartData = (operations, year) => {
  const months = Array.from({ length: 12 }, (_, i) => ({
    month: i + 1,
    contributions: 0,
    abondement: 0
  }));

  operations.forEach((op) => {
    const opDate = new Date(op.date);
    if (opDate.getFullYear() !== year) return;
    const monthData = months[opDate.getMonth()];
    if (op.type === 'contribution') monthData.contributions += op.amount || 0;
    if (op.type === 'abondement') monthData.abondement += op.amount || 0;
  });

  let cumContributions = 0;
  let cumAbondement = 0;

  return months.map((m) => {
    cumContributions += m.contributions;
    cumAbondement += m.abondement;
    return {
      month: m.month,
      contributions: cumContributions,
      abondement: cumAbondement,
      total: cumContributions + cumAbondement
    };
  });
};

// Abondement déjà reçu sur l'année en cours (basé sur les opérations réelles,
// pas sur une projection).
export const getYtdAbondement = (operations, year) => {
  const yearOps = operations.filter((op) => new Date(op.date).getFullYear() === year);
  return getTotalAbondement(yearOps);
};

// Projection de fin d'année : n'a de sens que si au moins une opération existe.
// Extrapole les versements restants sur l'année à partir du rythme habituel
// défini dans les paramètres.
export const getYearEndProjection = (operations, settings, year, currentMonth) => {
  const { BASE_CONTRIBUTION, CONTRIBUTIONS_PER_YEAR, ABONDMENT_RATIO, ABONDMENT_ANNUAL_CAP, DEFAULT_RETURN_RATE } =
    settings;

  const yearOps = operations.filter((op) => new Date(op.date).getFullYear() === year);
  const contributionsYtd = getTotalContributions(yearOps);
  const contributionsCount = yearOps.filter((op) => op.type === 'contribution').length;

  const remainingContributionsCount = Math.max(0, CONTRIBUTIONS_PER_YEAR - contributionsCount);
  const projectedAnnualContributions = contributionsYtd + remainingContributionsCount * BASE_CONTRIBUTION;

  const projectedAbondement = Math.min(projectedAnnualContributions * ABONDMENT_RATIO, ABONDMENT_ANNUAL_CAP);
  const investedProjected = projectedAnnualContributions + projectedAbondement;

  const currentValue = getCurrentValue(operations);
  const monthsRemaining = Math.max(0, 12 - currentMonth);
  const monthlyReturnRate = DEFAULT_RETURN_RATE / 12;

  const monthlyContribution = BASE_CONTRIBUTION;
  const monthlyAbondement = Math.min(
    monthlyContribution * ABONDMENT_RATIO,
    ABONDMENT_ANNUAL_CAP / CONTRIBUTIONS_PER_YEAR
  );
  const monthlyInput = monthlyContribution + monthlyAbondement;

  let projectedValue = currentValue;
  for (let i = 0; i < monthsRemaining; i += 1) {
    projectedValue += monthlyInput;
    projectedValue *= 1 + monthlyReturnRate;
  }

  const projectedGain = projectedValue - investedProjected;

  return {
    projectedTotal: projectedValue,
    projectedGain,
    gainPercentage: investedProjected > 0 ? (projectedGain / investedProjected) * 100 : 0
  };
};

// Projection sur 10 ans en supposant un rythme de versement constant
// (le rythme et le plafond actuellement définis dans les paramètres).
export const getTenYearProjection = (operations, settings, year) => {
  const { BASE_CONTRIBUTION, CONTRIBUTIONS_PER_YEAR, ABONDMENT_RATIO, ABONDMENT_ANNUAL_CAP, DEFAULT_RETURN_RATE } =
    settings;

  const annualContribution = BASE_CONTRIBUTION * CONTRIBUTIONS_PER_YEAR;
  const annualAbondement = Math.min(annualContribution * ABONDMENT_RATIO, ABONDMENT_ANNUAL_CAP);
  const annualInput = annualContribution + annualAbondement;

  let value = getCurrentValue(operations);
  const projection = [{ year, value }];

  for (let i = 1; i <= 10; i += 1) {
    value += annualInput;
    value *= 1 + DEFAULT_RETURN_RATE;
    projection.push({ year: year + i, value });
  }

  return projection;
};

// Statut de blocage à 5 ans, versement par versement.
export const getBlockingInfo = (operations, blockingYears) => {
  const today = new Date();
  const contributions = operations.filter((op) => op.type === 'contribution');

  const details = contributions
    .map((op) => {
      const opDate = new Date(op.date);
      const availableDate = new Date(opDate);
      availableDate.setFullYear(availableDate.getFullYear() + blockingYears);
      return {
        date: opDate,
        amount: op.amount || 0,
        availableDate,
        isAvailable: availableDate <= today
      };
    })
    .sort((a, b) => a.date - b.date);

  const nextAvailable = details
    .filter((d) => !d.isAvailable)
    .sort((a, b) => a.availableDate - b.availableDate)[0];

  return {
    details,
    nextAvailableDate: nextAvailable ? nextAvailable.availableDate : null
  };
};
