import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/pem.png";
import userPhoto from "../../assets/userPhoto.png";
import "./NavBar.css";

function NavBar() {
  const navigate = useNavigate();
  const storedName = localStorage.getItem("userName");
  const storedPhoto = localStorage.getItem("userPhoto");

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  function logoutSubmit() {
    localStorage.setItem("login", "");
    localStorage.setItem("loginStatus", "Logged out successfully!");
    navigate("/");
  }

  function profileSubmit() {
    navigate("/profile");
  }

  useEffect(() => {
    const closeDropdown = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("click", closeDropdown);
    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  return (
    <nav className="navbar-container">
      <img className="navbar-logo" src={logo} alt="logo" />
      <div className="user-info">
        <p>Hi, {storedName}</p>
        <div onClick={toggleDropdown} ref={dropdownRef}>
          <img
            src={
              storedPhoto ? `data:image/png;base64,${storedPhoto}` : userPhoto
            }
            alt="imgUser"
          />
          {showDropdown && (
            <div className="dropdown-content">
              <p onClick={profileSubmit}>Profile</p>
              <p onClick={logoutSubmit}>Log out</p>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
