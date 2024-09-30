import React from 'react';
import { Navbar, Nav, Form, FormControl, Button, Container, NavDropdown, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaSearch } from 'react-icons/fa';

const Header = () => {
  return (
    <Navbar expand="lg" className="food-navbar py-3">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-3 food-brand">
          Foodie<span className="brand-dot">.</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarResponsive" />
        <Navbar.Collapse id="navbarResponsive">
          {/* Left Section */}
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="food-nav-link">Home</Nav.Link>
            <Nav.Link as={Link} to="/menu" className="food-nav-link">Menu</Nav.Link>
          </Nav>

          {/* Search Section */}
          <Form className="d-flex mx-auto food-search-form" style={{ maxWidth: '400px' }}>
            <FormControl
              type="search"
              placeholder="Search for food..."
              className="me-2 food-search-input"
              aria-label="Search"
            />
            <Button variant="warning" className="food-search-button">
              <FaSearch />
            </Button>
          </Form>

          {/* Right Section */}
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/cart" className="position-relative food-nav-link">
              <FaShoppingCart className="me-1" /> Cart
              {/* Badge for cart items count */}
              <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
                3
              </Badge>
            </Nav.Link>

            <NavDropdown title={<FaUser />} id="navbarScrollingDropdown" className="food-dropdown">
              <NavDropdown.Item as={Link} to="/account">My Account</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/orders">My Orders</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/login">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
