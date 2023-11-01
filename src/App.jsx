import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/Profile/Profile";
import Protected from "./Protected";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={<Protected Component={Dashboard} />}
        />
        <Route path="/profile" element={<Protected Component={Profile} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
