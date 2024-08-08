import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/EditArtwork.css";

function EditArtwork() {
  const navigate = useNavigate();
  const [artwork, setArtwork] = useState({
    title: "",
    description: "",
    imageUrl: "",
  });

  useEffect(() => {
    const index = localStorage.getItem("editIndex");
    const storedArtworks = JSON.parse(localStorage.getItem("artworks")) || [];
    if (index !== null && storedArtworks[index]) {
      setArtwork(storedArtworks[index]);
    } else {
      navigate("/"); // Redirect if no artwork found
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArtwork((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const index = localStorage.getItem("editIndex");
    const storedArtworks = JSON.parse(localStorage.getItem("artworks")) || [];
    storedArtworks[index] = artwork;
    localStorage.setItem("artworks", JSON.stringify(storedArtworks));
    navigate("/"); // Redirect after saving
  };

  return (
    <div className="edit-artwork-container">
      <h2 className="edit-artwork-title">Edit Artwork</h2>
      <form onSubmit={handleSubmit} className="edit-artwork-form">
        <div className="mb-4">
          <label className="edit-artwork-label" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={artwork.title}
            onChange={handleChange}
            className="edit-artwork-input"
            required
          />
        </div>
        <div className="mb-4">
          <label className="edit-artwork-label" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={artwork.description}
            onChange={handleChange}
            className="edit-artwork-input"
            required
          />
        </div>
        <div className="mb-4">
          <label className="edit-artwork-label" htmlFor="imageUrl">
            Image URL
          </label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={artwork.imageUrl}
            onChange={handleChange}
            className="edit-artwork-input"
            required
          />
        </div>
        <button type="submit" className="edit-artwork-button">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditArtwork;
