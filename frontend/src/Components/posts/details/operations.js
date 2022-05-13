import React from 'react'
import { useLocation } from 'react-router';
import AxiosRequest from '../../../axios';
import { Link } from 'react-router-dom';
import { PostContext } from '../../../app';
import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { DecodeToken } from '../../token_decode';






const Operations = ({props}) => {
    
    const postDetails = props
    
    const navigate =useNavigate()
    
    



    
    const location = useLocation()
    const key = parseInt(location.pathname.slice(15,))

    const handleDelete = async() => {
        const a = await AxiosRequest.delete(`/shareme/posts/${key}/delete`)
                    .then((res) => {navigate("/shareme/posts")})
    }
    
    const username = DecodeToken(localStorage.getItem("access_token")).username
    console.log(postDetails.details.username + " "+username)
    
    if(username != postDetails.details.username){
        return(
            <div>

            <div className='d-flex'>
                <Link to={{pathname:"update",state:"state"}}>
                <i className="large red edit icon"></i>
                </Link>
                <i className="large red trash icon" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
            </div>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Confirm Post Deletion</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                Are you sure you want to delete this Post
                </div>
                <div className="modal-footer">
                    
                    <button type="button" className="btn btn-dark" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-danger"  onClick={handleDelete} data-bs-dismiss="modal">Confirm Delete</button>
                </div>
                </div>
            </div>
            </div>


            </div>
        );                      
    }
    else{
        return(null);
    }


}

export default Operations;

