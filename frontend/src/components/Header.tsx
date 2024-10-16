import { Box } from "@mui/material";
import VIT_Logo from '../assets/logo.png';

/**
 * React component for rendering the header section.
 * @returns JSX element representing the header with a logo.
 */
export default function Header() {
    const headerStyle = {
        backgroundColor: "#F5F5f5",
        color: "white",
        padding: "20px",
        textAlign: "left"
    };
    return (
      <Box className="header" sx={headerStyle}>
        <img
          src={VIT_Logo}
          alt="logo.exe"
          width="150"
          height="auto"
        />
      </Box>
    );
}