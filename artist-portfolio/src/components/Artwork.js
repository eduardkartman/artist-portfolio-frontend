import React from "react";
import "../assets/Artwork.css";

function Artwork({ title, description, image_url, onDelete, onEdit }) {
  return (
    <div className="artwork-container">
      <div className="artwork-image-wrapper">
        <img src={image_url} alt={title} className="artwork-image" />
      </div>
      <div className="artwork-content">
        <h3 className="artwork-title">{title}</h3>
        <p className="artwork-description">{description}</p>
        <div className="artwork-buttons">
          <button
            onClick={onEdit}
            className="artwork-button artwork-button-edit"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="artwork-button artwork-button-delete"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Artwork;
