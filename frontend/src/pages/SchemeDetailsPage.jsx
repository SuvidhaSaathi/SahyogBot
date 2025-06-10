import React from 'react';
import SchemeDetails from '../components/SchemeDetails';

function SchemeDetailsPage() {
  const scheme = {
    name: "Scholarship for Students",
    description: "Financial aid for underprivileged students",
    eligibility: "Age 18-25, family income < 2 lakh/year, enrolled in recognized institution",
    benefits: "Tuition fee waiver, monthly stipend of ₹2,000, laptop/tablet for top performers",
    deadline: "2025-07-31",
    documents: ["Aadhaar card", "Income certificate", "Admission proof", "Bank details"],
    faq: [
      { q: "Who can apply?", a: "Students aged 18-25 with family income < 2 lakh/year" },
      { q: "How to apply?", a: "Fill the form and upload documents" }
    ],
    contact: "Helpline: 1800-123-4567, WhatsApp: +91 9876543210, Local SHG mentor: Priya (9876543211)",
    prefill: true
  };

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 max-w-4xl">
      <SchemeDetails {...scheme} />
    </div>
  );
}

export default SchemeDetailsPage;
