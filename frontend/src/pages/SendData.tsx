import { Link } from "react-router-dom";
import { sendPostRequest } from "../scripts/requests";
import { Unit } from "../scripts/parseExcel";
import Footer from "../components/Footer";
import BackButton from "../components/BackButton";
import NextButton from "../components/NextButton";
import Header from "../components/Header";
import { CellValue } from "jspreadsheet-ce";

export default function SendData() {

  function handlePOST() {
    const unitInfo = sessionStorage.getItem("toBackend");
    if (!unitInfo) {
      alert("Missing units information");
      return;
    }

    let units: Unit[] = JSON.parse(unitInfo);
    units = units.filter((unit) => {if (unit.students.length > 0) { return unit }});

    const body = {
      units: units,
      startTimes: [
        "09:00:00",
        "10:00:00",
        "11:00:00",
        "12:00:00",
        "15:00:00",
        "17:00:00"
      ]
    };
    

    sendPostRequest(JSON.stringify(body))
    .then((response) => {
      sessionStorage.setItem("generatedTimetable", response);
      const units = JSON.parse(response).units;
      const data: CellValue[][] = units.map((u: Unit) => {
        return [u.unitID, u.name, parseInt(u.duration) / 60, u.start, u.end, (u.students.map(s => s.name)).toString()];
      })
      const opt = {
        cellvalues: data
      }
      sessionStorage.setItem("timetableSheet", JSON.stringify(opt));
    })
    .catch((error) => {
      console.log(error);
    })
  }

  return (
    <>
      <Header />
      <h1>This is the page to generate timetable (aka send data to backend)</h1>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "180px" }}>
        <button style={{ scale: "3" }} onClick={handlePOST}>Generate Timetable</button>
      </div>
      
      <Footer>
        <Link to="../seminfo/campus"><BackButton /></Link>
        <Link to="../timetablemod"><NextButton /></Link>
      </Footer>
    </>
  )
}