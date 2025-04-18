import React from 'react';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from 'recharts';

// 📈 Line Chart Data
type LineChartData = {
  month: string;
  conversions: number;
};

// 🥧 Pie Chart Data
type PieChartData = {
  source: string;
  value: number;
};

const lineData: LineChartData[] = [
  { month: 'Jan', conversions: 120 },
  { month: 'Feb', conversions: 180 },
  { month: 'Mar', conversions: 150 },
  { month: 'Apr', conversions: 200 },
  { month: 'May', conversions: 220 },
];

const pieData: PieChartData[] = [
  { source: 'LinkedIn', value: 400 },
  { source: 'Email', value: 300 },
  { source: 'Facebook', value: 250 },
  { source: 'Referral', value: 150 },
];

const COLORS = ['#00BFA6', '#10B981', '#6EE7B7', '#34D399'];

const CardWrapper: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white shadow-md rounded-xl p-6 ${className}`}>{children}</div>
);

const DataInsightsDashboard: React.FC = () => {
  return (
    <div className="p-6 space-y-8">
      <h2 className="text-3xl font-bold text-gray-800">📊 Data-Driven Insights</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 📈 Lead Conversion Trends */}
        <CardWrapper>
          <h3 className="text-xl font-semibold mb-2">📈 Lead Conversion Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <XAxis dataKey="month" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <RechartsTooltip />
              <Legend />
              <Line type="monotone" dataKey="conversions" stroke="#10B981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </CardWrapper>

        {/* 🥧 Deal Breakdown by Source */}
        <CardWrapper>
          <h3 className="text-xl font-semibold mb-2">🥧 Deal Breakdown by Source</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="source"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <RechartsTooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardWrapper>

        {/* 🔥 Heatmap Placeholder */}
        <CardWrapper className="col-span-1 md:col-span-2">
          <h3 className="text-xl font-semibold mb-2">🔥 Lead Response Time Success</h3>
          <div className="w-full h-64 bg-gray-100 flex items-center justify-center text-gray-500 text-sm">
            Heatmap coming soon (Demo placeholder)
          </div>
        </CardWrapper>

        {/* 🧠 AI Forecasting */}
        <CardWrapper>
          <h3 className="text-xl font-semibold mb-2">🧠 AI Forecasting</h3>
          <p className="text-gray-600 text-sm">
            Based on current trends, expected deal closures for next quarter: <strong>+18%</strong>.
          </p>
        </CardWrapper>

        {/* 🎯 Customer Segmentation */}
        <CardWrapper>
          <h3 className="text-xl font-semibold mb-2">🎯 Customer Segmentation</h3>
          <p className="text-gray-600 text-sm">
            High-value segments: <strong>Tech Startups (35%)</strong>, <strong>SMBs (28%)</strong>.
          </p>
        </CardWrapper>
      </div>

      {/* 💡 Use Case */}
      <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
        <p className="text-sm text-emerald-700 leading-relaxed">
          💡 <strong>Use Case:</strong> “Marketing team noticed a 25% higher conversion from LinkedIn-sourced leads,
          and doubled ad spend in that channel—resulting in a 40% increase in SQLs.”
        </p>
      </div>
    </div>
  );
};

export default DataInsightsDashboard;