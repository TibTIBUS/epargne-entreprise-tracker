// Paramètres par défaut de l'application.
// Tous modifiables depuis l'écran "Paramètres" sans toucher au code.
export const DEFAULT_SETTINGS = {
  BASE_CONTRIBUTION: 165,          // Montant habituel d'un versement (€)
  CONTRIBUTIONS_PER_YEAR: 10,      // Nombre de versements attendus sur l'année
  ABONDMENT_RATIO: 1.5,            // L'employeur abonde 1,5x le versement personnel
  ABONDMENT_ANNUAL_CAP: 2500,      // Plafond annuel dur de l'abondement (€)
  DEFAULT_RETURN_RATE: 0.04,       // Taux de rendement annuel moyen utilisé pour les projections
  BLOCKING_YEARS: 5                // Durée de blocage de chaque versement (années)
};

// Options de taux de rendement proposées dans le sélecteur de paramètres.
export const RETURN_RATE_OPTIONS = [
  { value: 0.02, label: '2 % (prudent)' },
  { value: 0.04, label: '4 % (moyen)' },
  { value: 0.06, label: '6 % (optimiste)' }
];

// Tous les libellés d'interface. Un seul endroit à modifier pour changer un texte.
export const LABELS = {
  appTitle: 'Suivi de mon épargne entreprise',
  dashboard: {
    totalContributions: 'Mes versements cumulés',
    totalAbondement: 'Abondement cumulé',
    totalCapital: 'Capital total actuel',
    totalGain: 'Plus-value totale',
    gainPercentage: 'Pourcentage de plus-value',
    abondementReceivedYear: 'Abondement reçu cette année',
    abondementRemainingYear: "Abondement restant sur l'année",
    blockingHorizon: 'Horizon de blocage',
    available: 'Disponible'
  },
  updateForm: {
    title: 'Ajouter une opération',
    contributionLabel: 'Versement personnel (€)',
    abondementLabel: 'Abondement employeur reçu (€)',
    marketValueLabel: 'Valeur totale actuelle du portefeuille (€)',
    dateLabel: "Date de l'opération",
    submitButton: 'Enregistrer',
    resetButton: 'Vider le formulaire',
    successMessage: 'Opération enregistrée.',
    errorEmpty: 'Renseignez au moins un des trois montants.',
    helper: "Ajoutez une ligne par relevé. La valeur du portefeuille remplace la dernière valeur connue, elle ne s'additionne pas."
  },
  charts: {
    yearlyTitle: "Évolution de l'année en cours",
    tenYearTitle: 'Projection sur 10 ans',
    emptyYearly: "Ajoutez une opération pour voir l'évolution de l'année.",
    legendContributions: 'Versements',
    legendAbondement: 'Abondement',
    legendTotal: 'Capital total'
  },
  projection: {
    title: "Projection fin d'année",
    projectedTotal: 'Capital total projeté',
    projectedGain: 'Plus-value projetée',
    empty: 'Ajoutez au moins un versement pour voir votre projection.'
  },
  infoPanel: {
    title: 'Détail des versements et blocage',
    noOperations: 'Aucune opération enregistrée pour le moment.',
    availableDate: 'Disponible',
    notes:
      "Abondement = min(versements personnels x ratio, plafond annuel). Le blocage de 5 ans s'applique individuellement à chaque versement personnel. Les projections utilisent le taux de rendement défini dans les paramètres."
  },
  settings: {
    title: "Paramètres de l'application",
    openButton: 'Paramètres',
    contributionSection: 'Versements',
    baseContribution: "Montant habituel d'un versement (€)",
    contributionsPerYear: 'Nombre de versements par an',
    abondementSection: 'Abondement employeur',
    abondementRatio: "Ratio d'abondement",
    abondementCap: 'Plafond annuel (€)',
    projectionSection: 'Projection',
    returnRate: 'Taux de rendement annuel moyen',
    save: 'Enregistrer les paramètres',
    reset: 'Réinitialiser aux valeurs par défaut',
    dangerZone: 'Zone de danger',
    clearData: 'Effacer toutes mes données',
    clearConfirm:
      'Cette action supprime définitivement toutes vos opérations enregistrées dans ce navigateur. Confirmer ?',
    clearDone: 'Toutes les données ont été effacées.',
    close: 'Fermer'
  }
};
