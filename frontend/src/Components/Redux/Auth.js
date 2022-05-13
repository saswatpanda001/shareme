import classes from './Auth.module.css';
import { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { AuthActions } from './ReduxTutorial';


const Auth = () => {
  const [details,setDetails] = useState({email:"",password:""})
  const authState =useSelector(state => state.auth.login)
  const Dispatch = useDispatch()

  

  const handleChange = (e) => {
    details[e.target.name] = e.target.value;
    setDetails(details)
  }

  const handleSubmit = ()=>{
    console.log(details);
    if(details){
      Dispatch(AuthActions.user_auth())
    }
  }



  return (
    <main className={classes.auth}>
      <section>
        
          <div className={classes.control}>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' name="email" onChange={handleChange}/>
          </div>
          <div className={classes.control}>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' name="password" onChange={handleChange}/>
          </div>
          <button onClick={handleSubmit} >Login</button>
       
      </section>
    </main>
  );
};

export default Auth;
