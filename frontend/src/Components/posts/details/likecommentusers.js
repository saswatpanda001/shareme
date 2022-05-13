import React,{useState,useEffect} from 'react'
import AxiosRequest from '../../../axios'

const LikeCommentUsers = ({props}) => {
   

  //  const [userData,setUserData] = useState();
    

  //  const getUsersFromID = async() => {
  //    const data = await AxiosRequest.post("/shareme/getUserFromID",props)
  //                 .then((res) => {
  //                   console.log(res.data);
  //                 })
  //                 .catch((err) => {console.log(err)})
  //  }

  //  useEffect(() => {
  //    getUsersFromID();
  //  }, [])
  console.log(props)
  
   

  return (
    <div>
      <div>
      <div class="modal fade" id="commentlikeusersmodal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable  ">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="postlikeusersmodal">Likes</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
              <p>ABC</p>
              <p>ABC</p>
              <p>ABC</p>
              <p>ABC</p>
              <p>ABC</p>
              <p>ABC</p>
              <p>ABC</p>
              
                         
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
            
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  )
}

export default LikeCommentUsers;
