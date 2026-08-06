import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useApp } from '../context/AppContext';
import { LABELS } from '../utils/constants';
import { formatCurrency } from '../utils/format';

const YearlyChart = () => {
  const { yearlyChartData, operations } = useApp();

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-bold mb-4">{LABELS.charts.yearlyTitle}</h2>

      {operations.length === 0 ? (
        <p className="text-gray-500 text-center py-10">{LABELS.charts.emptyYearly}</p>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={yearlyChartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" tickFormatter={(v) => `M${v}`} />
            <YAxis tickFormatter={(v) => formatCurrency(v)} width={70} />
            <Tooltip formatter={(v) => formatCurrency(v)} labelFormatter={(v) => `Mois ${v}`} />
            <Legend verticalAlign="top" height={32} />
            <Line
              type="monotone"
              dataKey="contributions"
              name={LABELS.charts.legendContributions}
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="abondement"
              name={LABELS.charts.legendAbondement}
              stroke="#10b981"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="total"
              name={LABELS.charts.legendTotal}
              stroke="#8b5cf6"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default YearlyChart;
