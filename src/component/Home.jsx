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
              <h1 className="landing-heading">Welcome to Foodie Feast</h1>
              <p className="landing-text">
                Delicious meals delivered right to your doorstep. Order now and experience the best in food delivery.
              </p>
              <Link to="/content/restaurants/toprated"><Button variant="primary" className="explore-btn">
                Explore Menu
              </Button>
              </Link>
              <div className="auth-buttons mt-4">
              <Link to="/login"> <Button  variant="outline-light" className="auth-btn mx-2 my-2">
                  Login
                </Button></Link>
                <Link to="/register"><Button variant="success" className="auth-btn mx-2">
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
