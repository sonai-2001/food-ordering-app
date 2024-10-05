import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import Home from '../component/Home'
import Header from '../component/Header'
import Login from '../component/Login'
import Restaurants from '../component/Restaurants'
import Register from '../component/Register'
import Details from '../component/Details'
import Cart from '../component/Cart'
import Payment from '../component/Payment'
import MyOrder from '../component/MyOrder'
import AccountPage from '../component/AccountPage'


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
           <Route path="payment" element={<Payment/>} />
           <Route path="order" element={<MyOrder/>} />
           <Route path="account" element={<AccountPage/>} />

  </Route>


   </Routes>
  )
}

export default Routing