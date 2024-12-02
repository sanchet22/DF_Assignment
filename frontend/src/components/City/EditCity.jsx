import React, { useState, useEffect } from "react";
import { TextField, Button, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditCity = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get cityId from the URL params

  // State for input fields and validation errors
  const [cityName, setCityName] = useState("");
  const [cityCode, setCityCode] = useState("");
  const [state, setState] = useState("");
  const [status, setStatus] = useState("Active");
  const [errors, setErrors] = useState({});

  // Fetch existing city data when the component mounts
  useEffect(() => {
    const fetchCityData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/cities/${id}`);
        const cityData = response.data;
        setCityName(cityData.city_name);
        setCityCode(cityData.city_code);
        setState(cityData.state);
        setStatus(cityData.status ? "Active" : "Inactive");
      } catch (error) {
        console.error("Error fetching city data:", error);
      }
    };

    if (id) {
      fetchCityData();
    }
  }, [id]);

  // Validate inputs
  const validateInputs = () => {
    const newErrors = {};
    if (!cityName.trim()) newErrors.cityName = "City name is required.";
    if (!cityCode.trim()) newErrors.cityCode = "City code is required.";
    if (!state.trim()) newErrors.state = "State is required.";
    if (!status) newErrors.status = "Status is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Save button
  const handleSave = async () => {
    if (!validateInputs()) return;

    const updatedCity = {
      city_name: cityName,
      city_code: cityCode,
      state,
      status: status === "Active",
    };

    try {
      const response = await axios.put(`http://localhost:5000/cities/${id}`, updatedCity);
      console.log("City Updated Successfully:", response.data);
      navigate("/dashboard/city"); // Navigate back to cities list
    } catch (error) {
      console.error("Error updating city:", error);
      alert("Failed to update the city. Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit City</h2>
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
        {/* Input for State */}
        <TextField
          label="State"
          variant="outlined"
          fullWidth
          value={state}
          onChange={(e) => setState(e.target.value)}
          error={!!errors.state}
          helperText={errors.state}
        />

        {/* Dropdown for Status */}
        <FormControl fullWidth variant="outlined" error={!!errors.status}>
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
        {errors.status && <div style={{ color: "red", marginTop: "8px" }}>{errors.status}</div>}
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

export default EditCity;
