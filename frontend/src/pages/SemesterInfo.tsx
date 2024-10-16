import { Link, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar.tsx";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import '../styles/seminfo.css';
import NextButton from "../components/NextButton.tsx";
import BackButton from "../components/BackButton.tsx";
import { AppBar, Box, CssBaseline, Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar } from "@mui/material";
import VIT_Logo from "../assets/logo.png";

/**
 * Renders the SemesterInfo component with a header, sidebar, spreadsheet, 
 * and navigation buttons.
 * 
 * @returns JSX element representing the SemesterInfo component
 */
export default function SemesterInfo() {
  return (
    <div>
      <Header />
      <Sidebar width={240} marginTop={17}/>

      {/* Spreadsheet */}
      <div style={{ marginLeft: 300 + "px", overflow: "hidden" }}>
        <Outlet />
      </div>

      <Footer>
        <div className="links-container">
          <Link to="../enrolment"><BackButton/></Link>
          <Link to="../senddata"><NextButton/></Link>
        </div>
      </Footer>

    </div>
  );
}