import React from 'react'
import { Link } from 'react-router-dom';

const LikePostsUsers = ({props}) => {
  let y = null;
  const likeuserdata = props.data 
  if(likeuserdata){


    const RenderLikes = likeuserdata.map((each) => {
   
      return(
        <div>
         <Link to={`/shareme/profile/${each[1]}`}> <p className='text-lg font-medium' data-bs-dismiss="modal">{each[0]}</p></Link>
        </div>
      )
    })
  
    return(
      <div>
        <p className='font-medium text-xl' data-bs-toggle="modal" data-bs-target="#postlikeusersmodal">{props.likes}</p>
  
          <div className="modal fade" id="postlikeusersmodal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable  ">
            <div className="modal-content">
              <div className="modal-header">
                <p  className="modal-title font-medium text-2xl" id="postlikeusersmodal">Likes</p>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                {RenderLikes}
                
                            
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                
              </div>
            </div>
          </div>
        </div> 
  
  
  
      </div>
    );
  


  }
  else{

    return(
      <div></div>
    );
  }

  
 



}
export default LikePostsUsers;

 


     