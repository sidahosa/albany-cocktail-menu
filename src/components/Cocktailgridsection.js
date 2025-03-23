import React, { useEffect, useState } from "react";
import dynamoDB from "../api/config";
import CocktailCard from "./Cocktailcarddiv";

const CocktailGrid = () => {
  const [cocktails, setCocktails] = useState([]);
  const [filteredCocktails, setFilteredCocktails] = useState([]);
  const [liquorType, setLiquorType] = useState("");
  const [strength, setStrength] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    const fetchCocktails = async () => {
      const params = {
        TableName: "Cocktails",
      };

      try {
        const data = await dynamoDB.scan(params).promise();
        setCocktails(data.Items);
        setFilteredCocktails(data.Items);
      } catch (error) {
        console.error("Error fetching cocktails:", error);
      }
    };

    fetchCocktails();
  }, []);

  useEffect(() => {
    let filtered = cocktails;

    if (liquorType) {
      filtered = filtered.filter((cocktail) => cocktail.spiritUsed === liquorType);
    }
    if (strength) {
      filtered = filtered.filter((cocktail) => cocktail.strength === strength);
    }
    if (type) {
      filtered = filtered.filter((cocktail) => cocktail.types.includes(type));
    }

    setFilteredCocktails(
      [...filtered].sort((a, b) =>
        a.cocktailName.localeCompare(b.cocktailName)
      )
    );    
  }, [liquorType, strength, type, cocktails]);

  return (
    <div className="bg-black text-white py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">Explore All Cocktails</h2>

        {/* Mobile-Friendly Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
          <select
            className="w-full md:w-auto bg-gray-800 text-white px-4 py-2 rounded border border-yellow-400"
            value={liquorType}
            onChange={(e) => setLiquorType(e.target.value)}
          >
            <option value="">All Liquors</option>
            {[...new Set(cocktails.map((c) => c.spiritUsed))].map((spirit, index) => (
              <option key={index} value={spirit}>{spirit}</option>
            ))}
          </select>

          <select
            className="w-full md:w-auto bg-gray-800 text-white px-4 py-2 rounded border border-yellow-400"
            value={strength}
            onChange={(e) => setStrength(e.target.value)}
          >
            <option value="">All Strengths</option>
            {[...new Set(cocktails.map((c) => c.strength))].map((s, index) => (
              <option key={index} value={s}>{s}</option>
            ))}
          </select>

          <select
            className="w-full md:w-auto bg-gray-800 text-white px-4 py-2 rounded border border-yellow-400"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">All Types</option>
            {[...new Set(cocktails.flatMap((c) => c.types))].map((t, index) => (
              <option key={index} value={t}>{t}</option>
            ))}
          </select>

          <button
            className="w-full md:w-auto bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-300"
            onClick={() => {
              setLiquorType("");
              setStrength("");
              setType("");
            }}
          >
            Reset Filters
          </button>
        </div>

        {/* Responsive Cocktail Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredCocktails.length > 0 ? (
            filteredCocktails.map((cocktail, index) => (
              <CocktailCard key={index} {...cocktail} />
            ))
          ) : (
            <p className="text-center text-gray-400 col-span-3">No cocktails match the filters.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CocktailGrid;
