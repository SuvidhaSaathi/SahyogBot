import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 sm:py-6">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm sm:text-base">© 2025 SahyogBot. All rights reserved.</p>
        <div className="mt-2 flex justify-center gap-2 sm:gap-4">
          <a href="#" className="text-gray-300 hover:text-white text-xs sm:text-sm">Privacy</a>
          <a href="#" className="text-gray-300 hover:text-white text-xs sm:text-sm">Terms</a>
          <a href="#" className="text-gray-300 hover:text-white text-xs sm:text-sm">Contact</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
