import React from 'react';

interface Engagement {
  lead: string;
  type: 'Email' | 'Call' | 'Message';
  status: string;
  date: string;
}

const EngagementTracker: React.FC = () => {
  const engagementData: Engagement[] = [
    { lead: 'Alice Smith', type: 'Email', status: 'Opened', date: '2025-04-08' },
    { lead: 'Bob Johnson', type: 'Call', status: 'Completed', date: '2025-04-07' },
    { lead: 'Charlie Brown', type: 'Message', status: 'Responded', date: '2025-04-06' },
  ];

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold text-emerald-600 mb-6">Engagement Tracker</h1>
      <p className="text-gray-700 mb-4">Monitor all touchpoints with your leads like emails, calls, and messages.</p>

      <div className="overflow-x-auto bg-white rounded-xl shadow p-6">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="text-xs uppercase bg-gray-200">
            <tr>
              <th className="px-4 py-2">Lead</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {engagementData.map((item, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 font-medium">{item.lead}</td>
                <td className="px-4 py-2">{item.type}</td>
                <td className="px-4 py-2">{item.status}</td>
                <td className="px-4 py-2">{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EngagementTracker;