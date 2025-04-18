// src/pages/AIPrioritizerDashboard.tsx
import React from 'react';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, Tooltip
} from 'recharts';
import { motion } from 'framer-motion';

const radarData = [
  { subject: 'Lead Score', A: 85 },
  { subject: 'Engagement', A: 75 },
  { subject: 'Conversion', A: 70 },
  { subject: 'Segmentation', A: 90 },
  { subject: 'Journey Map', A: 60 },
  { subject: 'Workflow', A: 80 },
];

const engagementData = [
  { name: 'Email Opens', value: 45 },
  { name: 'Link Clicks', value: 32 },
  { name: 'Site Visits', value: 55 },
  { name: 'Form Fills', value: 22 },
];

const segmentationData = [
  { name: 'Hot', value: 25 },
  { name: 'Warm', value: 40 },
  { name: 'Cold', value: 35 },
];

const COLORS = ['#10b981', '#f59e0b', '#ef4444'];

const AIPrioritizerDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center mb-10 text-gray-800"
      >
        AI Lead Prioritization Dashboard
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Lead Score Radar */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Lead Scoring Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <Radar dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.4} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Engagement Tracking */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Engagement Tracking</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={engagementData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Segmentation */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Lead Segmentation</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={segmentationData} dataKey="value" nameKey="name" outerRadius={100}>
                {segmentationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Conversion Probability + Workflow Info */}
        <div className="bg-white p-6 rounded-2xl shadow space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">Conversion Probability & Automation</h2>
          <div className="text-gray-600 leading-relaxed">
            <p>🔥 <strong>Conversion Prediction:</strong> This module calculates real-time probability of conversion using behavioral, demographic, and historical signals.</p>
            <p>⚙️ <strong>Workflow Integration:</strong> Top leads are auto-assigned to sales reps. Custom workflows trigger personalized email sequences.</p>
            <p>🔄 <strong>Dynamic Updates:</strong> Scores and priorities update instantly as leads interact with emails, pages, and forms.</p>
          </div>
        </div>

        {/* Lead Journey Mapping */}
        <div className="bg-white p-6 rounded-2xl shadow col-span-1 lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Lead Journey Mapping</h2>
          <ul className="space-y-3 text-gray-600">
            <li>📩 Email sent — 5 Apr</li>
            <li>✅ Link clicked — 6 Apr</li>
            <li>🌐 Website visit — 6 Apr</li>
            <li>📅 Demo booked — 7 Apr</li>
            <li>🗣️ Sales call done — 8 Apr</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AIPrioritizerDashboard;