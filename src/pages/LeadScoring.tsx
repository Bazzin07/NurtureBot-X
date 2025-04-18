import React from 'react';

interface LeadScore {
  name: string;
  score: number;
  status: 'Hot' | 'Warm' | 'Cold';
}

const LeadScoring: React.FC = () => {
  const scores: LeadScore[] = [
    { name: 'Alice Smith', score: 92, status: 'Hot' },
    { name: 'Bob Johnson', score: 68, status: 'Warm' },
    { name: 'Charlie Brown', score: 40, status: 'Cold' },
    { name: 'Diana King', score: 81, status: 'Hot' },
    { name: 'Ethan Ray', score: 58, status: 'Warm' }
  ];

  const statusColor = {
    Hot: 'text-red-500 bg-red-100',
    Warm: 'text-yellow-500 bg-yellow-100',
    Cold: 'text-blue-500 bg-blue-100'
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold text-emerald-600 mb-6">Lead Scoring</h1>
      <p className="text-gray-700 mb-4">
        AI-based scoring to help prioritize leads by engagement level and conversion potential.
      </p>

      <div className="overflow-x-auto bg-white rounded-xl shadow p-6">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="text-xs uppercase bg-gray-200">
            <tr>
              <th className="px-4 py-2">Lead Name</th>
              <th className="px-4 py-2">Score</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((lead, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 font-medium">{lead.name}</td>
                <td className="px-4 py-2">{lead.score}</td>
                <td className="px-4 py-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor[lead.status]}`}>
                    {lead.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadScoring;