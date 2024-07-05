import React, { useState } from "react";
import loginPage from "../images/loginPage.png";
import uoloLogo from "../images/uoloLogo.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login-container flex">
      <div className="login-left">
        <img
          src={loginPage}
          alt="login-left"
        />
        <div className="login-image-overlay"></div>
      </div>
      <div className="login-right flex">
        <div className="login-right-logo">
          <img
            src={uoloLogo}
            alt="uolo-logo"
          />
        </div>
        <hr className="horizontal-line-login" />
        <div className="login-right-info">
          <h1>Welcome back!</h1>
          <p>Log in to continue and access all the features</p>
        </div>
        <div className="login-form-container">
          <form className="login-form ">
            <div className="form-group">
              <label htmlFor="email">Enter Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="login-btn"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
