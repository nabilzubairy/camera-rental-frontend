import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

export default function Signup() {
  const [user, setUserLocal] = useState({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
  const navigate = useNavigate();


  const handleSignup = async (e) => {
    e.preventDefault();


    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }


    await axios.post("https://camera-rental-backend-j62w.onrender.com/user/register", user, { headers: { "Content-Type": "application/json" } });
    alert("Signup Successful");
    navigate("/login");
  };


  return (
    <div className="container mt-5 col-md-4">
      <h2 className="text-center fw-bold mb-4">Signup</h2>
      <form onSubmit={handleSignup}>
        <input className="form-control mb-3" placeholder="Name" onChange={(e) => setUserLocal({ ...user, name: e.target.value })} />
        <input className="form-control mb-3" placeholder="Email" onChange={(e) => setUserLocal({ ...user, email: e.target.value })} />
        <input className="form-control mb-3" placeholder="Phone" onChange={(e) => setUserLocal({ ...user, phone: e.target.value })} />
        
        <input className="form-control mb-3" type="password" placeholder="Password" onChange={(e) => setUserLocal({ ...user, password: e.target.value })} />
        <input className="form-control mb-3" type="password" placeholder="Confirm Password" onChange={(e) => setUserLocal({ ...user, confirmPassword: e.target.value })} />
        <button className="btn btn-success w-100">Signup</button>
      </form>
      <p className="mt-3 text-center">Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}
