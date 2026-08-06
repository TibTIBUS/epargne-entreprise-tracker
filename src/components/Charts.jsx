import React from 'react';
import { useApp } from '../context/AppContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LABELS } from '../utils/constants';

const Charts = () => {
  const { yearlyChartData } = useApp();

  if (yearlyChartData.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-center text-gray-500 py-8">
          Aucune donnée disponible pour l'année en cours. Ajoutez vos premières opérations !
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4">
        {LABELS.charts.yearlyTitle}
      </h2>
      
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={yearlyChartData}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" tickFormatter={(value) => `M${value}`} />
          <YAxis 
            tickFormatter={(value) => new Intl.NumberFormat('fr-FR', {
              style: 'currency',
              currency: 'EUR',
              minimumFractionDigits: 0
            }).format(value)}
          />
          <Tooltip 
            formatter={(value) => new Intl.NumberFormat('fr-FR', {
              style: 'currency',
              currency: 'EUR',
              minimumFractionDigits: 0
            }).format(value)}
          />
          <Legend verticalAlign="top" height={36} />
          
          <Line 
            type="monotone" 
            dataKey="contributions" 
            stroke="#3b82f6" 
            activeDot={{ r: 8 }} 
            label={LABELS.charts.legendContributions}
          />
          <Line 
            type="monotone" 
            dataKey="abondement" 
            stroke="#10b981" 
            activeDot={{ r: 8 }} 
            label={LABELS.charts.legendAbondement}
          />
          <Line 
            type="monotone" 
            dataKey="marketGain" 
            stroke="#f59e0b" 
            activeDot={{ r: 8 }} 
            label={LABELS.charts.legendMarketGain}
          />
          <Line 
            type="monotone" 
            dataKey="total" 
            stroke="#8b5cf6" 
            activeDot={{ r: 8 }} 
            label={LABELS.charts.legendTotal}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Charts;