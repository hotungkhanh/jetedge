import { Box } from "@mui/material";

/**
 * React component for rendering a fixed position footer.
 * 
 * @param children - The content to be displayed inside the footer.
 * @returns JSX element representing the styled footer component.
 */
export default function Footer({ children } : { children?: React.ReactNode }) {
  const footerStyle = {
    backgroundColor: "#f05a22",
    textAlign: "center",
    position: "fixed",
    bottom: 0,
    left: 0,
    width: 100+"%",
    height: "60px",
    zIndex: 10000,
  };

  return (
  <Box sx={footerStyle}>
    {children}
  </Box>);
}
