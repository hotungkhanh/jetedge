import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import BackButton from "../components/BackButton";
import NextButton from "../components/NextButton";
import Header from "../components/Header";
import { DB_ROOMS, DB_UNITS, getFile, getSpreadsheetData } from "../scripts/persistence";
import { getTimetableProblem } from "../scripts/handleInput";
import { useState } from "react";
import { fetchTimetableSolution } from "../scripts/api";

export default function SendData() {

  const [isGenerated, setIsGenerated] = useState(false);

  function generateTimetable() {
    setIsGenerated(false);
    Promise.all([getFile(), getSpreadsheetData(DB_ROOMS), getSpreadsheetData(DB_UNITS)])
    .then((responses) => {
      const [enrolment, roomData, unitData] = [...responses];
      if (!roomData) {
        throw new Error("Error: room data not available");
      }
      else if (!unitData) {
        throw new Error("Error: unit data not available");
      }
      setIsGenerated(true); // this should be after a solution has been obtained
      return getTimetableProblem(enrolment, roomData, unitData);
    })
    .then((problem) => {
      return fetchTimetableSolution(problem);
    })
    .catch((error) => {
      alert(error);
    })
  }

  return (
    <>
      <Header />
      <div style={{ backgroundColor: "#ffefe3", minHeight: 70+"vh", maxWidth: 50+"vw", margin: "0 auto", marginTop: 20 }}>
        <pre>{isGenerated.toString()}</pre>
      </div>
      <Footer>
        <button style={{ scale: "2", position: "absolute", top: 20, right: 45 + "%" }} onClick={generateTimetable}>Generate Timetable</button>
        <div className="links-container">
          <Link to="../seminfo/building"><BackButton /></Link>
          <Link to="../timetablemod"><NextButton /></Link>
        </div>
      </Footer>
    </>
  )
}