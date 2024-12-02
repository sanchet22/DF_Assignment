import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddWearHouse = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [status, setStatus] = useState("Active");
  const [statesList, setStatesList] = useState([]);
  const [citiesList, setCitiesList] = useState([]);
  const [errors, setErrors] = useState({});

  // Fetch states
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/states");
        setStatesList(response.data);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };
    fetchStates();
  }, []);

  // Fetch cities when a state is selected

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get("http://localhost:5000/cities");
        setCitiesList(response.data);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };
    fetchCities();
  }, []);

  // Validate inputs
  const validateInputs = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Warehouse name is required.";
    if (!state.trim()) newErrors.state = "State is required.";
    if (!city.trim()) newErrors.city = "City is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Save button
  const handleSave = async () => {
    if (!validateInputs()) return;

    const newWarehouse = {
      name,
      state,
      city,
      status,
    };

    try {
      await axios.post("http://localhost:5000/wearhouse", newWarehouse);
      alert("Warehouse added successfully!");
      navigate("/dashboard/wearhouse");
    } catch (error) {
      console.error("Error adding warehouse:", error);
      alert("Failed to add warehouse. Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Warehouse</h2>
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        {/* Input for Warehouse Name */}
        <TextField
          label="Warehouse Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={!!errors.name}
          helperText={errors.name}
        />
      </div>

      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        {/* Dropdown for State */}
        <FormControl fullWidth variant="outlined">
          <InputLabel>State</InputLabel>
          <Select
            value={state}
            onChange={(e) => setState(e.target.value)}
            label="State"
            error={!!errors.state}
          >
            {statesList.map((stateItem) => (
              <MenuItem key={stateItem.id} value={stateItem.name}>
                {stateItem.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {errors.state && (
          <div style={{ color: "red", marginTop: "8px" }}>{errors.state}</div>
        )}

        {/* Dropdown for City */}
        <FormControl fullWidth variant="outlined">
          <InputLabel>City</InputLabel>
          <Select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            label="City"
            error={!!errors.city}
          >
            {citiesList.map((cityItem) => (
              <MenuItem key={cityItem.id} value={cityItem.city_name}>
                {cityItem.city_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {errors.city && (
          <div style={{ color: "red", marginTop: "8px" }}>{errors.city}</div>
        )}
      </div>

      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        {/* Dropdown for Status */}
        <FormControl fullWidth variant="outlined">
          <InputLabel>Status</InputLabel>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            label="Status"
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
        {/* Cancel and Save Buttons */}
        <Button
          variant="outlined"
          onClick={() => navigate("/dashboard/wearhouse")}
        >
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default AddWearHouse;
