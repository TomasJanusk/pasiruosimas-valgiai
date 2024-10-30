// src/App.js
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Logout from "./components/Logout";
import AddDishForm from "./components/AddDishForm";
import MainPage from "./components/MainPage";
import Header from "./components/Header";
import { Link } from "react-router-dom";

const LayoutWithHeader = ({ children }) => (
  <div>
    <Header />
    {children}
  </div>
);

function App() {

  const handleLogout = () => {
    localStorage.removeItem("token");
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={<LayoutWithHeader><MainPage/></LayoutWithHeader>}
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={<Login/>}
          />
          <Route
            path="/logout"
            element={"/login"}
          />
          <Route
            path="/addDish"
            element={<AddDishForm/>}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
