import React from "react";

export default function Contact() {
  return (
    <div className="container mt-5">
      <h2 className="fw-bold text-center mb-4">Contact Us</h2>

      <p className="lead text-center">We’re here to help! Reach out to us for any support or inquiries.</p>

      <div className="card p-4 shadow-sm col-md-6 mx-auto mt-4">
        <h5>📍 Office Location</h5>
        <p>123 Camera Street, Pune, Maharashtra, India</p>

        <h5>📞 Phone</h5>
        <p>+91 9876543210</p>

        <h5>📧 Email</h5>
        <p>support@camerarental.com</p>

        <h5>⏰ Working Hours</h5>
        <p>Mon - Sun : 10:00 AM to 8:00 PM</p>
      </div>

      <p className="text-center mt-4 fw-bold">We’ll get back to you shortly.</p>
    </div>
  );
}
