import { AppBar, Box, CssBaseline } from "@mui/material";
import VIT_Logo from '../assets/logo.png';

/**
 * React component for rendering the header section.
 * @returns JSX element representing the header with a logo.
 */
export default function Header() {
    return (
      <Box sx={{ height: "130px", margin: "0" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            height: "130px",
            padding: "20px",
            backgroundColor: "#F5F5f5",
            boxShadow: "none"
          }}
        >
          <img
            src={VIT_Logo}
            alt="logo.exe"
            style={{width: "230px",
                  height: "auto",
    // objectFit: "contain",
    // maxHeight: "100%",
    // maxWidth: "100%",
    // alignSelf: "flex-start", // Aligns left in a flex container
    }}
          />
        </AppBar>
      </Box>
    );
}