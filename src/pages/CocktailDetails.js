import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dynamoDB from "../api/config";

import {
  Box,
  Container,
  Typography,
  Card,
  CardMedia,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import LabelIcon from "@mui/icons-material/Label";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import EmojiFoodBeverageIcon from "@mui/icons-material/EmojiFoodBeverage";

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
    return (
      <Box sx={{ bgcolor: "black", color: "white", textAlign: "center", py: 10 }}>
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "black", color: "white", minHeight: "100vh", py: 8 }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: { xs: "block", md: "flex" },
            gap: 6,
            alignItems: "flex-start",
          }}
        >
          <Card
            sx={{
              borderRadius: 3,
              width: { xs: "100%", md: "45%" },
              mb: { xs: 4, md: 0 },
            }}
          >
            <CardMedia
              component="img"
              image={cocktail.imageURL}
              alt={cocktail.cocktailName}
              sx={{ height: 450, objectFit: "cover" }}
            />
          </Card>

          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" color="primary" fontWeight="bold" gutterBottom>
              {cocktail.cocktailName}
            </Typography>

            <Typography variant="body1" paragraph>
              {cocktail.description}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
              <Box>
                <Typography variant="h6" color="primary">
                  Liquor Type
                </Typography>
                <Typography variant="body1">{cocktail.spiritUsed}</Typography>
              </Box>
              <Box>
                <Typography variant="h6" color="primary">
                  Strength
                </Typography>
                <Typography variant="body1">{cocktail.strength}</Typography>
              </Box>
              <Box>
                <Typography variant="h6" color="primary">
                  Types
                </Typography>
                <Typography variant="body1">{cocktail.types.join(", ")}</Typography>
              </Box>
            </Box>

            <Box mt={4}>
              <Typography variant="h6" color="primary" gutterBottom>
                <LabelIcon fontSize="small" sx={{ mr: 1 }} />
                Ingredients
              </Typography>
              <List dense>
                {cocktail.ingredients?.map((ingredient, index) => (
                  <ListItem key={index} sx={{ pl: 0 }}>
                    <ListItemIcon sx={{ minWidth: "30px" }}>
                      <EmojiFoodBeverageIcon color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={ingredient} />
                  </ListItem>
                ))}
              </List>
            </Box>

            <Box mt={4}>
              <Typography variant="h6" color="primary" gutterBottom>
                <MenuBookIcon fontSize="small" sx={{ mr: 1 }} />
                Instructions
              </Typography>
              <Typography variant="body1" whiteSpace="pre-line">
                {cocktail.instructions}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default CocktailDetails;