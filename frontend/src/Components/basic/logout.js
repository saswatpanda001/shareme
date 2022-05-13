import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import AxiosRequest from '../../axios';
import { useNavigate } from 'react-router';
import { HeaderContext } from '../../app';
import Header from './header';
import { AuthActions } from '../Redux/ReduxTutorial';
import { useDispatch,useSelector } from 'react-redux';

const Logout = () => {

    const navigate = useNavigate();
    const {header,setHeader} = useContext(HeaderContext)
    const Dispatch = useDispatch()


    const handleLogout = () => {
      setHeader(false);
      localStorage.setItem("access_token","")
      // localStorage.setItem("refresh_token","")
      // Dispatch(AuthActions.user_auth(false))
      // Dispatch(AuthActions.name(""))
      // Dispatch(AuthActions.username(""))
      // Dispatch(AuthActions.user_id(""))
      
      navigate("/login");
    }
    return (
      <div className='m-5 text-center'>
        <p className='font-medium sm:text-xl text-2xl mb-5'>Are you sure you want to logout? </p>    
       
        <button className="btn btn-dark" onClick={handleLogout}>Logout</button>
    
      </div>
        
       
    )
}

export default Logout;


// <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
// <div className="modal-dialog">
//   <div className="modal-content">
//     <div className="modal-header">
//       <h5 className="modal-title" id="staticBackdropLabel">Logout Screen</h5>
//       <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//     </div>
//     <div className="modal-body">
//         <p className='lead'><b>Are you sure you want to Logout</b></p>
  
//     </div>
//     <div className="modal-footer">
//       <Link to='/'><button className="btn btn-primary" data-bs-dismiss="modal">Take me back</button></Link>
//       <button className="btn btn-danger" data-bs-dismiss="modal" onClick={handleLogout}>Logout</button>
//     </div>
//   </div>
// </div>
// </div>