// ============================================================
// Shared cocktail helpers
// ============================================================

// Words to strip from the front of an ingredient string so that
// "2 oz Fresh Lime Juice" normalizes to "lime juice".
const UNIT_WORDS = new Set([
  "oz", "ounce", "ounces", "ml", "cl", "l", "dash", "dashes", "tsp",
  "teaspoon", "teaspoons", "tbsp", "tablespoon", "tablespoons", "cup", "cups",
  "part", "parts", "splash", "splashes", "barspoon", "barspoons", "drop", "drops",
  "pinch", "pinches", "slice", "slices", "wedge", "wedges", "sprig", "sprigs",
  "leaf", "leaves", "cube", "cubes", "shot", "shots", "scoop", "scoops",
  "bottle", "can", "cans", "handful", "piece", "pieces", "glass", "top", "fill",
  "to", "of", "fresh", "chilled", "cold", "large", "small", "medium", "whole",
  "ripe", "good", "quality", "freshly", "squeezed",
]);

const FRACTIONS = /[¼½¾⅓⅔⅛⅜⅝⅞]/g;

/**
 * Reduce a free-text ingredient line to a base ingredient name.
 * Heuristic — works best when ingredients are written plainly.
 */
export function normalizeIngredient(raw) {
  if (!raw) return "";
  let s = String(raw).toLowerCase();
  s = s.split(",")[0];                       // "lime, juiced" -> "lime"
  s = s.replace(/\([^)]*\)/g, " ");          // drop parentheticals
  s = s.replace(FRACTIONS, " ")              // ½ etc.
       .replace(/[0-9]+(\.[0-9]+)?/g, " ")   // numbers
       .replace(/\//g, " ");                 // 1/2
  let tokens = s.split(/\s+/).filter(Boolean);
  while (tokens.length && UNIT_WORDS.has(tokens[0])) tokens.shift();
  return tokens.join(" ").replace(/[^a-z\s-]/g, "").trim();
}

export function titleCase(s) {
  return String(s).replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Unique, normalized base ingredients for one cocktail. */
export function getBaseIngredients(cocktail) {
  const list = Array.isArray(cocktail?.ingredients) ? cocktail.ingredients : [];
  const set = new Set();
  list.forEach((i) => {
    const n = normalizeIngredient(i);
    if (n) set.add(n);
  });
  return [...set];
}

/**
 * Pick the spotlight cocktail.
 * Honors an explicit `featured: true` flag if present; otherwise rotates a
 * deterministic "cocktail of the day" so it stays stable across re-renders.
 */
export function pickFeatured(cocktails = []) {
  if (!cocktails.length) return null;
  const flagged = cocktails.find((c) => c.featured);
  if (flagged) return flagged;

  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((now - start) / 86400000);

  const sorted = [...cocktails].sort((a, b) =>
    (a.cocktailName || "").localeCompare(b.cocktailName || "")
  );
  return sorted[dayOfYear % sorted.length];
}

// Loose ranking so "Strength" sort orders light -> strong when possible.
const STRENGTH_RANK = {
  mild: 1, light: 1, easy: 1, low: 1, soft: 1,
  medium: 2, balanced: 2, moderate: 2,
  strong: 3, boozy: 3, stiff: 3, high: 3, potent: 3,
};

export function strengthRank(s) {
  if (!s) return 99;
  const key = String(s).toLowerCase();
  for (const k in STRENGTH_RANK) if (key.includes(k)) return STRENGTH_RANK[k];
  return 50;
}