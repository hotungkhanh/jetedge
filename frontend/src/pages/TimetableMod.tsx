import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BackButton from "../components/BackButton";
import { Outlet } from "react-router-dom";
import ModSidebar from "../components/ModSiderbar";
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

  useEffect(() => {
    fetch("https://jetedge-backend-e1eeff4b0c04.herokuapp.com/timetabling/view")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        console.log(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
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
      <ModSidebar width={240} marginTop={12.5} />

      {/* Spreadsheet */}
      <div style={{ marginLeft: 300 + "px", overflow: "hidden" }}>
        <Outlet />
      </div>

      <Footer>
        <div className="links-container">
          <Link to="../">
            <BackButton />
          </Link>
          <Link to="../senddata">
          </Link>
        </div>
      </Footer>
    </div>
  );
}