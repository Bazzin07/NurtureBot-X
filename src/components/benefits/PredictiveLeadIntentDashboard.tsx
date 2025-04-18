import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const leads = [
  { name: 'Alice Johnson', company: 'TechCorp', source: 'Website', score: 92, lastInteraction: 'Email', timing: '10:00 AM' },
  { name: 'Bob Smith', company: 'InnovateX', source: 'LinkedIn', score: 88, lastInteraction: 'Call', timing: '2:00 PM' },
  { name: 'Carol Lee', company: 'StartUpHub', source: 'Webinar', score: 85, lastInteraction: 'Form', timing: '11:30 AM' }
];

const scoreHistory = [
  { date: 'Apr 1', score: 70 },
  { date: 'Apr 2', score: 75 },
  { date: 'Apr 3', score: 82 },
  { date: 'Apr 4', score: 88 },
  { date: 'Apr 5', score: 92 }
];

const PredictiveLeadIntentDashboard = () => {
  return (
    <div className="p-6 space-y-12">
      <h1 className="text-3xl font-bold text-gray-900">Predictive Lead Intent Dashboard</h1>

      {/* Top Intent Leads */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Top Intent Leads</h2>
        <table className="w-full table-auto border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Company</th>
              <th className="px-4 py-2 text-left">Source</th>
              <th className="px-4 py-2 text-left">Intent Score</th>
              <th className="px-4 py-2 text-left">Last Interaction</th>
              <th className="px-4 py-2 text-left">Recommended Time</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2">{lead.name}</td>
                <td className="px-4 py-2">{lead.company}</td>
                <td className="px-4 py-2">{lead.source}</td>
                <td className="px-4 py-2 font-semibold text-emerald-600">{lead.score}%</td>
                <td className="px-4 py-2">{lead.lastInteraction}</td>
                <td className="px-4 py-2">{lead.timing}</td>
                <td className="px-4 py-2">
                  <span className="inline-block px-4 py-1 text-sm font-medium text-white bg-emerald-500 rounded hover:bg-emerald-600 cursor-pointer">Engage Now</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Intent Score Over Time */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Intent Score Over Time</h2>
        <div className="w-full h-64 bg-white rounded-lg shadow border border-gray-200 p-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={scoreHistory}>
              <XAxis dataKey="date" stroke="#4B5563" />
              <YAxis stroke="#4B5563" domain={[60, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#10B981" strokeWidth={3} dot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
};

export default PredictiveLeadIntentDashboard;
