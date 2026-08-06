import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LABELS } from '../utils/constants';

const todayIso = () => new Date().toISOString().split('T')[0];

const emptyForm = () => ({
  contribution: '',
  abondement: '',
  marketValue: '',
  date: todayIso()
});

const UpdateForm = () => {
  const { addOperation } = useApp();
  const [form, setForm] = useState(emptyForm());
  const [status, setStatus] = useState(null); // null | 'success' | 'error'

  const resetForm = () => setForm(emptyForm());

  const handleSubmit = (e) => {
    e.preventDefault();

    const contribution = parseFloat(form.contribution) || 0;
    const abondement = parseFloat(form.abondement) || 0;
    const marketValue = parseFloat(form.marketValue) || 0;

    if (contribution === 0 && abondement === 0 && marketValue === 0) {
      setStatus('error');
      return;
    }

    const isoDate = new Date(form.date).toISOString();

    if (contribution > 0) addOperation({ type: 'contribution', amount: contribution, date: isoDate });
    if (abondement > 0) addOperation({ type: 'abondement', amount: abondement, date: isoDate });
    if (marketValue > 0) addOperation({ type: 'marketUpdate', amount: marketValue, date: isoDate });

    resetForm();
    setStatus('success');
    setTimeout(() => setStatus(null), 3000);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-bold mb-1">{LABELS.updateForm.title}</h2>
      <p className="text-sm text-gray-500 mb-4">{LABELS.updateForm.helper}</p>

      {status === 'success' && (
        <div className="mb-4 p-3 bg-emerald-50 border-l-4 border-emerald-500 text-emerald-700 text-sm">
          {LABELS.updateForm.successMessage}
        </div>
      )}
      {status === 'error' && (
        <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
          {LABELS.updateForm.errorEmpty}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {LABELS.updateForm.contributionLabel}
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={form.contribution}
            onChange={(e) => setForm({ ...form, contribution: e.target.value })}
            placeholder="Ex : 165"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            value={form.abondement}
            onChange={(e) => setForm({ ...form, abondement: e.target.value })}
            placeholder="Ex : 247,50"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            value={form.marketValue}
            onChange={(e) => setForm({ ...form, marketValue: e.target.value })}
            placeholder="Ex : 5000"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{LABELS.updateForm.dateLabel}</label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="sm:col-span-2 flex justify-end gap-3 pt-1">
          <button
            type="button"
            onClick={resetForm}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
          >
            {LABELS.updateForm.resetButton}
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {LABELS.updateForm.submitButton}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateForm;
