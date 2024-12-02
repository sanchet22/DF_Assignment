import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import StoreIcon from "@mui/icons-material/Store";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutDialog from "../LogoutDialog/LogoutDialog";
import Navbar from "../Navbar/Navbar";

const AppLayout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const sidebarContent = (
    <List>
      <ListItem component={Link} to="/dashboard/home" button>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem component={Link} to="/dashboard/state" button>
        <ListItemIcon>
          <MapIcon />
        </ListItemIcon>
        <ListItemText primary="State" />
      </ListItem>
      <ListItem component={Link} to="/dashboard/city" button>
        <ListItemIcon>
          <LocationCityIcon />
        </ListItemIcon>
        <ListItemText primary="City" />
      </ListItem>
      <ListItem component={Link} to="/dashboard/wearhouse" button>
        <ListItemIcon>
          <StoreIcon />
        </ListItemIcon>
        <ListItemText primary="Wearhouse" />
      </ListItem>
    </List>
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Navbar */}
      {/* <AppBar position="fixed" style={{ backgroundColor: "#673ab7" }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" sx={{ display: { sm: "none" } }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          DigitalFlake111
        </Typography>
        <LogoutDialog />
      </Toolbar>
    </AppBar> */}
    <Navbar/>

      {/* Sidebar & Main Content */}
      <Box sx={{ display: "flex", flexGrow: 1, mt: 8 }}>
        {/* Sidebar */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              width: 240,
              boxSizing: "border-box",
              mt: 8, // Adjust below the navbar
            },
          }}
          open
        >
          {sidebarContent}
        </Drawer>
        <Drawer
          variant="temporary"
          open={isDrawerOpen}
          onClose={toggleDrawer}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              width: 240,
              boxSizing: "border-box",
              mt: 8, // Adjust below the navbar
            },
          }}
        >
          {sidebarContent}
        </Drawer>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            ml: { sm: "240px" }, // Sidebar width adjustment for larger screens
          }}
        >
          {/* Dynamic content based on active route */}
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AppLayout;
