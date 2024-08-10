import React, { useState, useEffect } from "react";
import Artwork from "../components/Artwork";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import apiClient from "../apiClient";
import "../assets/Home.css";

function Home() {
  const [artworks, setArtworks] = useState([]);
  const navigate = useNavigate();

  // Fetch artworks from backend
  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await apiClient.get('/artworks');
        setArtworks(response.data);
      } catch (error) {
        console.error('Error fetching artworks:', error);
      }
    };

    fetchArtworks();
  }, []);

  // Delete artwork and update state
  const handleDeleteArtwork = async (id) => {
    try {
      await apiClient.delete(`/artworks/${id}`);
      setArtworks(artworks.filter((artwork) => artwork.id !== id));
    } catch (error) {
      console.error('Error deleting artwork:', error);
    }
  };

  // Navigate to edit page
  const handleEditArtwork = (id) => {
    navigate(`/edit/${id}`); // Navigate to edit page with ID in URL
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
              {artworks.map((artwork) => (
                <Col key={artwork.id} md={4} sm={6}>
                  <Artwork
                    title={artwork.title}
                    description={artwork.description}
                    imageUrl={artwork.imageUrl}
                    onDelete={() => handleDeleteArtwork(artwork.id)}
                    onEdit={() => handleEditArtwork(artwork.id)}
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
