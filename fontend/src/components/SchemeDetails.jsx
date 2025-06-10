import React from 'react';

function SchemeDetails({ name, description, eligibility, benefits, deadline, documents, faq, contact, prefill }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">{name}</h2>
      <p className="text-gray-600 mb-6">{description}</p>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Eligibility Criteria</h3>
        <p>{eligibility}</p>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Required Documents</h3>
        <ul className="list-disc pl-5 mb-4">
          {documents.map((doc, index) => (
            <li key={index} className="text-sm sm:text-base">{doc}</li>
          ))}
        </ul>
        <label className="flex items-center mb-2">
          <input type="checkbox" className="mr-2" /> Upload document
        </label>
        <input type="file" className="mb-4" />
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Application Process</h3>
        <ol className="list-decimal pl-5 text-sm sm:text-base">
          <li>Fill your profile details</li>
          <li>Upload required documents</li>
          <li>Submit the application</li>
        </ol>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">FAQ</h3>
        {faq.map((item, index) => (
          <div key={index} className="mb-2">
            <p className="font-medium text-sm sm:text-base">{item.q}</p>
            <p className="text-gray-600 text-sm sm:text-base">{item.a}</p>
          </div>
        ))}
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Contact & Support</h3>
        <p className="text-sm sm:text-base">{contact}</p>
      </div>
      <div className="flex flex-wrap gap-2 sm:gap-4">
        <button className="bg-indigo-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base">Download Application Form</button>
        <button className="bg-green-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base">Set Deadline Reminder</button>
      </div>
    </div>
  );
}

export default SchemeDetails;
