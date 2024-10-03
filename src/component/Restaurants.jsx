import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Carousal from "./Carousal";
import axiosinstance from "../api/axiosinstance";
import { endpoints } from "../api/api-detail";
import Swal from "sweetalert2";
import { Card, Col, Container, Row } from "react-bootstrap";

const Restaurants = () => {
  const api = endpoints.dishes;
  const { category } = useParams();
  const [restaurants, setRestaurants] = useState(null);
  useEffect(() => {
    getRestaurants();
  }, [category]);

  const getRestaurants = async () => {
    try {
      const response = await axiosinstance.get(api);
      if (response.status == 200) {
        const allRes = response.data;
        const filteredRes = allRes.filter((res) => res.category == category);
        setRestaurants(filteredRes);
      } else {
        throw new Error();
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "some thing went wrong",
        icon: "error",
        confirmButtonText: "Okay",
        timer: 2000,
      });
    }
  };

  if (!restaurants) {
    return <h1>Loading...</h1>; // Show loading message when data is not loaded yet.  // Show error message when data loading fails.  // Show data when data is loaded successfully.  // Add error handling for other possible errors.  // Implement pagination or infinite scrolling to load more data when user scrolls down.  // Implement search functionality to filter restaurants based on name or cuisine.  // Implement sorting functionality to sort restaurants based on name or rating.  // Implement rating functionality to give users a rating for a restaurant.  // Implement favorite functionality to save restaurants to a user's favorite list.  // Implement user authentication to only allow authenticated users to save restaurants to their favorite list.  // Implement user authentication to only allow authenticated users to give ratings and favorite restaurants.  // Implement user authentication to only allow authenticated users to view the restaurant details.  // Implement user authentication to only allow authenticated users to order food from the restaurant
  }

  return (
    <div className="restaurant-page">
      <Carousal />
      {category != "toprated" && (
        <Container className="text-center">
          <Link to="/content/restaurants/toprated">
            <button>Toprated</button>
          </Link>
        </Container>
      )}

      <div>
        {restaurants.length > 0 ? (
          <Container className="card-container">
            {" "}
            {/* Add custom class for margin-top */}
            <Row className="g-4">
              {" "}
              {/* g-4 adds spacing between cards */}
              {restaurants.map((card, index) => (
               
                  <Col xs={12} sm={6} md={4} lg={3} key={card.id}>
                     <Link className="card-link" to={`${card.id}`}>
                    {" "}
                    {/* Responsive column sizes */}
                    <Card className="custom-card h-100">
                      {" "}
                      {/* Apply custom CSS class */}
                      <Card.Img
                        variant="top"
                        src={card.imageId}
                        className="custom-card-img"
                      />{" "}
                      {/* Apply custom image class */}
                      <Card.Body>
                        <Card.Title>{card.name}</Card.Title>
                        <Card.Text>{card.costForTwo}</Card.Text>
                        <Card.Text>
                          <strong>{card.avgRating} Rating</strong>
                        </Card.Text>
                        <Card.Text>{card.cuisines.join(" ,")}</Card.Text>
                      </Card.Body>
                    </Card>
                    </Link>
                  </Col>
              
              ))}
            </Row>
          </Container>
        ) : (
          <h2 className="text-center">
            {" "}
            OOps !No restaurants found in this category
          </h2>
        )}
      </div>
    </div>
  );
};

export default Restaurants;
