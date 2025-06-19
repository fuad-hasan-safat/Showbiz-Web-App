import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="py-5 relative z-[999]">
      <div className="container">
        <div className="flex justify-between items-center px-5 relative">
          <div></div>

          {/* Logo */}
          <Link href="/">
            <img src="/images/logo.png" alt="Logo" className="h-8" />
          </Link>

          {/* Menu Icon */}
          <div>
            <button onClick={() => setMenuOpen(!menuOpen)}>
              <img
                src={'/images/hambar.png'}
                alt="Menu"
                className="h-6 w-6"
              />
            </button>
          </div>
          {/* Slide NavBar */}
          <NavBar isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
        </div>
      </div>
    </div>
  );
};

export default Header;
