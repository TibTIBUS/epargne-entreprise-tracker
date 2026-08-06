import React from 'react';
import { useApp } from '../context/AppContext';
import { LABELS } from '../utils/constants';

const ProjectionCard = () => {
  const { yearEndProjection } = useApp();
  
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