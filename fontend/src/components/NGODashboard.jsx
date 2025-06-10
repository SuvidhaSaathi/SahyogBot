import React from 'react';

function NGODashboard() {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
      <h3 className="text-lg font-semibold mb-4">NGO Dashboard</h3>
      <div className="mb-3 sm:mb-4">
        <h4 className="font-medium text-sm sm:text-base mb-1">Bulk Profile Upload</h4>
        <p className="text-gray-600 text-sm sm:text-base">Upload CSV or use form-based entry for multiple beneficiaries.</p>
        <input type="file" className="mt-2 text-sm sm:text-base" />
      </div>
      <div className="mb-3 sm:mb-4">
        <h4 className="font-medium text-sm sm:text-base mb-1">Batch Scheme Matching</h4>
        <p className="text-gray-600 text-sm sm:text-base">Download results: schemes per beneficiary.</p>
      </div>
      <div>
        <h4 className="font-medium text-sm sm:text-base mb-1">Impact Tracker</h4>
        <p className="text-gray-600 text-sm sm:text-base">Visual dashboard: beneficiaries matched, forms generated, outreach by gender/location.</p>
      </div>
    </div>
  );
}

export default NGODashboard;
