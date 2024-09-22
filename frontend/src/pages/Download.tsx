import { Link } from "react-router-dom";

/**
 * Renders the Download page component.
 * Displays a heading for downloading generated timetables and a link to go 
 * back to the timetable modification page.
 * @returns JSX element representing the Download page
 * TODO: TO BE IMPLEMENTED
 */
export default function Download() {
  return (
    <>
      <h1>This is the page to download all generated timetables</h1>
      <Link to="../timetablemod">Go Back</Link>
    </>
  )
}