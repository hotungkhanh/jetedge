import { AppBar, Box, CssBaseline } from "@mui/material";
import VIT_Logo from '../assets/logo.png';

/**
 * React component for rendering the header section.
 * @returns JSX element representing the header with a logo.
 */
export default function Header() {
    return (
      <Box sx={{ height: "17vh", margin: "0" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            height: "17vh",
            padding: "20px",
            backgroundColor: "#F5F5f5",
            boxShadow: "none",
          }}
        >
          <img src={VIT_Logo} alt="logo.exe" width="200" height="auto" />
        </AppBar>
      </Box>
    );
}