import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LABELS, DEFAULT_SETTINGS } from '../utils/constants';

const SettingsModal = () => {
  const { updateSettings, exportData, importData, clearAllData } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [formState, setFormState] = useState({
    baseContribution: DEFAULT_SETTINGS.BASE_CONTRIBUTION,
    contributionsPerYear: DEFAULT_SETTINGS.CONTRIBUTIONS_PER_YEAR,
    abondementRatio: DEFAULT_SETTINGS.ABONDMENT_RATIO,
    abondementAnnualCap: DEFAULT_SETTINGS.ABONDMENT_ANNUAL_CAP,
    defaultReturnRate: DEFAULT_SETTINGS.DEFAULT_RETURN_RATE
  });
  const [exportedData, setExportedData] = useState('');
  const [importStatus, setImportStatus] = useState(null); // null, 'success', 'error'
  const [clearStatus, setClearStatus] = useState(null); // null, 'success', 'error'

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSettings(formState);
    setIsOpen(false);
  };

  const handleExport = () => {
    const data = exportData();
    setExportedData(data);
  };

  const handleImport = (e) => {
    e.preventDefault();
    const fileInput = document.getElementById('import-file');
    if (!fileInput.files[0]) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const success = importData(event.target.result);
      setImportStatus(success ? 'success' : 'error');
      if (!success) setTimeout(() => setImportStatus(null), 3000);
    };
    reader.readAsText(fileInput.files[0]);
  };

  const handleClear = () => {
    if (window.confirm('�Êtes-vous sûr de vouloir supprimer toutes vos données ? Cette action est irréversible.')) {
      const success = clearAllData();
      setClearStatus(success ? 'success' : 'error');
      if (!success) setTimeout(() => setClearStatus(null), 3000);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-sm text-blue-600 hover:underline mb-4"
      >
        �� ⚙��️ {LABELS.settingsModal.title}
      </button>
      
      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-6">
              {LABELS.settingsModal.title}
            </h2>
            
            {importStatus === 'success' && (
              <div className="mb-4 p-3 bg-green-50 border-l-4 border-green-500 text-green-700">
                Données importées avec succès !
              </div>
            )}
            
            {importStatus === 'error' && (
              <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700">
                Erreur lors de l'importation. Vérifiez le format du fichier.
              </div>
            )}
            
            {clearStatus === 'success' && (
              <div className="mb-4 p-3 bg-green-50 border-l-4 border-green-500 text-green-700">
                Toutes les données ont été supprimées.
              </div>
            )}
            
            {clearStatus === 'error' && (
              <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700">
                Erreur lors de la suppression des données.
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium mb-2">
                  {LABELS.settingsModal.contributionSection}
                </h3>
                <div className="grid gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Montant de base par versement (€)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={formState.baseContribution}
                      onChange={(e) => setFormState({ ...formState, baseContribution: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre de versements par an
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="24"
                      value={formState.contributionsPerYear}
                      onChange={(e) => setFormState({ ...formState, contributionsPerYear: parseInt(e.target.value) || 10 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium mb-2">
                  {LABELS.settingsModal.abondementSection}
                </h3>
                <div className="grid gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ratio d'abondement (× versements)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="5"
                      step="0.1"
                      value={formState.abondementRatio}
                      onChange={(e) => setFormState({ ...formState, abondementRatio: parseFloat(e.target.value) || 1.5 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Plafond annuel d'abondement (€)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formState.abondementAnnualCap}
                      onChange={(e) => setFormState({ ...formState, abondementAnnualCap: parseFloat(e.target.value) || 2500 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium mb-2">
                  {LABELS.settingsModal.projectionSection}
                </h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Taux de rendement annuel moyen par défaut
                  </label>
                  <select
                    value={formState.defaultReturnRate}
                    onChange={(e) => setFormState({ ...formState, defaultReturnRate: parseFloat(e.target.value) || 0.04 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="0.02">2% (prudent)</option>
                    <option value="0.04">4% (moyen)</option>
                    <option value="0.06">6% (optimiste)</option>
                  </select>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium mb-4">
                  {LABELS.settingsModal.exportData}
                </h3>
                <button
                  onClick={handleExport}
                  className="w-full mb-3 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                >
                  Générer le fichier d'export
                </button>
                
                {exportedData && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Données exportées (copiez-collez pour sauvegarder)
                    </label>
                    <textarea
                      value={exportedData}
                      readOnly
                      className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onSelect={(e) => {
                        e.target.select();
                        document.execCommand('copy');
                      }}
                    >
                    </textarea>
                    <p className="mt-1 text-xs text-gray-500">
                      Sélectionnez le texte ci-dessus et appuyez sur Ctrl+C pour copier
                    </p>
                  </div>
                )}
                
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {LABELS.settingsModal.importData}
                  </label>
                  <input
                    type="file"
                    id="import-file"
                    accept=".json"
                    onChange={handleImport}
                    className="mb-2 block w-full text-sm text-gray-500"
                  >
                  </input>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    {LABELS.settingsModal.importData}
                  </button>
                  {LABELS.settingsModal.warning}
                </div>
              </div>
              
              <div className="border-t pt-6">
                <button
                  type="button"
                  onClick={handleClear}
                  className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  {LABELS.settingsModal.clearAllData}
                </button>
                <button
                  type="button"
                  onClick={() => setFormState({ ...DEFAULT_SETTINGS })}
                  className="mt-2 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                >
                  {LABELS.settingsModal.resetToDefaults}
                </button>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="mr-3 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {LABELS.settingsModal.saveButton}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SettingsModal;