import React, { useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { UserIcon, MapPinIcon, ArrowRightCircleIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

const fieldVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, type: 'spring', stiffness: 100, damping: 12 }
  }),
};

export default function ProfileForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
    setFocus,
  } = useForm({ mode: 'onTouched' });

  const ageRef = useRef(null);

  // Auto-focus first field on mount for kiosk users
  useEffect(() => {
    if (ageRef.current) ageRef.current.focus();
  }, []);

  const onSubmit = (data) => {
    // Handle form submission (e.g., send to API)
    // reset(); // Uncomment to reset form after submission
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 max-w-md mx-auto"
    >
      <h3 className="text-2xl font-bold text-indigo-700 mb-6 flex items-center gap-2">
        <UserIcon className="h-7 w-7 text-indigo-400" />
        Your Profile
      </h3>

      <AnimatePresence>
        {isSubmitSuccessful ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center py-12"
          >
            <CheckCircleIcon className="h-16 w-16 text-green-500 mb-3" />
            <div className="text-xl font-semibold text-gray-800 mb-2">Profile Saved!</div>
            <button
              onClick={() => reset()}
              className="mt-4 bg-indigo-600 text-white px-6 py-3 rounded-full shadow-lg text-lg font-bold hover:bg-indigo-700 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              Edit Again
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit(onSubmit)}
            initial="hidden"
            animate="visible"
            className="space-y-6"
            aria-label="Profile form"
          >
            <motion.div custom={0} variants={fieldVariants} className="relative">
              <label htmlFor="age" className="block text-gray-700 mb-2 text-lg font-medium">
                Age
              </label>
              <input
                ref={ageRef}
                id="age"
                type="number"
                {...register('age', {
                  required: 'Age is required',
                  min: { value: 1, message: 'Must be at least 1' },
                  max: { value: 120, message: 'Enter a valid age' }
                })}
                className={`w-full border-2 rounded-xl px-5 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all ${
                  errors.age ? 'border-red-400' : 'border-gray-200'
                }`}
                inputMode="numeric"
                min={1}
                max={120}
                placeholder="Enter your age"
                onFocus={() => setFocus('age')}
                aria-required="true"
                aria-invalid={errors.age ? "true" : "false"}
              />
              {errors.age && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-1 text-red-600 text-sm absolute left-0"
                  role="alert"
                  aria-live="polite"
                >
                  {errors.age.message}
                </motion.p>
              )}
            </motion.div>

            <motion.div custom={1} variants={fieldVariants} className="relative">
              <label htmlFor="gender" className="block text-gray-700 mb-2 text-lg font-medium">
                Gender
              </label>
              <select
                id="gender"
                {...register('gender', { required: 'Gender is required' })}
                className={`w-full border-2 rounded-xl px-5 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all ${
                  errors.gender ? 'border-red-400' : 'border-gray-200'
                }`}
                onFocus={() => setFocus('gender')}
                aria-required="true"
                aria-invalid={errors.gender ? "true" : "false"}
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-1 text-red-600 text-sm absolute left-0"
                  role="alert"
                  aria-live="polite"
                >
                  {errors.gender.message}
                </motion.p>
              )}
            </motion.div>

            <motion.div custom={2} variants={fieldVariants} className="relative">
              <label htmlFor="location" className="block text-gray-700 mb-2 text-lg font-medium">
                Location (State)
              </label>
              <div className="relative">
                <input
                  id="location"
                  type="text"
                  {...register('location', { required: 'Location is required' })}
                  className={`w-full border-2 rounded-xl px-5 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all ${
                    errors.location ? 'border-red-400' : 'border-gray-200'
                  }`}
                  placeholder="e.g. Uttar Pradesh"
                  onFocus={() => setFocus('location')}
                  aria-required="true"
                  aria-invalid={errors.location ? "true" : "false"}
                />
                <MapPinIcon className="h-6 w-6 text-indigo-300 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              {errors.location && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-1 text-red-600 text-sm absolute left-0"
                  role="alert"
                  aria-live="polite"
                >
                  {errors.location.message}
                </motion.p>
              )}
            </motion.div>

            <motion.div custom={3} variants={fieldVariants}>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-4 rounded-xl shadow-lg text-lg font-bold hover:bg-indigo-700 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                <ArrowRightCircleIcon className="h-6 w-6" />
                <span>Save Profile</span>
              </button>
            </motion.div>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
