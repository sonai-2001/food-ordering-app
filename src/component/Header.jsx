import React, { useContext, useEffect, useState } from "react";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Container,
  NavDropdown,
  Badge,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";
import cartLengthContext from "../utils/cartLengthContext";
import axiosinstance from "../api/axiosinstance";
import { endpoints } from "../api/api-detail";

const Header = () => {
  const navigate = useNavigate();
  const { cartLength } = useContext(cartLengthContext);
  const [length, setLength] = useState("");
  const[search,setSearch]=useState("")
  const [results,setResults]=useState([])
  useEffect(() => {
    const getCartLength=async()=>{
      try {
          const response=await axiosinstance.get(endpoints.cart)
          if(response.status==200){
               const cartItems=response.data.filter((item)=>item.token==window.sessionStorage.getItem('token'))
               const cartLength=cartItems.reduce((acc, item)=>{
                return  acc+item.quantity
               },0)
               setLength(cartLength)
          }
          else{
            throw new Error()
          }
      } catch (error) {
          Swal.fire({
            title: "Failed to get cart length",
            text: "Something went wrong!",
            icon: "error",
          })
      }
}
    getCartLength();
   
  }, [cartLength]);
  useEffect(()=>{
     if(search===""){
      setResults([])
      return
     }
      console.log("useEffect called due to handlechange")
     const getResults=async()=>{
      console.log("getResults called")
      try{
       const response= await axiosinstance.get(endpoints.dishes)
       console.log("response",response)
       if(response.status==200){
            const filtered=response.data.filter(item=>item.name.toLowerCase().includes(search.toLowerCase())|| item.cuisines.includes(search))
            console.log(filtered)
            setResults(filtered)
       }
       else{
        throw new Error()
       }
      }
      catch(err){
          console.log(err);
      }

     }
     let timer= setTimeout(()=>{
          getResults()
 
      },200)

      return()=>{
        clearTimeout(timer)
      }
  },[search])
  const handleClick = () => {
    window.sessionStorage.removeItem("token");
    Swal.fire({
      title: "Success!",
      text: "Logout Successful",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then(() => {
      navigate("/");
    });
  };

  const handleChange=(e)=>{
    console.log("handlechange called")    
    if(e.target.value.trim()===""){
      setSearch("")    
      return
        }
        setSearch(e.target.value.trim())
  }

  return (
    <Navbar expand="lg" className="food-navbar py-3">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-3 food-brand">
          Foodie<span className="brand-dot">.</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarResponsive" />
        <Navbar.Collapse id="navbarResponsive">
          {/* Left Section */}
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="food-nav-link">
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/content/restaurants/toprated"
              className="food-nav-link"
            >
              Menu
            </Nav.Link>
          </Nav>

          {/* Search Section */}
          <Form
            className="d-flex mx-auto food-search-form"
            style={{ maxWidth: "400px" }}
          >
            <FormControl
              type="search"
              placeholder="Search for food..."
              className="me-2 food-search-input"
              aria-label="Search"
              onChange={handleChange}
            />
            <Button variant="warning" className="food-search-button">
              <FaSearch />
            </Button>
            {
              results.length>0 &&(
                <div className="search-results-container">
                {
                  results.map((item)=>(
                    <Link className="links" to={`/content/restaurants/${item.category}/${item.id}`} key={item.id} >
                      <div onClick={()=>setResults([])} className="search-item">
                      {item.name}

                      </div>
                     </Link>
                  ))
                }
                 
            </div>
              )
            }
          </Form>

          {/* Right Section */}
          <Nav className="ms-auto">
            <Nav.Link
              as={Link}
              to="/content/cart"
              className="position-relative food-nav-link"
            >
              <FaShoppingCart className="me-1" /> Cart
              {/* Badge for cart items count */}
              <Badge
                bg="danger"
                pill
                className="position-absolute top-2 start-20 start-md-100 translate-middle"
              >
                {length==0?"":length}
              </Badge>
            </Nav.Link>

            <NavDropdown
              title={<FaUser />}
              id="navbarScrollingDropdown"
              className="food-dropdown"
            >
              <NavDropdown.Item as={Link} to="/content/account">
                My Account
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/content/order">
                My Orders
              </NavDropdown.Item>
              <NavDropdown.Divider />
              {window.sessionStorage.getItem("token") ? (
                <NavDropdown.Item onClick={handleClick}>
                  Logout
                </NavDropdown.Item>
              ) : (
                <NavDropdown.Item as={Link} to="/login">
                  Login
                </NavDropdown.Item>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
