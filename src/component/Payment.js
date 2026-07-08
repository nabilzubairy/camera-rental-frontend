import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { setCart } = useContext(CartContext);

  const { totalPrice = 0, cart = [] } = location.state || {};
  const today = new Date().toISOString().split("T")[0];
  const getNextDay = (date) => {
    const d = new Date(date);
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  };



  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [days, setDays] = useState(0);
  const [paymentMode, setPaymentMode] = useState("");

  useEffect(() => {
    if (fromDate && toDate) {
      const sDate = new Date(fromDate);
      const eDate = new Date(toDate);
      const diff = (eDate - sDate) / (1000 * 60 * 60 * 24);
      setDays(diff > 0 ? diff : 0);
    }
  }, [fromDate, toDate]);

  const finalPrice = days * totalPrice;

  const handleConfirmBooking = async () => {
    if (!fromDate || !toDate) return alert("Please select booking dates");
    if (!paymentMode) return alert("Please select payment mode");

    try {
      const bookingData = {
        userId: user.id,
        email: user.email,
        cartItems: cart.map((i) => i.cameraId),
        fromDate,
        toDate,
        days,
        totalAmount: finalPrice,
        paymentMode
      };

      await axios.post("http://localhost:8080/booking", bookingData, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
      });

      setCart([]);
      await axios.delete(`http://localhost:8080/cart/clear/${user.id}`);
      navigate("/confirm");
    } catch (err) {
      console.error("Booking save error:", err);
      alert("Booking failed");
    }
  };


  const checkAvailability = async (start, end) => {
    try {
      await axios.get("http://localhost:8080/booking/check-availability", {
        params: {
          cameraIds: cart.map(i => i.cameraId),
          fromDate: start,
          toDate: end
        }
      });

      return true;

    } catch (err) {
      if (err.response?.status === 409) {
        const unavailable = err.response.data;

        alert(
          "⚠ These cameras are not available:\n" +
          unavailable.map(cam => `• ${cam.name} (${cam.model})`).join("\n") +
          "\nPlease remove them from cart to continue."
        );

        return false;
      }
    }
  };


  return (
    <div className="container mt-5 col-md-8">
      <h2 className="fw-bold text-center mb-4">Booking Payment & Summary</h2>

      {cart.map((item) => (
        <div key={item.id} className="card mb-3 p-3 d-flex flex-row align-items-center shadow">
          <img
            src={`data:image/jpeg;base64,${item.camera.image}`}
            alt={item.camera.name}
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />

          <div className="ms-3">
            <h5>{item.camera.name}</h5>
            <p className="text-muted">{item.camera.model} — {item.camera.companyName}</p>
            <p className="fw-bold">₹{item.camera.price} / day</p>
          </div>
        </div>
      ))}

      <h3 className="fw-bold text-end mt-3">Subtotal: ₹{totalPrice}</h3>

      {/* Date selection */}
      <div className="card p-4 shadow mb-4">
        <h4 className="fw-bold">Select Booking Dates</h4>

        <label className="form-label fw-bold mt-3">From Date</label>
        <input
          type="date"
          className="form-control"
          min={today}
          value={fromDate}
          onChange={async (e) => {
            const newDate = e.target.value;
            setFromDate(newDate);

            if (toDate) {  // only check if toDate exists
              const valid = await checkAvailability(newDate, toDate);
              if (!valid) {
                setFromDate("");
              }
            }
          }}

        />

        <label className="form-label fw-bold mt-3">To Date</label>
        <input
          type="date"
          className="form-control"
          min={fromDate ? getNextDay(fromDate) : today}
          value={toDate}
          onChange={async (e) => {
            const newDate = e.target.value;
            setToDate(newDate);

            if (fromDate) {  // only check when fromDate exists
              const valid = await checkAvailability(fromDate, newDate);
              if (!valid) {
                setToDate("");
              }
            }
          }}

        />


        <h5 className="mt-3">Total Days: <b>{days}</b></h5>
        <h4 className="mt-2">Final Amount: <b>₹{finalPrice}</b></h4>
      </div>

      {/* Payment mode */}
      <div className="card p-4 shadow mb-4">
        <h4 className="fw-bold mb-3">Payment Mode</h4>
        <select className="form-select" value={paymentMode}
          onChange={(e) => setPaymentMode(e.target.value)}>
          <option value="">Select Payment</option>
          <option value="UPI">UPI</option>
          <option value="Cash">Cash</option>
          <option value="Card">Card</option>
        </select>
      </div>

      <button className="btn btn-success w-100 fw-bold"
        onClick={handleConfirmBooking}>
        Confirm Booking
      </button>
    </div>
  );
}
