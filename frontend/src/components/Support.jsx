import React from 'react';

function Support() {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
      <h3 className="text-lg font-semibold mb-4">Support & Feedback</h3>
      <div className="mb-3 sm:mb-4">
        <h4 className="font-medium text-sm sm:text-base mb-1">Contact Form / Chatbot</h4>
        <form className="space-y-3">
          <div>
            <label className="block text-gray-700 mb-1 text-sm sm:text-base">Name</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base" />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 text-sm sm:text-base">Email</label>
            <input type="email" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base" />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 text-sm sm:text-base">Message</label>
            <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base" rows="4"></textarea>
          </div>
          <button type="submit" className="bg-indigo-600 text-white px-3 py-2 rounded-lg text-sm sm:text-base">
            Submit
          </button>
        </form>
      </div>
      <div className="mb-3 sm:mb-4">
        <h4 className="font-medium text-sm sm:text-base mb-1">FAQs</h4>
        <p className="text-gray-600 text-sm sm:text-base">Find answers to common questions.</p>
      </div>
      <div>
        <h4 className="font-medium text-sm sm:text-base mb-1">User Feedback Collection</h4>
        <p className="text-gray-600 text-sm sm:text-base">Share your experience with us.</p>
      </div>
    </div>
  );
}

export default Support;
