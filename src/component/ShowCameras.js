import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";


export default function ShowCameras() {

  const [cameras, setCameras] = useState([]);
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchCameras = async () => {
      try {
        const response = await axios.get("https://camera-rental-backend-j62w.onrender.com/camera/all");
        setCameras(response.data);
      } catch (error) {
        console.error("Error fetching cameras", error);
      }
    };

    fetchCameras();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center fw-bold mb-4 text-light">Available Cameras</h2>

      <div className="row">
        {cameras.slice(0, 6).map((cam) => (
          <div
            key={cam.id}
            className="col-md-4 mb-4"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/camera/${cam.id}`)}
          >
            <div className="card bg-dark text-white shadow-lg">
              <img
                src={`data:image/jpeg;base64,${cam.image}`}
                className="card-img-top"
                alt={cam.name}
                style={{ height: "250px", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h5 className="card-title">{cam.name}</h5>
                <p className="card-text fw-bold">Price: ₹{cam.price} / day</p>

                <button
                  className="btn btn-primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(cam);
                  }}
                >
                  Add to Cart
                </button>

              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        <button
          className="btn btn-outline-dark px-4 py-2"
          onClick={() => navigate("/cameras")}
        >
          More Cameras
        </button>
      </div>
    </div>
  );
}
