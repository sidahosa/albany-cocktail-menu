import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { pickFeatured } from "../utils/cocktails";

const FeaturedCocktail = ({ cocktails = [], loading }) => {
  const navigate = useNavigate();
  const featured = useMemo(() => pickFeatured(cocktails), [cocktails]);

  if (loading) {
    return (
      <section className="px-4 pb-10">
        <div className="max-w-6xl mx-auto rounded-3xl border border-gold/15 overflow-hidden grid md:grid-cols-2">
          <div className="skeleton h-72 md:h-[26rem]" />
          <div className="p-8 md:p-12 space-y-4">
            <div className="skeleton h-3 w-32 rounded" />
            <div className="skeleton h-12 w-2/3 rounded" />
            <div className="skeleton h-3 w-full rounded" />
            <div className="skeleton h-3 w-5/6 rounded" />
            <div className="skeleton h-10 w-40 rounded mt-4" />
          </div>
        </div>
      </section>
    );
  }

  if (!featured) return null;

  const go = () => navigate(`/cocktail/${encodeURIComponent(featured.cocktailName)}`);
  const meta = [featured.spiritUsed, featured.strength, featured.types?.[0]].filter(Boolean);

  return (
    <section className="px-4 pb-12 px-6 pt-20">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl border border-gold/20 bg-ink-700/60 shadow-gold">
          <div className="grid md:grid-cols-2">
            {/* Image */}
            <button onClick={go} className="group relative h-72 md:h-[26rem] overflow-hidden text-left">
              <img
                src={featured.imageURL}
                alt={featured.cocktailName}
                className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-700 via-ink-700/20 to-transparent md:bg-gradient-to-r md:from-transparent md:to-ink-700" />
            </button>

            {/* Copy */}
            <div className="relative p-8 md:p-12 flex flex-col justify-center">
              <p className="eyebrow rise" style={{ animationDelay: "0.05s" }}>Tonight&apos;s Pour</p>
              <h2
                className="mt-3 font-display text-4xl md:text-5xl font-semibold gold-text rise"
                style={{ animationDelay: "0.12s" }}
              >
                {featured.cocktailName}
              </h2>
              <p
                className="mt-4 text-ash leading-relaxed line-clamp-4 rise"
                style={{ animationDelay: "0.18s" }}
              >
                {featured.description}
              </p>

              {meta.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2 rise" style={{ animationDelay: "0.24s" }}>
                  {meta.map((m, i) => (
                    <span
                      key={i}
                      className="text-[0.62rem] uppercase tracking-[0.2em] text-gold border border-gold/30 rounded-full px-3 py-1.5 bg-gold/5"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              )}

              <button
                onClick={go}
                className="mt-8 self-start inline-flex items-center gap-2 px-6 py-3 rounded-lg text-xs uppercase tracking-[0.2em] font-medium text-ink bg-gold-sheen transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-gold rise"
                style={{ animationDelay: "0.3s" }}
              >
                View Recipe
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
            </div>
          </div>

          {/* Deco corners */}
          <div className="pointer-events-none absolute top-4 left-4 w-10 h-10 border-t border-l border-gold/40 rounded-tl-lg" />
          <div className="pointer-events-none absolute bottom-4 right-4 w-10 h-10 border-b border-r border-gold/40 rounded-br-lg" />
        </div>
      </div>
    </section>
  );
};

export default FeaturedCocktail;