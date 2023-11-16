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

  function loginSubmit() {
    if (isLogin) {
      if (email !== "" && pass !== "") {
        var url = "http://localhost/pem-api/login.php";
        var headers = {
          Accept: "application/json",
          "Content-type": "application/json",
        };
        var Data = {
          email: email,
          pass: pass,
        };

        fetch(url, {
          method: "POST",
          headers: headers,
          body: JSON.stringify(Data),
        })
          .then((response) => response.json())
          .then((response) => {
            if (
              response.result === "Invalid email!" ||
              response.result === "Invalid password!"
            ) {
              setError(response.result);
            } else {
              localStorage.setItem("userName", response.name);
              localStorage.setItem("userPhoto", response.photo);
              localStorage.setItem("userEmail", response.email);
              setMsgButtonLogin("Success");
              setShowConfetti(true);
              setTimeout(function () {
                localStorage.setItem("login", true);
                localStorage.setItem("userId", response.id);
                changePage("dashboard");
              }, 3000);
            }
          })
          .catch((err) => {
            console.error("Error in fetching data:", err);
            setError(err.toString());
          });
      } else {
        setError("All fields are required!");
      }
    } else {
      // Signup mode logic
      if (name !== "" && email !== "" && pass !== "") {
        var url = "http://localhost/pem-api/signup.php"; // Change to the signup endpoint
        var headers = {
          Accept: "application/json",
          "Content-type": "application/json",
        };
        var Data = {
          name: name,
          email: email,
          pass: pass,
        };

        fetch(url, {
          method: "POST",
          headers: headers,
          body: JSON.stringify(Data),
        })
          .then((response) => response.json())
          .then((response) => {
            if (response.result === "User already exists!") {
              setError(response.result);
            } else {
              // Handle successful signup
              localStorage.setItem("userName", response.name);
              localStorage.setItem("userPhoto", response.photo);
              localStorage.setItem("userEmail", response.email);
              setMsgButtonLogin("Success");
              setShowConfetti(true);
              setTimeout(function () {
                localStorage.setItem("login", true);
                changePage("dashboard");
              }, 3000);
            }
          })
          .catch((err) => {
            console.error("Error in fetching data:", err);
            setError(err.toString());
          });
      } else {
        setError("All fields are required!");
      }
    }
  }

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
                setShowConfetti(true);
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
            <button className="btnSubmit" type="submit" onClick={loginSubmit}>
              Sign Up
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Login;
