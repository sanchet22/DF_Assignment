import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  IconButton,
  TableSortLabel,
  Paper,
  TablePagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import axios from "axios";
import "../State/State.css";
import { Link } from "react-router-dom";

const State = () => {
  const [states, setStates] = useState([]);
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("desc"); // Default to newest first
  const [orderBy, setOrderBy] = useState("created_at"); // Default to sort by creation date
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [deleteId, setDeleteId] = useState(null);
  const [open, setOpen] = useState(false);

  // Fetch data from API
  const fetchStates = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/states");
      setStates(response.data);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  useEffect(() => {
    fetchStates();
  }, []);

  // Handle sorting
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleClose = () => {
    setOpen(false);
    setDeleteId(null);
  };

  // Open popup for delete confirmation
  const handleOpen = (id) => {
    setDeleteId(id);
    setOpen(true);
  };

  // Delete API call
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/states/${deleteId}`);
      setStates(states.filter((state) => state.id !== deleteId));
      handleClose();
    } catch (error) {
      console.error("Error deleting state:", error);
      handleClose();
    }
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Sorting function
  const sortedStates = [...states].sort((a, b) => {
    if (orderBy === "created_at") {
      return order === "asc"
        ? new Date(a.created_at) - new Date(b.created_at)
        : new Date(b.created_at) - new Date(a.created_at);
    }
    if (orderBy === "id") {
      return order === "asc" ? a.id - b.id : b.id - a.id;
    }
    if (orderBy === "name") {
      return order === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }
    if (orderBy === "code") {
      return order === "asc"
        ? a.code.localeCompare(b.code)
        : b.code.localeCompare(a.code);
    }
    if (orderBy === "status") {
      return order === "asc"
        ? a.status.localeCompare(b.status)
        : b.status.localeCompare(a.status);
    }
    return 0;
  });

  // Filtered rows based on search
  const filteredStates = sortedStates.filter((state) => {
    const matchesSearch = search
      ? state?.name?.toLowerCase().includes(search.toLowerCase())
      : true;

    return matchesSearch;
  });

  // Paginated rows
  const paginatedStates = filteredStates.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div
      style={{
        padding: "0",
        margin: "0",
        width: "83vw",
        height: "104vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={4}
        style={{
          padding: "20px",
          width: "95%",
          maxWidth: "1600px",
          flexGrow: 1,
          overflow: "auto",
        }}
      >
        {/* Search Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
            width: "100%",
          }}
        >
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "70%",
              maxWidth: "350px",
            }}
          />
          <Link to="/dashboard/add-state" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              color="primary"
              style={{ backgroundColor: "#6C63FF" }}
            >
              Add New
            </Button>
          </Link>
        </div>

        {/* Responsive Table */}
        <TableContainer
          component={Paper}
          style={{
            width: "100%",
            overflowX: "auto",
            marginTop: "10px",
            flexGrow: 1,
          }}
        >
          <Table style={{ width: "100%" }}>
            <TableHead>
              <TableRow style={{ backgroundColor: "#F9E79F" }}>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "id"}
                    direction={orderBy === "id" ? order : "asc"}
                    onClick={() => handleRequestSort("id")}
                  >
                    ID
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "name"}
                    direction={orderBy === "name" ? order : "asc"}
                    onClick={() => handleRequestSort("name")}
                  >
                    State Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "code"}
                    direction={orderBy === "code" ? order : "asc"}
                    onClick={() => handleRequestSort("code")}
                  >
                    State Code
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "status"}
                    direction={orderBy === "status" ? order : "asc"}
                    onClick={() => handleRequestSort("status")}
                  >
                    Status
                  </TableSortLabel>
                </TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedStates.map((state) => (
                <TableRow key={state.id}>
                  <TableCell>{state.id}</TableCell>
                  <TableCell>{state.name}</TableCell>
                  <TableCell>{state.code}</TableCell>
                  <TableCell>
                    <span
                      style={{
                        color: state.status === "Active" ? "green" : "red",
                      }}
                    >
                      {state.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Link
                      to={`/dashboard/edit-state/${state.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <IconButton>
                        <Edit style={{ color: "#6C63FF" }} />
                      </IconButton>
                    </Link>
                    <IconButton onClick={() => handleOpen(state.id)}>
                      <Delete style={{ color: "red" }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredStates.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        {/* Delete Confirmation Dialog */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            <span style={{ color: "red", display: "flex", alignItems: "center" }}>
              <Delete style={{ marginRight: "8px" }} />
              Delete
            </span>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this state?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              style={{ backgroundColor: "purple", color: "white" }}
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </div>
  );
};

export default State;
