import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../assets/EditArtwork.css";
import apiClient from "../apiClient";

function EditArtwork() {
  const [artwork, setArtwork] = useState({
    title: "",
    description: "",
    image_url: "",
    linktosite: "",
    status: false
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const response = await apiClient.get(`/artworks/${id}`);
        setArtwork(response.data);
      } catch (error) {
        console.error('Error fetching artwork:', error);
        navigate("/");
      }
    };

    fetchArtwork();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArtwork((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.put(`/artworks/${id}`, artwork);
      navigate("/");
    } catch (error) {
      console.error('Error updating artwork:', error);
    }
  };

  return (
    <div className="edit-artwork-container">
      <h2 className="edit-artwork-title">Edit Artwork</h2>
      <form onSubmit={handleSubmit} className="edit-artwork-form">
        <div className="mb-4">
          <label className="edit-artwork-label" htmlFor="title">Title</label>
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
          <label className="edit-artwork-label" htmlFor="description">Description</label>
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
          <label className="edit-artwork-label" htmlFor="imageUrl">Image URL</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={artwork.image_url}
            onChange={handleChange}
            className="edit-artwork-input"
            required
          />
        </div>
        <div className="mb-4">
          <label className="edit-artwork-label" htmlFor="linktosite">Link to Site</label>
          <input
            type="text"
            id="linktosite"
            name="linktosite"
            value={artwork.linktosite}
            onChange={handleChange}
            className="edit-artwork-input"
          />
        </div>
        <div className="mb-4">
          <label className="edit-artwork-label" htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={artwork.status}
            onChange={handleChange}
            className="edit-artwork-input"
          >
            <option value={true}>Active</option>
            <option value={false}>Inactive</option>
          </select>
        </div>
        <button type="submit" className="edit-artwork-button">Save Changes</button>
      </form>
    </div>
  );
}

export default EditArtwork;
