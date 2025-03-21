import React from "react";
import { useNavigate } from "react-router-dom";

const CocktailCard = ({ cocktailName, description, imageURL }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-gray-900 text-white rounded-lg overflow-hidden shadow-lg cursor-pointer transition-transform transform hover:scale-105"
      onClick={() => navigate(`/cocktail/${encodeURIComponent(cocktailName)}`)}
    >
      <img src={imageURL} alt={cocktailName} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold text-yellow-400">{cocktailName}</h3>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
};

export default CocktailCard;
