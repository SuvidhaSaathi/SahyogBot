import React from 'react';
import { motion } from 'framer-motion';
import LanguageSelector from './LanguageSelector';
import Navigation from './Navigation';

function Header() {
  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex flex-wrap sm:flex-nowrap justify-between items-center gap-4">
        {/* Logo + Language */}
        <motion.div
          className="flex items-center gap-4"
          whileHover={{ scale: 1.02 }}
        >
          <motion.span
            className="text-2xl font-extrabold text-indigo-600 tracking-tight"
            whileHover={{ scale: 1.05, rotate: 2 }}
          >
            SahyogBot
          </motion.span>
          <LanguageSelector />
        </motion.div>

        {/* Navigation */}
        <Navigation />
      </div>
    </motion.header>
  );
}

export default Header;
