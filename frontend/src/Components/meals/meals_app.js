import React,{createContext, useContext,useState,useEffect} from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Login from './Components/basic/login';
import Logout from './Components/basic/logout';
import Signup from './Components/basic/signup';
import Header from './Components/basic/header';
import MealsHome from './Components/meals/MealsHome';
import Profile from './Components/basic/profile';
import HomeApp from './Components/basic/homeapp';




export const CartContext = createContext(null);
export const HeaderContext = createContext(null);
export const AuthContext = createContext(null);












const App = () => {
    const [cartValue,setCartValue] = useState([]);
   
    
  


    
    
    return (
        <div>
        <CartContext.Provider value={{cartValue,setCartValue}}>
        <Router>
            <Routes>
                <Route path='/meals' element={<MealsHome/>}/>
            </Routes>
        </Router>
        </CartContext.Provider>
        </div>

    )
}

export default App;

