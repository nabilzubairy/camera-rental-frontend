import React, { useEffect, useState , useContext} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function Cameras() {

  const [cameras, setCameras] = useState([]);
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchCameras = async () => {
      try {
        const response = await axios.get("http://localhost:8080/camera/all");
        setCameras(response.data);
      } catch (error) {
        console.error("Error fetching cameras", error);
      }
    };

    fetchCameras();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center fw-bold mb-4 text-dark ">Available Cameras</h2>

      <div className="row">
        {cameras.map((cam) => (
          <div
            key={cam.id}
            className="col-md-4 mb-4"
            onClick={() => navigate(`/camera/${cam.id}`)}
            style={{ cursor: "pointer" }}
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

    </div>
  );
}
