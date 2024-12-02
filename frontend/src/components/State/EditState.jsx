import React, { useState, useEffect } from "react";
import { TextField, Button, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditState = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the state ID from URL params

  // State for input fields
  const [stateName, setStateName] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [status, setStatus] = useState("Inactive"); // Default status is set to "Inactive"

  // Fetch the state data when the component is mounted or when `id` changes
  useEffect(() => {
    console.log("ID:", id);
    if (id) {
      const fetchStateData = async () => {
        console.log(fetchStateData,"fetchStateData")
        try {
          const response = await axios.get(`http://localhost:5000/api/states/${id}`);
          const stateData = response.data;
          setStateName(stateData.name);
          setStateCode(stateData.code);
          setStatus(stateData.status);
        } catch (error) {
          console.error("Error fetching state data:", error);
        }
      };
      fetchStateData();
    }
  }, [id]);
  

  // Handle Save button (PUT request to update the state)
  const handleSave = async () => {
    const updatedState = {
      name: stateName,
      code: stateCode,
      status: status,
    };
  
    try {
      const response = await axios.put(`http://localhost:5000/api/states/${id}`, updatedState);
      console.log("State Updated Successfully:", response.data);
  
      // Navigate to the states list
      navigate("/dashboard/state");
    } catch (error) {
      console.error("Error updating state:", error);
      alert("Failed to update the state. Please try again.");
    }
  };
  

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit State</h2>
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        {/* Input for State Name */}
        <TextField
          label="State Name"
          variant="outlined"
          fullWidth
          value={stateName}
          onChange={(e) => setStateName(e.target.value)}
        />

        {/* Input for State Code */}
        <TextField
          label="State Code"
          variant="outlined"
          fullWidth
          value={stateCode}
          onChange={(e) => setStateCode(e.target.value)}
        />
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

export default EditState;
