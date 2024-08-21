import SemesterInfo from './pages/SemesterInfo.tsx'
import TimetableMod from './pages/TimetableMod.tsx'
import Campus from './pages/spreadsheets/Campus.tsx'
import Building from './pages/spreadsheets/Building.tsx'
import Room from './pages/spreadsheets/Room.tsx'
import Unit from './pages/spreadsheets/Unit.tsx'
import Download from './pages/Download.tsx'
import Enrolment from './pages/Enrolment.tsx'


const routes = [
  {
    path: "/",
    element: <Enrolment />,
  },
  {
    path: "seminfo",
    element: <SemesterInfo />,
    children: [
      { path: "campus", element: <Campus /> },
      { path: "building", element: <Building /> },
      { path: "room", element: <Room /> },
      { path: "unit", element: <Unit /> },
    ],
  },
  {
    path: "timetablemod",
    element: <TimetableMod />,
  },
  {
    path: "download",
    element: <Download />,
  },
];

export default routes;