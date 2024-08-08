import React, { useState, useEffect } from "react";
import Artwork from "../components/Artwork";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import "../assets/Home.css";

function Home() {
  const [artworks, setArtworks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedArtworks = JSON.parse(localStorage.getItem("artworks")) || [];
    setArtworks(storedArtworks);
  }, []);

  const handleDeleteArtwork = (index) => {
    const updatedArtworks = artworks.filter((_, i) => i !== index);
    setArtworks(updatedArtworks);
    localStorage.setItem("artworks", JSON.stringify(updatedArtworks));
  };

  const handleEditArtwork = (index) => {
    localStorage.setItem("editIndex", index);
    navigate("/edit"); // Navigate to edit page
  };

  return (
    <>
      <Container>
        <h2 className="page-title">My Portfolio</h2>
        {artworks.length === 0 ? (
          <div className="no-artworks-message">
            <p>You have no artworks yet.</p>
            <Link to="/add" className="button-add-artwork">
              Add New Artwork
            </Link>
          </div>
        ) : (
          <>
            <Link to="/add" className="button-add-artwork">
              Add New Artwork
            </Link>
            <Row>
              {artworks.map((artwork, index) => (
                <Col key={index} md={4} sm={6}>
                  <Artwork
                    title={artwork.title}
                    description={artwork.description}
                    imageUrl={artwork.imageUrl}
                    onDelete={() => handleDeleteArtwork(index)}
                    onEdit={() => handleEditArtwork(index)}
                  />
                </Col>
              ))}
            </Row>
          </>
        )}
      </Container>
      <Footer />
    </>
  );
}

export default Home;
