import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import BackButton from "../components/BackButton";
import NextButton from "../components/NextButton";
import Header from "../components/Header";
import { DB_ROOMS, DB_UNITS, getSpreadsheetData } from "../scripts/persistence";
import { getTimetableProblems } from "../scripts/handleInput";
import { useState } from "react";
import { fetchTimetableSolution } from "../scripts/api";
import { useAuthContext } from '../security/AuthContext';
import LoadingButton from "../components/LoadingButton";

/**
 * Page for containing UI elements that allow user to send input data to backend.
 * Temporarily has a display for backend's response to confirm successful sending 
 *                      (will remove and replace with display page in next sprint).
 * 
 * @returns button for sending timetable problem and temporary display for timetable solution.
 * TODO: change button and UI elements to fit with VIT themes.
 */
export default function SendData() {

  const [loading, setLoading] = useState(false);
  const { authHeader } = useAuthContext();

  function generateTimetable() {
    setLoading(true);
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
      return Promise.all(problems.map(p => fetchTimetableSolution(p, authHeader)));
    })
    .then((solutions) => {
      console.log(solutions);
      setLoading(false);
    })
    .catch((error) => {
      alert(error);
      setLoading(false);
    })
  }

  return (
    <>
      <Header />
      <div style={{ display: "flex", justifyContent: "center", height: "80vh" }}>
        <LoadingButton loading={loading} onClick={generateTimetable} text="Generate Timetable" sx={{ width: 300+"px", height: 50+"px", alignSelf: "center" }} />
      </div>
      <Footer>
        <div className="links-container">
          {loading ? (
            <>
              <BackButton disabled={loading} />
              <NextButton disabled={loading} />
            </>
          ) : (
            <>
              <Link to="../seminfo/room"><BackButton /></Link>
              <Link to="../timetablemod"><NextButton /></Link>
            </>
          )}
        </div>
      </Footer>
    </>
  )
}