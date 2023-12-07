import React, { useState, useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import "./Profile.css";
import userPhoto from "../../assets/userPhoto.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Footer from "../Footer/Footer";

const Profile = ({ changePage }) => {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const storedEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    setEmail(storedEmail);
  }, [storedEmail]);

  const handleInputChange = (e, type) => {
    switch (type) {
      case "photo":
        setPhoto(e.target.value);
        break;

      case "name":
        setName(e.target.value);
        break;

      case "email":
        setEmail(e.target.value);
        break;

      case "pass":
        setPass(e.target.value);
        break;

      default:
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = handleFileReader;
      reader.readAsDataURL(file);
    }
  };

  const handleFileReader = (e) => {
    const fileData = e.target.result;
    setPhoto(fileData.split(",")[1]);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost/pem-api/manageUser.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ operation: "select", email: storedEmail }),
          }
        );
        const data = await response.json();
        setName(data.name);
        setPhoto(data.photo);
        setPass(data.password);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [storedEmail]);

  const saveSubmit = async () => {
    try {
      const saveResponse = await fetch(
        "http://localhost/pem-api/manageUser.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            operation: "update",
            id: localStorage.getItem("userId"),
            name: name,
            email: email,
            pass: pass,
            photo: photo,
          }),
        }
      );

      const data = await saveResponse.json();
      if (data !== "fail") {
        localStorage.setItem("userPhoto", data.photo);
        localStorage.setItem("userName", data.name);
        localStorage.setItem("userEmail", data.email);
        window.location.reload();
      } else {
        alert("An error occurred, try again!");
      }
    } catch (error) {
      console.error("Error creating item", error);
    }
  };

  const deleteSubmit = async () => {
    try {
      const deleteUser = window.confirm(
        "Are you sure you want to delete your account?"
      );
      if (deleteUser) {
        const saveResponse = await fetch(
          "http://localhost/pem-api/manageUser.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              operation: "delete",
              id: localStorage.getItem("userId"),
            }),
          }
        );

        const data = await saveResponse.json();
        if (data === "success") {
          localStorage.setItem("login", "");
          changePage("login");
          alert("Account deleted!");
        } else {
          alert("An error occurred, try again!");
        }
      }
    } catch (error) {
      console.error("Error creating item", error);
    }
  };

  return (
    <div>
      <NavBar changePage={changePage} />
      <section id="profile">
        <h1>My Profile</h1>
        <div className="formProfile">
          <div className="photoProfile">
            <img
              src={photo ? `data:image/png;base64,${photo}` : userPhoto}
              alt="imgUser"
            />
            <input
              type="file"
              name="photo"
              id="photo"
              onChange={(e) => handleFileChange(e)}
            />
          </div>
          <div className="input-container">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => handleInputChange(e, "name")}
              placeholder="Name"
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => handleInputChange(e, "email")}
              placeholder="E-mail"
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">Password</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={pass}
                onChange={(e) => handleInputChange(e, "pass")}
                placeholder="Password"
                required
              />
            </div>
            <span className="password-toggle" onClick={handleShowPassword}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="buttonsProfile">
            <button className="btnSave" type="button" onClick={saveSubmit}>
              Save
            </button>
            <button className="btnDelete" type="button" onClick={deleteSubmit}>
              Delete Account
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Profile;
