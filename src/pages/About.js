import React from "react";
import { Container, Typography, Box } from "@mui/material";

const About = () => {
  return (
    <Box sx={{ bgcolor: "black", color: "white", minHeight: "100vh", py: 10 }}>
      <Container maxWidth="md">
        <Typography variant="h4" align="center" color="primary" fontWeight="bold" gutterBottom>
          Welcome to Albany Cocktails! 🍸
        </Typography>

        <Typography variant="body1" align="center" paragraph>
          Hey there, I’m <Typography component="span" color="primary" fontWeight="bold">Shawn Idahosa</Typography>,
          your unofficial bartender, mixologist, sommelier and overall drinks enthusiast.
          Whether you're here at the crib for a fancy cocktail, a straight-up shot, or just a splash of juice in your tequila,
          you’re at the right place.
        </Typography>

        <Box my={4}>
          <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom>
            For the Wine Lovers
          </Typography>
          <Typography variant="body1">
            Fancy a classy evening? Grab a glass of red, white, or whatever color makes you feel sophisticated
            (we don’t judge if it comes from a box). Whether you're swirling your glass like a sommelier or just
            looking for something that pairs well with watching Netflix in pajamas, I got you covered.
          </Typography>
        </Box>

        <Box my={4}>
          <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom>
            For the Shot-Takers
          </Typography>
          <Typography variant="body1">
            Some people like their drinks on the rocks. Others prefer them right down the hatch.
            If you like whiskey, tequila, vodka, rum, or anything that makes your throat question your life choices,
            this is your safe space. Raise a glass and take that shot. No salt, no lime? Respect.
          </Typography>
        </Box>

        <Box my={4}>
          <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom>
            For the "Just Mix It" Crowd
          </Typography>
          <Typography variant="body1">
            Not in the mood for anything fancy? No problem.
            Just grab your favorite liquor and throw in some soda, juice, or whatever’s left in your fridge.
            Boom—instant drink! Whether it’s rum and coke, vodka and cranberry, or whiskey and bad decisions,
            we respect the simplicity of a solid mixed drink.
          </Typography>
        </Box>

        <Box my={4}>
          <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom>
            Final Words
          </Typography>
          <Typography variant="body1">
            Whether you're sipping slow or going all in, Albany Cocktails is here to guide you to better drinks and better nights.
            Now, go ahead and mix something up or just pour yourself a glass of whatever's closest.
            <Typography component="span" fontStyle="italic"> Cheers! 🍸</Typography>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default About;
