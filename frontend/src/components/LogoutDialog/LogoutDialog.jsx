import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const LogoutDialog = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwtToken"); // Clear token
    window.location.href = "/"; // Redirect to login
  };

  return (
    <div>
      {/* Account Circle Icon */}
      <IconButton color="inherit" onClick={handleOpen}>
        <AccountCircleIcon />
      </IconButton>

      {/* Logout Confirmation Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
      >
        <DialogTitle
          id="logout-dialog-title"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <WarningAmberIcon color="error" />
          <Typography variant="h6" fontWeight="bold">
            Log Out
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography
            id="logout-dialog-description"
            variant="body1"
            color="textSecondary"
          >
            Are you sure you want to log out?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="outlined"
            color="error"
            sx={{ textTransform: "none" }}
          >
            Delete
          </Button>
          <Button
            onClick={handleLogout}
            variant="contained"
            color="primary"
            sx={{ textTransform: "none", backgroundColor: "#6A1B9A" }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LogoutDialog;
