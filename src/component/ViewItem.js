
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartContext";

export default function ViewItem() {
  const { id } = useParams();   // Get camera ID from URL
  const [camera, setCamera] = useState(null);

  const { addToCart } = useContext(CartContext);
  

  useEffect(() => {
    const fetchCamera = async () => {
      try {
        const res = await axios.get(`https://camera-rental-backend-j62w.onrender.com/camera/${id}`);
        setCamera(res.data);
      } catch (err) {
        console.error("Error fetching camera", err);
      }
    };
    fetchCamera();
  }, [id]);

  if (!camera) return <h3 className="text-center mt-5">Loading...</h3>;

  return (
    <div className="container mt-5 col-md-8">
      <div className="card p-4 shadow">

        <div className="row">
          <div className="col-md-5">
            <img
              src={`data:image/jpeg;base64,${camera.image}`}
              alt={camera.name}
              style={{ width: "100%", height: "350px", objectFit: "cover", borderRadius: "10px" }}
            />
          </div>

          <div className="col-md-7">
            <h2 className="fw-bold">{camera.name}</h2>
            <h5 className="text-muted">{camera.model} — {camera.companyName}</h5>
            <h3 className="text-success fw-bold mt-3">₹{camera.price} / day</h3>

            <p className="mt-4">{camera.description}</p>

            <button
              className="btn btn-primary mt-4 px-4"
              onClick={() => addToCart(camera)}
            >
              Add to Cart
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
