import { Box } from "@mui/material";
import "../styles/enrolment.css";
import UploadPopUp from "../components/UploadPopUp.tsx";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import Photo from "../assets/frontpage.jpg";
import { useEffect } from "react";
import { REMOTE_API_URL, TimetableSolution } from "../scripts/api.ts";
import { useAuthContext } from "../security/AuthContext.tsx";
import SkipButton from "../components/SkipButton.tsx";

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
  const { authHeader } = useAuthContext();
  useEffect(() => {
    fetch(REMOTE_API_URL + "/timetabling/view", {
      headers: { Authorization: authHeader },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const timetableSolutions: TimetableSolution[] =
          data as TimetableSolution[];
        sessionStorage.setItem(
          "campusSolutions",
          JSON.stringify(timetableSolutions)
        );
      });
  }, []);
  return (
    <Box className="app-container">
      <Header />
      <Box className="content">
        <Box className="description" sx={{ minWidth: 550+"px" }}>
          <span style={timeStyle}>Time</span>
          <span style={tablerStyle}>tabler</span>
          <span style={{ margin: -3, fontSize: 15, marginLeft: 5, opacity: 0.4 }}>The smartest Timetabler ever</span>
          <p style={{ color: "#f05a22", fontSize: 20 }}>A timetabling website for the Victorian Institute of Technology</p>
          <p>   -Team JetEdge</p>
          <UploadPopUp></UploadPopUp>
          <SkipButton/>
        </Box>
        <Box className="imageBox">
          <img src={Photo} alt="logo.exe" width="900" height="auto"/>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}
