import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

export default function Login() {
  const { setIsLoggedIn, setUser } = useContext(AuthContext);
  const { setCart } = useContext(CartContext);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/user/login", credentials, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
      });

      const userData = response.data;
      setUser(userData);
      setIsLoggedIn(true);
      setCart([]);
      localStorage.removeItem("cart");

      localStorage.setItem("user", JSON.stringify(userData));

      if (userData.role?.toUpperCase() === "ADMIN") navigate("/add-product");
      else navigate("/cart");

    } catch (err) {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="container mt-5 col-md-4">
      <h2 className="text-center fw-bold mb-4">Login</h2>
      <form onSubmit={handleLogin}>
        <input
          className="form-control mb-3"
          name="email"
          placeholder="Email"
          onChange={(e) => setCredentials({ ...credentials, [e.target.name]: e.target.value })}
        />
        <input
          className="form-control mb-3"
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => setCredentials({ ...credentials, [e.target.name]: e.target.value })}
        />
        <button className="btn btn-primary w-100">Login</button>
      </form>
      <p className="mt-3 text-center">Don't have an account? <Link to="/signup">Signup</Link></p>
    </div>
  );
}
