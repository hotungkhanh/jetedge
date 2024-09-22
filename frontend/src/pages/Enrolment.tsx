import { Box } from "@mui/material";
import "../styles/enrolment.css";
import UploadPopUp from "../components/UploadPopUp.tsx";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import Photo from "../assets/frontpage.jpg";

/**
 * Renders the Starter Page component with specific time and tabler styles.
 * Includes a description box with time and tabler elements, lorem ipsum text, 
 * and an UploadPopUp component.
 * Utilizes the Header and Footer components for layout consistency.
 * TODO: replace lorem ipsum with actual texts, replace better quality img
 */
export default function StarterPage() {
  const timeStyle = {
    color: "#f05a22",
    fontStyle: "italic",
  };
  const tablerStyle = {
    color: "black",
  };
  return (
    <Box className="app-container">
      <Header />
      <Box className="content">
        <Box className="description">
          <span style={timeStyle}>Time</span>
          <span style={tablerStyle}>tabler</span>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta obcaecati blanditiis eaque harum ipsa aut sint cupiditate non atque nam nobis dolorem quo odit totam officia, sunt eligendi illum unde voluptas fugit modi sapiente amet. Qui voluptates, veritatis, eligendi odit, quod pariatur sed laborum possimus minima aliquid illum beatae est! Quam facilis esse inventore, quia repellendus consectetur totam nulla corporis.</p>
          <UploadPopUp></UploadPopUp>
        </Box>
        <Box className="imageBox">
          <img src={Photo} alt="logo.exe" width="900" height="auto"/>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}
