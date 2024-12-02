import React, { useState, useEffect } from "react";
import { TextField, Button, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditWearhouse = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the wearhouse ID from URL params
  console.log(id,"id")

  // State for input fields
  const [name, setName] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [status, setStatus] = useState("Inactive"); // Default status
  const [statesList, setStatesList] = useState([]);
  const [citiesList, setCitiesList] = useState([]);

  // Fetch states on component mount
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

  // Fetch cities based on the selected state
  useEffect(() => {
    if (state) {
      const fetchCities = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/cities?state=${state}`);
          setCitiesList(response.data);
        } catch (error) {
          console.error("Error fetching cities:", error);
        }
      };
      fetchCities();
    } else {
      setCitiesList([]);
    }
  }, [state]);

  // Fetch wearhouse data on component mount or when `id` changes
  useEffect(() => {
    if (id) {
      const fetchWearhouseData = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/wearhouse/${id}`);
          const wearhouseData = response.data;
          setName(wearhouseData.name);
          setState(wearhouseData.state);
          setCity(wearhouseData.city);
          setStatus(wearhouseData.status);
        } catch (error) {
          console.error("Error fetching wearhouse data:", error);
        }
      };
      fetchWearhouseData();
    }
  }, [id]);

  // Handle Save button (PUT request to update the wearhouse)
  const handleSave = async () => {
    const updatedWearhouse = {
      name,
      state,
      city,
      status,
    };

    try {
      const response = await axios.put(`http://localhost:5000/wearhouse/${id}`, updatedWearhouse);
      console.log("Wearhouse Updated Successfully:", response.data);

      // Navigate to the wearhouses list
      navigate("/dashboard/wearhouse");
    } catch (error) {
      console.error("Error updating wearhouse:", error);
      alert("Failed to update the wearhouse. Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Wearhouse</h2>
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        {/* Input for Wearhouse Name */}
        <TextField
          label="Wearhouse Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          >
            {statesList.map((stateItem) => (
              <MenuItem key={stateItem.id} value={stateItem.name}>
                {stateItem.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Dropdown for City */}
        <FormControl fullWidth variant="outlined">
          <InputLabel>City</InputLabel>
          <Select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            label="City"
            disabled={!state} // Disable city selection if no state is selected
          >
            {citiesList.map((cityItem) => (
              <MenuItem key={cityItem.id} value={cityItem.city_name}>
                {cityItem.city_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
        <Button variant="outlined" onClick={() => navigate("/dashboard/wearhouse")}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default EditWearhouse;
