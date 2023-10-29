import React, { useState, useRef, useEffect } from 'react';
import logo from '../../assets/pem.png';
import './Login.css';

const Login = () => {
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
      <div className="img">
        <img src={logo} alt="logo" />
        <p>Welcome to your Personal Expenses Management</p>
      </div>
      <form>
        <div className="switch">
          <button
            ref={loginRef}
            className={`btnLogin ${isLogin ? 'focus' : ''}`}
            type="button"
            onClick={() => handleToggle(true)}
          >
            Log In
          </button>
          <button
            ref={signUpRef}
            className={`btnSignup ${!isLogin ? 'focus' : ''}`}
            type="button"
            onClick={() => handleToggle(false)}
          >
            Sign up
          </button>
        </div>
        <div className="inputs">
          {isLogin ? (
            <input
              type="email"
              name="email"
              id="email"
              placeholder="E-mail"
              required
            />
          ) : (
            <>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                required
              />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="E-mail"
                required
              />
            </>
          )}
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required
          />
          <button className="btnSubmit" type="submit">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Login;
