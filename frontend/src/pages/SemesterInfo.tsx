import { Link, Outlet } from "react-router-dom";

export default function SemesterInfo() {
  return (
    <>
      {/* Replace this with Sidebar component */}
      <div style={{ backgroundColor: "aqua", position: "absolute", width: 240 + "px" }}>
        <h2>Scuffed Sidebar :D <br /> (replace pls)</h2>
        <ul>
          <li><Link to="campus">Campus</Link></li>
          <li><Link to="building">Building</Link></li>
          <li><Link to="room">Room</Link></li>
          <li><Link to="unit">Unit</Link></li>
        </ul>
      </div>

      <div style={{ backgroundColor: "bisque", marginLeft: 240 + "px", paddingBottom: 50+"px" }}>
        <h1>Spreadsheet Container</h1>
        <Outlet />
      </div>

      <Link to="../" style={{ marginLeft: 240+"px" }}>Go Back</Link>
      <Link to="../timetablemod" style={{ marginLeft: 240+"px" }}>Go to Next</Link>
    </>
  )
}