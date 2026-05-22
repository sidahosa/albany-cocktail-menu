import { createTheme } from "@mui/material/styles";

const gold = "#d4af37";
const goldBright = "#f4d87a";
const ink = "#0b0a08";
const ivory = "#f3ecdd";
const ash = "#b3a892";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: gold, light: goldBright, dark: "#a87c2e", contrastText: ink },
    secondary: { main: ivory },
    background: { default: ink, paper: "#16130d" },
    text: { primary: ivory, secondary: ash },
    divider: "rgba(212,175,55,0.22)",
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: '"Jost", system-ui, sans-serif',
    h1: { fontFamily: '"Cormorant Garamond", serif', fontWeight: 600, letterSpacing: "0.01em" },
    h2: { fontFamily: '"Cormorant Garamond", serif', fontWeight: 600 },
    h3: { fontFamily: '"Cormorant Garamond", serif', fontWeight: 600 },
    h4: { fontFamily: '"Cormorant Garamond", serif', fontWeight: 600, letterSpacing: "0.01em" },
    h5: { fontFamily: '"Cormorant Garamond", serif', fontWeight: 600 },
    h6: {
      fontFamily: '"Jost", sans-serif',
      fontWeight: 500,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      fontSize: "0.82rem",
    },
    body1: { fontSize: "1.02rem", lineHeight: 1.75, color: ash },
    body2: { fontSize: "0.95rem", lineHeight: 1.7, color: ash },
    button: { letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 500 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { backgroundColor: ink },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#16130d",
          border: "1px solid rgba(212,175,55,0.22)",
          boxShadow: "0 30px 70px -30px rgba(0,0,0,0.9)",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: { borderColor: "rgba(212,175,55,0.18)" },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: { color: ivory, fontSize: "1rem" },
      },
    },
  },
});

export default theme;