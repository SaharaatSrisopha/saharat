import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_API_URL, APP_NAME } from "./globals";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(BASE_API_URL + "/login", {
        email_mem: email,
        password_mem: password,
      });
      alert("Login Successful");

      localStorage.setItem("isLoggedIn", "true"); 
      localStorage.setItem("user", JSON.stringify(response.data.user)); 
      navigate("/search"); 
      
    } catch (error) {
      alert(error.response?.data || "Login Failed");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2 className="login-title">เข้าสู่ระบบ</h2>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ใส่ email เจ้าเด้อ"
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="หม่องนี้ให้ใส่รหัส"
            className="input-field"
          />
        </div>
        <button type="submit" className="login-button">เข้าสู่ระบบ</button>
      </form>
    </div>
  );
};

export default Login;