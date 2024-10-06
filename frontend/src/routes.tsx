import SemesterInfo from './pages/SemesterInfo.tsx'
import TimetableMod from './pages/TimetableMod.tsx'
import Building from './pages/spreadsheets/Building.tsx'
import Room from './pages/spreadsheets/Room.tsx'
import Unit from './pages/spreadsheets/Unit.tsx'
import Download from './pages/Download.tsx'
import Enrolment from './pages/Enrolment.tsx'
import SendData from './pages/SendData.tsx'
import GanttChart from './components/GanttChart.tsx'
/**
 * Defines the routes configuration for the application.
 * Each route specifies a path and the corresponding component to render.
 * 
 * An array of route objects, each containing path and element information.
 */
const routes = [
  {
    path: "/",
    element: <Enrolment />,
  },
  {
    path: "seminfo",
    element: <SemesterInfo />,
    children: [
      { path: "building", element: <Building /> },
      { path: "room", element: <Room /> },
      { path: "unit", element: <Unit /> },
    ],
  },
  {
    path: "senddata",
    element: <SendData />,
  },
  {
    path: "timetablemod/*",
    element: <TimetableMod />,
    children: [
      {path: ":location", element: <GanttChart />}
    ],
  },
  {
    path: "download",
    element: <Download />,
  },
];

export default routes;