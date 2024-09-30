import React from 'react'
import { useParams } from 'react-router-dom'

const FilteredRes = () => {
  
  const {category}=useParams()
    return (
    <div>FilteredRes {category}</div>
  )
}

export default FilteredRes