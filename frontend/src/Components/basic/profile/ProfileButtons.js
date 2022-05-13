import React from 'react'
import { DecodeToken } from '../../token_decode';
import { useNavigate } from 'react-router';
import AxiosRequest from '../../../axios';




const chat = <div className='ml-3'><i className='large wechat white icon'></i></div>
const call = <i className='large phone white icon'></i>
const follow = <div className='d-flex'>
                    <i className='large user user white icon'></i>
                    <i className='large user thumbs up  icon'></i>
                </div>

const ProfileButtons = ({props,fol}) => {
  const user_id = DecodeToken(localStorage.getItem("access_token")).user_id  
  const navigation = useNavigate();

  const handleTextUsers = async(id) => {
   

    if(id){
        console.log(id)
        const addUsersTotext = await AxiosRequest.put(`accounts/retrieve_profiles/${user_id}`,id)
                              .then((res) => {console.log(res.data);
                                              
                              })
    }
    navigation(`/shareme/text/${user_id+"-"+id}`);

  }

  if(props != user_id){
      return(
            <div className='d-flex mt-4' style={{gap:"15px"}}>

            <button className='btn btn-dark' >
              <div style={{gap:"4px"}} className="d-flex" onClick={() => {handleTextUsers(props)}}>
                <div>
                Text
                </div>
                {chat}
              </div>
            </button>
            
            <button className='btn btn-dark'>
              <div style={{gap:"4px"}} className="d-flex" onClick={fol}>
                <div>
                Follow
                </div>
                {follow}
              </div>
            </button>

            <button className='btn btn-dark' onClick={() => {navigation(`/shareme/call/${user_id+"-"+props}`);}}>
              <div style={{gap:"4px"}} className="d-flex">
                <div >
                Call
                </div>
                {call}
              </div>
            </button>
            </div>
            );
    }
    else{
      return(null);
    }  
  }

export default ProfileButtons