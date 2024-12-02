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
import "../City/City.css";
import { Link } from "react-router-dom";

const Cities = () => {
  const [id, setId] = useState("");
  const [cities, setCities] = useState([]);
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("desc"); // Default to newest first
  const [orderBy, setOrderBy] = useState("state"); // Default to sort by state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [deleteId, setDeleteId] = useState(null);
  const [open, setOpen] = useState(false);

  // Fetch data from API
  const fetchCities = async () => {
    try {
      const response = await axios.get("http://localhost:5000/cities");
      setCities(response.data);
      console.log(response.data,"fetch")
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  useEffect(() => {
    
    fetchCities();
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
      await axios.delete(`http://localhost:5000/cities/${deleteId}`);
      setCities(cities.filter((city) => city.id !== deleteId));
      handleClose();
    } catch (error) {
      console.error("Error deleting city:", error);
      handleClose();
    }
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Sorting function
  const sortedCities = [...cities].sort((a, b) => {
    if (orderBy === "state") {
      return order === "asc"
        ? a.state.localeCompare(b.state)
        : b.state.localeCompare(a.state);
    }
    if (orderBy === "city_name") {
      return order === "asc"
        ? a.city_name.localeCompare(b.city_name)
        : b.city_name.localeCompare(a.city_name);
    }
    if (orderBy === "city_code") {
      return order === "asc"
        ? a.city_code.localeCompare(b.city_code)
        : b.city_code.localeCompare(a.city_code);
    }
    return 0;
  });

  // Filtered rows based on search
  const filteredCities = sortedCities.filter((city) => {
    const matchesSearch = search
      ? city?.city_name?.toLowerCase().includes(search.toLowerCase())
      : true;

    return matchesSearch;
  });

  // Paginated rows
  const paginatedCities = filteredCities.slice(
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
          <Link to="/dashboard/add-city" style={{ textDecoration: "none" }}>
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
                    active={orderBy === "city_name"}
                    direction={orderBy === "city_name" ? order : "asc"}
                    onClick={() => handleRequestSort("city_name")}
                  >
                    City Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "city_code"}
                    direction={orderBy === "city_code" ? order : "asc"}
                    onClick={() => handleRequestSort("city_code")}
                  >
                    City Code
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
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedCities.map((city) => (
                <TableRow key={city.id}>
                  <TableCell>{city.id}</TableCell>
                  <TableCell>{city.city_name}</TableCell>
                  <TableCell>{city.city_code}</TableCell>
                  <TableCell>{city.state}</TableCell>
                  <TableCell>
                    <span
                      style={{
                        color: city.status ? "green" : "red",
                      }}
                    >
                      {city.status ? "Active" : "Inactive"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Link
                      to={`/dashboard/edit-city/${city.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <IconButton>
                        <Edit style={{ color: "#6C63FF" }} />
                      </IconButton>
                    </Link>
                    <IconButton onClick={() => handleOpen(city.id)}>
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
          count={filteredCities.length}
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
              Are you sure you want to delete this city?
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

export default Cities;
