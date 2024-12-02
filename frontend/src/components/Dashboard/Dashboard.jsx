import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import Home from "../Home/Home";

const Dashboard = () => {
  

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar remains constant */}
      <Sidebar />

      {/* Main content area */}
      <div style={{ flex: 1 }}>
        {/* Navbar remains constant */}
        <Navbar />
        <div >
      
    </div>
        {/* Dynamic Routes */}
        <div style={{ padding: "20px" }}>
          <Routes>
            <Route path="/home" element={<Home />} />
            {/* Add more child routes here */}
            <Route
              path="*"
              element={<h2>Page Not Found. Please select a valid menu option.</h2>}
            />
          </Routes>
        </div>

     
      </div>
    </div>
  );
};

export default Dashboard;
