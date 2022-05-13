import React,{useState,useEffect} from 'react'
import { Link,useLocation } from 'react-router-dom';
import Search from './search';
import Logout from './logout';
import { useNavigate } from 'react-router';
import CartIcon from '../Cart/CartIcon';
import { DecodeToken } from '../token_decode';


const Header = () => {
    
    const [checkLocation,setCheckLocation] = useState(false)
    const location = useLocation().pathname.slice(1,6)
    const [loginState,setLoginState] = useState(false)
    const navigation = useNavigate()
    const user_id = DecodeToken(localStorage.getItem("access_token")).user_id
    const username = DecodeToken(localStorage.getItem("access_token")).username
    const navigate = useNavigate()
    


    useEffect(() => {
        
        if(location === 'meals'){
          setCheckLocation(true)
        }
        else{
            setCheckLocation(false)
        }
    });

    
    
    return (
        <div>
           <nav class="flex items-center justify-between flex-wrap bg-white-500 p-6 shadow-md   ">
            <div className='flex flex-row items-center justify-start'>
            <div class="flex items-center  text-white mr-6">
                <svg class="fill-current h-8 w-8 mr-2 text-black" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg>
                <span onClick={() => {navigate(`shareme/profile/${user_id}`)}} class="text-black text-mono  text-4xl tracking-tight">{username}</span>
            </div>

            <div class=" flex flex-row justify-start items-center gap-4 text-sm">
                <a onClick={() => {navigate(`shareme/posts`)}} class="block text-2xl  lg:inline-block lg:mt-0 text-black ">
                    Products
                </a>
                <a onClick={() => {navigate(`shareme/sellers/${user_id}`)}} class="block  text-2xl lg:inline-block lg:mt-0 text-black  ">
                    Sellers
                </a>
                <a onClick={() => {navigate(`shareme/contacts/${user_id}`)}} class="block text-2xl lg:inline-block lg:mt-0 text-black">
                    Contacts
                </a>

              
            </div>


            </div>
            
            <div class="w-full block  flex-grow justify-end  lg:flex lg:items-center lg:w-auto mt-3">
               


                <div className="flex flex-row gap-3">
                    <Link to='/shareme/posts_create'><i className='black big clone icon'></i></Link>

                    <Link to={`/shareme/savelater/${user_id}`} ><i className='white big save icon'/></Link>
                    <Link to={`/shareme/cart/${user_id}`} ><i className='white big cart arrow down icon'/></Link>
                    <Link to={`/shareme/notifications/${user_id}`} ><i className='white big bell icon'/></Link>
                    <Link to={`/shareme/orders/${user_id}`} ><i className='white big truck icon'/></Link>
                    <Link to={`/shareme/sales/${user_id}`} ><i className='white big dollar sign icon'/></Link>
                    <Link to={`/logout`} ><i class="white big sign out alternate icon"></i></Link>
                    <a href="#" class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Download</a>
                </div>
            </div>





            


            </nav>
        </div>
    )
}

export default Header;
