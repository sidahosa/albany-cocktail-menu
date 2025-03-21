import React from "react";

const About = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center px-6 py-10">
      <div className="max-w-4xl text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-6">Welcome to Albany Cocktails! 🍸</h1>
        
        <p className="text-lg mb-6">
          Hey there, I’m <span className="text-yellow-400 font-bold">Shawn Idahosa</span>—your unofficial bartender, mixologist, sommelier and overall drinks enthusiast.  
          Whether you're here at the crib for a fancy cocktail, a straight-up shot, or just a splash of juice in your tequlia, you’re at the right place.  
        </p>

        {/* Section 1: Wine Lovers */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-yellow-400">🍷 For the Wine Lovers</h3>
          <p className="text-lg">
            Fancy a classy evening? Grab a glass of red, white, or whatever color makes you feel sophisticated  
            (we don’t judge if it comes from a box). Whether you're swirling your glass like a sommelier or just looking for  
            something that pairs well with watching Netflix in pajamas, I got you covered.
          </p>
        </div>

        {/* Section 2: Straight Shots */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-yellow-400">🥃 For the Shot-Takers</h3>
          <p className="text-lg">
            Some people like their drinks on the rocks. Others prefer them right down the hatch.  
            If you like whiskey, tequila, vodka, rum, or anything that makes your throat question your life choices—  
            this is your safe space. Raise a glass and take that shot. No salt, no lime? Respect.
          </p>
        </div>

        {/* Section 3: Easy Mixed Drinks */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-yellow-400">🍹 For the "Just Mix It" Crowd</h3>
          <p className="text-lg">
            Not in the mood for anything fancy? No problem.  
            Just grab your favorite liquor and throw in some soda, juice, or whatever’s left in your fridge.  
            Boom—instant drink! Whether it’s rum and coke, vodka and cranberry, or whiskey and bad decisions,  
            we respect the simplicity of a solid mixed drink.
          </p>
        </div>

        {/* Section 4: The Final Toast */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-yellow-400">🥂 Final Words</h3>
          <p className="text-lg">
            Whether you're sipping slow or going all in, Cocktail Haven is here to guide you to better drinks and better nights.  
            Now, go ahead and mix something up—or just pour yourself a glass of whatever's closest.  
            <span className="italic">Cheers! 🍸</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
