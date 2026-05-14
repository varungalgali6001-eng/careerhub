import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Briefcase, Building2, LayoutGrid, Menu, X } from 'lucide-react';

const navLinks = [
  { to: '/',            label: 'Jobs',        icon: Briefcase },
  { to: '/companies',   label: 'Companies',   icon: Building2 },
  { to: '/recruiter',   label: 'For Employers', icon: LayoutGrid },
];

export default function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src="/logo.png" alt="CareerHub Logo" className="h-16 w-auto object-contain scale-[1.3] origin-left mix-blend-multiply" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label }) => {
              const active = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                    active
                      ? 'text-brand-blue font-semibold'
                      : 'text-gray-600 hover:text-brand-blue'
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          {/* Right buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/applications"
              className="px-5 py-2 rounded-full border-2 border-brand-blue text-brand-blue text-sm font-semibold hover:bg-blue-50 transition"
            >
              Applications
            </Link>
            <Link
              to="/saved"
              className="px-5 py-2 rounded-full border-2 border-brand-blue text-brand-blue text-sm font-semibold hover:bg-blue-50 transition"
            >
              Saved Jobs
            </Link>
            <Link
              to="/profile"
              className="px-5 py-2 rounded-full bg-brand-orange hover:bg-brand-orangeDark text-white text-sm font-semibold transition shadow-md"
            >
              My Profile
            </Link>
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden text-gray-500 hover:text-gray-800 transition" onClick={() => setOpen(!open)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden border-t border-gray-100 py-3 space-y-1 animate-fade-in">
            {[...navLinks,
              { to: '/applications', label: 'Applications' },
              { to: '/saved',        label: 'Saved Jobs'   },
              { to: '/profile',      label: 'My Profile'   },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                  location.pathname === to
                    ? 'text-brand-blue bg-blue-50'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-brand-blue'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
