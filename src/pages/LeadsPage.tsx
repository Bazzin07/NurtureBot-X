import React from 'react';

const LeadsPage = () => {
  const demoLeads = [
    { name: 'Alice Smith', source: 'Website', status: 'Contacted', score: 78 },
    { name: 'Bob Johnson', source: 'LinkedIn', status: 'New', score: 65 },
    { name: 'Charlie Brown', source: 'Email Campaign', status: 'Interested', score: 90 },
  ];

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold text-emerald-600 mb-6">Lead Data Visualization</h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow p-6">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="text-xs uppercase bg-gray-200">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Source</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Score</th>
            </tr>
          </thead>
          <tbody>
            {demoLeads.map((lead, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 font-medium">{lead.name}</td>
                <td className="px-4 py-2">{lead.source}</td>
                <td className="px-4 py-2">{lead.status}</td>
                <td className="px-4 py-2">{lead.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadsPage;