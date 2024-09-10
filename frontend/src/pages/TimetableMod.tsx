import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BackButton from "../components/BackButton";
import NextButton from "../components/NextButton";
import Spreadsheet from "../components/Spreadsheet";

export default function TimetableMod() {
  const generatedTimetable = sessionStorage.getItem("generatedTimetable");

  return (
    <>
      <Header />
      <h1 style={{ margin: "10px" }}>This is the page to modify generated timetable</h1>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {generatedTimetable ? (
          <>
            <h3 style={{ color: "#d15700", margin: "3px" }}>Score: {JSON.parse(generatedTimetable).score}</h3>
            <Spreadsheet headers={["Unit ID", "Unit Name", "Duration (minutes)", "Start", "End", "Students", "Room ID", "Room Capacity"]} storageKey="timetableSheet"/>
          </>
        ) : (
          <h1>Timetable not generated (yet)</h1>
        )}
      </div>
      <Footer>
        <Link to="../senddata"><BackButton /></Link>
        <Link to="../download"><NextButton /></Link>
      </Footer>
    </>
  )
}