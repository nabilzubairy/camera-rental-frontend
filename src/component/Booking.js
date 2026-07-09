import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function BookingList() {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [bookingDetails, setBookingDetails] = useState([]);
  const navigate = useNavigate();

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`https://camera-rental-backend-j62w.onrender.com/booking/${user.id}`, {
        withCredentials: true,
      });

      const bookingsData = res.data;

      // Fetch camera details for each booking
      const bookingWithCameraInfo = await Promise.all(
        bookingsData.map(async (b) => {
          const cameraResponses = await Promise.all(
            b.cartItems.map(async (cameraId) => {
              const cRes = await axios.get(`https://camera-rental-backend-j62w.onrender.com/camera/${cameraId}`);
              return cRes.data; // camera object
            })
          );

          return { ...b, cameras: cameraResponses };
        })
      );

      setBookingDetails(bookingWithCameraInfo);

    } catch (err) {
      console.error("Error loading bookings", err);
    }
  };

  useEffect(() => {
    if (user) fetchBookings();
  }, [user , fetchBookings]);

  const downloadInvoice = async (id) => {
    try {
      const res = await axios.get(`https://camera-rental-backend-j62w.onrender.com/booking/invoice/${id}`, {
        responseType: "blob",  // Important for PDF
        withCredentials: true,
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `invoice_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();

    } catch (error) {
      console.error("Invoice download failed", error);
    }
  };


  return (
    <div className="container mt-4">
      <h2 className="fw-bold text-center mb-4">My Bookings</h2>

      {bookingDetails.map((booking) => (
        <div key={booking.id} className="card shadow-sm mb-3 p-3">

          <h5 className="fw-bold mb-2">Booking #{booking.id}</h5>

          {booking.cameras.map((cam) => (
            <p key={cam.id} className="m-0">
              🎥 <b>{cam.name}</b> – {cam.model} ({cam.companyName}) – ₹{cam.price}/day
            </p>
          ))}

          <hr />

          <p className="m-0"><b>From:</b> {booking.fromDate}</p>
          <p className="m-0"><b>To:</b> {booking.toDate}</p>
          <p className="m-0"><b>Days:</b> {booking.days}</p>
          <p className="m-0"><b>Total:</b> ₹{booking.totalAmount}</p>

          <div className="text-end mt-2">
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => downloadInvoice(booking.id)}>
              Download Invoice
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
