import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BackButton from "../components/BackButton";
import { Outlet } from "react-router-dom";
import ModSidebar from "../components/ModSiderbar";
import { findCampus, findCampusSolution, GanttItems, getGanttItems } from "../scripts/solutionParsing";
import { TimetableSolution } from "../scripts/api";
/**
 * Renders the TimetableMod component to display and modify the generated 
 * timetable.
 * Allows users to navigate back to the campus information page and proceed to 
 * the download page.
 * @returns JSX element containing the page content with navigation links
 */
export default function TimetableMod() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timetableSolutions, setTimetableSolutions] = useState<TimetableSolution[]>();

  useEffect(() => {
    fetch("http://localhost:8080/timetabling/view")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const timetableSolutions: TimetableSolution[] = data as TimetableSolution[];

        // Now you can work with `timetableSolution` directly
        setTimetableSolutions(timetableSolutions);
        console.log("SOLUTION", timetableSolutions);

        // let asolution = findCampusSolution("Adelaide", data);
        // if (asolution !== null) {
        //   setAdelaideSolution(getGanttItems(asolution))
        // }
        // let gsolution = findCampusSolution("Geelong", data);
        // if (gsolution !== null) {
        //   setAdelaideSolution(getGanttItems(gsolution));
        // }
        // const msolution = findCampusSolution("Melbourne", data);
        // if (msolution !== null) {
        //   setAdelaideSolution(getGanttItems(msolution));
        // }
        // const ssolution = findCampusSolution("Sydney", data);
        // if (ssolution !== null) {
        //   setAdelaideSolution(getGanttItems(ssolution));
        // }
        setLoading(false);
      })
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div>
      <Header />
      <ModSidebar width={240} marginTop={12.5} campusSolutions={timetableSolutions}/>

      {/* Spreadsheet */}
      <div
        style={{
          marginLeft: 250 + "px",
          padding:10,
          overflowY: "scroll",
          height:550 + "px",
        }}
      >
        <Outlet />
      </div>

      <Footer>
        <div className="links-container">
          <Link to="../">
            <BackButton />
          </Link>
          <Link to="../senddata"></Link>
        </div>
      </Footer>
    </div>
  );
}