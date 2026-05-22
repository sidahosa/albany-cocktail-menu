import React from "react";
import marg from "../images/marg.png";
import mart from "../images/mart.png";

const HeroSection = () => {
  return (
    <header className="relative overflow-hidden">
      {/* faint deco frame */}
      <div className="pointer-events-none absolute inset-5 sm:inset-8 border border-gold/10 rounded-sm" />

      <div className="relative max-w-5xl mx-auto px-6 pt-20 pb-16 sm:pt-28 sm:pb-20 text-center">
        <p className="eyebrow rise" style={{ animationDelay: "0.05s" }}>
          Est. Albany · Craft Cocktails
        </p>

        <div className="mt-8 flex items-center justify-center gap-6 sm:gap-12">
          <img
            src={marg}
            alt=""
            className="hidden sm:block h-24 lg:h-32 drop-shadow-[0_0_24px_rgba(212,175,55,0.25)] rise"
            style={{ animationDelay: "0.15s" }}
          />
          <h1
            className="font-display font-semibold leading-[0.98] text-4xl sm:text-5xl lg:text-6xl rise"
            style={{ animationDelay: "0.2s" }}
          >
            <span className="block text-ivory">Discover Our</span>
            <span className="block gold-text italic">Exquisite Selection</span>
            <span className="block text-ivory">of Craft Cocktails</span>
          </h1>
          <img
            src={mart}
            alt=""
            className="hidden sm:block h-24 lg:h-32 drop-shadow-[0_0_24px_rgba(212,175,55,0.25)] rise"
            style={{ animationDelay: "0.15s" }}
          />
        </div>

        {/* mobile glasses row */}
        <div className="sm:hidden mt-8 flex items-center justify-center gap-10 rise" style={{ animationDelay: "0.25s" }}>
          <img src={marg} alt="" className="h-20 drop-shadow-[0_0_18px_rgba(212,175,55,0.25)]" />
          <img src={mart} alt="" className="h-20 drop-shadow-[0_0_18px_rgba(212,175,55,0.25)]" />
        </div>

        <p className="mt-8 max-w-xl mx-auto text-ash text-base sm:text-lg rise" style={{ animationDelay: "0.3s" }}>
          Hand-picked recipes, time-honored classics, and a few well-kept secrets —
          poured for the discerning palate.
        </p>

        <div className="mt-12 deco-rule rise" style={{ animationDelay: "0.4s" }}>
          <span className="diamond" />
        </div>
      </div>
    </header>
  );
};

export default HeroSection;