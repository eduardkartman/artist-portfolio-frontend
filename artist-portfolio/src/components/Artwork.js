import React from "react";
import "../assets/Artwork.css";

function Artwork({ artwork, onDelete, onEdit }) {
  return (
    <div className={`artwork-container ${artwork.status ? "" : "inactive-artwork"}`}>
      <img src={artwork.image_url} alt={artwork.title} className="artwork-image" />
      <div className="p-4">
        <h3 className="artwork-title">{artwork.title}</h3>
        <p className="artwork-description">{artwork.description}</p>
        <a href={/^https?:\/\//.test(artwork.linktosite) ? artwork.linktosite : `http://${artwork.linktosite}`}
          target="_blank" 
          rel="noopener noreferrer" 
          className="artwork-link">
          Visit Site
        </a>
        <div className="artwork-buttons">
          <button onClick={() => onEdit(artwork.id)} className="artwork-button artwork-button-edit">
            Edit
          </button>
          <button onClick={() => onDelete(artwork.id)} className="artwork-button artwork-button-delete">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Artwork;
