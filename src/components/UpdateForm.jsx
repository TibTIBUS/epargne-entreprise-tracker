import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LABELS } from '../utils/constants';

const UpdateForm = () => {
  const { addOperation } = useApp();
  const [formState, setFormState] = useState({
    contribution: '',
    abondement: '',
    marketValue: '',
    date: new Date().toISOString().split('T')[0] // Format YYYY-MM-DD
  });
  const [submitStatus, setSubmitStatus] = useState(null); // null, 'success', 'error'

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation basique
    const contribution = parseFloat(formState.contribution) || 0;
    const abondement = parseFloat(formState.abondement) || 0;
    const marketValue = parseFloat(formState.marketValue) || 0;
    
    if (contribution === 0 && abondement === 0 && marketValue === 0) {
      setSubmitStatus('error');
      return;
    }
    
    // Créer les opérations
    const operations = [];
    const date = new Date(formState.date);
    
    if (contribution > 0) {
      operations.push({
        type: 'contribution',
        amount: contribution,
        date: date.toISOString()
      });
    }
    
    if (abondement > 0) {
      operations.push({
        type: 'abondement',
        amount: abondement,
        date: date.toISOString()
      });
    }
    
    if (marketValue > 0) {
      operations.push({
        type: 'marketUpdate',
        amount: marketValue,
        date: date.toISOString()
      });
    }
    
    // Ajouter toutes les opérations
    operations.forEach(op => addOperation(op));
    
    // Réinitialiser le formulaire
    setFormState({
      contribution: '',
      abondement: '',
      marketValue: '',
      date: new Date().toISOString().split('T')[0]
    });
    
    setSubmitStatus('success');
    
    // Effacer le statut après 3 secondes
    setTimeout(() => setSubmitStatus(null), 3000);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">
        {LABELS.updateForm.title}
      </h2>
      
      {submitStatus === 'success' && (
        <div className="mb-4 p-3 bg-green-50 border-l-4 border-green-500 text-green-700">
          Données enregistrées avec succès !
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700">
          Veuillez saisir au moins une valeur.
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {LABELS.updateForm.contributionLabel}
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={formState.contribution}
            onChange={(e) => setFormState({ ...formState, contribution: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ex: 165"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {LABELS.updateForm.abondementLabel}
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={formState.abondement}
            onChange={(e) => setFormState({ ...formState, abondement: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ex: 247,50"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {LABELS.updateForm.marketValueLabel}
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={formState.marketValue}
            onChange={(e) => setFormState({ ...formState, marketValue: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ex: 5000"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {LABELS.updateForm.dateLabel}
          </label>
          <input
            type="date"
            value={formState.date}
            onChange={(e) => setFormState({ ...formState, date: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => setFormState({
              contribution: '',
              abondement: '',
              marketValue: '',
              date: new Date().toISOString().split('T')[0]
            })}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            {LABELS.updateForm.resetButton}
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {LABELS.updateForm.submitButton}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateForm;