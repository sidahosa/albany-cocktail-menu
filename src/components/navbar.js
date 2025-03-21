import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-black text-yellow-400 py-4 px-6 border-b border-yellow-500">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold">🍸 Albany Cocktails</Link>

        {/* Hamburger Menu Button (Mobile) */}
        <button className="md:hidden text-yellow-400 text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6">
          <li><Link to="/" className="hover:text-white">Home</Link></li>
          <li><Link to="/about" className="hover:text-white">About</Link></li>
        </ul>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="md:hidden flex flex-col items-center mt-4 space-y-3">
          <li><Link to="/" className="hover:text-white" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/about" className="hover:text-white" onClick={() => setMenuOpen(false)}>About</Link></li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
