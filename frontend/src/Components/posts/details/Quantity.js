import React,{useState} from 'react'

const Quantity = (props) => {
    


  
    
    return (
    <div>
        <p style={{fontSize:"20px"}}>Quantity: </p>
        <input  className='form-control w-30' onChange={(e) => {setQuantity(parseInt(e.target.value))}}/>
        <button className='btn btn-dark ml-3' onClick={() => {props.QuantityFunction(quantity)}} >Add to Cart</button>        
    </div>
  )
}

export default Quantity

