import React from 'react';
import { useApp } from '../context/AppContext';
import { LABELS } from '../utils/constants';
import UpdateForm from './UpdateForm';
import Charts from './Charts';
import ProjectionCard from './ProjectionCard';
import InfoPanel from './InfoPanel';
import SettingsModal from './SettingsModal';

const Dashboard = () => {
  const {
    totalContributions,
    totalAbondement,
    currentValue,
    totalGain,
    gainPercentage,
    yearlyChartData,
    yearEndProjection,
    tenYearProjection,
    blockingInfo,
    ytdAbondementReceived
  } = useApp();

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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-bold text-gray-900">
            {LABELS.dashboard.title}
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPIs principaux */}
        <div className="grid gap-6 mb-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Total versements */}
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-sm font-medium text-gray-500">
                {LABELS.dashboard.totalContributions}
              </h3>
              <p className="mt-1 text-2xl font-bold text-gray-900">
                {formatNumber(totalContributions)}
              </p>
            </div>
            
            {/* Total abondement */}
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-sm font-medium text-gray-500">
                {LABELS.dashboard.totalAbondement}
              </h3>
              <p className="mt-1 text-2xl font-bold text-gray-900">
                {formatNumber(totalAbondement)}
              </p>
            </div>
            
            {/* Capital total */}
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-sm font-medium text-gray-500">
                {LABELS.dashboard.totalCapital}
              </h3>
              <p className="mt-1 text-2xl font-bold text-gray-900">
                {formatNumber(currentValue)}
              </p>
            </div>
            
            {/* Plus-value totale */}
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-sm font-medium text-gray-500">
                {LABELS.dashboard.totalGain}
              </h3>
              <p className={`mt-1 text-2xl font-bold ${totalGain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatNumber(totalGain)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Pourcentage de plus-value */}
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-sm font-medium text-gray-500">
                {LABELS.dashboard.gainPercentage}
              </h3>
              <p className={`mt-1 text-2xl font-bold ${gainPercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatPercentage(gainPercentage)}
              </p>
            </div>
            
            {/* Objectif annuel */}
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-sm font-medium text-gray-500">
                {LABELS.dashboard.annualObjective}
              </h3>
              <p className="mt-1 text-xl font-bold text-gray-900">
                {formatNumber(yearEndProjection.projectedContributions + yearEndProjection.projectedAbondement)}
              </p>
            </div>
            
            {/* Abondement reçu cette année */}
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-sm font-medium text-gray-500">
                {LABELS.dashboard.abondementReceived}
              </h3>
              <p className="mt-1 text-xl font-bold text-gray-900">
                {formatNumber(ytdAbondementReceived)}
              </p>
            </div>
            
            {/* Abondement restant */}
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-sm font-medium text-gray-500">
                {LABELS.dashboard.abondementRemaining}
              </h3>
              <p className="mt-1 text-xl font-bold text-gray-900">
                {formatNumber(Math.max(0, 2500 - yearEndProjection.projectedAbondement))}
              </p>
            </div>
            
            {/* Horizon de blocage */}
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-sm font-medium text-gray-500">
                {LABELS.dashboard.blockingHorizon}
              </h3>
              {blockingInfo.nextAvailableDate ? (
                <p className="mt-1 text-xl font-bold text-gray-900">
                  {new Date(blockingInfo.nextAvailableDate).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long'
                  })}
                </p>
              ) : (
                <p className="mt-1 text-xl font-bold text-green-600">
                  Disponible
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Section principale avec graphiques et panneaux */}
        <div className="grid gap-6">
          {/* Colonne principale : Graphiques */}
          <div className="col-span-1 lg:col-span-2">
            <UpdateForm />
            <Charts />
            <ProjectionCard />
          </div>
          
          {/* Colonne secondaire : Informations et paramètres */}
          <div className="lg:col-span-1">
            <InfoPanel />
            <SettingsModal />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;