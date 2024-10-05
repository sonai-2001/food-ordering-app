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
import Error from '../component/Error'
import ProtectedRoute from './ProtectedRoute'


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
           <Route path="cart" element={
            <ProtectedRoute>
            <Cart/>
            </ProtectedRoute>
            }  / >
           <Route path="payment" element={
            <ProtectedRoute>
            <Payment/>
            </ProtectedRoute>
            } />
           <Route path="order" element=
           {
            <ProtectedRoute>
            <MyOrder/>
            </ProtectedRoute>
            } />
           <Route path="account" element={
            <ProtectedRoute>
            <AccountPage/>
            </ProtectedRoute>
            } />
           <Route path='error' element={<Error/>} />

  </Route>


   </Routes>
  )
}

export default Routing