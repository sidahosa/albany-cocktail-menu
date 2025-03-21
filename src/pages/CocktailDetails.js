import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dynamoDB from "../api/config";

const CocktailDetails = () => {
  const { cocktailName } = useParams();
  const [cocktail, setCocktail] = useState(null);

  useEffect(() => {
    const fetchCocktail = async () => {
      const params = {
        TableName: "Cocktails",
        KeyConditionExpression: "cocktailName = :name",
        ExpressionAttributeValues: {
          ":name": cocktailName,
        },
      };

      try {
        const data = await dynamoDB.query(params).promise();
        if (data.Items.length > 0) {
          setCocktail(data.Items[0]);
        }
      } catch (error) {
        console.error("Error fetching cocktail:", error);
      }
    };

    fetchCocktail();
  }, [cocktailName]);

  if (!cocktail) {
    return <div className="text-white text-center mt-20">Loading...</div>;
  }

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center px-6 py-10">
      <div className="max-w-4xl w-full flex flex-col md:flex-row items-center gap-8">
        {/* Cocktail Image */}
        <img 
          src={cocktail.imageURL} 
          alt={cocktail.cocktailName} 
          className="w-full md:w-1/2 rounded-lg shadow-lg"
        />

        {/* Cocktail Details */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold text-yellow-400 mb-4">
            {cocktail.cocktailName}
          </h1>
          <p className="text-lg mb-6">{cocktail.description}</p>

          {/* Liquor Type */}
          <div className="mb-4">
            <h3 className="text-lg md:text-xl font-bold text-yellow-400">Liquor Type</h3>
            <p className="text-base md:text-lg">{cocktail.spiritUsed}</p>
          </div>

          {/* Strength */}
          <div className="mb-4">
            <h3 className="text-lg md:text-xl font-bold text-yellow-400">Strength</h3>
            <p className="text-base md:text-lg">{cocktail.strength}</p>
          </div>

          {/* Types */}
          <div className="mb-4">
            <h3 className="text-lg md:text-xl font-bold text-yellow-400">Types</h3>
            <p className="text-base md:text-lg">{cocktail.types.join(", ")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CocktailDetails;
