import React from "react";
import marg from '../images/marg.png';
import mart from '../images/mart.png';

const HeroSection = () => {
  return (
    <div className="bg-black text-white text-center py-10">
      <div className="flex justify-center items-center space-x-6">
        <img src={marg} alt="Glass" className="h-20" />
        <h2 className="text-3xl font-semibold">Discover Our Exquisite Selection of Craft Cocktails</h2>
        <img src={mart} alt="Glass" className="h-20" />
      </div>
    </div>
  );
};

export default HeroSection;
