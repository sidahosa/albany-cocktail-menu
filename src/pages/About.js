import React from "react";
import { Container, Typography, Box } from "@mui/material";

const sections = [
  {
    title: "For the Wine Lovers",
    body:
      "Fancy a classy evening? Grab a glass of red, white, or whatever color makes you feel sophisticated (we don’t judge if it comes from a box). Whether you're swirling your glass like a sommelier or just looking for something that pairs well with watching Netflix in pajamas, I’ve got you covered.",
  },
  {
    title: "For the Shot-Takers",
    body:
      "Some people like their drinks on the rocks. Others prefer them right down the hatch. If you like whiskey, tequila, vodka, rum, or anything that makes your throat question your life choices, this is your safe space. Raise a glass and take that shot. No salt, no lime? Respect.",
  },
  {
    title: "For the “Just Mix It” Crowd",
    body:
      "Not in the mood for anything fancy? No problem. Just grab your favorite liquor and throw in some soda, juice, or whatever’s left in your fridge. Boom — instant drink! Whether it’s rum and coke, vodka and cranberry, or whiskey and bad decisions, we respect the simplicity of a solid mixed drink.",
  },
];

const About = () => {
  return (
    <Box sx={{ minHeight: "100vh", py: { xs: 8, md: 12 } }}>
      <Container maxWidth="md">
        {/* Heading */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography sx={{ color: "primary.main", letterSpacing: "0.42em", textTransform: "uppercase", fontSize: 12, mb: 2 }}>
            Behind the Bar
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2.8rem", md: "4rem" }, lineHeight: 1.02,
              background: "linear-gradient(105deg,#a87c2e,#f4d87a 45%,#d4af37 70%,#ecdcae)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}
          >
            Welcome to Albany Cocktails
          </Typography>

          <Box className="deco-rule" sx={{ my: 4 }}>
            <span className="diamond" />
          </Box>

          <Typography variant="body1" sx={{ maxWidth: 620, mx: "auto", fontSize: "1.1rem" }}>
            Hey there, I’m{" "}
            <Box component="span" sx={{ color: "primary.main", fontWeight: 600 }}>Shawn Idahosa</Box>
            , your unofficial bartender, mixologist, sommelier and overall drinks enthusiast.
            Whether you're here for a fancy cocktail, a straight-up shot, or just a splash of juice
            in your tequila then you’re in the right place.
          </Typography>
        </Box>

        {/* Sections */}
        <Box sx={{ display: "grid", gap: 0 }}>
          {sections.map((s, i) => (
            <Box key={s.title}>
              {i > 0 && (
                <Box className="deco-rule" sx={{ my: 5, opacity: 0.6 }}>
                  <span className="diamond" />
                </Box>
              )}
              <Typography variant="h4" sx={{ color: "primary.main", mb: 1.5, fontSize: "1.8rem" }}>
                {s.title}
              </Typography>
              <Typography variant="body1" sx={{ fontSize: "1.05rem" }}>
                {s.body}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Closing */}
        <Box
          sx={{
            mt: 8, p: { xs: 4, md: 5 }, textAlign: "center", borderRadius: 3,
            border: "1px solid rgba(212,175,55,.22)", bgcolor: "rgba(212,175,55,.04)",
          }}
        >
          <Typography variant="h4" sx={{ color: "primary.main", mb: 1.5, fontSize: "1.8rem" }}>
            Final Words
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "1.05rem" }}>
            Whether you're sipping slow or going all in, Albany Cocktails is here to guide you to
            better drinks and better nights. Now go ahead, mix something up or just pour yourself
            a glass of whatever's closest.{" "}
            <Box component="span" sx={{ fontStyle: "italic", color: "secondary.main" }}>Cheers! 🍸</Box>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default About;