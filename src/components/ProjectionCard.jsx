import React from 'react';
import { useApp } from '../context/AppContext';
import { LABELS } from '../utils/constants';

const ProjectionCard = () => {
  const { yearEndProjection, operations } = useApp();

  const formatNumber = (num) => new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(num);

  const formatPercentage = (num) => new Intl.NumberFormat('fr-FR', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(num / 100);

  // Tant qu'aucune opération n'a été saisie, la projection n'a pas de sens
  // (elle extrapolerait sur des versements par défaut jamais confirmés).
  if (!operations || operations.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">
          {LABELS.projectionCard.title}
        </h2>
        <p className="text-gray-500 text-center py-4">
          Ajoutez au moins un versement pour voir votre projection de fin d'année.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4">
        {LABELS.projectionCard.title}
      </h2>
      
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-600">
            {LABELS.projectionCard.projectedTotal}
          </span>
          <span className="font-medium text-gray-900">
            {formatNumber(yearEndProjection.projectedTotal)}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">
            {LABELS.projectionCard.projectedGain}
          </span>
          <span className={`font-medium ${yearEndProjection.projectedGain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {formatNumber(yearEndProjection.projectedGain)}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">
            {LABELS.projectionCard.gainPercentage}
          </span>
          <span className={`font-medium ${yearEndProjection.gainPercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {formatPercentage(yearEndProjection.gainPercentage)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectionCard;