// Valeurs par défaut - toutes modifiables via le modal de paramètres
export const DEFAULT_SETTINGS = {
  // Paramètres de versement
  BASE_CONTRIBUTION: 165,           // Montant de base par versement (€)
  CONTRIBUTIONS_PER_YEAR: 10,       // Nombre de versements par an
  
  // Paramètres d'abondement
  ABONDMENT_RATIO: 1.5,             // Ratio approximatif (x versements)
  ABONDMENT_ANNUAL_CAP: 2500,       // Plafond annuel dur (€)
  
  // Paramètres de projection
  DEFAULT_RETURN_RATE: 0.04,        // Taux de rendement annuel moyen par défaut (4%)
  RETURN_RATE_OPTIONS: [0.02, 0.04, 0.06], // Options sélectionnables (2%, 4%, 6%)
  
  // Autres paramètres
  BLOCKING_YEARS: 5,                // Durée de blocage en années
  CURRENCY: '€',                    // Symbole monétaire
  LANGUAGE: 'fr'                    // Langue de l'interface
};

// Labels d'interface en français
export const LABELS = {
  dashboard: {
    title: "Suivi de mon épargne entreprise",
    totalContributions: "Mes versements cumulés",
    totalAbondement: "Abondement cumulé",
    totalCapital: "Capital total actuel",
    totalGain: "Plus-value totale",
    gainPercentage: "Pourcentage de plus-value",
    annualObjective: "Objectif annuel",
    abondementReceived: "Abondement reçu cette année",
    abondementRemaining: "Abondement restant",
    blockingHorizon: "Horizon de blocage"
  },
  updateForm: {
    title: "Mettre à jour mes données",
    contributionLabel: "Versement personnel du mois (€)",
    abondementLabel: "Abondement employeur reçu (€)",
    marketValueLabel: "Valeur actuelle totale (€)",
    dateLabel: "Date de l'opération",
    submitButton: "Enregistrer",
    resetButton: "Réinitialiser"
  },
  charts: {
    yearlyTitle: "Évolution année en cours",
    yearlyProjectionTitle: "Prévision fin d'année",
    tenYearProjectionTitle: "Prévision sur 10 ans",
    xAxis: "Mois",
    yAxis: "Valeur (€)",
    legendContributions: "Mes versements",
    legendAbondement: "Abondement employeur",
    legendMarketGain: "Plus-value de marché",
    legendTotal: "Capital total"
  },
  projectionCard: {
    title: "Projection fin d'année",
    projectedTotal: "Capital total projeté",
    projectedGain: "Plus-value totale projetée",
    gainPercentage: "Pourcentage de plus-value projeté"
  },
  infoPanel: {
    title: "Informations complémentaires",
    blockingInfo: "Disponibilité des fonds",
    availableDate: "Date estimée de disponibilité",
    notes: "Remarques importantes"
  },
  settingsModal: {
    title: "Paramètres de l'application",
    contributionSection: "Paramètres de versement",
    abondementSection: "Paramètres d'abondement",
    projectionSection: "Paramètres de projection",
    saveButton: "Sauvegarder",
    resetToDefaults: "Réinitialiser aux valeurs par défaut",
    exportData: "Exporter mes données",
    importData: "Importer des données",
    warning: "ATTENTION : L'importation remplacera toutes vos données actuelles."
  }
};