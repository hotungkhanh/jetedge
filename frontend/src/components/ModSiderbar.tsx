import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";

import { Link, Route, Routes } from "react-router-dom";
import GanttChart from "./GanttChart";
import { GanttItems } from "../scripts/solutionParsing";
import { TimetableSolution } from "../scripts/api";
import { useEffect } from "react";

interface SidebarProps {
  marginTop: number;
  width: number;
  campusSolutions: TimetableSolution[]; 
}
const drawerWidth = 240;

/**
 * Renders a sidebar component with navigation links to Campus, Building, Room,
 * Course, and Unit.
 *
 * @param {SidebarProps} props - The properties passed to Sidebar component
 * @param {number} props.marginTop - The top margin of the sidebar.
 * @param {number} props.width - The width of the sidebar.
 * @returns Sidebar component with navigation links.
 */
export default function ModSidebar({ marginTop, width, campusSolutions }: SidebarProps) {
  useEffect(() => {
    console.log(campusSolutions.length)
  }, [])
  return (
    <Drawer
      sx={{
        width: width,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          marginTop: marginTop,
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List>
        {campusSolutions && campusSolutions.length > 0 ? (
          campusSolutions.map((solution, index) => {
            let campusName = "HELLO WORLD";
            console.log("HEIIIII");
            return (
              <ListItem key={campusName} disablePadding>
                <ListItemButton
                  component={Link}
                  to={`/${campusName.toLowerCase()}`}
                >
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={campusName} />
                </ListItemButton>
                <Routes>
                  <Route
                    path={`/${campusName.toLowerCase()}`}
                    element={
                      <GanttChart solution={solution} /> // Pass the dynamic solution
                    }
                  />
                </Routes>
              </ListItem>
            );
          })
        ) : (
          <div>Loading...</div> // Loading state or fallback if no data is available
        )}
      </List>
    </Drawer>
  );
}

