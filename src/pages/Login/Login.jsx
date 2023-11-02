import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/pem.png";
import "./Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    let login = localStorage.getItem("login");
    if (login) {
      navigate("/dashboard");
    }
    let loginStatus = localStorage.getItem("loginStatus");
    if (loginStatus) {
      setError(loginStatus);
      setTimeout(function () {
        localStorage.clear();
        window.location.reload();
      }, 5000);
    }
    setTimeout(function () {
      setMsg("");
    }, 5000);
  }, [msg]);

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
            localStorage.setItem("userEmail", response.email);
            localStorage.setItem("userPhoto", response.photo);
            setMsg(response.result);
            setTimeout(function () {
              localStorage.setItem("login", true);
              navigate("/dashboard");
            }, 2000);
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
          <p>
            {error !== "" ? (
              <span className="error">{error}</span>
            ) : (
              <span className="success">{msg}</span>
            )}
          </p>
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
          <button className="btnSubmit" type="submit" onClick={loginSubmit}>
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Login;
