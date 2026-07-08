import React, { useState } from "react";
import axios from "axios";

export default function AddCamera() {

  const [camera, setCamera] = useState({
    name: "",
    model: "",
    companyName: "",
    price: "",
    description: ""
  });

  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", camera.name);
    formData.append("model", camera.model);
    formData.append("companyName", camera.companyName);
    formData.append("price", camera.price);
    formData.append("description", camera.description);
    formData.append("image", image);

    try {
      await axios.post("http://localhost:8080/camera/add", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert("Camera Added Successfully!");
    } catch (err) {
      console.log("UPLOAD ERROR => ", err);
      console.log("ERROR RESPONSE => ", err.response);
      alert("Error while saving camera!");
    }
  };

  return (
    <div className="container col-md-6 mt-4">
      <h2 className="text-center fw-bold mb-4">Add New Camera</h2>

      <form onSubmit={handleSubmit}>
        <input className="form-control mb-3" placeholder="Camera Name"
          onChange={(e) => setCamera({ ...camera, name: e.target.value })} />

        <input className="form-control mb-3" placeholder="Camera Model"
          onChange={(e) => setCamera({ ...camera, model: e.target.value })} />

        <input className="form-control mb-3" placeholder="Company Name"
          onChange={(e) => setCamera({ ...camera, companyName: e.target.value })} />

        <input className="form-control mb-3" placeholder="Price"
          onChange={(e) => setCamera({ ...camera, price: e.target.value })} />

        <textarea className="form-control mb-3" placeholder="Description"
          onChange={(e) => setCamera({ ...camera, description: e.target.value })} />

        <input className="form-control mb-3" type="file" accept="image/*"
          onChange={(e) => setImage(e.target.files[0])} />

        <button className="btn btn-success w-100">Add Camera</button>
      </form>
    </div>
  );
}
