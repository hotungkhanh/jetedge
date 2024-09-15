import { Link } from "react-router-dom";

export default function TimetableMod() {
  return (
    <>
      <h1>This is the page to modify generated timetable</h1>
      <Link to="../seminfo/building">Go Back</Link>
      <Link to="../download" style={{ marginLeft: 240+"px" }}>Go to Next</Link>
    </>
  )
}