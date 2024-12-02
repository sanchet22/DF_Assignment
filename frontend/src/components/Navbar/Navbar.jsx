import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutDialog from "../LogoutDialog/LogoutDialog";


const Navbar = ({ toggleSidebar }) => {
    const handleLogout = () => {
        localStorage.removeItem("jwtToken"); // Clear token
        window.location.href = "/"; // Redirect to login
      };
  return (
    <AppBar position="fixed" style={{ backgroundColor: "#673ab7" }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={toggleSidebar} sx={{ display: { sm: "none" } }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          DigitalFlake
        </Typography>
        <LogoutDialog />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
