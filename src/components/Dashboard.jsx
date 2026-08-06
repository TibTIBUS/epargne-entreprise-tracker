import React from 'react';
import { useApp } from '../context/AppContext';
import { LABELS } from '../utils/constants';
import { formatCurrency, formatPercentage, formatMonthYear } from '../utils/format';
import UpdateForm from './UpdateForm';
import YearlyChart from './YearlyChart';
import TenYearChart from './TenYearChart';
import ProjectionCard from './ProjectionCard';
import InfoPanel from './InfoPanel';
import SettingsModal from './SettingsModal';

const KpiCard = ({ label, value, valueClassName = 'text-gray-900' }) => (
  <div className="bg-white rounded-lg shadow p-4">
    <p className="text-sm font-medium text-gray-500">{label}</p>
    <p className={`mt-1 text-2xl font-bold ${valueClassName}`}>{value}</p>
  </div>
);

const Dashboard = () => {
  const {
    totalContributions,
    totalAbondement,
    currentValue,
    totalGain,
    gainPercentage,
    ytdAbondement,
    settings,
    blockingInfo
  } = useApp();

  const abondementRemaining = Math.max(0, settings.ABONDMENT_ANNUAL_CAP - ytdAbondement);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">{LABELS.appTitle}</h1>
          <SettingsModal />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard label={LABELS.dashboard.totalContributions} value={formatCurrency(totalContributions)} />
          <KpiCard label={LABELS.dashboard.totalAbondement} value={formatCurrency(totalAbondement)} />
          <KpiCard label={LABELS.dashboard.totalCapital} value={formatCurrency(currentValue)} />
          <KpiCard
            label={LABELS.dashboard.totalGain}
            value={formatCurrency(totalGain)}
            valueClassName={totalGain >= 0 ? 'text-emerald-600' : 'text-red-600'}
          />
          <KpiCard
            label={LABELS.dashboard.gainPercentage}
            value={formatPercentage(gainPercentage)}
            valueClassName={gainPercentage >= 0 ? 'text-emerald-600' : 'text-red-600'}
          />
          <KpiCard label={LABELS.dashboard.abondementReceivedYear} value={formatCurrency(ytdAbondement)} />
          <KpiCard label={LABELS.dashboard.abondementRemainingYear} value={formatCurrency(abondementRemaining)} />
          <KpiCard
            label={LABELS.dashboard.blockingHorizon}
            value={
              blockingInfo.nextAvailableDate
                ? formatMonthYear(blockingInfo.nextAvailableDate)
                : LABELS.dashboard.available
            }
            valueClassName={blockingInfo.nextAvailableDate ? 'text-gray-900' : 'text-emerald-600'}
          />
        </section>

        <UpdateForm />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <YearlyChart />
          <TenYearChart />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProjectionCard />
          <InfoPanel />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
