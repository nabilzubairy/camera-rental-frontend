
import React from "react";

export default function About() {
  return (
    <div className="container mt-5 ">
      <h2 className="fw-bold text-center mb-4">About Camera Rental System</h2>

      <p className="lead text-center" style={{ width: "80%", margin: "0 auto" }}>
        Welcome to our Camera Rental System, your one-stop solution for renting premium cameras and photography equipment.
        Our goal is to make high-quality gear accessible and affordable for students, content creators, filmmakers, and professionals.
      </p>

      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card p-3 shadow-sm">
            <h5 className="fw-bold">🎯 Our Mission</h5>
            <p>
              To provide affordable and reliable rental equipment and help content creators express their creativity without limitations.
            </p>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card p-3 shadow-sm">
            <h5 className="fw-bold">💡 Why Choose Us?</h5>
            <ul>
              <li>Wide range of latest cameras and gear</li>
              <li>Secure booking system</li>
              <li>Budget-friendly pricing</li>
              <li>Easy pickup and return</li>
            </ul>
          </div>
        </div>
      </div>

      <p className="text-center mt-4 fw-bold">📸 Capture your moments with the best equipment!</p>
    </div>
  );
}

