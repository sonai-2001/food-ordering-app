import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Form, Row, Col, Container, Spinner } from "react-bootstrap";
import axiosinstance from "../api/axiosinstance";
import { endpoints } from "../api/api-detail";
import Swal from "sweetalert2";
import Loader from "./Loader";

const AccountPage = () => {
  const { register, handleSubmit, setValue, reset } = useForm();
  const [isEditable, setIsEditable] = useState(false);
  const [show, setShow] = useState(false);
  const [filteredUser, setFilteredUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [isPasswordEditable, setIsPasswordEditable] = useState(false);

  const enableEdit = (e) => {
    e.preventDefault();
    setIsEditable(true);
  };

  const enablePasswordEdit = (e) => {
    e.preventDefault();
    setIsPasswordEditable(true);
  };

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

  const onSubmit = async (data) => {
    setLoading(true);
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
      const response = await axiosinstance.put(
        endpoints.users + "/" + filteredUser.id,
        obj
      );
      if (response.status !== 200) {
        throw new Error();
      }
      setIsEditable(false);
      Swal.fire("Success", "Details updated successfully", "success");
    } catch (error) {
      Swal.fire("Error", "Failed to update details", "error");
    } finally {
      setLoading(false);
    }
  };

  const onPasswordSubmit = async (data) => {
    setLoading(true);
    try {
      if (data.newPassword !== data.confirmPassword) {
        throw new Error("Passwords do not match");
      }
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
        reset({
          newPassword: '',
          confirmPassword: ''
        });
        setIsPasswordEditable(false);
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
      setLoading(false);
    }
  };

  const cancelPasswordEdit = () => {
    reset({
      newPassword: '',
      confirmPassword: ''
    });
    setIsPasswordEditable(false);
  };

  if (!show) {
    return <h1>Loading...</h1>;
  }

  return (
    <Container fluid className="account-page py-4">
      {loading && <Loader />}

      <h2 className="mb-4">My Account</h2>

      <Form onSubmit={handleSubmit(onSubmit)} className="mb-5">
        <Row>
          <Col md={6}>
            <Form.Group className="mb-4">
              <Form.Label>Name</Form.Label>
              <Form.Control
                {...register("name")}
                type="text"
                disabled={!isEditable}
                className="form-control-lg"
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-4">
              <Form.Label>Email</Form.Label>
              <Form.Control
                {...register("email")}
                type="email"
                disabled={!isEditable}
                className="form-control-lg"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-4">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                {...register("phone")}
                type="text"
                disabled={!isEditable}
                className="form-control-lg"
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-4">
              <Form.Label>Address</Form.Label>
              <Form.Control
                {...register("address")}
                type="text"
                disabled={!isEditable}
                className="form-control-lg"
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="d-flex justify-content-end">
          {isEditable ? (
            <>
              <Button
                type="submit"
                variant="success"
                className="me-2"
                disabled={loading}
              >
                {loading ? <Spinner animation="border" size="sm" /> : "Save"}
              </Button>
              <Button
                variant="secondary"
                type="button"
                onClick={() => setIsEditable(false)}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button onClick={enableEdit} variant="warning" type="button">
              Edit
            </Button>
          )}
        </div>
      </Form>

      <h3 className="mb-4">Change Password</h3>
      <Form onSubmit={handleSubmit(onPasswordSubmit)}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-4">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                {...register("newPassword")}
                type="password"
                disabled={!isPasswordEditable}
                className="form-control-lg"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-4">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                {...register("confirmPassword")}
                type="password"
                disabled={!isPasswordEditable}
                className="form-control-lg"
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="d-flex justify-content-end">
          {isPasswordEditable ? (
            <>
              <Button
                type="submit"
                variant="success"
                className="me-2"
                disabled={loading}
              >
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
