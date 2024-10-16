import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SchoolIcon from "@mui/icons-material/School";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";

import { Link } from "react-router-dom";
import { Box } from "@mui/material";


interface SidebarProps {
  marginTop: number,
  width: number,
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
export default function Sidebar({ marginTop, width }: SidebarProps) {
  return (
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
      <Box sx={{height: marginTop + "vh"}} />
      <List>
        <ListItem key="Room" disablePadding>
          <ListItemButton component={Link} to="room">
            <ListItemIcon>
              <MeetingRoomIcon />
            </ListItemIcon>
            <ListItemText primary="Room" />
          </ListItemButton>
        </ListItem>

        <ListItem key="Unit" disablePadding>
          <ListItemButton component={Link} to="unit">
            <ListItemIcon>
              <SchoolIcon />
            </ListItemIcon>
            <ListItemText primary="Unit" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}
