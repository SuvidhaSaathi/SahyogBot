import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const steps = ["Basic Info", "Details", "Education", "Women-Specific", "Voice Input"];

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export default function ProfileWizard() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    location: "",
    income: "",
    caste: "",
    special: "",
    education: "",
    employment: "",
    marital: "",
    shg: "",
    maternity: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, steps.length));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        alert("❌ Submission failed. Try again.");
      }
    } catch (err) {
      alert("⚠️ Error submitting: " + err.message);
    }
    setLoading(false);
  };

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <>
            <h3 className="text-xl font-semibold mb-6">Basic Information</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <TextField label="Name" name="name" value={form.name} onChange={handleChange} />
              <TextField label="Age" type="number" name="age" value={form.age} onChange={handleChange} />
              <SelectField label="Gender" name="gender" value={form.gender} onChange={handleChange} options={["Male", "Female", "Other"]} />
              <TextField label="Location (State)" name="location" value={form.location} onChange={handleChange} />
            </div>
          </>
        );
      case 1:
        return (
          <>
            <h3 className="text-xl font-semibold mb-6">Additional Details</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <SelectField label="Income Bracket" name="income" value={form.income} onChange={handleChange} options={["Low", "Medium", "High"]} />
              <TextField label="Caste / Community (optional)" name="caste" value={form.caste} onChange={handleChange} />
              <SelectField label="Special Category" name="special" value={form.special} onChange={handleChange} options={["Disability", "Orphan", "Other"]} />
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h3 className="text-xl font-semibold mb-6">Education & Employment</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <SelectField label="Education Level" name="education" value={form.education} onChange={handleChange} options={["School", "College", "Graduate"]} />
              <SelectField label="Employment Status" name="employment" value={form.employment} onChange={handleChange} options={["Employed", "Unemployed", "Student"]} />
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h3 className="text-xl font-semibold mb-6">Women-Specific (if applicable)</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <SelectField label="Marital Status" name="marital" value={form.marital} onChange={handleChange} options={["Single", "Married", "Divorced"]} />
              <SelectField label="SHG Membership" name="shg" value={form.shg} onChange={handleChange} options={["Yes", "No"]} />
              <SelectField label="Pregnancy/Maternity" name="maternity" value={form.maternity} onChange={handleChange} options={["Pregnant", "Mother", "None"]} />
            </div>
          </>
        );
      case 4:
        return (
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Voice Input</h3>
            <p className="text-gray-600 mb-6">Speak your details for kiosk/voice-first users.</p>
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition-all shadow-lg">
              🎤 Start Voice Input
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 sm:p-10 max-w-3xl mx-auto mt-6 mb-10 border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">Profile Wizard</h2>

      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            {...fadeIn}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            {submitted ? (
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-green-600 text-4xl mb-4"
                >
                  ✅
                </motion.div>
                <h3 className="text-xl font-semibold text-green-700 mb-4">Profile Submitted Successfully!</h3>
                <p className="text-gray-600 mb-6">Choose what you’d like to do next:</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-all shadow">
                    Save & Find Schemes
                  </button>
                  <button className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition-all shadow">
                    Just Find Schemes
                  </button>
                </div>
              </div>
            ) : (
              renderStepContent()
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {!submitted && (
        <div className="flex justify-between mt-6">
          <button
            onClick={prevStep}
            disabled={step === 0}
            className={`px-4 py-2 rounded-lg font-medium ${
              step === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gray-100 hover:bg-gray-200 text-gray-800"
            }`}
          >
            ◀ Back
          </button>
          {step < steps.length - 1 ? (
            <button
              onClick={nextStep}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-all shadow"
            >
              Next ▶
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`px-6 py-2 rounded-lg text-white transition-all shadow ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {loading ? "Submitting..." : "Submit ✅"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// 🔧 Custom Input Fields Below:

const TextField = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      {...props}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
    />
  </div>
);

const SelectField = ({ label, options, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <select
      {...props}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
    >
      <option value="">Select</option>
      {options.map((opt) => (
        <option key={opt.toLowerCase()} value={opt.toLowerCase()}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);
