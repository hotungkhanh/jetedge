import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Routes, Route, Link } from "react-router-dom";
import LocationCityIcon from "@mui/icons-material/LocationCity";

import GanttChart from "./GanttChart";
import { TimetableSolution } from "../scripts/api";
import { useState } from "react";
import { Box, ListItemIcon } from "@mui/material";

interface SidebarProps {
  marginTop: number;
  width: number;
}
const drawerWidth = 240;

/**
 * Functional component for the ModSidebar that displays a list of campus 
 * solutions with links to their respective Gantt charts.
 * 
 * @param marginTop The top margin for the sidebar.
 * @param width The width of the sidebar.
 */
export default function ModSidebar({ marginTop, width }: SidebarProps) {
  const [selectedCampus, setSelectedCampus] = useState<string>("");

  const handleItemClick = (campusName: string) => {
    setSelectedCampus(campusName);
  };

  let campusSolutions: TimetableSolution[];
  let campusSolutionsStr: string|null = sessionStorage.getItem("campusSolutions");
  if (campusSolutionsStr !== null) {
    campusSolutions = JSON.parse(campusSolutionsStr);
  } else {
    throw new Error("campusSolutionStr is NULL in ModSidebar")
  }
  return (
    <>
      <Drawer
        sx={{
          width: width,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box sx={{ height: marginTop + "px"}} />
        <List>
          {campusSolutions && campusSolutions.length > 0 ? (
            campusSolutions.map((solution) => {
              let campusName = solution.campusName;
              return (
                <ListItem key={campusName} disablePadding>
                  <ListItemButton
                    component={Link}
                    to={`/timetablemod/${campusName.toLowerCase()}`}
                    onClick={() => handleItemClick(campusName)}
                    sx={{
                      backgroundColor:
                        selectedCampus === campusName
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    <ListItemIcon>
                      <LocationCityIcon />
                    </ListItemIcon>
                    <ListItemText primary={campusName} />
                  </ListItemButton>
                </ListItem>
              );
            })
          ) : (
            <div>Loading...</div>
          )}
        </List>
      </Drawer>

      <div style={{ marginLeft: drawerWidth }}>
        <Routes>
          {campusSolutions &&
            campusSolutions.length > 0 &&
            campusSolutions.map((solution) => {
              const campusName = solution.campusName;
              return (
                <Route
                  key={campusName}
                  path={`timetablemod/${campusName.toLowerCase()}`}
                  element={<GanttChart />}
                />
              );
            })}
        </Routes>
      </div>
    </>
  );
}
