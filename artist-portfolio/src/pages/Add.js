import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../assets/AddArtwork.css";
import apiClient from '../apiClient';

function AddArtwork() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [linktosite, setLinkToSite] = useState("");
  const [status, setStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(true);  // New loading state
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchArtwork = async () => {
      if (id) {
        try {
          const response = await apiClient.get(`/artworks/${id}`);
          const fetchedArtwork = response.data;
          setTitle(fetchedArtwork.title);
          setDescription(fetchedArtwork.description);
          setImageUrl(fetchedArtwork.image_url);
          setLinkToSite(fetchedArtwork.linktosite);
          setStatus(fetchedArtwork.status);
        } catch (error) {
          console.error("Error fetching artwork:", error);
          navigate("/");
        }
      }
      setIsLoading(false);  // Set loading to false after fetching
    };
    fetchArtwork();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newArtwork = { title, description, image_url, linktosite, status };
    try {
      if (id) {
        await apiClient.put(`/artworks/${id}`, newArtwork);
      } else {
        await apiClient.post("/artworks", newArtwork);
      }
      navigate("/");
    } catch (error) {
      console.error("Error saving artwork:", error);
    }
  };

  return (
    <div className="add-artwork-container">
      <h2 className="add-artwork-title">
        {isLoading ? "Loading..." : id ? "Edit Artwork" : "Add New Artwork"}  {/* Updated title logic */}
      </h2>
      {!isLoading && (
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
            <label className="add-artwork-label">Image URL
              <span className="info-icon">
                <i className="fas fa-info-circle"></i>
                <span className="tooltip">Please provide the internet address of the image</span>
              </span>
            </label>
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
            {id ? "Save Changes" : "Add Artwork"}
          </button>
        </form>
      )}
    </div>
  );
}

export default AddArtwork;
