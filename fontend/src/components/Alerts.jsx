import React from 'react';

function Alerts() {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
      <h3 className="text-lg font-semibold mb-4">Alerts & Notifications</h3>
      <div className="mb-3 sm:mb-4">
        <h4 className="font-medium text-sm sm:text-base mb-1">Deadline Reminders</h4>
        <p className="text-gray-600 text-sm sm:text-base">SMS, WhatsApp, email options.</p>
      </div>
      <div>
        <h4 className="font-medium text-sm sm:text-base mb-1">Application Status Updates</h4>
        <p className="text-gray-600 text-sm sm:text-base">Get notified when your application status changes.</p>
      </div>
    </div>
  );
}

export default Alerts;
