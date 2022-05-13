import React from 'react';
import reactJS from '../../Images/reactJS.png'
import { useNavigate } from 'react-router';


const MealCard = (props) => {
    
    const navigation = useNavigate();

    const {id,name,price} = props.passMealDetails

    

  
    return(
    <div>
        <div className="card shadow p-2 mb-5 bg-body rounded" style={{width:"13rem"}} >
        <img src={reactJS} className="card-img-top" alt="..." onClick={(e) => {navigation(`${id}`)}}/>
        <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p class='lead'>Rs. {price}</p>
        </div>
        </div>
    </div>
  );
};

export default MealCard;
