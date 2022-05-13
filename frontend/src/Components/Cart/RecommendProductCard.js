
import React from 'react'
import { useNavigate } from 'react-router'

const RecommendProductCard = ({props}) => {
  const navigation = useNavigate()

  const each = props
  return(
    <div className="card" style={{width:"12rem", marginBottom:"20px"}}>
            <img src={`http://localhost:8000${each.image}`} onClick={ () => navigation(`/shareme/posts/${each.id}`)} class="card-img-top image-flow"  alt="..." />
            <div className="card-body">
              <h5 className="card-title">{each.title}</h5>
              <p className="card-text">{each.price}</p>
            
          </div>
    </div>
  );
}

export default RecommendProductCard;
