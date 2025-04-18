import React from 'react';
import { useNavigate } from 'react-router-dom';

const CRMDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold text-emerald-600 mb-4">
        Smart, Centralized, Proactive CRM
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        Welcome to the intelligent CRM system. Here, you can manage leads, monitor engagement, and automate nurturing tasks efficiently.
      </p>

      {/* Dashboard cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          className="p-6 bg-white rounded-xl shadow cursor-pointer hover:shadow-lg transition"
          onClick={() => navigate('/leads')}
        >
          <h2 className="text-xl font-semibold mb-2">Lead Overview</h2>
          <p className="text-gray-600">Visualize all current leads and their status.</p>
        </div>

        <div
          className="p-6 bg-white rounded-xl shadow cursor-pointer hover:shadow-lg transition"
          onClick={() => navigate('/engagement')}
        >
          <h2 className="text-xl font-semibold mb-2">Engagement Tracker</h2>
          <p className="text-gray-600">Track emails, calls, and messages with AI insights.</p>
        </div>

        <div
  className="p-6 bg-white rounded-xl shadow cursor-pointer hover:shadow-lg transition"
  onClick={() => navigate('/lead-scoring')}
>
  <h2 className="text-xl font-semibold mb-2">Lead Scoring</h2>
  <p className="text-gray-600">Automatically prioritize leads based on behavior.</p>
</div>
      </div>
    </div>
  );
};

export default CRMDashboard;