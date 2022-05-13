import React, {useContext, useState} from 'react'
import { useNavigate,useLocation} from 'react-router'
import AxiosRequest from '../../axios';
import { Link } from 'react-router-dom';
import { HeaderContext } from '../../app';
import Header from './header';
import { AuthActions } from '../Redux/ReduxTutorial';
import { useDispatch} from 'react-redux';
import { DecodeToken } from '../token_decode';


const Login = () => {
    const navigate = useNavigate();
    const {setHeader,header}  =useContext(HeaderContext)
    const [loginDetails,setLoginDetails] = useState({username:"",password:"",email:""});
    const {username,password,email} = loginDetails;

    // const Dispatch = useDispatch();


    const handleChange = (e) => {
       
        loginDetails[e.target.name] = e.target.value
        setLoginDetails(loginDetails)
        console.log(loginDetails)
      
    }

    
    
    const handleSubmit = () => {
        const passLoginRequest = JSON.stringify(loginDetails)
        AxiosRequest.post('/api/get_token',passLoginRequest)
        .then((res) => {
            
            console.log(res.data.access)
            if(res.data.access){
                localStorage.setItem("access_token",res.data.access)
                setHeader(true)
                // Dispatch(AuthActions.user_auth(true))
                // Dispatch(AuthActions.username(username))
                // Dispatch(AuthActions.user_id(user_id))
                // Dispatch(AuthActions.name(first_name+last_name))

                navigate('/shareme/posts')
          
            }
            
            

        })
        .catch((err) => {console.log("errors: ");console.log(err);})
    }

  
    
    
    return (

        <div className="container-fluid col-md-5 mt-4" style={{marginTop:"3%",backgroundColor:"white",padding:"3%",borderRadius:"25px"}}>
        <h1 className='display-5'>Enter your login details</h1>
        <p className='lead'>New user <Link to='/signup'>click here</Link> to signup</p>


        <div>
        <div className="mb-3 mt-3">
        <div style={{display:"flex",justifyContent:"flex-start",alignItems:"center", marginBottom:"2%"}}>
        <i class="big user icon"></i>
        <p className="form-label lead">Username</p>
        </div>
        <input type="username" name="username" className="form-control"placeholder="Enter username" onChange={handleChange}/>
        </div>

        <div className="mb-3 mt-3">
        <div style={{display:"flex",justifyContent:"flex-start",alignItems:"center", marginBottom:"2%"}}>
        <i class="big user icon"></i>
        <p className="form-label lead">Email</p>
        </div>
        <input type="email" name="email" className="form-control" placeholder="Enter email" onChange={handleChange}/>
        </div>


        <div className="mb-3">
        <div style={{display:"flex",justifyContent:"flex-start",alignItems:"center", marginBottom:"2%"}}>
        <i class="big keyboard icon"></i>
        <p className="form-label lead">Password</p>
        </div>
        <input type="password" name="password" className="form-control"  placeholder="Enter Password" onChange={handleChange}/>
        </div>
        <div align="center" className='d-grid gap-2'>
        <button  className="btn btn-dark" onClick={handleSubmit}>Login</button>
        </div>
        </div>


        </div>
    )
}

export default Login;





