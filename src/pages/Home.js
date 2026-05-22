import React, { useEffect, useState } from "react";
import FeaturedCocktail from "../components/FeaturedCocktail";
import CocktailGrid from "../components/Cocktailgridsection";
import dynamoDB from "../api/config";

const Home = () => {
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCocktails = async () => {
      try {
        const data = await dynamoDB.scan({ TableName: "Cocktails" }).promise();
        setCocktails(data.Items || []);
      } catch (error) {
        console.error("Error fetching cocktails:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCocktails();
  }, []);

  return (
    <div>
      {/* <HeroSection /> */}
      <FeaturedCocktail cocktails={cocktails} loading={loading} />
      <CocktailGrid cocktails={cocktails} loading={loading} />
    </div>
  );
};

export default Home;