import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Image,
  Card,
  ListGroup,
} from "react-bootstrap";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import axiosinstance from "../api/axiosinstance";
import { endpoints } from "../api/api-detail";
import Loader from "./Loader";
import { dishImagePre } from "../utils/Image";
import cartLengthContext from "../utils/cartLengthContext";
import cartItemsContext from "../utils/cartItemsContext";
import CartSkeleton from "./CartSkeleton";

const Cart = () => {
  const [cartItems, setCartItems] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const api = endpoints.cart;

  useEffect(() => {
    getCarts();
  }, []);

  const{updateCartLength,cartLength}=useContext(cartLengthContext)
 const{setItems}= useContext(cartItemsContext)

  const handleBuyNow = () => {
    setItems(cartItems)
    navigate("/content/payment");
  };

  const handleRemoveItem = async (itemId) => {
    try {
      const response = await axiosinstance.delete(
        endpoints.cart +"/"+ itemId
      );
      console.log(response);
      if (response.status == 200) {
        const filteredItems = cartItems.filter((item) => {
          return item.id !== itemId;
        });
        setCartItems(filteredItems);
        updateCartLength(filteredItems)
      } else {
        throw new Error()
      }
    } catch (err) {
      Swal.fire({
        title: "Failed to Remove Item",
        text: "Something went wrong!",
        icon: "error",
        timer: 2000,
      });
      console.log(err);
    } 
  };

  const clearCart = async () => {
    
    try {
      // Step 1: Add items to the order API
      // Step 2: Remove items from the cart API
      for (const item of cartItems) {
        const response = await axiosinstance.delete(
          endpoints.cart + "/" + item.id
        );
        if (response.status !== 200) {
          throw new Error("Something went wrong while removing from the cart");
        }
      }
     
      setCartItems([]) // Stop loading
      updateCartLength([])
      // Step 3: Show success alert after loading has stopped
      Swal.fire({
        title: "cart deleted successfully",
        text: "Your cart has been deleted successfully",
        icon: "success",
        confirmButtonText: "ok",
        timer: 2000
      })
    } catch (error) {
       // Stop loading on error
      // Show error alert after loading has stopped
      Swal.fire({
        title: "Cart cleared error",
        text: error.message || "Something went wrong while removing the cart",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  const getCarts = async () => {
    try {
      const response = await axiosinstance.get(api);

      console.log(response);
      const filtered = response.data.filter((cartItem) => {
        return cartItem.token === window.sessionStorage.getItem("token");
      });
      setCartItems(filtered);
      // dispatch(updateCartLength(filtered))
    } catch (error) {
      console.error(error);
    }
  };

  // Function to update quantity
  const handleQuantityChange = async (id, change) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + change) } // Quantity should not go below 1
        : item
    );
    const quantityChangeItem = updatedItems.find((item) => item.id === id);
    // Use the correct function name consistently
    const updateCartItem = async (item) => {
      try {
        const response = await axiosinstance.put(endpoints.cart+'/'+item.id, 
          item
        );
        console.log(response);
        if(response.status!=200){
          throw new Error()
        }
      } catch (error) {
        Swal.fire({
          title: "Failed to Update Quantity",
          text: "Something went wrong!",
          icon: "error",
          timer: 2000,
        })
      }
    };
    // Call updateCartItem (not upDateCartItem)
    updateCartItem(quantityChangeItem);
    setCartItems(updatedItems);
    updateCartLength(updatedItems)
  };

  // Calculate total price
  const totalAmount =
    cartItems &&
    cartItems.reduce(
      (acc, item) => acc + (item.price / 100) * item.quantity,
      0
    );

  if (!cartItems) {
    return <CartSkeleton/>;
  }

  return (
    <Container className="mt-5 cart-container">

      <Row>
        <Col lg={8} sm={12} className="cart-items">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h2>Your Cart</h2>
            <div className="cart-actions">
              <Link to="/content/restaurants/toprated" className="me-2">
                <Button variant="primary" size="sm" className="action-button">
                  Add Item
                </Button>
              </Link>
              <Button
                variant="danger"
                size="sm"
                onClick={clearCart}
                className="action-button"
              >
                Clear Cart
              </Button>
            </div>
          </div>

          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.id} className="cart-item">
                  <div className="d-flex align-items-center cart-item-details">
                    <Image
                      src={dishImagePre + item.imageId}
                      rounded
                      className="cart-item-image"
                    />
                    <div className="ms-3">
                      <h5>{item.name}</h5>
                      <p>Rs {item.price / 100}</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center cart-item-actions">
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => handleQuantityChange(item.id, -1)}
                    >
                      -
                    </Button>
                    <span className="mx-2">{item.quantity}</span>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => handleQuantityChange(item.id, 1)}
                    >
                      +
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      className="ms-3"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>

        <Col lg={4} sm={12} className="cart-summary">
          <Card className="p-3">
            <h4>Total Amount</h4>
            <h2>Rs {totalAmount}</h2>
            <Button
              disabled={cartItems.length === 0}
              onClick={handleBuyNow}
              variant="primary"
              size="lg"
              className="mt-3 w-100"
            >
              Buy Now
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
