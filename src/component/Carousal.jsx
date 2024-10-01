import React, { useEffect, useState } from "react";
import axiosinstance from "../api/axiosinstance";
import { endpoints } from "../api/api-detail";
import { Button, Col, Container, Row } from "react-bootstrap";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { categoryPre } from "../utils/Image";
import { Link } from "react-router-dom";

const Carousal = () => {
  const api = endpoints.categories;
  const [categories, setCategories] = useState(null);
  const [imageShow, setImageShow] = useState(0);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const response = await axiosinstance.get(api);
    setCategories(response.data);
  };

  const handleRight=()=>{
        setImageShow((prev)=>prev+3)
  }

  const handleLeft=()=>{
    setImageShow((prev)=>prev-3)
  }

  if (!categories) {
    return <div>loading....</div>;
  }

  return (
    <Container className="caraousal-container pt-4">
      <div className="caraousal-heading">
        <h3>Whats in your mind?</h3>
        <div className="caraousal-arrow">
          <Button disabled={imageShow-3<0} onClick={handleLeft} variant="none" className="left-arrow">
            <FaChevronLeft />
          </Button>
          <Button disabled={imageShow+6==categories.length} onClick={handleRight} variant="none" className="right-arrow">
            <FaChevronRight />
          </Button>
        </div>
      </div>

      <div className="mt-4 caraousal-item-container  d-flex justify-content-between align-items-center">
        {categories.map((category,index) => {
         
         if(index===imageShow || index===imageShow+1 || index===imageShow+2 || index===imageShow+3|| index===imageShow+4|| index===imageShow+5) {
         return (
            <Link to={`/content/restaurants/${category.title}`}>
                  <div className="caraousal-item">
                <img className="caraousal-image" src={categoryPre+category.imageId} alt="" />
            </div>
            </Link>
          )
        }else{
            return null;
        }
        })}
      </div>
    </Container>
  );
};

export default Carousal;
