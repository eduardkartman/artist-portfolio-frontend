import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/AddArtwork.css";
import apiClient from '../apiClient';

/**
 * @param {{ artwork?: Artwork }} props
 */
function AddArtwork({ artwork }) {
  const [title, setTitle] = useState(artwork?.title || "");
  const [description, setDescription] = useState(artwork?.description || "");
  const [image_url, setImageUrl] = useState(artwork?.imageUrl || "");
  const [linktosite, setLinkToSite] = useState(artwork?.linktosite || "");
  const [status, setStatus] = useState(artwork?.status || false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newArtwork = { title, description, image_url, linktosite, status };
    try {
      if (artwork) {
        await apiClient.put(`/artworks/${artwork.id}`, newArtwork);
      } else {
        await apiClient.post('/artworks', newArtwork);
      }
      navigate("/");
    } catch (error) {
      console.error('Error saving artwork:', error);
    }
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
            value={image_url}
            onChange={(e) => setImageUrl(e.target.value)}
            className="add-artwork-input"
            required
          />
        </div>
        <div className="mb-4">
          <label className="add-artwork-label">Link to Site</label>
          <input
            type="text"
            value={linktosite}
            onChange={(e) => setLinkToSite(e.target.value)}
            className="add-artwork-input"
          />
        </div>
        <div className="mb-4">
          <label className="add-artwork-label">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value === "true")}
            className="add-artwork-input"
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>
        <button type="submit" className="add-artwork-button">
          {artwork ? "Save Changes" : "Add Artwork"}
        </button>
      </form>
    </div>
  );
}

export default AddArtwork;
