import React from 'react'
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import AxiosRequest from '../../../axios';
import { useLocation } from 'react-router';
import { Axios } from 'axios';
import { DecodeToken } from '../../token_decode';
import LikeCommentUsers from './likecommentusers';
import { Icon } from 'semantic-ui-react'
import RecommendProductCard from '../../Cart/RecommendProductCard';

const ReviewMangement = (props) => {

    const location = useLocation()
    const [comments,setComments] = useState([]); 
    const [postComment,setPostComment] = useState("");
    const key = parseInt(location.pathname.slice(15,))
    
    
    
    const retriveComments = async() => {
        const fetchComments = await AxiosRequest.get(`/shareme/posts/${key}/comments`)
            .then(res => {
                setComments(res.data);
                
                props.props(res.data.length)
            })

            .catch(err => console.log(err))
    }


    const [commentId,setCommentId] =useState(null)
    const [commentData,setCommentData] = useState({})

    const user_id = DecodeToken(localStorage.getItem("access_token")).user_id

    
    

    const LikeComments = async(idd) => {
        const comment_like =await AxiosRequest.post(`/shareme/posts/${key}/comments/likes`,{"user_id":user_id,"comment_id":idd})
                            .then((res) => {
                                
                                setCommentData({"res":res.data.res,"data":res.data.data});
                               
                                }); 
    }

    const handleReviewDelete = async(id) => {
       
        const a = await AxiosRequest.delete(`/shareme/posts/${id}/comments`)
                    .then((res) => {
                      
                        retriveComments();
                    
                    })
                    .catch((err) => {console.log(err.data)})

    }


    
   
    const RenderComments = comments.map((each) => {
        
        let likeIconStyle = "outline"
        each.likes.map((a) => {
            if(a === user_id){
                likeIconStyle = ""
            }
        
        })
      

        const DeleteReviewIcon = () => {
            if(each.user ==user_id){
                return(
                    <div >
                        <i className='medium red close icon' onClick={() => handleReviewDelete(each.id)}></i>
                    </div>
                );
            }
            else{
                return null;
            }
        }



        
        

        return(
               <div className='hover:scale-105 rounded-lg shadow-md p-4 m-3' key={each.id}>
                   <div className='flex justify-between items-center'>
                        <div className='d-flex gap-2'>
                        <img className="sm:h-8 md:h-10 lg:h-15 rounded-xl " src={`http://localhost:8000${each.user_image}`} alt="none"/>
                        <div>
                        <Link to={`/shareme/profile/${each.user}`}><p className="text-xl font-normal text-black ">{each.username}</p></Link>
                        
                        
                        <div className='d-flex gap-1'>
                            <p className="text-xs font-extralight text-black ">{each.comment_time.slice(11,16)}</p>
                            <p className="text-xs font-extralight text-black ">{each.comment_time.slice(5,7)}/{each.comment_time.slice(8,10)}/{each.comment_time.slice(0,4)}</p>
                            
                        </div>
                        </div>
                        
                        
                        </div>

                        <DeleteReviewIcon></DeleteReviewIcon>
                       
                       

                    </div>
                    <div className='flex justify-between items-center'>

                    <p className="text-lg font-light mt-2 text-black ">{each.content}</p>
                    <div className='flex justify-end items-center gap-1'>
                            <Icon name={`thumbs up`} size="large" onClick={()=>{LikeComments(each.id);}} />
                            <p className='text-md  font-light'>{each.likes.length}</p> 
                        </div>

                   
                   
                    </div>

                    


                  
               </div>
        );
    })



    const handleComment = async() => {

        const commentRequest =await AxiosRequest.post(`/shareme/posts/${key}/comments`,{content:postComment,user_id:user_id})
                            .then(res => console.log(res))
                            .catch(err => console.log(err))
        retriveComments();
        setPostComment("")
    }


    useEffect(() => {    
        retriveComments();
    }, [commentData]);


    

    

    return(
        <div  className='lg:m-10 md:m-6' >

        <p className='text-4xl'>Write a Review</p>
       
        <div className='d-flex gap-3 items-center justify-start'>
            <input placeholder='   Write a review' className='form-control' value={postComment} onChange={(e) => setPostComment(e.target.value)} style={{borderRadius:"15px",height:"35px",width:"30rem",marginTop:"10px"}}></input>
            <button className='btn btn-dark mt-3' onClick={handleComment}>Post</button>
           
        </div>
        <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1'>
        {RenderComments}
        </div>
        </div>
    );
}

export default ReviewMangement;




