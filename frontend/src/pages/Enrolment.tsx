import { Box } from "@mui/material";
import "../styles/enrolment.css";
import UploadPopUp from "../components/UploadPopUp.tsx";

export default function StarterPage() {
  return (
    <Box className="app-container">
      <Box className="header"></Box>
      <Box className="content">
        <UploadPopUp></UploadPopUp>
      </Box>
      <Box className="footer"></Box>
    </Box>
  );
}
