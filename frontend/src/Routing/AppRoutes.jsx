import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "../components/Login/Login";
import Home from "../components/Home/Home";
import State from "../components/State/State";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import AppLayout from "../components/Sidebar/Sidebar";
import City from "../components/City/City";
import AddState from "../components/State/AddState";
import EditState from "../components/State/EditState";
import AddCity from "../components/City/AddCity";
import EditCity from "../components/City/EditCity";
import WearHouse from "../components/WearHouse/WearHouse";
import AddWearHouse from "../components/WearHouse/AddWearHouse";
import EditWearhouse from "../components/WearHouse/EditWearHouse";
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route path="/" element={<Login />} />

        {/* Dashboard Layout with Sidebar and Navbar */}
        <Route
          path="/dashboard/*"
          element={
            <PrivateRoute>
              <AppLayout />
            </PrivateRoute>
          }
        >
          {/* Child Routes for the Dashboard */}
          <Route path="home" element={<Home />} />
          <Route path="state" element={<State />} />
          <Route path="city" element={<City />} />
          <Route path="add-state" element={<AddState />} />
          <Route path="edit-state/:id" element={<EditState />} />
          <Route path="add-city" element={<AddCity />} />
          <Route path="edit-city/:id" element={<EditCity />} />
          <Route path="wearhouse" element={<WearHouse />} />
          <Route path="add-wearhouse" element={<AddWearHouse />} />
          <Route path="edit-wearhouse/:id" element={<EditWearhouse />} />

        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
