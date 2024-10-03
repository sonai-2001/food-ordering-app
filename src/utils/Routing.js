import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import Home from '../component/Home'
import Header from '../component/Header'
import Login from '../component/Login'
import Restaurants from '../component/Restaurants'
import Register from '../component/Register'
import Details from '../component/Details'
import Cart from '../component/Cart'


const Content=()=>{
    return(
      <>
           <Header/>
            <Outlet/>
      </>
    )
 
}




const Routing = () => {
  return (
   <Routes>
    <Route path="/" element={<Home />} />
    <Route path='/login' element={<Login />}/>
    <Route path='/register' element={<Register />}/>
    <Route path="/content" element={<Content/>}>
           
           <Route path="restaurants/:category" element={<Restaurants/>}  / >
           <Route path="restaurants/:category/:id" element={<Details/>}  / >
           <Route path="cart" element={<Cart/>}  / >

  </Route>


   </Routes>
  )
}

export default Routing