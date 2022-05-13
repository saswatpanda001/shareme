import React,{createContext, useContext,useState,useEffect} from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Login from './Components/basic/login';
import Logout from './Components/basic/logout';
import Home from './Components/posts/posts';
import Signup from './Components/basic/signup';
import Header from './Components/basic/header';
import Details from './Components/posts/details';
import Create from './Components/posts/create';
import MealsHome from './Components/meals/MealsHome';
import UpdatePost from './Components/posts/update';
import Profile from './Components/basic/profile';
import HomeApp from './Components/basic/homeapp';
import Chat from './Components/chat/chat';
import Notfound from './Components/basic/Notfound';
import CartDetails from './Components/Cart/CartDetails';
import Orders from './Components/Orders/Orders';
import Notifications from './Components/Notifications/Notifications';
import SalesOrders from './Components/Sales/SalesOrders';
import Contact from './Components/Contacts/Contact';
import Call from './Components/chat/Call';
import Zoom from './Components/basic/zoom';
import SaveLater from './Components/Cart/SaveLater';
import Sellers from './Components/Contacts/Seller';
import ProtectedRoutes from './ProtectedRoutes';
import Checkout from './Components/Cart/Checkout';
import MainCover from './Components/Cover/MainCover';

export const CartContext = createContext(null);
export const PostContext = createContext(null);
export const HeaderContext = createContext(null);
export const AuthContext = createContext(null);


const App = () => {
    const [cartValue,setCartValue] = useState([]);
    const [header,setHeader] = useState(false)
    const [postDetails,setPostDetails] = useState({loading:true,details:[],error:false});
    const [auth,setAuth] = useState(false)



    useEffect(() => {
        const CheckHeader = () => {
            const pathname = window.location.pathname.slice(1,6)
            if(pathname==="login" || pathname === "signu" || pathname ==""){
                setHeader(false)
            }
            else{
                setHeader(true)
            }
        }
        CheckHeader()
    },[])
    return (
        <div>
        
        <PostContext.Provider value={{postDetails,setPostDetails}}>
        <HeaderContext.Provider value={{setHeader}}>
        <AuthContext.Provider value={{setAuth,auth}}>
        
        
        <Router>
            {header && <Header/>}
            <Routes>
                <Route path="/" element={<MainCover/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/logout" element={<Logout/>}/>

                <Route path="/shareme/posts" element={<ProtectedRoutes><Home/></ProtectedRoutes>}/>
                <Route  path="/shareme/posts_create" element={<ProtectedRoutes><Create/></ProtectedRoutes>}/>
                <Route  path="/shareme/posts/:id" element={<ProtectedRoutes><Details/></ProtectedRoutes>}/>
                <Route path="/shareme/posts/:id/update" element={<ProtectedRoutes><UpdatePost/></ProtectedRoutes>}/>
                
                <Route path="/shareme/profile/:id" element={<ProtectedRoutes><Profile/></ProtectedRoutes>}/>
                <Route path="/shareme/contacts/:id" element={<ProtectedRoutes><Contact/></ProtectedRoutes>}/>
                <Route path="/shareme/sellers/:id" element={<ProtectedRoutes><Sellers/></ProtectedRoutes>}/>


                <Route path="/shareme/text/:id" element={<ProtectedRoutes><Chat/></ProtectedRoutes>}/>
                <Route path="/shareme/call/:id" element={<ProtectedRoutes><Call/></ProtectedRoutes>}/>
                

                <Route path="/shareme/cart/:id" element={<ProtectedRoutes><CartDetails/></ProtectedRoutes>}/>
                <Route path="/shareme/notofications/:id" element={<ProtectedRoutes><Notifications/></ProtectedRoutes>}/>
                <Route path="/shareme/orders/:id" element={<ProtectedRoutes><Orders/></ProtectedRoutes>}/>
                <Route path="/shareme/sales/:id" element={<ProtectedRoutes><SalesOrders/></ProtectedRoutes>}/>
                <Route path="/shareme/zoom/1" element={<ProtectedRoutes><Zoom/></ProtectedRoutes>}/>
                <Route path="/shareme/savelater/:id" element={<ProtectedRoutes><SaveLater/></ProtectedRoutes>}/>
                <Route path="/shareme/checkout/:id" element={<ProtectedRoutes><Checkout/></ProtectedRoutes>}/>
                <Route path="/shareme/notifications/:id" element={<ProtectedRoutes> <Notifications/></ProtectedRoutes>}/>
                
                
                <Route path="*" element={<Notfound/>}/>

            </Routes>
          


        </Router>
        </AuthContext.Provider>
        </HeaderContext.Provider>
        </PostContext.Provider>
        
        </div>

    )
}

export default App;

