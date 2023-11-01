import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import "./Profile.css";

function Profile() {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

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

  function loginSubmit() {}

  return (
    <div>
      <NavBar />
      <section id="profile">
        <h1>Your Profile</h1>
        <div className="formProfile">
          <input
            type="file"
            name="photo"
            id="photo"
            value={photo}
            onChange={(e) => handleInputChange(e, "name")}
            placeholder="Name"
          />
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => handleInputChange(e, "name")}
            placeholder="Name"
            required
          />
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => handleInputChange(e, "email")}
            placeholder="E-mail"
            required
          />

          <input
            type="password"
            name="password"
            id="password"
            value={pass}
            onChange={(e) => handleInputChange(e, "pass")}
            placeholder="Password"
            required
          />
          <div className="buttonsProfile">
            <button className="btnSave" type="button" onClick={loginSubmit}>
              Save
            </button>
            <button className="btnDelete" type="button" onClick={loginSubmit}>
              Delete Account
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Profile;
