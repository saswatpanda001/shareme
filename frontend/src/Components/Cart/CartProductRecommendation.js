import React,{useState,useEffect} from 'react'
import Loading from '../basic/loading'
import RecommendCart from './RecommendProductCard'
import AxiosRequest from '../../axios'
import RecommendProductCard from './RecommendProductCard'

const CartProductRecommendation = ({props}) => {
  
  const recProducts = props
  let a = null;
  
  const RenderProducts = () => {
    console.log(recProducts)
    if(recProducts.length >=1){  
      a = recProducts.map((each) => {
        return(
          <div key={each.id} >
            <RecommendProductCard props={each} />
          </div>
        );
      })

      return(
        <div  align="center" className='container' style={{"display":"grid","gridTemplateColumns": "repeat(auto-fit, minmax(200px, 1fr))"}}>
          {a}
        </div>
      );
    }

    else if(recProducts.length==0){
      return(
        <div><p style={{fontSize:"20px"}}>No Products to Recommend</p></div>
      );
    }

    else{
      return(
        <div><Loading/></div>
      );
    }

  }

  
  

  

  



  return (
    <div>
        <p style={{fontSize:"24px"}}>You may like these</p>
        <RenderProducts/>
    </div>
  )
}

export default CartProductRecommendation