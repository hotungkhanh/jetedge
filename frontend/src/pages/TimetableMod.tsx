import { Link } from "react-router-dom";

/**
 * Renders the TimetableMod component to display and modify the generated 
 * timetable.
 * Allows users to navigate back to the campus information page and proceed to 
 * the download page.
 * @returns JSX element containing the page content with navigation links
 */
export default function TimetableMod() {
  return (
    <>
      <h1>This is the page to modify generated timetable</h1>
      <Link to="../senddata">Go Back</Link>
      <Link to="../download" style={{ marginLeft: 240+"px" }}>Go to Next</Link>
    </>
  )
}