
import React from 'react'
import { useNavigate } from 'react-router';



const Card = (props) => {
    const navigation = useNavigate()
    // const user_id = DecodeToken(localStorage.getItem("access_token")).user_id
    const user_id = 1
    const {name,email,user,phone,image} = props.props
    let image1 = ""
    if(image[0] == "a"){
      image1 = "/media/"+image 
    }
    else{
      image1 = image
    }

   
    return (
        <div  class="mt-5 hover:scale-110  py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
        <img onClick={() => {navigation(`/shareme/profile/${user}`)}} className="block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0" src={`http://localhost:8000${image1}`} alt="Woman's Face"/>
        <div className="text-right space-y-2 sm:text-left ">
          <div className="space-y-0.5">
            <p className="text-xl font-semibold text-black ">{name}</p>
            <p className="text-md text-black ">{email}</p>
            <p className="text-md text-black ">{phone}</p>
            
          </div>
         
      </div>
      </div>
    )
   


}

    
export default Card

