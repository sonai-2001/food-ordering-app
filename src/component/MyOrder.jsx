import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import axiosinstance from "../api/axiosinstance";
import { endpoints } from "../api/api-detail";
import { dishImagePre } from "../utils/Image";

const MyOrder = () => {
  const [orders, setOrders] = useState(null);
  const token=window.sessionStorage.getItem("token")
  useEffect(() => {
    const getOrders = async () => {
      const response = await axiosinstance.get(
         endpoints.orders
      );
      console.log(response.data);
      const filtered = response.data.filter((order) => {
            
        return order.token === token;
      });
      
      
      
      setOrders(filtered);
    };
    getOrders();
  }, []);

  if (!orders) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="my-orders-container mt-4" >
      <h2 className="text-center mb-4">My Orders</h2>
      <Row className="justify-content-center">
        {orders.map((order) => (
          <Col xs={10} md={8} lg={8} key={order.id} className="mb-4">
            <Card className="order-card">
              <Row noGutters>
                <Col
                  xs={4}
                  className="d-flex order-image align-items-center justify-content-center"
                >
                  <Card.Img
                    variant="top"
                    src={dishImagePre+order.imageId}
                    className="order-image"
                  />
                </Col>
                <Col className="text-center" xs={8}>
                  <Card.Body>
                    <Card.Title>{order.name}</Card.Title>
                    <Card.Text>
                      <strong>Price:</strong> {order.price/100}
                    </Card.Text>
                    <Card.Text>
                      <strong>Quantity:</strong> {order.quantity}pcs
                    </Card.Text>
                    <Card.Text>
                      <strong>Total :</strong> {Number(order.price/100) * order.quantity}Rs
                    </Card.Text>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MyOrder;
