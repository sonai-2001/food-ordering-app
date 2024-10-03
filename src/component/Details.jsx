import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosinstance from "../api/axiosinstance";
import { endpoints } from "../api/api-detail";
import Swal from "sweetalert2";
import { Container } from "react-bootstrap";
import Accordian from "./Accordian";

const Details = () => {
  const { id } = useParams();
  const [accordian, setAccordian] = useState(0);

  const api = endpoints.dishes + `/${id}`;
  console.log(api);
  const [resDetail, setResDetail] = useState(null);
  const getDetails = async () => {
    try {
      const response = await axiosinstance.get(api);
      if (response.status == 200) {
        console.log(response.data);
        setResDetail(response.data);
      } else {
        throw new Error("Some thing went wrong");
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
        confirmButtonText: "Okay",
      });
    }
  };
  useEffect(() => {
    getDetails();
  }, []);

  if (!resDetail) {
    return <div>Loading...</div>;
  }

  return (
    <Container fluid className="detail-page my-4">
      <div className="basic-details text-center">
        <h1>{resDetail.name}</h1>
        <span>
          {resDetail.costForTwo} | {resDetail.avgRating}Rating
        </span>
      </div>

      <p className="description-text text-center">
        Welcome to {resDetail.name}! Explore a wide variety of dishes and
        indulge in our unique flavors. Order now and enjoy a delightful dining
        experience from the comfort of your home.
      </p>
      {/* single accordian */}
      {resDetail.dishTypes && resDetail.dishTypes.map((type,index) => (
        <Accordian index={index} accordian={accordian} setAccordian={setAccordian} key={index} type={type} />
      ))}
    </Container>
  );
};

export default Details;
