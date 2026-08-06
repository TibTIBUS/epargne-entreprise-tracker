import React from 'react';
import { useApp } from '../context/AppContext';
import { LABELS } from '../utils/constants';
import { formatCurrency } from '../utils/format';

const ProjectionCard = () => {
  const { yearEndProjection, operations } = useApp();

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-bold mb-4">{LABELS.projection.title}</h2>

      {operations.length === 0 ? (
        <p className="text-gray-500 text-center py-4">{LABELS.projection.empty}</p>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm">{LABELS.projection.projectedTotal}</span>
            <span className="font-semibold text-gray-900">{formatCurrency(yearEndProjection.projectedTotal)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm">{LABELS.projection.projectedGain}</span>
            <span
              className={`font-semibold ${yearEndProjection.projectedGain >= 0 ? 'text-emerald-600' : 'text-red-600'}`}
            >
              {formatCurrency(yearEndProjection.projectedGain)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectionCard;
