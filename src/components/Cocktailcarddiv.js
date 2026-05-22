import React from "react";
import { useNavigate } from "react-router-dom";

const CocktailCard = ({ cocktailName, description, imageURL }) => {
  const navigate = useNavigate();

  return (
    <article
      onClick={() => navigate(`/cocktail/${encodeURIComponent(cocktailName)}`)}
      className="group relative cursor-pointer overflow-hidden rounded-xl border border-gold/15
                 bg-ink-700 transition-all duration-500 hover:-translate-y-1.5
                 hover:border-gold/45 hover:shadow-gold"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={imageURL}
          alt={cocktailName}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
      </div>

      {/* Body */}
      <div className="relative p-5">
        <h3 className="font-display text-2xl font-semibold text-gold tracking-wide">
          {cocktailName}
        </h3>
        <p className="mt-1.5 text-sm text-ash leading-relaxed line-clamp-2">
          {description}
        </p>

        <span className="mt-4 inline-flex items-center gap-2 text-[0.66rem] uppercase tracking-[0.28em] text-ash
                         transition-colors duration-300 group-hover:text-gold">
          View Recipe
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </article>
  );
};

export default CocktailCard;