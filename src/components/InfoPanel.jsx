import React from 'react';
import { useApp } from '../context/AppContext';
import { LABELS } from '../utils/constants';

const InfoPanel = () => {
  const { blockingInfo, LABELS } = useApp();
  
  const formatNumber = (num) => new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(num);
  
  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4">
        {LABELS.infoPanel.title}
      </h2>
      
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-600">
            {LABELS.infoPanel.availableDate}
          </span>
          <span className="font-medium text-gray-900">
            {blockingInfo.nextAvailableDate ? 
              formatDate(blockingInfo.nextAvailableDate) : 
              'Disponible maintenant'
            }
          </span>
        </div>
        
        <div className="border-t pt-4">
          <h3 className="text-lg font-medium mb-2">
            Détail par versement
          </h3>
          {blockingInfo.blockingDetails.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              Aucun versement enregistré
            </p>
          ) : (
            <div className="space-y-2">
              {blockingInfo.blockingDetails.map((detail, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>
                    {new Date(detail.date).toLocaleDateString('fr-FR', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                  <span className="flex-1">
                    {formatNumber(detail.amount)} 
                    {detail.isAvailable ? 
                      '(disponible)' : 
                      `(disponible le ${formatDate(detail.availableDate)})`
                    }
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="border-t pt-4">
          <h3 className="text-lg font-medium mb-2">
            {LABELS.infoPanel.notes}
          </span>
          <p className="text-sm text-gray-600">
            Les calculs sont basés sur vos déclarations :
            <br />
            • Abondement = min(versements personnels × 1,5, 2500€/an)
            <br />
            • Les projections utilisent un rendement annuel de 4% (modifiable)
            <br />
            • Le blocage de 5 ans s'applique à chaque versement individuellement
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoPanel;