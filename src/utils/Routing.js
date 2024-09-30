import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import Home from '../component/Home'
import Header from '../component/Header'
import Login from '../component/Login'
import Restaurants from '../component/Restaurants'
import Register from '../component/Register'
import FilteredRes from '../component/FilteredRes'


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
           
           <Route path="restaurants" element={<Restaurants/>} >
                      <Route path=':category' element={<FilteredRes/>} />
           </Route>
                 
          
    </Route>

   </Routes>
  )
}

export default Routing