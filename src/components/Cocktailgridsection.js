import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import dynamoDB from "../api/config";
import CocktailCard from "./Cocktailcarddiv";
import { getBaseIngredients, titleCase, strengthRank } from "../utils/cocktails";

/* ---------- small inline icons ---------- */
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.6" />
    <path d="M14 14l3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);
const ShuffleIcon = () => (
  <svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M3 5h3l8 10h3M14 5h3M3 15h3l2.2-2.75M11.8 7.75 14 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14.5 3.5 17 5l-2.5 1.5M14.5 13.5 17 15l-2.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const Chevron = ({ open }) => (
  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true"
       className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
    <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ---------- helpers ---------- */
const SORTS = [
  { value: "name-asc", label: "Name · A–Z" },
  { value: "name-desc", label: "Name · Z–A" },
  { value: "strength", label: "Strength · light first" },
  { value: "spirit", label: "Spirit" },
];
const toggle = (arr, value) =>
  arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];

const Chip = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`text-[0.66rem] uppercase tracking-[0.16em] px-3.5 py-1.5 rounded-full border transition-all duration-300
      ${active
        ? "bg-gold-sheen text-ink border-transparent shadow-gold-sm"
        : "text-ash border-gold/25 hover:border-gold/55 hover:text-ivory"}`}
  >
    {children}
  </button>
);

const FacetRow = ({ label, children }) => (
  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
    <span className="text-[0.6rem] uppercase tracking-[0.24em] text-ash/70 sm:w-16 shrink-0 pt-1">{label}</span>
    <div className="flex flex-wrap gap-2">{children}</div>
  </div>
);

