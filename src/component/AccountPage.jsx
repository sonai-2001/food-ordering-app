import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Form, Row, Col, Container, Spinner } from "react-bootstrap";
import axiosinstance from "../api/axiosinstance";
import { endpoints } from "../api/api-detail";
import Swal from "sweetalert2";
import Loader from "./Loader"

const AccountPage = () => {
  const { register, handleSubmit, setValue, reset } = useForm();
  const [isEditable, setIsEditable] = useState(false); // State to toggle edit mode
  const [show, setShow] = useState(false); // State to manage data fetch/loading
  const [filteredUser, setFilteredUser] = useState({});
  const [loading, setLoading] = useState(false); // Loading state for API calls
  const [isPasswordEditable, setIsPasswordEditable] = useState(false); // For password section

  // Enable edit mode
  const enableEdit = (e) => {
    e.preventDefault(); // Prevent any default behavior (like form submission)
    setIsEditable(true); // Enable editing mode
    console.log("Edit mode enabled");
  };

  // Enable password change mode
  const enablePasswordEdit = (e) => {
    e.preventDefault();
    setIsPasswordEditable(true);
  };

  // Fetch user data when component mounts
  useEffect(() => {
    const getDetail = async () => {
      try {
        const response = await axiosinstance.get(endpoints.users);
        if (response.status === 200) {
          const filteredUser = response.data.find(
            (user) => user.token === window.sessionStorage.getItem("token")
          );
          setFilteredUser(filteredUser);
          setValue("name", filteredUser.fullName);
          setValue("email", filteredUser.email);
          setValue("phone", filteredUser.mobile);
          setValue("address", filteredUser.address);
          setShow(true);
        } else {
          throw new Error();
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Something went wrong",
          icon: "error",
          confirmButtonText: "Okay",
          timer: 2000,
        });
      }
    };

    getDetail();
  }, [setValue]);

  // Handle form submission for general details
  const onSubmit = async (data) => {
    console.log("Updated Data:", data);
    setLoading(true); // Show loader
    try {
      const obj = {
        fullName: data.name,
        email: data.email,
        mobile: data.phone,
        address: data.address,
        token: window.sessionStorage.getItem("token"),
        password: filteredUser.password,
        id: filteredUser.id,
      };
      // Make API call to update user data
      const response = await axiosinstance.put(
        endpoints.users + "/" + filteredUser.id,
        obj
      );
      if (response.status !== 200) {
        throw new Error();
      }
      setIsEditable(false); // Disable edit mode after saving
      Swal.fire("Success", "Details updated successfully", "success");
    } catch (error) {
      Swal.fire("Error", "Failed to update details", "error");
    } finally {
      setLoading(false); // Hide loader
    }
  };

  // Handle password change submission
  // Handle password change submission
const onPasswordSubmit = async (data) => {
    console.log(data);
    setLoading(true); // Show loader for password change
    try {
      if (data.newPassword !== data.confirmPassword) {
        throw new Error("Passwords do not match");
      }
      // Make API call to update password
      const obj = { ...filteredUser, password: data.confirmPassword };
      const response = await axiosinstance.put(
        endpoints.users + "/" + filteredUser.id,
        obj
      );
      if (response.status !== 200) {
        throw new Error();
      }
      Swal.fire({
        title: "Success",
        text: "Password changed successfully",
        icon: "success",
        confirmButtonText: "Okay",
        timer: 2000,
      }).then(() => {
        reset({ // Reset the form fields after successful change
          newPassword: '',
          confirmPassword: ''
        });
        setIsPasswordEditable(false); // Disable password edit mode
      });
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: err.message || "Password change failed",
        icon: "error",
        confirmButtonText: "Okay",
        timer: 2000,
      });
    } finally {
      setLoading(false); // Hide loader
    }
  };
  

  // Handle cancel password edit and reset fields
  const cancelPasswordEdit = () => {
    reset({ // Reset the form fields after successful change
        newPassword: '',
        confirmPassword: ''
      }); // Reset the password fields when canceling
    setIsPasswordEditable(false); // Disable password edit mode
  };

  if (!show) {
    return <h1>Loading...</h1>; // Loading message during data fetch
  }

  return (
    <Container fluid className=" account-page">
      
      {
        loading && <Loader/>
      }
      
      <h2 className="mb-4">My Account</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                {...register("name")}
                type="text"
                disabled={!isEditable} // Disabled if not in edit mode
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                {...register("email")}
                type="email"
                disabled={!isEditable} // Disabled if not in edit mode
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                {...register("phone")}
                type="text"
                disabled={!isEditable} // Disabled if not in edit mode
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                {...register("address")}
                type="text"
                disabled={!isEditable} // Disabled if not in edit mode
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="d-flex justify-content-between">
          {isEditable ? (
            <>
              <Button type="submit" variant="success" disabled={loading}>
                {loading ? <Spinner animation="border" size="sm" /> : "Save"}
              </Button>
              <Button
                variant="secondary"
                type="button"
                onClick={() => setIsEditable(false)}
                className="ms-2"
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button onClick={enableEdit} variant="primary" type="button">
              Edit
            </Button>
          )}
        </div>
      </Form>

      {/* Password Change Section */}
      <h3 className="mt-5">Change Password</h3>
      <Form onSubmit={handleSubmit(onPasswordSubmit)}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                {...register("newPassword")}
                type="password"
                disabled={!isPasswordEditable}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                {...register("confirmPassword")}
                type="password"
                disabled={!isPasswordEditable}
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="d-flex justify-content-between">
          {isPasswordEditable ? (
            <>
              <Button type="submit" variant="success" disabled={loading}>
                {loading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "Change Password"
                )}
              </Button>
              <Button
                variant="secondary"
                type="button"
                onClick={cancelPasswordEdit}
                className="ms-2"
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              onClick={enablePasswordEdit}
              variant="warning"
              type="button"
            >
              Change Password
            </Button>
          )}
        </div>
      </Form>
    </Container>
  );
};

export default AccountPage;
