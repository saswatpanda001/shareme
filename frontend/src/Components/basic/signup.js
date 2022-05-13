import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom';
import AxiosRequest from '../../axios';


const Signup = () => {
    const navigation = useNavigate();
    const initialRegistrationDetails = Object.freeze({first_name:"",last_name:"",username:"",email:"",password:"",confirm_password:""})
    const [register,setRegister] = useState(initialRegistrationDetails);
    

   

    const handleSubmit = () => {
        
        const requestData = JSON.stringify({first_name:register.first_name,last_name:register.last_name,email:register.email,username:register.username,password:register.password,confirm_password:register.confirm_password})
        if(register.password === register.confirm_password){
            console.log(requestData)
            AxiosRequest.post('accounts/register/',requestData)
            .then((res) => {
                navigation('/login')
            })
        }
    }

    const handleChange = (e) => {
        const feedRegisterForm = {...register, [e.target.name]:e.target.value}
        setRegister(feedRegisterForm)
    }

    
    
    
    return (
        
        
        <div className="container-fluid col-md-5" style={{marginTop:"5%",backgroundColor:"white",padding:"4%",borderRadius:"25px"}}>
        <h1 className='display-5'>Enter details to register</h1>
        <p className='lead'>Already register<Link to="/login"> Click here </Link>to Login</p>


        <div className="mb-3 mt-4">
        <div style={{display:"flex",justifyContent:"flex-start",alignItems:"center", marginBottom:"2%"}}>
        <div className='d-flex' style={{width:"200px"}}>
        <i class="big user icon"></i>
        <p  className="form-label lead">First Name</p>
        </div>
        <div>
            <input type="name" name="first_name" className="form-control" placeholder="Enter your first name" onChange={handleChange}/>
        </div>

         </div>
        </div>


        <div className="mb-3 mt-4">
        <div style={{display:"flex",justifyContent:"flex-start",alignItems:"center", marginBottom:"2%"}}>
        <div className='d-flex' style={{width:"200px"}}>
        <i class="big user icon"></i>
        
        <p  className="form-label lead">Last Name</p>
        </div>
        <div>        
            <input type="name" name="last_name" className="form-control" placeholder="Enter your last name" onChange={handleChange}/>
        </div>
        </div>
        </div>
        
        

        <div className="mb-3">
        <div style={{display:"flex",flexDirection:"row",justifyContent:"flex-start",alignItems:"center", marginBottom:"2%"}}>
        <div className='d-flex' style={{width:"200px"}}>
        <i class="big user icon"></i>
        <p  className="form-label lead">Username</p>
        </div>
        <div>
        <input type="username" name="username" className="form-control" placeholder="Enter a unique username"  onChange={handleChange}/>
        </div>
        </div>
        </div>


        <div className="mb-3">
        <div style={{display:"flex",justifyContent:"flex-start",alignItems:"center", marginBottom:"2%"}}>
        <div className='d-flex' style={{width:"200px"}}>
        <i class="big envelope icon"></i>
        <p  className="form-label lead">Email</p>
        </div>
        <div>
        <input type="email" name="email" className="form-control" placeholder="Enter Email Id" onChange={handleChange}/>
        </div>
        </div>
        </div>

        
        <div className="mb-3">
            
        <div style={{display:"flex",justifyContent:"flex-start",alignItems:"center", marginBottom:"2%"}}>
        <div className='d-flex' style={{width:"200px"}}>
        <i class="big keyboard icon"></i>
        <p  className="form-label lead">Password</p>
        </div>
        <div>      <input type="password" name="password" className="form-control" placeholder="Enter Password" onChange={handleChange}/>
        </div>
        </div>

        </div>
        <div className="mb-3">
        <div style={{display:"flex",justifyContent:"flex-start",alignItems:"center", marginBottom:"2%"}}>
        <div className='d-flex' style={{width:"200px"}}>
        <i class="big keyboard icon"></i>
        <p  className="form-label lead">Confirm Password</p>
        </div>
        <div>
        
        <input type="password" name="confirm_password" className="form-control" placeholder="Conform Password" onChange={handleChange}/>
        </div>
        </div>
        </div>
      
        <button  className="btn btn-dark col-md-6" onClick={handleSubmit}>Submit</button>
   
        </div>
            

    )
}

export default Signup;











// handleSubmit(event) {
//     event.preventDefault();

//     const { value } = this.state;
//     const re = new RegExp("^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$");
//     const isOk = re.test(value);

//     console.log(isOk);

//     if(!isOk) {
//         return alert('weak!');
//     }

//     alert('A password was submitted that was ' + value.length + ' characters long.');
// }
