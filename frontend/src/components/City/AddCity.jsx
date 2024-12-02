import React, { useState, useEffect } from "react";
import { TextField, Button, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCity = () => {
  const navigate = useNavigate();

  // State for input fields and validation errors
  const [cityName, setCityName] = useState("");
  const [cityCode, setCityCode] = useState("");
  const [state, setState] = useState("");
  const [status, setStatus] = useState("Active"); // Default value for the dropdown
  const [statesList, setStatesList] = useState([]); // List of states for the dropdown
  const [errors, setErrors] = useState({}); // State to track validation errors

  // Fetch states from API
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/states"); // Replace with your states API endpoint
        setStatesList(response.data); // Set states in the dropdown
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };

    fetchStates();
  }, []);

  // Validate inputs
  const validateInputs = () => {
    const newErrors = {};

    if (!cityName.trim()) newErrors.cityName = "City name is required.";
    if (!cityCode.trim()) newErrors.cityCode = "City code is required.";
    if (!state.trim()) newErrors.state = "State is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle Save button
  const handleSave = async () => {
    if (!validateInputs()) return; // Stop submission if validation fails

    const newCity = {
      city_name: cityName,
      city_code: cityCode,
      state,
      status: status === "Active", // Convert to boolean
    };

    try {
      // Make POST request
      const response = await axios.post("http://localhost:5000/cities", newCity);
      console.log("City Added Successfully:", response.data);

      // Navigate back to the cities list
      navigate("/dashboard/city");
    } catch (error) {
      console.error("Error adding city:", error);
      alert("Failed to add city. Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add City</h2>
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        {/* Input for City Name */}
        <TextField
          label="City Name"
          variant="outlined"
          fullWidth
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          error={!!errors.cityName}
          helperText={errors.cityName}
        />

        {/* Input for City Code */}
        <TextField
          label="City Code"
          variant="outlined"
          fullWidth
          value={cityCode}
          onChange={(e) => setCityCode(e.target.value)}
          error={!!errors.cityCode}
          helperText={errors.cityCode}
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
        {errors.state && <div style={{ color: "red", marginTop: "8px" }}>{errors.state}</div>}

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
        <Button variant="outlined" onClick={() => navigate("/dashboard/city")}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default AddCity;
