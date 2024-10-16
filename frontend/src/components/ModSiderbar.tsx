import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Routes, Route, Link } from "react-router-dom";

import GanttChart from "./GanttChart";
import { TimetableSolution } from "../scripts/api";
import { useState } from "react";

interface SidebarProps {
  marginTop: number;
  width: number;
}
const drawerWidth = 240;

export default function ModSidebar({ marginTop, width }: SidebarProps) {
  const [selectedCampus, setSelectedCampus] = useState<string>("");

  const handleItemClick = (campusName: string) => {
    setSelectedCampus(campusName); // Update the selected campus
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
            marginTop: marginTop,
          },
        }}
        variant="permanent"
        anchor="left"
      >
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
                          ? "#f8d5ac"
                          : "transparent",
                      "&:hover": {
                        backgroundColor: "#fdefe0",
                      },
                    }}
                  >
                    <ListItemText
                      primary={campusName}
                      sx={{ textAlign: "Center" }}
                    />
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
                  element={<GanttChart/>}
                />
              );
            })}
        </Routes>
      </div>
    </>
  );
}
