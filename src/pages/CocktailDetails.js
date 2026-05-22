import React, { useEffect, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import dynamoDB from "../api/config";
import CocktailCard from "../components/Cocktailcarddiv";

import {
  Box,
  Container,
  Typography,
  Card,
  CardMedia,
  Chip,
  Divider,
  Stack,
  Link,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBackIosNew";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import MenuBookIcon from "@mui/icons-material/MenuBook";

const CocktailDetails = () => {
  const { cocktailName } = useParams();
  const [cocktail, setCocktail] = useState(null);
  const [related, setRelated] = useState([]);

  // Fetch the cocktail (and reset view) whenever the name in the URL changes
  useEffect(() => {
    setCocktail(null);
    setRelated([]);
    window.scrollTo({ top: 0, behavior: "auto" });

    const fetchCocktail = async () => {
      const params = {
        TableName: "Cocktails",
        KeyConditionExpression: "cocktailName = :name",
        ExpressionAttributeValues: { ":name": cocktailName },
      };
      try {
        const data = await dynamoDB.query(params).promise();
        if (data.Items.length > 0) setCocktail(data.Items[0]);
      } catch (error) {
        console.error("Error fetching cocktail:", error);
      }
    };
    fetchCocktail();
  }, [cocktailName]);

  // Once we have the cocktail, find related ones (same spirit / shared style)
  useEffect(() => {
    if (!cocktail) return;
    let active = true;

    const fetchRelated = async () => {
      try {
        const data = await dynamoDB.scan({ TableName: "Cocktails" }).promise();
        const items = (data.Items || []).filter((c) => c.cocktailName !== cocktail.cocktailName);
        const scored = items
          .map((c) => {
            let score = 0;
            if (c.spiritUsed && c.spiritUsed === cocktail.spiritUsed) score += 2;
            const shared = (c.types || []).filter((t) => (cocktail.types || []).includes(t)).length;
            score += shared;
            return { c, score };
          })
          .filter((x) => x.score > 0)
          .sort((a, b) => b.score - a.score || (a.c.cocktailName || "").localeCompare(b.c.cocktailName || ""))
          .slice(0, 4)
          .map((x) => x.c);
        if (active) setRelated(scored);
      } catch (error) {
        console.error("Error fetching related cocktails:", error);
      }
    };
    fetchRelated();

    return () => { active = false; };
  }, [cocktail]);

  if (!cocktail) {
    return (
      <Box sx={{ minHeight: "70vh", display: "grid", placeItems: "center", textAlign: "center" }}>
        <Box>
          <CircularProgress sx={{ color: "primary.main" }} />
          <Typography sx={{ mt: 2, letterSpacing: "0.2em", textTransform: "uppercase", fontSize: 13, color: "text.secondary" }}>
            Mixing your drink…
          </Typography>
        </Box>
      </Box>
    );
  }

  const meta = [
    { label: "Liquor", value: cocktail.spiritUsed },
    { label: "Strength", value: cocktail.strength },
    { label: "Style", value: cocktail.types?.join(", ") },
  ].filter((m) => m.value);

  return (
    <Box sx={{ minHeight: "100vh", py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <Link
          component={RouterLink}
          to="/"
          underline="none"
          sx={{
            display: "inline-flex", alignItems: "center", gap: 1, mb: 5,
            color: "text.secondary", letterSpacing: "0.18em", textTransform: "uppercase", fontSize: 12,
            transition: "color .3s", "&:hover": { color: "primary.main" },
          }}
        >
          <ArrowBackIcon sx={{ fontSize: 13 }} /> Back to Menu
        </Link>

        <Box sx={{ display: { xs: "block", md: "flex" }, gap: { md: 7 }, alignItems: "flex-start" }}>
          {/* Image */}
          <Card
            sx={{
              borderRadius: 3, overflow: "hidden", position: "relative",
              width: { xs: "100%", md: "44%" }, mb: { xs: 4, md: 0 }, flexShrink: 0,
              boxShadow: "0 40px 90px -40px rgba(0,0,0,.9)",
            }}
          >
            <CardMedia
              component="img"
              image={cocktail.imageURL}
              alt={cocktail.cocktailName}
              sx={{ height: { xs: 360, md: 520 }, objectFit: "cover" }}
            />
          </Card>

          {/* Details */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography sx={{ color: "primary.main", letterSpacing: "0.4em", textTransform: "uppercase", fontSize: 12, mb: 1.5 }}>
              The Recipe
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2.6rem", md: "3.4rem" }, lineHeight: 1.02, mb: 2.5,
                background: "linear-gradient(105deg,#a87c2e,#f4d87a 45%,#d4af37 70%,#ecdcae)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}
            >
              {cocktail.cocktailName}
            </Typography>

            <Typography variant="body1" sx={{ mb: 3 }}>
              {cocktail.description}
            </Typography>

            <Stack direction="row" spacing={1.2} useFlexGap flexWrap="wrap" sx={{ mb: 3.5 }}>
              {meta.map((m) => (
                <Chip
                  key={m.label}
                  label={`${m.label} · ${m.value}`}
                  variant="outlined"
                  sx={{
                    borderColor: "rgba(212,175,55,.4)", color: "text.primary",
                    bgcolor: "rgba(212,175,55,.05)", letterSpacing: ".04em", borderRadius: 99, py: 2.2,
                  }}
                />
              ))}
            </Stack>

            <Divider sx={{ my: 3 }} />

            {/* Ingredients */}
            <Typography variant="h6" sx={{ color: "primary.main", display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <LocalBarIcon sx={{ fontSize: 18 }} /> Ingredients
            </Typography>
            <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0, mb: 4, display: "grid", gap: 1.2 }}>
              {cocktail.ingredients?.map((ingredient, i) => (
                <Box component="li" key={i} sx={{ display: "flex", alignItems: "center", gap: 1.6, color: "text.primary" }}>
                  <Box sx={{ width: 6, height: 6, transform: "rotate(45deg)", bgcolor: "primary.main", flexShrink: 0, boxShadow: "0 0 10px rgba(212,175,55,.6)" }} />
                  {ingredient}
                </Box>
              ))}
            </Box>

            {/* Instructions */}
            <Typography variant="h6" sx={{ color: "primary.main", display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <MenuBookIcon sx={{ fontSize: 18 }} /> Method
            </Typography>
            <Box sx={{ p: 3, borderRadius: 2, bgcolor: "rgba(255,255,255,.02)", border: "1px solid rgba(212,175,55,.18)" }}>
              <Typography variant="body1" sx={{ whiteSpace: "pre-line", color: "text.primary" }}>
                {cocktail.instructions}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Related cocktails */}
        {related.length > 0 && (
          <Box sx={{ mt: { xs: 9, md: 13 } }}>
            <Divider sx={{ mb: 6 }} />
            <Typography sx={{ color: "primary.main", letterSpacing: "0.4em", textTransform: "uppercase", fontSize: 12, textAlign: "center", mb: 1 }}>
              In the Same Spirit
            </Typography>
            <Typography variant="h3" sx={{ textAlign: "center", mb: 6, fontSize: { xs: "2.1rem", md: "2.8rem" } }}>
              You Might Also Enjoy
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(4, 1fr)" },
                gap: 3,
              }}
            >
              {related.map((c, i) => (
                <CocktailCard key={c.cocktailName || i} {...c} />
              ))}
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default CocktailDetails;