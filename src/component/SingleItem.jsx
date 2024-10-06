import React, { useContext, useEffect, useState } from "react";
import { dishImagePre } from "../utils/Image";
import axiosinstance from "../api/axiosinstance";
import { endpoints } from "../api/api-detail";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import cartLengthContext from "../utils/cartLengthContext";

const SingleItem = ({ dish }) => {
  const api = endpoints.cart;
  const navigate = useNavigate();
  console.log(dish.id);
  const [cart, setCart] = useState(null);
  const{cartLength,updateCartLength}=useContext(cartLengthContext)

  const getCarts = async () => {
    try {
      const response = await axiosinstance.get(api);
      if (response.status === 200) {
        if(window.sessionStorage.getItem('token')){
          const data = response.data.filter(
            (cartItem) =>
              cartItem.token === window.sessionStorage.getItem("token")
          );
          console.log(data);
          setCart(data);
        }else{
          setCart([]);
        }
        
      } else {
        throw new Error("something went wrong");
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
        confirmButtonText: "Okay",
        timer: 2000,
      });
    }
  };

  const handleAdd = async () => {
    const obj = {
      productId: dish.id,
      name: dish.name,
      price: dish.price,
      token: window.sessionStorage.getItem("token"),
      quantity: dish.quantity,
      imageId: dish.imageId,
    };
    try {
      const response = await axiosinstance.post(api, obj);
      console.log(response);
      if (response.status === 201) {
        updateCartLength(!cartLength)
        Swal.fire({
          title: "Success",
          text: "Item added to cart",
          icon: "success",
          confirmButtonText: "Okay",
          timer: 2000,
        }).then(() => {
          navigate("/content/cart");
        });
      } else {
        throw new Error("something went wrong");
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
        confirmButtonText: "Okay",
        timer: 2000,
      });
    }
  };

  useEffect(() => {
    getCarts();
  }, []);

  if (!cart) {
    return <h1>Loading...</h1>;
  }

  // Corrected comparison logic
  const data = cart.length>0?cart.find((cartItem) => cartItem.productId === dish.id):false;

  return (
    <div className="item-types">
      {/* basic details of an item */}
      <div className="basic-detail-item ">
        <h2>{dish.name}</h2>
        <span>Rs. {dish.price / 100}</span>

        <p>{dish.description}</p>
      </div>
      {/* image if this item */}
      <div className="item-image">
        <img src={dishImagePre + dish.imageId} alt="" />
        <button
          onClick={handleAdd}
          disabled={data || !window.sessionStorage.getItem("token")}
          className="add-btn"
        >
          {data ? "Added" : "Add"}
        </button>
      </div>
    </div>
  );
};

export default SingleItem;
