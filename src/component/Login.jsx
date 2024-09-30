import Loader from "./Loader";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import toastify CSS
import { endpoints } from "../api/api-detail";
import Swal from "sweetalert2";
import axiosinstance from "../api/axiosinstance";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate()
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
useEffect(() => {
    toast.info("Welcome back! Please log in to continue.", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
  }, []);

  const api=endpoints.users

  const validate=async(data)=>{
    try {
      setLoading(true);
      const allUsersResponse=await axiosinstance.get(api)
      if(allUsersResponse.status==200){
             if(allUsersResponse.data.length==0){
              throw new Error("No user found with this email")
             }
             else{
              const alluser=allUsersResponse.data
              const user=alluser.find((u)=>u.email==data.email)
              if(user){
                   if(user.password==data.password){
                       setLoading(false)
                       window.sessionStorage.setItem("token",user.token)
                       Swal.fire({
                        title: "Success!",
                        text: "Login Successful",
                        icon: "success",
                        timer: 1500,
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        showCloseButton: false,
                        showClass: {
                          popup: "animate__animated animate__fadeInDown"
                        },
                        hideClass: {
                          popup: "animate__animated animate__fadeOutUp"
                        }
                       }).then(()=>{
                        navigate("/content/restaurants/toprated")
                       }) 
                   }
                   else{  
                    throw new Error('Invalid password')
                   }
              }else{
                throw new Error("No user found with this email")
              }
             }
      }
      else{
        throw new Error("some thing  went wrong try again later")
      }
      
    } catch (error) {
        
      setLoading(false)
      Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
          timer:2000
        })
    }
  }

  const onSubmit = (data) => {
    console.log(data);
    validate(data)
  };

  return (
    <div className="register-page">
      {loading && <Loader />} {/* Show the Loader when loading is true */}
      <div className="overlay">
        <Container>
          <Row className="justify-content-center align-items-center">
            <Col xs={12} md={8} lg={6}>
              <div className="register-box p-4">
                <h2 className="text-center mb-4">Login Your Account</h2>

                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group controlId="formEmail" className="mb-2">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      {...register("email", { required: "Email is required" })}
                    />
                    {errors.email && (
                      <span className="text-danger">
                        {errors.email.message}
                      </span>
                    )}
                  </Form.Group>

                  {/* Password Field */}
                  <Form.Group controlId="formPassword" className="mb-2">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your password"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 4,
                          message: "Password must be at least 4 characters long",
                        },
                      })}
                    />
                    {errors.password && (
                      <span className="text-danger">
                        {errors.password.message}
                      </span>
                    )}
                  </Form.Group>

                  {/* Submit Button */}
                  <Button variant="success" type="submit" className="w-100 mt-3">
                    Login
                  </Button>
                </Form>

                {/* Redirect to Register */}
                <p className="text-center mt-3">
                  New User?{" "}
                  <Link to="/register" className="login-link">
                    Register
                  </Link>
                </p>
              </div>
            </Col>
          </Row>
        </Container>

        {/* Add ToastContainer */}
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
