import { Box } from "@mui/material";
import "../styles/enrolment.css";
import UploadPopUp from "../components/UploadPopUp.tsx";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";

export default function StarterPage() {
  return (
    <Box className="app-container">
      <Header/>
      <Box className="content">
        <UploadPopUp></UploadPopUp>
      </Box>
      <Footer/>
    </Box>
  );
}
