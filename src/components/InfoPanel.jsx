import React from 'react';
import { useApp } from '../context/AppContext';
import { LABELS } from '../utils/constants';
import { formatCurrency, formatDate } from '../utils/format';

const InfoPanel = () => {
  const { blockingInfo, removeOperation, operations } = useApp();

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-bold mb-4">{LABELS.infoPanel.title}</h2>

      {blockingInfo.details.length === 0 ? (
        <p className="text-gray-500 text-center py-4">{LABELS.infoPanel.noOperations}</p>
      ) : (
        <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
          {blockingInfo.details.map((detail, idx) => {
            const op = operations.find(
              (o) => o.type === 'contribution' && new Date(o.date).getTime() === detail.date.getTime()
            );
            return (
              <div key={idx} className="flex justify-between items-center text-sm border-b border-gray-100 pb-2">
                <div>
                  <span className="text-gray-900 font-medium">{formatCurrency(detail.amount)}</span>
                  <span className="text-gray-400 ml-2">{formatDate(detail.date)}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={detail.isAvailable ? 'text-emerald-600' : 'text-gray-500'}>
                    {detail.isAvailable
                      ? LABELS.dashboard.available
                      : `Dès ${formatDate(detail.availableDate)}`}
                  </span>
                  {op && (
                    <button
                      type="button"
                      onClick={() => removeOperation(op.id)}
                      className="text-gray-300 hover:text-red-500"
                      aria-label="Supprimer ce versement"
                      title="Supprimer ce versement"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <p className="text-xs text-gray-400 mt-4 border-t border-gray-100 pt-3">{LABELS.infoPanel.notes}</p>
    </div>
  );
};

export default InfoPanel;
