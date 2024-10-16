import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BackButton from "../components/BackButton";
import { Outlet } from "react-router-dom";
import ModSidebar from "../components/ModSiderbar";
import { REMOTE_API_URL, TimetableSolution } from "../scripts/api";
import { useAuthContext } from "../security/AuthContext";

/**
 * Renders the TimetableMod component to display and modify the generated
 * timetable.
 * Allows users to navigate back to the campus information page and proceed to
 * the download page.
 * @returns JSX element containing the page content with navigation links
 */
export default function TimetableMod() {
  const [loading, setLoading] = useState(true);
  const { authHeader } = useAuthContext();

  useEffect(() => {
    fetch(REMOTE_API_URL + "/timetabling/view", { headers: { 'Authorization': authHeader } })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const timetableSolutions: TimetableSolution[] =
          data as TimetableSolution[];
        sessionStorage.setItem("campusSolutions", JSON.stringify(timetableSolutions));
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
        <Header />
        <ModSidebar width={240} marginTop={12.5} />

        <div
          style={{
            marginLeft: 250 + "px",
          }}
        >
          <Outlet />
        </div>

        <Footer>
          <div className="links-container">
            <Link to="../senddata"><BackButton /></Link>
            <Link to="../"></Link>
          </div>
        </Footer>
    </div>
  );
}