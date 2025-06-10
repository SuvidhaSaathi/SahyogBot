import React from 'react';

function AdminDashboard() {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
      <h3 className="text-lg font-semibold mb-4">Admin & Analytics Dashboard</h3>
      <div className="mb-3 sm:mb-4">
        <h4 className="font-medium text-sm sm:text-base mb-1">Real-Time Data</h4>
        <p className="text-gray-600 text-sm sm:text-base">Scheme uptake by region, category, gender.</p>
      </div>
      <div className="mb-3 sm:mb-4">
        <h4 className="font-medium text-sm sm:text-base mb-1">Application Funnel Stats</h4>
        <p className="text-gray-600 text-sm sm:text-base">Started, submitted, verified.</p>
      </div>
      <div>
        <h4 className="font-medium text-sm sm:text-base mb-1">Exportable Reports</h4>
        <p className="text-gray-600 text-sm sm:text-base">Download reports for analysis.</p>
      </div>
    </div>
  );
}

export default AdminDashboard;