const CocktailGrid = ({ cocktails: cocktailsProp, loading: loadingProp }) => {
  const navigate = useNavigate();
  const selfManaged = cocktailsProp === undefined;

  const [fetched, setFetched] = useState([]);
  const [selfLoading, setSelfLoading] = useState(selfManaged);

  const [search, setSearch] = useState("");
  const [spirits, setSpirits] = useState([]);
  const [strengths, setStrengths] = useState([]);
  const [types, setTypes] = useState([]);
  const [sort, setSort] = useState("name-asc");
  const [barOpen, setBarOpen] = useState(false);
  const [bar, setBar] = useState([]);

  // Fallback fetch so the grid still works if dropped in standalone
  useEffect(() => {
    if (!selfManaged) return;
    (async () => {
      try {
        const data = await dynamoDB.scan({ TableName: "Cocktails" }).promise();
        setFetched(data.Items || []);
      } catch (error) {
        console.error("Error fetching cocktails:", error);
      } finally {
        setSelfLoading(false);
      }
    })();
  }, [selfManaged]);

  const cocktails = selfManaged ? fetched : cocktailsProp || [];
  const loading = selfManaged ? selfLoading : !!loadingProp;

  /* facet options */
  const spiritOptions = useMemo(
    () => [...new Set(cocktails.map((c) => c.spiritUsed).filter(Boolean))].sort(),
    [cocktails]
  );
  const strengthOptions = useMemo(
    () => [...new Set(cocktails.map((c) => c.strength).filter(Boolean))]
      .sort((a, b) => strengthRank(a) - strengthRank(b)),
    [cocktails]
  );
  const typeOptions = useMemo(
    () => [...new Set(cocktails.flatMap((c) => c.types || []).filter(Boolean))].sort(),
    [cocktails]
  );
  const barOptions = useMemo(() => {
    const set = new Set();
    cocktails.forEach((c) => getBaseIngredients(c).forEach((i) => set.add(i)));
    return [...set].sort();
  }, [cocktails]);

  /* filtering + sorting */
  const results = useMemo(() => {
    const q = search.trim().toLowerCase();

    let out = cocktails.filter((c) => {
      if (q) {
        const inName = (c.cocktailName || "").toLowerCase().includes(q);
        const inIng = (c.ingredients || []).some((i) => String(i).toLowerCase().includes(q));
        const inDesc = (c.description || "").toLowerCase().includes(q);
        if (!inName && !inIng && !inDesc) return false;
      }
      if (spirits.length && !spirits.includes(c.spiritUsed)) return false;
      if (strengths.length && !strengths.includes(c.strength)) return false;
      if (types.length && !(c.types || []).some((t) => types.includes(t))) return false;
      if (bar.length) {
        const base = getBaseIngredients(c);
        if (!base.length || !base.every((i) => bar.includes(i))) return false;
      }
      return true;
    });

    return [...out].sort((a, b) => {
      const byName = (a.cocktailName || "").localeCompare(b.cocktailName || "");
      switch (sort) {
        case "name-desc": return -byName;
        case "strength":  return strengthRank(a.strength) - strengthRank(b.strength) || byName;
        case "spirit":    return (a.spiritUsed || "").localeCompare(b.spiritUsed || "") || byName;
        default:          return byName;
      }
    });
  }, [cocktails, search, spirits, strengths, types, bar, sort]);

  const activeCount =
    spirits.length + strengths.length + types.length + bar.length + (search ? 1 : 0);

  const resetAll = () => {
    setSearch(""); setSpirits([]); setStrengths([]); setTypes([]); setBar([]);
  };

  const surprise = () => {
    const pool = results.length ? results : cocktails;
    if (!pool.length) return;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    navigate(`/cocktail/${encodeURIComponent(pick.cocktailName)}`);
  };

  return (
    <section className="relative py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4">
          <p className="eyebrow">The Menu</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl font-semibold gold-text">
            Explore the Collection
          </h2>
        </div>
        <div className="deco-rule mb-10">
          <span className="diamond" />
        </div>

        {/* Control panel */}
        <div className="rounded-2xl border border-gold/15 bg-ink-700/50 p-5 sm:p-6 mb-8">
          {/* Row 1: search + sort + surprise */}
          <div className="flex flex-col lg:flex-row gap-3 lg:items-center">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/70"><SearchIcon /></span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or ingredient…"
                className="w-full bg-ink-800 text-ivory placeholder-ash/50 text-sm pl-11 pr-9 py-3 rounded-lg
                           border border-gold/25 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/40 transition-colors"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ash hover:text-gold text-sm"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex gap-3">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="lux-select bg-ink-800 text-ivory text-sm pl-4 pr-10 py-3 rounded-lg border border-gold/25
                           cursor-pointer hover:border-gold/55 focus:outline-none focus:border-gold transition-colors"
              >
                {SORTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>

              <button
                onClick={surprise}
                className="whitespace-nowrap inline-flex items-center gap-2 px-5 py-3 rounded-lg text-xs uppercase tracking-[0.16em]
                           font-medium border border-gold/40 text-gold transition-all duration-300
                           hover:bg-gold-sheen hover:text-ink hover:border-transparent"
              >
                <ShuffleIcon /> Surprise Me
              </button>
            </div>
          </div>

          {/* Facet chip groups */}
          <div className="mt-5 space-y-3">
            {spiritOptions.length > 0 && (
              <FacetRow label="Spirit">
                {spiritOptions.map((s) => (
                  <Chip key={s} active={spirits.includes(s)} onClick={() => setSpirits(toggle(spirits, s))}>{s}</Chip>
                ))}
              </FacetRow>
            )}
            {strengthOptions.length > 0 && (
              <FacetRow label="Strength">
                {strengthOptions.map((s) => (
                  <Chip key={s} active={strengths.includes(s)} onClick={() => setStrengths(toggle(strengths, s))}>{s}</Chip>
                ))}
              </FacetRow>
            )}
            {typeOptions.length > 0 && (
              <FacetRow label="Style">
                {typeOptions.map((t) => (
                  <Chip key={t} active={types.includes(t)} onClick={() => setTypes(toggle(types, t))}>{t}</Chip>
                ))}
              </FacetRow>
            )}
          </div>

          {/* My Bar */}
          <div className="mt-5 pt-5 border-t border-gold/10">
            <button
              onClick={() => setBarOpen(!barOpen)}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-gold hover:text-gold-bright transition-colors"
            >
              My Bar
              {bar.length > 0 && <span className="text-ash normal-case tracking-normal">· {bar.length} selected</span>}
              <Chevron open={barOpen} />
            </button>

            {barOpen && (
              <div className="mt-4">
                <p className="text-xs text-ash mb-3">
                  Tick what you have on hand — we&apos;ll show only drinks you can make right now.
                </p>
                {barOptions.length > 0 ? (
                  <div className="flex flex-wrap gap-2 max-h-44 overflow-y-auto pr-1">
                    {barOptions.map((i) => (
                      <Chip key={i} active={bar.includes(i)} onClick={() => setBar(toggle(bar, i))}>{titleCase(i)}</Chip>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-ash/70">No ingredient data available yet.</p>
                )}
              </div>
            )}
          </div>

          {/* Active summary */}
          {activeCount > 0 && (
            <div className="mt-5 flex items-center justify-between gap-3 flex-wrap">
              <p className="text-xs text-ash">
                {results.length} {results.length === 1 ? "drink" : "drinks"} match
              </p>
              <button
                onClick={resetAll}
                className="text-[0.66rem] uppercase tracking-[0.18em] text-gold hover:text-gold-bright transition-colors"
              >
                Clear all ({activeCount})
              </button>
            </div>
          )}
        </div>

        {/* Count line */}
        {!loading && (
          <p className="text-center text-[0.7rem] uppercase tracking-[0.24em] text-ash/70 mb-8">
            Showing {results.length} of {cocktails.length} cocktails
          </p>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-gold/10 overflow-hidden">
                <div className="skeleton h-56 w-full" />
                <div className="p-5 space-y-3">
                  <div className="skeleton h-5 w-2/3 rounded" />
                  <div className="skeleton h-3 w-full rounded" />
                  <div className="skeleton h-3 w-4/5 rounded" />
                </div>
              </div>
            ))
          ) : results.length > 0 ? (
            results.map((cocktail, index) => (
              <div
                key={cocktail.cocktailName || index}
                className="rise"
                style={{ animationDelay: `${Math.min(index * 0.05, 0.5)}s` }}
              >
                <CocktailCard {...cocktail} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <p className="font-display text-2xl text-gold">Nothing on this shelf</p>
              <p className="mt-2 text-ash text-sm">Try loosening your filters to see more pours.</p>
              {activeCount > 0 && (
                <button
                  onClick={resetAll}
                  className="mt-5 px-5 py-2.5 rounded-lg text-xs uppercase tracking-[0.18em] border border-gold/40 text-gold
                             hover:bg-gold-sheen hover:text-ink hover:border-transparent transition-all duration-300"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CocktailGrid;