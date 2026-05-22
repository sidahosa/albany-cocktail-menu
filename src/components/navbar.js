import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
];

const GlassMark = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M4 4h16l-7 8v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 18h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <circle cx="15.5" cy="7" r="1.1" fill="currentColor" />
  </svg>
);

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const linkClass = (to) =>
    `relative text-[0.72rem] uppercase tracking-[0.28em] py-1 transition-colors duration-300
     after:absolute after:left-0 after:-bottom-0.5 after:h-px after:bg-gold-sheen
     after:transition-all after:duration-300
     ${pathname === to ? "text-gold after:w-full" : "text-ash hover:text-ivory after:w-0 hover:after:w-full"}`;

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-ink/70 border-b border-gold/20">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Brand */}
        <Link to="/" className="group flex items-center gap-3 text-gold" onClick={() => setMenuOpen(false)}>
          <span className="grid place-items-center w-9 h-9 rounded-full border border-gold/40 text-gold transition-all duration-300 group-hover:shadow-gold-sm group-hover:border-gold/70">
            <GlassMark />
          </span>
          <span className="leading-none">
            <span className="block font-display text-xl font-semibold text-ivory tracking-wide">Albany</span>
            <span className="block text-[0.58rem] uppercase tracking-[0.42em] text-gold">Cocktails</span>
          </span>
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <li key={l.to}>
              <Link to={l.to} className={linkClass(l.to)}>{l.label}</Link>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          aria-label="Toggle menu"
          className="md:hidden grid place-items-center w-10 h-10 rounded-full border border-gold/30 text-gold"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="text-lg leading-none">{menuOpen ? "✕" : "☰"}</span>
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-500 ${menuOpen ? "max-h-60" : "max-h-0"}`}>
        <ul className="flex flex-col items-center gap-5 py-6 border-t border-gold/10 bg-ink/80">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                onClick={() => setMenuOpen(false)}
                className={`text-sm uppercase tracking-[0.28em] ${pathname === l.to ? "text-gold" : "text-ash hover:text-ivory"}`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;