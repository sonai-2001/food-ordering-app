import React from 'react'
import {  FaChevronDown, FaChevronUp } from "react-icons/fa";
import SingleItem from './SingleItem';


const Accordian = ({type,accordian,setAccordian,index}) => {
  
  
  const handleCollapse=()=>{
     if(accordian==index){
        setAccordian(-1)
        return
     }
     setAccordian(index)
  }
  
    return (
    <div className="items-container">
    {/* accordian heading and the button */}
    <div className="accordian-heading-button">
      <h3>{type.title}</h3>
      <span onClick={handleCollapse}>
       { accordian==index? <FaChevronUp/> :<FaChevronDown />}
      </span>
    </div>
    {/* single item */}
    
   {
    accordian==index &&type.dishes.map((dish,index)=> <SingleItem  key={index} dish={dish}/>
)
   }   
  </div>
  )
}

export default Accordian