import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";

import { Link } from "react-router-dom";


interface SidebarProps {
  marginTop: number,
  width: number,
}
const drawerWidth = 240;

export default function Sidebar({ marginTop, width }: SidebarProps) {
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

        <ListItem key="Building" disablePadding>
          <ListItemButton component={Link} to="building">
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Building" />
          </ListItemButton>
        </ListItem>

        <ListItem key="Room" disablePadding>
          <ListItemButton component={Link} to="room">
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Room" />
          </ListItemButton>
        </ListItem>

        <ListItem key="Unit" disablePadding>
          <ListItemButton component={Link} to="unit">
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Unit" />
          </ListItemButton>
        </ListItem>

      </List>
    </Drawer>
  );
}
