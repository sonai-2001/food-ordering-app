import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import {endpoints} from "../api/api-detail"
import axiosinstance from "../api/axiosinstance"
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import {Link} from "react-router-dom"
import { toast } from 'react-toastify';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading,setLoading]=useState(false)
  const navigate=useNavigate()
 
  const api=endpoints.users
  console.log(api)



  const postData=async(data)=>{
  setLoading(true)
    
  
  
  try{
  const usersResponse=await axiosinstance.get(api)
  if(usersResponse.status==200){

    if(usersResponse.data.length==0){
     const response= await axiosinstance.post(api,data) 
  console.log(response)
  
  setLoading(false)
  if(response.status==201){
       Swal.fire({
        title: 'Success',
        text: 'User registered successfully',
        icon:'success',
        confirmButtonText: 'Okay',
        timer:2000
        }).then(()=>{
            navigate('/login')
        })
  }
  else{
       throw new Error('somethhing went wrong')
  }
}else{
      const allusers=usersResponse.data
      const user=allusers.find(user=>user.email===data.email)
      if(user){
         throw new Error('Email already exists')
      }else{
        const response= await axiosinstance.post(api,data) 
        console.log(response)
        
        setLoading(false)
        if(response.status==201){
             Swal.fire({
              title: 'Success',
              text: 'User registered successfully',
              icon:'success',
              confirmButtonText: 'Okay',
              timer:2000
              }).then(()=>{
                  navigate('/login')
              })
        }
        else{
             throw new Error("Some thing went wrong")
        }
      }
}

  }
  else{
    throw new Error('Error registering user')
  }
  

}
catch(err){
  setLoading(false)
     Swal.fire({
        title: 'Error',
        text: err.message,
        icon:'error',
        confirmButtonText: 'Okay',
        timer:2000
        })
  
}


}
  const onSubmit = (data) => {
    // console.log(data);
    const obj={...data,token:uuidv4()}
    // console.log(obj)
    postData(obj)
  };

  return (
    <div className="register-page">
      {loading && <Loader />} {/* Show the Loader when loading is true */}
      <div className="overlay">
        <Container>
          <Row className="justify-content-center align-items-center">
            <Col xs={12} md={8} lg={6}>
              <div className="register-box p-4">
                <h2 className="text-center mb-4">Create Your Account</h2>

                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group controlId="formName" className="mb-2">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="Enter your full name"
                      {...register('fullName', { required: 'Full Name is required' })}
                    />
                    {errors.fullName && <span className="text-danger">{errors.fullName.message}</span>}
                  </Form.Group>

                  <Form.Group controlId="formEmail" className="mb-2">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control 
                      type="email" 
                      placeholder="Enter your email"
                      {...register('email', { required: 'Email is required' })}
                    />
                    {errors.email && <span className="text-danger">{errors.email.message}</span>}
                  </Form.Group>

                  {/* Password Field */}
                  <Form.Group controlId="formPassword" className="mb-2">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                      type="password" 
                      placeholder="Enter your password"
                      {...register('password', {
                        required: 'Password is required',
                        minLength: {
                          value: 4,
                          message: 'Password must be at least 4 characters long',
                        },
                      })}
                    />
                    {errors.password && <span className="text-danger">{errors.password.message}</span>}
                  </Form.Group>

                  {/* Mobile Number Field */}
                  <Form.Group controlId="formMobile" className="mb-2">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="Enter your mobile number"
                      {...register('mobile', { required: 'Mobile number is required' })}
                    />
                    {errors.mobile && <span className="text-danger">{errors.mobile.message}</span>}
                  </Form.Group>

                  {/* Address Field */}
                  <Form.Group controlId="formAddress" className="mb-2">
                    <Form.Label>Address</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="Enter your address"
                      {...register('address', { required: 'Address is required' })}
                    />
                    {errors.address && <span className="text-danger">{errors.address.message}</span>}
                  </Form.Group>

                  {/* Submit Button */}
                  <Button variant="warning" type="submit" className="w-100 mt-3">
                    Register
                  </Button>
                </Form>

                {/* Redirect to Login */}
                <p className="text-center mt-3">
                  Already have an account? <Link to="/login" className="login-link">Login</Link>
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Register;
