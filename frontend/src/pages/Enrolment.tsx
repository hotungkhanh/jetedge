import { Link } from "react-router-dom"

export default function Enrolment() {
  return (
    <>
      <h1>This is the page to upload enrolment data</h1>
      <Link to="seminfo/campus" style={{ marginLeft: 240+"px" }}>Go to Next</Link>
    </>
  )
}