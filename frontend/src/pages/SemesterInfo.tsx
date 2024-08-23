import { Link, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar.tsx";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";

export default function SemesterInfo() {
  return (
    <div>
      <Header />      
      <Sidebar width={240} marginTop={12.5}/>
      <div style={{ marginLeft: 300 + "px", overflow: "scroll", height: "550px" }}>
        <Outlet />
      </div>

      <Footer>
        <Link to="../" style={{ marginLeft: 240+"px" }}>Go Back</Link>
        <Link to="../timetablemod" style={{ marginLeft: 240+"px" }}>Go to Next</Link>
      </Footer>

    </div>
  )
}