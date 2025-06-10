import React, { useState, Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';

function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', to: '/' },
    { name: 'Schemes', to: '/schemes' },
    { name: 'NGO Dashboard', to: '/ngo' },
    { name: 'Contact', to: '/support' },
  ];

  const activeLink = (path) =>
    location.pathname === path
      ? 'text-indigo-600 font-semibold'
      : 'text-gray-700';

  return (
    <>
      {/* Desktop Nav */}
      <nav className="hidden sm:flex gap-4 items-center">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`px-4 py-2 rounded-lg hover:bg-indigo-50 transition-all ${activeLink(item.to)}`}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Mobile Toggle */}
      <div className="sm:hidden relative z-50">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-md bg-indigo-100 text-indigo-600 focus:outline-none"
        >
          {mobileMenuOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>

        {/* Animated Dropdown */}
        <Transition
          show={mobileMenuOpen}
          as={Fragment}
          enter="transition ease-out duration-150"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-100 rounded-lg shadow-lg ring-1 ring-black/5">
            <div className="py-1">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2 text-sm hover:bg-indigo-50 transition ${activeLink(item.to)}`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </Transition>
      </div>
    </>
  );
}

export default Navigation;
