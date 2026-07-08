import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-4 mt-4">
      <div className="container">
        <div className="row">

          {/* Brand & About */}
          <div className="col-md-4 mb-3">
            <h4 className="fw-bold text-light">Cameo Rentals</h4>
            <p className="text-secondary">
              Your trusted partner for professional camera and equipment rentals.
              Capture your best moments with premium gear at affordable prices.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold text-light">Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link className="text-decoration-none text-secondary" to="/">Home</Link></li>
              <li><Link className="text-decoration-none text-secondary" to="/cameras">Cameras</Link></li>
              <li><Link className="text-decoration-none text-secondary" to="/about">About Us</Link></li>
              <li><Link className="text-decoration-none text-secondary" to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold text-light">Contact Us</h5>
            <p className="text-secondary"><FaMapMarkerAlt /> Pune, Maharashtra, India</p>
            <p className="text-secondary"><FaPhone /> +91 9876543210</p>
            <p className="text-secondary"><FaEnvelope /> support@camerarental.com</p>

            <div>
              <a href="https://www.facebook.com/" className="me-2 text-secondary fs-5"><FaFacebook /></a>
              <a href="https://www.twitter.com/" className="me-2 text-secondary fs-5"><FaTwitter /></a>
              <a href="https://www.instagram.com/" className="text-secondary fs-5"><FaInstagram /></a>
            </div>
          </div>

        </div>

        <hr className="border-secondary" />

        <div className="text-center py-2 text-secondary" style={{ fontSize: "14px" }}>
          &copy; {new Date().getFullYear()} <b>Cameo Rentals</b> | All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
