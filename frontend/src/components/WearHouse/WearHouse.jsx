import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  CircularProgress,
  TextField,
  TableSortLabel,
  TablePagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import axios from "axios";

const WearHouse = () => {
  const [wearhouse, setWearhouses] = useState([]); // State for storing wearhouse
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [search, setSearch] = useState(""); // State for search input
  const [order, setOrder] = useState("desc"); // Default to newest first
  const [orderBy, setOrderBy] = useState("created_at"); // Default to sort by creation date
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [deleteId, setDeleteId] = useState(null);
  const [open, setOpen] = useState(false);

  // Fetch wearhouse from the API
  useEffect(() => {
    const fetchWearhouses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/wearhouse");
        setWearhouses(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching wearhouse:", error);
        setLoading(false);
      }
    };

    fetchWearhouses();
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

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handle Delete Wearhouse
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/wearhouse/${deleteId}`);
      setWearhouses(wearhouse.filter((wearhouse) => wearhouse.id !== deleteId));
      handleClose();
    } catch (error) {
      console.error("Error deleting wearhouse:", error);
      handleClose();
    }
  };

  // Open popup for delete confirmation
  const handleOpen = (id) => {
    setDeleteId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDeleteId(null);
  };

  // Sorting function
  const sortedWearhouses = [...wearhouse].sort((a, b) => {
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
    if (orderBy === "state") {
      return order === "asc"
        ? a.state.localeCompare(b.state)
        : b.state.localeCompare(a.state);
    }
    if (orderBy === "city") {
      return order === "asc"
        ? a.city.localeCompare(b.city)
        : b.city.localeCompare(a.city);
    }
    return 0;
  });

  // Filtered rows based on search
  const filteredWearhouses = sortedWearhouses.filter((wearhouse) => {
    const matchesSearch = search
      ? wearhouse?.name?.toLowerCase().includes(search.toLowerCase())
      : true;

    return matchesSearch;
  });

  // Paginated rows
  const paginatedWearhouses = filteredWearhouses.slice(
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
          <Link to="/dashboard/add-wearhouse" style={{ textDecoration: "none" }}>
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
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "state"}
                    direction={orderBy === "state" ? order : "asc"}
                    onClick={() => handleRequestSort("state")}
                  >
                    State
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "city"}
                    direction={orderBy === "city" ? order : "asc"}
                    onClick={() => handleRequestSort("city")}
                  >
                    City
                  </TableSortLabel>
                </TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedWearhouses.map((wearhouse) => (
                <TableRow key={wearhouse.id}>
                  <TableCell>{wearhouse.id}</TableCell>
                  <TableCell>{wearhouse.name}</TableCell>
                  <TableCell>{wearhouse.state}</TableCell>
                  <TableCell>{wearhouse.city}</TableCell>
                  <TableCell
                    style={{
                      color: wearhouse.status === "Active" ? "green" : "red",
                    }}
                  >
                    {wearhouse.status}
                  </TableCell>
                  <TableCell>
                    <Link
                      to={`/dashboard/edit-wearhouse/${wearhouse.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <IconButton>
                        <EditIcon style={{ color: "#6C63FF" }} />
                      </IconButton>
                    </Link>
                    <IconButton onClick={() => handleOpen(wearhouse.id)}>
                      <DeleteIcon style={{ color: "red" }} />
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
          count={filteredWearhouses.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        {/* Delete Confirmation Dialog */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            <span style={{ color: "red", display: "flex", alignItems: "center" }}>
              <DeleteIcon style={{ marginRight: "8px" }} />
              Delete
            </span>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this wearhouse?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDelete} color="primary">
              Yes, Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </div>
  );
};

export default WearHouse;
