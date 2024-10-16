import { Box } from "@mui/material";
import "../styles/enrolment.css";
import UploadPopUp from "../components/UploadPopUp.tsx";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import Photo from "../assets/frontpage2.jpg";
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
        <Box
          className="description"
          sx={{ minWidth: 550 + "px", textAlign: "center" }}
        >
          <span style={timeStyle}>Time</span>
          <span style={tablerStyle}>tabler</span>
          <p>
            The VIT Timetabling Portal is a platform for VIT Support Service
            Team staff to manage unit and class schedules across all campuses.
            Designed for ease of use, the portal allows staff to view and adjust
            schedules, assign classrooms, all in one centralized system. It
            automatically generates timetables, handling large datasets of up to
            ten thousand students. The drag-and-drop feature allows easy manual
            adjustments, updating both location and time simultaneously with a
            Gantt Chart.
          </p>
          <p>A Product by JetEdge</p>
          <UploadPopUp></UploadPopUp>
        </Box>
        <Box className="imageBox">
          <img
            src={Photo}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </Box>
      </Box>
      <Footer>
        <div style={{
          height: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: '50%',
          marginRight: "5%",
        }}>
          <SkipButton/>
        </div>
      </Footer>
    </Box>
  );
}
