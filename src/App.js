import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Routing from './utils/Routing';
import { useState } from 'react';
import cartLengthContext from './utils/cartLengthContext';
import cartItemsContext from './utils/cartItemsContext';

function App() {
  
  const [cartLength,updateCartLength]=useState([])
  const [cartItems,setItems]=useState([])
  console.log(cartLength)
  return (
    <cartItemsContext.Provider value={{cartItems,setItems}}>
    <cartLengthContext.Provider value={{cartLength,updateCartLength}}>
      <div className="App">
      <BrowserRouter>
      <Routing/>
      </BrowserRouter>
        
    </div>
    </cartLengthContext.Provider>
    </cartItemsContext.Provider>
  );
}

export default App;
