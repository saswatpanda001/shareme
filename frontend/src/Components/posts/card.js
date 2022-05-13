import React from 'react';
import reactJS from '../../Images/reactJS.png'
import { useNavigate } from 'react-router';


const Card = (props) => {
    
    const navigation = useNavigate();


    const {title,id,price,image} = props.CardViewData
    

  
    return(

<div class="max-w-sm rounded overflow-hidden shadow-md hover:scale-110 ">
  <img class="w-full" src={`http://localhost:8000${image}`} onClick={(e) => {navigation(`${id}`)}}/>
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
    <p class="text-gray-700 text-base">
    {title.substr(0,40)}</p>
    
  </div>
  {/* <div class="px-6 pt-4 pb-2">
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
    
    </div> */}
</div>
   
  );
};

export default Card;





