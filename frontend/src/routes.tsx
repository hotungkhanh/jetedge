import SemesterInfo from './pages/SemesterInfo.tsx'
import TimetableMod from './pages/TimetableMod.tsx'
import Room from './pages/spreadsheets/Room.tsx'
import Unit from './pages/spreadsheets/Unit.tsx'
import Download from './pages/Download.tsx'
import Enrolment from './pages/Enrolment.tsx'
import SendData from './pages/SendData.tsx'
import GanttChart from './components/GanttChart.tsx'
import LoginPage from './pages/LoginPage.tsx'
import { Navigate } from 'react-router-dom'
import PrivateRoute from './security/PrivateRoute.tsx'
/**
 * Defines the routes configuration for the application.
 * Each route specifies a path and the corresponding component to render.
 * 
 * An array of route objects, each containing path and element information.
 */
const routes = [
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "enrolment",
    element: <PrivateRoute element={<Enrolment />} />,
  },
  {
    path: "seminfo",
    element: <PrivateRoute element={<SemesterInfo />} />,
    children: [
      { path: "room", element: <Room /> },
      { path: "unit", element: <Unit /> },
    ],
  },
  {
    path: "senddata",
    element: <PrivateRoute element={<SendData />} />,
  },
  {
    path: "timetablemod/*",
    element: <PrivateRoute element={<TimetableMod />} />,
    children: [
      {path: ":location", element: <GanttChart />}
    ],
  },
  {
    path: "download",
    element: <PrivateRoute element={<Download />} />,
  },
];

export default routes;