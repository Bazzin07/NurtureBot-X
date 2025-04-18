import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';

const deals = [
  { name: 'Acme Inc.', client: 'John Doe', value: '$25,000', probability: 87, date: '2025-04-15', stage: 'Negotiation' },
  { name: 'Beta Ltd.', client: 'Alice Ray', value: '$40,000', probability: 65, date: '2025-04-20', stage: 'Proposal' },
  { name: 'Gamma Corp.', client: 'Zara Lee', value: '$15,000', probability: 42, date: '2025-04-22', stage: 'Discovery' },
];

const probabilityData = [
  { date: 'Apr 01', probability: 60 },
  { date: 'Apr 02', probability: 65 },
  { date: 'Apr 03', probability: 70 },
  { date: 'Apr 04', probability: 78 },
  { date: 'Apr 05', probability: 87 },
];

const pieData = [
  { name: 'High', value: 3 },
  { name: 'Medium', value: 5 },
  { name: 'Low', value: 2 },
];

const COLORS = ['#22c55e', '#facc15', '#ef4444'];

export default function DealClosingDashboard() {
  return (
    <div className="p-6 space-y-16 max-w-7xl mx-auto">

      {/* Deal Success Predictor Panel */}
      <section>
        <h2 className="text-2xl font-bold mb-4">🎯 Deal Success Predictor Panel</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow rounded-lg">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 text-left">Deal Name</th>
                <th className="p-3 text-left">Client Name</th>
                <th className="p-3 text-left">Deal Value</th>
                <th className="p-3 text-left">Probability</th>
                <th className="p-3 text-left">Closing Date</th>
                <th className="p-3 text-left">Stage</th>
              </tr>
            </thead>
            <tbody>
              {deals.map((deal, index) => (
                <tr key={index} className="border-t hover:bg-emerald-50">
                  <td className="p-3">{deal.name}</td>
                  <td className="p-3">{deal.client}</td>
                  <td className="p-3">{deal.value}</td>
                  <td className={`p-3 font-semibold ${deal.probability > 80 ? 'text-green-600' : deal.probability >= 50 ? 'text-yellow-500' : 'text-red-500'}`}>{deal.probability}%</td>
                  <td className="p-3">{deal.date}</td>
                  <td className="p-3">{deal.stage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Probability Over Time */}
      <section>
        <h2 className="text-2xl font-bold mb-4">📈 Probability Over Time</h2>
        <div className="bg-white rounded-xl shadow p-6 hover:bg-emerald-50 transition-all">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={probabilityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="probability" stroke="#0f766e" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Hot Deals Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">🔥 Hot Deals</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {deals.filter(d => d.probability > 85).map((deal, index) => (
            <div key={index} className="p-5 bg-white rounded-xl shadow hover:bg-emerald-50 transition-all">
              <h3 className="text-xl font-semibold text-gray-800">{deal.name}</h3>
              <p className="text-gray-600">Client: {deal.client}</p>
              <p>Next Step: Follow-up with pricing doc</p>
              <p>Last Interaction: 2 days ago | Best Time: 10 AM</p>
            </div>
          ))}
        </div>
      </section>

      {/* AI Opportunity Insights */}
      <section>
        <h2 className="text-2xl font-bold mb-4">🧠 AI Opportunity Insights</h2>
        <div className="bg-white rounded-xl shadow p-6 hover:bg-emerald-50 transition-all">
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Client opened pricing email 3 times in 24 hrs</li>
            <li>No activity in 12 days</li>
            <li>Client visited case study page</li>
          </ul>
        </div>
      </section>

      {/* Pipeline Probability Breakdown */}
      <section>
        <h2 className="text-2xl font-bold mb-4">📊 Pipeline Probability Breakdown</h2>
        <div className="bg-white rounded-xl shadow p-6 hover:bg-emerald-50 transition-all">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Comparison to Past Deals */}
      <section>
        <h2 className="text-2xl font-bold mb-4">🧩 Comparison to Past Deals</h2>
        <div className="bg-white rounded-xl shadow p-6 hover:bg-emerald-50 transition-all">
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Average probability before close: 76%</li>
            <li>Average time in pipeline: 18 days</li>
            <li>Won deals showed more engagement in final week</li>
          </ul>
        </div>
      </section>

      {/* Next Best Action Recommendations */}
      <section>
        <h2 className="text-2xl font-bold mb-4">🤖 Next Best Action Recommendations</h2>
        <div className="bg-white rounded-xl shadow p-6 hover:bg-emerald-50 transition-all">
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Send proposal now</li>
            <li>Schedule a call this Thursday</li>
            <li>Re-engage via LinkedIn</li>
          </ul>
        </div>
      </section>

    </div>
  );
}