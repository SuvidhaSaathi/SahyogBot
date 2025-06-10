import React from 'react';

function WomenModule() {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
      <h3 className="text-lg font-semibold mb-4">Women-Focused Support</h3>
      <div className="mb-3 sm:mb-4">
        <h4 className="font-medium text-sm sm:text-base mb-1">Auto-Filter for Women-Only Schemes</h4>
        <p className="text-gray-600 text-sm sm:text-base">Only schemes relevant to women are shown here.</p>
      </div>
      <div className="mb-3 sm:mb-4">
        <h4 className="font-medium text-sm sm:text-base mb-1">Custom Checklists</h4>
        <ul className="list-disc pl-5 text-sm sm:text-base">
          <li>Daughter’s birth certificate</li>
          <li>SHG membership proof</li>
          <li>Maternity benefits application</li>
        </ul>
      </div>
      <div className="mb-3 sm:mb-4">
        <h4 className="font-medium text-sm sm:text-base mb-1">Mentor Directory</h4>
        <p className="text-gray-600 text-sm sm:text-base">Contact local SHG mentors and helplines for support.</p>
      </div>
      <div>
        <h4 className="font-medium text-sm sm:text-base mb-1">Pre-filled Forms</h4>
        <p className="text-gray-600 text-sm sm:text-base">Microloan, maternity benefits, etc.</p>
      </div>
    </div>
  );
}

export default WomenModule;
