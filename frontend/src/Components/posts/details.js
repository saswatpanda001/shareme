import React, { useState,useEffect,useRef } from 'react';
import { useLocation,useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import Loading from '../basic/loading';
import { PostContext } from '../../app';
import { useContext } from 'react';
import AxiosRequest from '../../axios';
import ReviewMangement from './details/comments';
import Operations from './details/operations';
import { DecodeToken } from '../token_decode';
import LikeCommentsUsers from './details/likecommentusers';
import LikePostsUsers from './details/likepostusers';
import ImageList from './details/ImageList';
import { Axios } from 'axios';
import { Rating } from 'semantic-ui-react'
import RecommendedProducts from './details/RecommendedProducts';
import RecentlyViewedProducts from './details/RecentlyViewedProducts';

const Details = () => {

    const user_id = DecodeToken(localStorage.getItem("access_token")).user_id
    const navigate = useNavigate();
    const location = useLocation();
    const key = parseInt(location.pathname.slice(15,))

    const {postDetails,setPostDetails} = useContext(PostContext)
    const {details,loading} = postDetails
    const [review,setReview] = useState()
    const[quantity,setQuantity] = useState(null);
    const [recommend,setRecommend] = useState([])

    const [likeData,setLikeData] = useState({"data":null,"likes":null,"status":null})
    const ref = useRef()

    

    let y = null;
    
    const retrievePostDetails = async() => {
        const fetchDetails = await AxiosRequest.get(`/shareme/posts/${key}/${user_id}`)
                            .then((res) => {
                                setPostDetails({loading:false,details:res.data});
                            })
                            .catch((err) => console.log(err))
    }

    const ReviewStars = (number) => {
        if(number){
            setReview(number);   
        }
    }


    let RenderLikeUsers = null
    
    const GetLikePosts = async() => {
        const post_like = AxiosRequest.get(`/shareme/posts/${key}/likes/${user_id}`)
                            .then((res) => {
                            
                                
                                
                                setLikeData({"data":res.data.data,"likes":res.data.total,"status":res.data.status})

                                

                            })
    }

    const UpdateLikePosts = async() => {
        const post_like = AxiosRequest.post(`/shareme/posts/${key}/likes/${user_id}`,{"user_id":user_id})
                            .then((res) => {
                                setLikeData({"data":res.data.data,"likes":res.data.likes,"status":res.data.status})
                                retrievePostDetails();
                            })
    }

    const handleQuantity = async(quantity) => {
        
        const {seller,title,price,id,image,category} = postDetails.details
        const data = {"seller":seller,"buyer":user_id,"net_price":price*quantity,"title":title,"product":id,"quantity":quantity,category:parseInt(category)}
        console.log(data)
        if(data.quantity>0){
        const prod_quantity= await AxiosRequest.post(`/shareme/cart/${user_id}`,data)
                            .then((res) => {console.log(res.data)})
                            .catch((err) => {console.log(err)})

        navigate(`/shareme/cart/${user_id}`);
        }
        else{
            alert("invalid quantity")
        }
    }


   






    useEffect(() => {
        GetLikePosts();
        retrievePostDetails();
        window.scrollTo(0,0);   
    }, []);


    



    if(postDetails.loading ===false){
        let likeIconStyle = "outline"
        postDetails.details.likes.map((a) => {
            if(a === user_id){
                likeIconStyle = ""
            }
        })
    

    const PostData = <div className='d-flex' style={{alignItems:"center"}}>
                        <p style={{fontSize:"25px"}}>{postDetails.details.title}</p>
                        <i style={{marginLeft:"25px"}} class={`big thumbs up red ${likeIconStyle} icon`} onClick={UpdateLikePosts}></i>
                        <p style={{fontSize:"20px"}} data-bs-toggle="modal" data-bs-target="#postlikeusersmodal">{postDetails.details.likes.length}</p>
                        <h3>{postDetails.details.content}</h3>
                    </div>

   
    const Details =  <div style={{margin:"3%",fontSize:"125%"}}>
                        <p>{postDetails.details.data}</p>
                        <Link to={`/shareme/profile/${postDetails.details.author}`}><p className='lead'>{postDetails.details.username}</p></Link>
                      </div>

    

    const handleDropDownSelect = (event, data) => {
        console.log(data.value);
    };


    const handleSaveLater = async() => {
        console.log("savelater")

        const a = await AxiosRequest.post(`/shareme/savelater/${user_id}`,{"id":postDetails.details.id,"buyer":user_id})
                .then((res) => {console.log(res.data)})
                .catch((err) => {console.log(err.data)})
    }


   



    const star = parseInt(postDetails.details.star)

    

    return(  
    <div className='container'>

        
    <div className='container row'>
    <div className='col-md-5 mt-4'>
    
     <div className='container mt-5'>
        <ImageList props={postDetails.details}/>        
    </div>
    </div>
    

    <div  class=" col-md-7 relative p-6 lg:overflow-y-auto md:overflow-y-auto">
    
        <div style={{margin:"2rem"}}>
            <Operations props={postDetails}/> 
            {/* <LikePostsUsers props={likeData.data}/>    */}
         
           
            <p className='font-semibold lg:text-3xl text-xl mb-3'>{postDetails.details.title}</p>

            <div className='d-flex items-center mb-3 gap-3'>

        <div className='d-flex items-center'>
            <Rating icon='star' defaultRating="4" maxRating={5} size='huge' clearable/>
            <p className='text-xl font-bold'>{review}</p>
        </div>

        

        <div className='d-flex items-center'>
            <i className='large red heart icon' onClick={UpdateLikePosts}></i>
            <LikePostsUsers props={likeData}/>
             
        </div>

        <div className='d-flex items-center'>
             <i className='large red save icon' onClick={handleSaveLater}></i>
        </div>


           
            
           
           
            
            
            
            </div>
        
            <p className='text-red-500 text-4xl'>{postDetails.details.price}</p>
            

            <div className='d-flex gap-4 mt-3 items-center'>

            <p className='text-1xl lg:text-2xl font-bold'>Quantity</p>
            <input type="number" className='form-control w-20' onChange={(e) => {setQuantity(e.target.value)}} ></input>
            </div>

            

            <div className='d-flex mt-4 mb-4 items-center '>
             <i className='black large shipping fast icon'></i>
             <Link to={`/shareme/profile/${postDetails.details.seller}`}><p className='text-2xl'>{postDetails.details.username}</p></Link>
             </div>

             <p className='text-lg mb-5'>{postDetails.details.content}</p>

            <div className='d-grid'>
             <button className='btn btn-dark btn-lg' onClick={() => handleQuantity(quantity)}>Add To Cart</button>
             </div>
        </div>
        
    </div>
    </div>

    <ReviewMangement props={ReviewStars}/>

   
    <RecommendedProducts props={postDetails.details}/>

    <RecentlyViewedProducts/>

   
   
    </div>
  );}
  
  else{
      return(
          <div className='mb-5'><Loading/></div>
      )
  }
   
};

export default Details;









