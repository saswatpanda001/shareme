import React,{useState} from "react";
import { useNavigate } from "react-router";
import { Route,Redirect } from "react-router-dom";
import { DecodeToken } from "./Components/token_decode";
import { Navigate } from "react-router-dom";

export const checkAuthStatus = () => {
  if(localStorage.getItem("access_token")){
    return true;
  }
  else{
    return false;
  }
}




const ProtectedRoutes = ({children}) => {
  
    const auth = checkAuthStatus()
    return auth ? children : <Navigate to="/login" />;
}

export default ProtectedRoutes;
