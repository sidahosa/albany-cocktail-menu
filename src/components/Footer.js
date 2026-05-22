import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative border-t border-gold/15 bg-ink-800/60">
      <div className="max-w-6xl mx-auto px-6 py-14 text-center">
        <div className="deco-rule mb-6">
          <span className="diamond" />
        </div>

        <p className="font-display text-3xl font-semibold gold-text">Albany Cocktails</p>
        <p className="mt-3 text-ash text-sm max-w-md mx-auto">
          Your go-to place for the finest cocktail recipes and after-dark inspiration.
        </p>

        <ul className="mt-7 flex items-center justify-center gap-8 text-[0.68rem] uppercase tracking-[0.28em] text-ash">
          <li><Link to="/" className="hover:text-gold transition-colors">Home</Link></li>
          <li><Link to="/about" className="hover:text-gold transition-colors">About</Link></li>
        </ul>

        <p className="mt-8 text-[0.62rem] uppercase tracking-[0.3em] text-ash/60">
          Please enjoy responsibly · © {new Date().getFullYear()} Albany Cocktails
        </p>
      </div>
    </footer>
  );
};

export default Footer;