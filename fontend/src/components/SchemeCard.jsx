import React from "react";
import { CalendarDaysIcon, BadgeCheckIcon } from "lucide-react";

export default function SchemeCard({ name, description, eligibility, benefits, deadline }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 hover:shadow-xl transition-all">
      <h3 className="text-xl font-semibold text-indigo-700 mb-2">{name}</h3>
      <p className="text-gray-700 mb-2">{description}</p>

      <div className="text-sm text-gray-600 space-y-1 mb-4">
        <p><span className="font-medium">🎯 Eligibility:</span> {eligibility}</p>
        <p><span className="font-medium">🎁 Benefits:</span> {benefits}</p>
      </div>

      <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <CalendarDaysIcon className="w-4 h-4" />
          <span>Deadline: {deadline}</span>
        </div>
        <button className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1 transition">
          <BadgeCheckIcon className="w-4 h-4" />
          Apply Now
        </button>
      </div>
    </div>
  );
}
