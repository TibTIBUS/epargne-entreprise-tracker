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

// Marque abstraite à quatre lobes, dans l'esprit du symbole BNP Paribas
// (forme originale, pas une reproduction du logo protégé).
const BrandMark = ({ className = '' }) => (
  <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden="true">
    <path d="M16 2c1 4 3 6 7 7-4 1-6 3-7 7-1-4-3-6-7-7 4-1 6-3 7-7z" />
    <path d="M16 16c1 4 3 6 7 7-4 1-6 3-7 7-1-4-3-6-7-7 4-1 6-3 7-7z" opacity="0.55" />
  </svg>
);

const KpiCard = ({ label, value, valueClassName = 'text-ink-900' }) => (
  <div className="bg-white rounded-xl2 shadow-sm border border-brand-100 p-5">
    <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">{label}</p>
    <p className={`mt-2 text-2xl font-extrabold ${valueClassName}`}>{value}</p>
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
    <div className="min-h-screen bg-brand-50">
      <header className="bg-brand-500 shadow-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <BrandMark className="w-7 h-7 text-white" />
            <h1 className="text-lg font-bold text-white tracking-tight">{LABELS.appTitle}</h1>
          </div>
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
            valueClassName={totalGain >= 0 ? 'text-brand-600' : 'text-red-600'}
          />
          <KpiCard
            label={LABELS.dashboard.gainPercentage}
            value={formatPercentage(gainPercentage)}
            valueClassName={gainPercentage >= 0 ? 'text-brand-600' : 'text-red-600'}
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
            valueClassName={blockingInfo.nextAvailableDate ? 'text-ink-900' : 'text-brand-600'}
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
