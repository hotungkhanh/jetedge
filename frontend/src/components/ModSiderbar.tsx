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
  marginTop: number;
  width: number;
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
export default function ModSidebar({ marginTop, width }: SidebarProps) {
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
        <ListItem key="Adelaide" disablePadding>
          <ListItemButton component={Link} to="adelaide">
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Adelaide" />
          </ListItemButton>
        </ListItem>

        <ListItem key="Geelong" disablePadding>
          <ListItemButton component={Link} to="geelong">
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Geelong" />
          </ListItemButton>
        </ListItem>

        <ListItem key="Melbourne" disablePadding>
          <ListItemButton component={Link} to="melbourne">
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Melbourne" />
          </ListItemButton>
        </ListItem>

        <ListItem key="Sydney" disablePadding>
          <ListItemButton component={Link} to="sydney">
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Sydney" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}
