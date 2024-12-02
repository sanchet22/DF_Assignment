import React, { useState } from "react";
import { TextField, Button, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddState = () => {
  const navigate = useNavigate();

  // State for input fields and validation errors
  const [stateName, setStateName] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [status, setStatus] = useState("Inactive"); // Default value for the dropdown
  const [errors, setErrors] = useState({}); // State to track validation errors

  // Validate inputs
  const validateInputs = () => {
    const newErrors = {};

    if (!stateName.trim()) newErrors.stateName = "State name is required.";
    if (!stateCode.trim()) newErrors.stateCode = "State code is required.";
    if (!status) newErrors.status = "Status is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle Save button
  const handleSave = async () => {
    if (!validateInputs()) return; // Stop submission if validation fails

    const newState = {
      name: stateName,
      code: stateCode,
      status: status, // Include status value
    };

    try {
      // Make POST request
      const response = await axios.post("http://localhost:5000/api/states", newState);
      console.log("State Added Successfully:", response.data);

      // Navigate back to the states list
      navigate("/dashboard/state");
    } catch (error) {
      console.error("Error adding state:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add State</h2>
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        {/* Input for State Name */}
        <TextField
          label="State Name"
          variant="outlined"
          fullWidth
          value={stateName}
          onChange={(e) => setStateName(e.target.value)}
          error={!!errors.stateName}
          helperText={errors.stateName}
        />

        {/* Input for State Code */}
        <TextField
          label="State Code"
          variant="outlined"
          fullWidth
          value={stateCode}
          onChange={(e) => setStateCode(e.target.value)}
          error={!!errors.stateCode}
          helperText={errors.stateCode}
        />
      </div>

      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
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
        <Button variant="outlined" onClick={() => navigate("/dashboard/state")}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default AddState;
