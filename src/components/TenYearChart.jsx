import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useApp } from '../context/AppContext';
import { LABELS } from '../utils/constants';
import { formatCurrency } from '../utils/format';

const TenYearChart = () => {
  const { tenYearProjection, operations } = useApp();

  return (
    <div className="bg-white rounded-xl2 shadow-sm border border-brand-100 p-6">
      <h2 className="text-lg font-bold mb-4">{LABELS.charts.tenYearTitle}</h2>

      {operations.length === 0 ? (
        <p className="text-ink-500 text-center py-10">{LABELS.charts.emptyYearly}</p>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={tenYearProjection} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="tenYearGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00965E" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#00965E" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis tickFormatter={(v) => formatCurrency(v)} width={70} />
            <Tooltip formatter={(v) => formatCurrency(v)} labelFormatter={(v) => `Année ${v}`} />
            <Area type="monotone" dataKey="value" stroke="#00965E" strokeWidth={2} fill="url(#tenYearGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      )}

      <p className="text-xs text-ink-500/70 mt-2">
        Projection à rythme constant (paramètres actuels), à titre indicatif uniquement.
      </p>
    </div>
  );
};

export default TenYearChart;
