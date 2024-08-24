import { Link, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar.tsx";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import '../styles/seminfo.css';
import NextButton from "../components/NextButton.tsx";
import BackButton from "../components/BackButton.tsx";

export default function SemesterInfo() {
  return (
    <div>
      <Header />      
      <Sidebar width={240} marginTop={12.5}/>

      {/* Spreadsheet */}
      <div style={{ marginLeft: 300 + "px" }}>
        <Outlet />
      </div>

      <Footer>
        <div className="links-container">
          <Link to="../"><BackButton/></Link>
          <Link to="../timetablemod"><NextButton/></Link>
        </div>
      </Footer>

    </div>
  )
}