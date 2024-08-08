import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/AddArtwork.css";

/**
 * @param {{ artwork?: Artwork }} props
 */
function AddArtwork({ artwork }) {
  const [title, setTitle] = useState(artwork?.title || "");
  const [description, setDescription] = useState(artwork?.description || "");
  const [imageUrl, setImageUrl] = useState(artwork?.imageUrl || "");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newArtwork = { title, description, imageUrl };

    let artworks = JSON.parse(localStorage.getItem("artworks")) || [];

    if (artwork) {
      // Update existing artwork
      const index = parseInt(localStorage.getItem("editIndex"), 10);
      artworks[index] = newArtwork;
    } else {
      // Add new artwork
      artworks.push(newArtwork);
    }

    localStorage.setItem("artworks", JSON.stringify(artworks));
    navigate("/");
  };

  return (
    <div className="add-artwork-container">
      <h2 className="add-artwork-title">
        {artwork ? "Edit Artwork" : "Add New Artwork"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="add-artwork-label">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="add-artwork-input"
            required
          />
        </div>
        <div className="mb-4">
          <label className="add-artwork-label">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="add-artwork-textarea"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="add-artwork-label">Image URL</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="add-artwork-input"
            required
          />
        </div>
        <button type="submit" className="add-artwork-button">
          {artwork ? "Save Changes" : "Add Artwork"}
        </button>
      </form>
    </div>
  );
}

export default AddArtwork;
