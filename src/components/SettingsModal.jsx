import React, { useRef, useState } from 'react';
import { useApp } from '../context/AppContext';
import { LABELS, RETURN_RATE_OPTIONS } from '../utils/constants';

const SettingsModal = () => {
  const { settings, updateSettings, resetSettingsToDefault, clearAllData, exportJson, importJson } = useApp();

  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState(settings);
  const [confirmingClear, setConfirmingClear] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const fileInputRef = useRef(null);

  const openModal = () => {
    setForm(settings);
    setConfirmingClear(false);
    setFeedback(null);
    setIsOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateSettings({
      BASE_CONTRIBUTION: parseFloat(form.BASE_CONTRIBUTION) || 0,
      CONTRIBUTIONS_PER_YEAR: parseInt(form.CONTRIBUTIONS_PER_YEAR, 10) || 1,
      ABONDMENT_RATIO: parseFloat(form.ABONDMENT_RATIO) || 0,
      ABONDMENT_ANNUAL_CAP: parseFloat(form.ABONDMENT_ANNUAL_CAP) || 0,
      DEFAULT_RETURN_RATE: parseFloat(form.DEFAULT_RETURN_RATE)
    });
    setIsOpen(false);
  };

  const handleResetDefaults = () => {
    resetSettingsToDefault();
    setForm(settings);
  };

  const handleClearConfirmed = () => {
    clearAllData();
    setConfirmingClear(false);
    setFeedback(LABELS.settings.clearDone);
  };

  const handleExport = () => {
    const json = exportJson();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `epargne-entreprise-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const success = importJson(evt.target.result);
      setFeedback(success ? 'Import réussi.' : "Échec de l'import : fichier invalide.");
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={openModal}
        className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
      >
        <span aria-hidden="true">⚙️</span> {LABELS.settings.openButton}
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold">{LABELS.settings.title}</h2>
          <button type="button" onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-700">
            ✕
          </button>
        </div>

        {feedback && (
          <div className="mb-4 p-3 bg-blue-50 border-l-4 border-blue-500 text-blue-700 text-sm">{feedback}</div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          <fieldset className="space-y-3">
            <legend className="text-sm font-semibold text-gray-700 mb-1">
              {LABELS.settings.contributionSection}
            </legend>
            <div>
              <label className="block text-sm text-gray-600 mb-1">{LABELS.settings.baseContribution}</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.BASE_CONTRIBUTION}
                onChange={(e) => setForm({ ...form, BASE_CONTRIBUTION: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">{LABELS.settings.contributionsPerYear}</label>
              <input
                type="number"
                min="1"
                max="24"
                value={form.CONTRIBUTIONS_PER_YEAR}
                onChange={(e) => setForm({ ...form, CONTRIBUTIONS_PER_YEAR: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </fieldset>

          <fieldset className="space-y-3">
            <legend className="text-sm font-semibold text-gray-700 mb-1">{LABELS.settings.abondementSection}</legend>
            <div>
              <label className="block text-sm text-gray-600 mb-1">{LABELS.settings.abondementRatio}</label>
              <input
                type="number"
                min="0"
                step="0.1"
                value={form.ABONDMENT_RATIO}
                onChange={(e) => setForm({ ...form, ABONDMENT_RATIO: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">{LABELS.settings.abondementCap}</label>
              <input
                type="number"
                min="0"
                value={form.ABONDMENT_ANNUAL_CAP}
                onChange={(e) => setForm({ ...form, ABONDMENT_ANNUAL_CAP: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-sm font-semibold text-gray-700 mb-1">{LABELS.settings.projectionSection}</legend>
            <label className="block text-sm text-gray-600 mb-1">{LABELS.settings.returnRate}</label>
            <select
              value={form.DEFAULT_RETURN_RATE}
              onChange={(e) => setForm({ ...form, DEFAULT_RETURN_RATE: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              {RETURN_RATE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </fieldset>

          <div className="flex gap-3">
            <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              {LABELS.settings.save}
            </button>
            <button
              type="button"
              onClick={handleResetDefaults}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
            >
              {LABELS.settings.reset}
            </button>
          </div>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="flex gap-3 mb-4">
            <button
              type="button"
              onClick={handleExport}
              className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm"
            >
              Exporter mes données (JSON)
            </button>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm"
            >
              Importer un fichier JSON
            </button>
            <input ref={fileInputRef} type="file" accept=".json" onChange={handleImportFile} className="hidden" />
          </div>
        </div>

        <div className="mt-2 pt-6 border-t border-gray-100">
          <h3 className="text-sm font-semibold text-red-600 mb-2">{LABELS.settings.dangerZone}</h3>
          {!confirmingClear ? (
            <button
              type="button"
              onClick={() => setConfirmingClear(true)}
              className="w-full px-4 py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50 text-sm"
            >
              {LABELS.settings.clearData}
            </button>
          ) : (
            <div className="border border-red-200 rounded-md p-3 bg-red-50">
              <p className="text-sm text-red-700 mb-3">{LABELS.settings.clearConfirm}</p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleClearConfirmed}
                  className="flex-1 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
                >
                  Confirmer la suppression
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmingClear(false)}
                  className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 text-sm"
                >
                  Annuler
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 text-gray-600 hover:text-gray-900 text-sm"
          >
            {LABELS.settings.close}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
