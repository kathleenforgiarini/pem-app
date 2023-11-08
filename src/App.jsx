import React, { useState } from "react";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/Profile/Profile";

const App = () => {
  const [currentPage, setCurrentPage] = useState("login");

  const renderPage = () => {
    switch (currentPage) {
      case "login":
        return <Login changePage={setCurrentPage} />;
      case "dashboard":
        return <Dashboard changePage={setCurrentPage} />;
      case "profile":
        return <Profile changePage={setCurrentPage} />;
      default:
        return <Login changePage={setCurrentPage} />;
    }
  };

  return <div>{renderPage()}</div>;
};

export default App;
