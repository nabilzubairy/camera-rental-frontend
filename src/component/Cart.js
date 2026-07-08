import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { user } = useContext(AuthContext);
  const { removeFromCart } = useContext(CartContext);

  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/cart/${user.id}`, {
        withCredentials: true,
      });

      const cartData = res.data;

      const itemsWithDetails = await Promise.all(
        cartData.map(async (item) => {
          const camRes = await axios.get(`http://localhost:8080/camera/${item.cameraId}`);
          return { ...item, camera: camRes.data }; 
        })
      );

      setCartItems(itemsWithDetails);

    } catch (err) {
      console.error("Error fetching cart", err);
    }
  };

  useEffect(() => {
    if (user) {
      localStorage.removeItem("cart");
      fetchCart();
    }
  }, [user]);

  const removeItem = async (id) => {
    await removeFromCart(id);
    fetchCart();
  };

  const total = cartItems.reduce((sum, item) => sum + (parseFloat(item.camera.price) || 0), 0);

  if (!cartItems.length) {
    return (
      <div className="container mt-5 text-center">
        <h3>Your Cart is Empty 🛒</h3>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="fw-bold text-center mb-4">My Cart</h2>

      {cartItems.map((item) => (
        <div key={item.id} className="card mb-3 p-3 d-flex flex-row align-items-center shadow">

          <img
            src={`data:image/jpeg;base64,${item.camera.image}`}
            alt={item.camera.name}
            style={{ width: "120px", height: "120px", objectFit: "cover" }}
          />

          <div className="ms-3">
            <h5>{item.camera.name}</h5>
            <p className="text-muted">{item.camera.model} — {item.camera.companyName}</p>
            <p className="fw-bold">₹{item.camera.price} / day</p>
          </div>

          <button
            className="btn btn-danger btn-sm ms-auto"
            onClick={() => removeItem(item.id)}
          >
            Remove
          </button>
        </div>
      ))}

      <h3 className="text-end fw-bold mt-4">Grand Total: ₹{total}</h3>

      <div className="text-center mt-4">
        <button
          className="btn btn-success px-4 py-2"
          onClick={() => navigate("/payment", { state: { totalPrice: total, cart: cartItems } })}
        >
          Book Now
        </button>
      </div>
    </div>
  );
}
