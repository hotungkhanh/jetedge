import { Link, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar.tsx";
export default function SemesterInfo() {
  return (
    <>
      <Sidebar></Sidebar>
      <div style={{ backgroundColor: "bisque", marginLeft: 240 + "px", paddingBottom: 50+"px" }}>
        <h1>Spreadsheet Container</h1>
        <Outlet />
      </div>

      <Link to="../" style={{ marginLeft: 240+"px" }}>Go Back</Link>
      <Link to="../timetablemod" style={{ marginLeft: 240+"px" }}>Go to Next</Link>
    </>
  )
}