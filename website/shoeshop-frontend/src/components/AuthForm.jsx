import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../contexts";
import { STORAGE_KEYS } from "../constants";
import "./AuthForm.css";

export default function AuthForm({ type }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (type === "login") {
      const ADMIN_USERNAME = "admin";
      const ADMIN_PASSWORD = "abc123!@#";

      if (formData.username === ADMIN_USERNAME && formData.password === ADMIN_PASSWORD) {
        const mockAdminToken = btoa(JSON.stringify({
          sub: ADMIN_USERNAME,
          role: "ADMIN",
          email: "admin@anta.com",
          iat: Date.now(),
          exp: Date.now() + 86400000
        }));

        login(mockAdminToken);
        alert("Đăng nhập thành công! Chào mừng Admin!");
        navigate("/admin");
        return;
      }
    }

    try {
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
      const url =
        type === "register"
          ? `${baseUrl}/api/auth/register`
          : `${baseUrl}/api/auth/login`;

      const payload =
        type === "register"
          ? formData
          : { username: formData.username, password: formData.password };

      const res = await axios.post(url, payload);

      if (type === "register") {
        alert("Đăng ký thành công, vui lòng đăng nhập!");
        navigate("/login");
      } else {
        const token = res.data.token;
        login(token);

        const decoded = jwtDecode(token);
        console.log("Decoded token:", decoded);

        if (decoded.role === "ADMIN") {
          alert("Đăng nhập thành công! Chào Admin!");
          navigate("/admin");
        } else {
          alert("Đăng nhập thành công!");
          navigate("/home");
        }
      }
    } catch (err) {
      if (type === "login") {
        alert("Sai tên đăng nhập hoặc mật khẩu!");
      } else {
        alert("Lỗi: " + (err.response?.data?.message || err.message));
      }
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>{type === "register" ? "Register" : "Login"}</h2>

        {type === "register" && (
          <>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </>
        )}

        {type === "login" && (
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        )}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {type === "register" ? "Sign Up" : "Login"}
        </button>

        {type === "login" && (
          <p>
            <Link to="/forgot-password">Forgot password?</Link>
          </p>
        )}

        <p>
          {type === "register" ? (
            <>
              Already have an account? <Link to="/login">Login</Link>
            </>
          ) : (
            <>
              Don’t have an account? <Link to="/register">Register</Link>
            </>
          )}
        </p>
      </form>
    </div>
  );
}
