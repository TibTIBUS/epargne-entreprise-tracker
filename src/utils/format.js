export const formatCurrency = (num) =>
  new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(num || 0);

export const formatPercentage = (num) =>
  new Intl.NumberFormat('fr-FR', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format((num || 0) / 100);

export const formatDate = (date) => {
  if (!date) return '—';
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatMonthYear = (date) =>
  new Date(date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' });
