import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import BackButton from "../components/BackButton";
import NextButton from "../components/NextButton";
import Header from "../components/Header";
import { DB_ROOMS, DB_UNITS, getFile, getSpreadsheetData } from "../scripts/persistence";
import { getTimetableProblems } from "../scripts/handleInput";
import { useState } from "react";
import { fetchTimetableSolution } from "../scripts/api";

/**
 * Page for containing UI elements that allow user to send input data to backend.
 * Temporarily has a display for backend's response to confirm successful sending 
 *                      (will remove and replace with display page in next sprint).
 * 
 * @returns button for sending timetable problem and temporary display for timetable solution.
 * TODO: change button and UI elements to fit with VIT themes.
 */
export default function SendData() {

  const [isGenerated, setIsGenerated] = useState("");

  function generateTimetable() {
    setIsGenerated("");
    Promise.all([getSpreadsheetData(DB_ROOMS), getSpreadsheetData(DB_UNITS)])
    .then((responses) => {
      const [roomData, unitData] = [...responses];
      if (!roomData) {
        throw new Error("Error: room data not available");
      }
      else if (!unitData) {
        throw new Error("Error: unit data not available");
      }
      return getTimetableProblems(roomData, unitData);
    })
    .then((problems) => {
      return Promise.all(problems.map(p => fetchTimetableSolution(p)));
    })
    .then((solutions) => {
      console.log(solutions);
      setIsGenerated(JSON.stringify(solutions, null, 2));
    })
    .catch((error) => {
      alert(error);
    })
  }

  return (
    <>
      <Header />
      <div style={{ backgroundColor: "#ffefe3", minHeight: 70+"vh", maxHeight: 70+"vh", maxWidth: 50+"vw", margin: "0 auto", marginTop: 20, overflow: "scroll" }}>
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