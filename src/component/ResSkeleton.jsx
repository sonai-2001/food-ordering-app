import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import Carousal from "./Carousal"; // Carousel component

const ResSkeleton = () => {
  return (
    <div className="restaurant-page">
      {/* Navigation Bar */}
      <nav className="navbar-skeleton">
        <Container>
          <Link to="/" className="navbar-brand">
            Restaurant App
          </Link>
          <div>
            <Link to="/toprated">Top Rated</Link>
          </div>
        </Container>
      </nav>

      {/* Carousel for categories */}
      <section className="carousel-section-skelton">
        <Carousal />
      </section>

      {/* Restaurant Cards Section */}
      <section className="restaurant-cards-skeleton">
        <Container className="card-container-skeleton">
          <Row className="g-4">
            {/* Skeleton for restaurant cards */}
            {[1, 2, 3, 4, 5, 6].map((card, index) => (
              <Col xs={12} sm={6} md={4} lg={3} key={index}>
                <Card className="custom-card h-100">
                  <div className="skeleton-image"></div>
                  <Card.Body>
                    <div className="skeleton-title"></div>
                    <div className="skeleton-text"></div>
                    <div className="skeleton-rating"></div>
                    <div className="skeleton-cuisines"></div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default ResSkeleton;
