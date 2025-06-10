import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AcademicCapIcon, UserGroupIcon, SparklesIcon } from '@heroicons/react/24/solid';

function Banner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-indigo-50 rounded-xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8"
    >
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="md:w-1/2 mb-6 md:mb-0 md:pr-8"
        >
          <motion.h1
            whileHover={{ scale: 1.02 }}
            className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4"
          >
            Find government schemes you qualify for in minutes.
          </motion.h1>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/profile"
              className="inline-block bg-indigo-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Get Started
            </Link>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="md:w-1/2 flex justify-center"
        >
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md max-w-xs">
            <motion.div
              className="flex justify-center space-x-2 sm:space-x-4 mb-2 sm:mb-3"
              whileHover={{ scale: 1.05 }}
            >
              <AcademicCapIcon className="h-10 w-10 text-indigo-600" />
              <UserGroupIcon className="h-10 w-10 text-indigo-600" />
              <SparklesIcon className="h-10 w-10 text-indigo-600" />
            </motion.div>
            <p className="text-center text-sm sm:text-base text-gray-600">
              Diverse users (students, women, rural families)
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Banner;
