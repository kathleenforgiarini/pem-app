import React, { useState, useRef, useEffect } from "react";
import logo from "../../assets/pem.png";
import "./Login.css";
import { FaEye, FaEyeSlash, FaCheck } from "react-icons/fa";
import Confetti from "react-confetti";

const Login = ({ changePage }) => {
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("login");
    if (isLoggedIn) {
      changePage("dashboard");
    }
  }, [changePage]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [msgButtonLogin, setMsgButtonLogin] = useState("Log in");

  const handleInputChange = (e, type) => {
    switch (type) {
      case "email":
        setError("");
        setEmail(e.target.value);
        if (e.target.value === "") {
          setError("E-mail has left blank");
        }
        break;

      case "name":
        setError("");
        setName(e.target.value);
        if (e.target.value === "") {
          setError("Name has left blank");
        }
        break;

      case "pass":
        setError("");
        setPass(e.target.value);
        if (e.target.value === "") {
          setError("Password has left blank");
        }
        break;

      default:
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const signUpSubmit = async () => {
    try {
      const signUpResponse = await fetch(
        "http://localhost/pem-api/manageUser.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            operation: "create",
            name: name,
            email: email,
            pass: pass,
          }),
        }
      );

      const data = await signUpResponse.json();
      if (data === "user_registered") {
        alert("User already registered, try another email!");
      } else if (data === "fields_required") {
        alert("Please fill in all fields!");
      } else if (data === "fail") {
        alert("An error occurred, try again!");
      } else if (data === "success") {
        setIsLogin(true);
        alert("Thank you for registering, log in to your profile");
        changePage("login");
      } else {
        alert("Error! Try again...");
      }
    } catch (error) {
      console.error("Error creating user", error);
    }
  };

  const loginSubmit = async () => {
    try {
      const loginResponse = await fetch(
        "http://localhost/pem-api/manageUser.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            operation: "login",
            email: email,
            pass: pass,
          }),
        }
      );

      const data = await loginResponse.json();
      if (data === "invalid_credencials") {
        alert("Invalid credencials, try again!");
      } else if (data === "fields_required") {
        alert("All fields are required!");
      } else {
        localStorage.setItem("userName", data.name);
        localStorage.setItem("userPhoto", data.photo);
        localStorage.setItem("userEmail", data.email);
        setMsgButtonLogin("Success");
        setShowConfetti(true);
        setTimeout(function () {
          localStorage.setItem("login", true);
          localStorage.setItem("userId", data.id);
          changePage("dashboard");
        }, 3000);
      }
    } catch (error) {
      console.error("Error creating item", error);
    }
  };

  const [isLogin, setIsLogin] = useState(true);
  const loginRef = useRef(null);
  const signUpRef = useRef(null);

  useEffect(() => {
    if (isLogin && loginRef.current) {
      loginRef.current.focus();
    } else if (!isLogin && signUpRef.current) {
      signUpRef.current.focus();
    }
  }, [isLogin]);

  const handleToggle = (isLogin) => {
    setIsLogin(isLogin);
  };

  return (
    <section id="login">
      <div className="imgWelcome">
        <img src={logo} alt="logo" />
        <p>Welcome to your Personal Expenses Management</p>
      </div>
      <div className="formLogin">
        <div className="switch">
          <button
            ref={loginRef}
            className={`btnLogin ${isLogin ? "focus" : ""}`}
            type="button"
            onClick={() => handleToggle(true)}
          >
            Log In
          </button>
          <button
            ref={signUpRef}
            className={`btnSignup ${!isLogin ? "focus" : ""}`}
            type="button"
            onClick={() => handleToggle(false)}
          >
            Sign up
          </button>
        </div>
        <div className="inputsLogin">
          <p>{error !== "" && <span className="error">{error}</span>}</p>
          {isLogin ? (
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => handleInputChange(e, "email")}
              placeholder="E-mail"
              required
            />
          ) : (
            <>
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
            </>
          )}
          <div className="passwordLogin">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={pass}
              onChange={(e) => handleInputChange(e, "pass")}
              placeholder="Password"
              required
            />
            <span className="password-toggleLogin" onClick={handleShowPassword}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {isLogin && (
            <button
              className={`btnSubmit ${
                msgButtonLogin === "Success" ? "successButton" : ""
              }`}
              type="submit"
              onClick={() => {
                loginSubmit();
              }}
            >
              {msgButtonLogin === "Success" ? (
                <div className="successContent">
                  <FaCheck className="checkmark" />
                  <span>Success</span>
                </div>
              ) : (
                "Log in"
              )}
              {showConfetti && <Confetti />}
            </button>
          )}
          {!isLogin && (
            <button
              className="btnSubmit"
              type="submit"
              onClick={() => {
                signUpSubmit();
              }}
            >
              Sign Up
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Login;
