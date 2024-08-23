import { Box } from "@mui/material";
export default function Header() {
    const headerStyle = {
        backgroundColor: "#F5F5f5",
        color: "white",
        padding: "35px",
        textAlign: "left",
    };
    return (
      <Box className="header" sx={headerStyle}>
        <img
          src="src/assets/logo.png"
          alt="logo.exe"
          width="200"
          height="auto"
        />
      </Box>
    );
}