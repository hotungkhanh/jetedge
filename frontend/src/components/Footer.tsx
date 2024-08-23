import { Box } from "@mui/material";

export default function Footer({ children } : { children?: React.ReactNode }) {
  const footerStyle = {
    backgroundColor: "#f05a22",
    textAlign: "center",
    position: "fixed",
    bottom: 0,
    left: 0,
    width: 100+"%",
    height: 60+"px",
    zIndex: 10000,
  };

  return (
  <Box sx={footerStyle}>
    {children}
  </Box>);
}
