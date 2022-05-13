import { useState,useContext,useRef } from "react";
import React from 'react';
import Cart from "./cart";
import { CartContext } from "../../app";



const MealList = (props) => {
    const cartInputRefValue = useRef()
    const {setCartValue,cartValue} = useContext(CartContext)
    let [cartInput,setCartInput] = useState(0);
   


   

    const RenderMealList = props.passMealDetails.map((each) => {
        
        const handleAdd = () => {
            if(cartInput !=0 && cartInput != null){
                cartValue.push(cartInput)
                setCartValue(cartValue)
            }
        }

        const handleChange = (e) => {
            if(e.target.value >= 0 && e.target.value != null){
               setCartInput({...each,total:parseInt(e.target.value)})
            } 
        }


        
        
        return(
        <div key={each.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"5%" }}>
            <div>
            <div style={{fontSize:"20px"}}>
                <h3>{each.name}</h3>
            </div>
            <p className="lead">{each.price}</p>
            </div>
            <div className="d-flex" style={{justifyContent:"flex-end"}}>
                <input  className="form-control me-4" defaultValue="0" id={each.id} onChange={handleChange}  style={{width:"70px",borderRadius:"25px"}} placeholder="No of items" type="number"/>
                <button className="btn btn-dark" onClick={handleAdd}> + Add</button>
            </div>
        </div>  
        );
    });

    return(
        
        <div className="container-fluid col-md-5" style={{backgroundColor:"white",borderRadius:"25px",padding:"3%",marginTop:"3%"}}>
            <h1 className="display-5">Meal List</h1>
            <div style={{marginTop:"5%"}}>
                {RenderMealList}
            </div>
        </div>
  



    );
};


export default MealList;
