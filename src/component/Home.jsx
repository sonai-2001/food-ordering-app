import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="landing-page">
      <div className="overlay">
        <Container fluid className="h-100">
          <Row className="h-100 align-items-center text-center">
            <Col xs={12} md={10} lg={8} className="mx-auto">
              {/* Responsive heading with smaller size on mobile */}
              <h3 className="landing-heading display-5 display-md-4 display-lg-3">
                Welcome to Foodie Feast
              </h3>
              
              {/* Responsive text */}
              <p className="landing-text lead mb-4">
                Delicious meals delivered right to your doorstep. Order now and experience the best in food delivery.
              </p>
              
              {/* Explore Menu Button with skin or yellow color */}
              <Link to="/content/restaurants/toprated">
                <Button variant="warning" className="explore-btn mb-3">
                  Explore Menu
                </Button>
              </Link>
              
              {/* Auth buttons with proper spacing */}
              <div className="auth-buttons mt-3">
                <Link to="/login">
                  <Button variant="outline-light" className="auth-btn mx-2 my-2">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline-light" className="auth-btn mx-2">
                    Register
                  </Button>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Home;
