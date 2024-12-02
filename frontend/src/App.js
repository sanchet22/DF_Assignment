import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "./components/Login/Login";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Dashboard from "./components/Dashboard/Dashboard";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import AppRoutes from "./Routing/AppRoutes";

function App() {

  // Login handler to update authentication state
  

  // Logout handler to reset authentication state
  

  return (
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<Login  />} />
    //     <Route
    //       path="/dashboard"
    //       element={
    //         <PrivateRoute >
    //           <Dashboard />
    //         </PrivateRoute>
    //       }
    //     />

    //     <Route path="*" element={<Navigate to="/" />} />
    //   </Routes>
    // </Router>
    <>
    {/* <Login/> */}
    <AppRoutes/>
    </>
  );
}

export default App;
