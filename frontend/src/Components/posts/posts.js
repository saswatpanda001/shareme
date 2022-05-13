import React from 'react'
import { useState,useEffect } from 'react';
import Card from './card';
import Details from './details';
import Loading from '../basic/loading';
import { Link, useLinkClickHandler } from 'react-router-dom';
import AxiosRequest from '../../axios';
import { useSelector } from 'react-redux';
import { DecodeToken } from '../token_decode';
import { useLocation } from 'react-router';
const Home = () => {
    
    const location = useLocation()
    const [postData,setPostData] = useState({loading:true,posts:[]});
    const [searchData,setSearchData] = useState("");
    const [postLimit,setPostLimit] = useState({start:0,end:20})
    const [postComplete,setPostComplete] = useState(false)
    const getUserName = useSelector(state => state.auth.username)
    const key =  useSelector(state => state.auth.user)

    
    const {username,user_id} = DecodeToken(localStorage.getItem("access_token"))
    


    const GetAPIData = async() => {

        const rawData = await AxiosRequest.post("shareme/posts",{search:searchData,...postLimit});

        if(rawData.data.length === 0){
            setPostLimit({start:0,end:20}) 
        }
        else if(rawData.data.length <20){
            setPostData({loading:false,posts:rawData.data});
            setPostComplete(true)
        }   
        else{
            setPostData({loading:false,posts:rawData.data});
            setPostComplete(false)
        }
    }

    useEffect(() => {
        GetAPIData();
        window.scrollTo(0, 0);

    },[searchData,postLimit]);




   







    const LoadPosts = () => {
        if(postLimit.start == 0){
            return(
                <div className='container d-flex justify-center align-center gap-5'>
                    <button class="btn btn-dark" onClick={handleLimit}>Next</button>     
                </div>
            );

        }
        else{
        
        return(
            <div className='container d-flex justify-center align-center gap-5'>
                <button class="btn btn-dark" onClick={handleLimit}>Next</button>     
                <button className='btn btn-dark'  onClick={decreaseLimit}>Back</button>
            </div>
        );
        }
    }

    const NoPosts = () => {
        return(
            <div align="center" className='mb-lg'>
                <button className='btn btn-dark'  onClick={decreaseLimit}>No More posts to display, Go Back</button>
            </div>
        );
    }


    const handleLimit = () => {
        console.log(postLimit)
        setPostLimit({start:postLimit.end,end:postLimit.end+20})
    }
    
    const decreaseLimit = () => {
        console.log(postLimit)
        setPostLimit({start:postLimit.start-20,end:postLimit.end-20});
        GetAPIData();
    }
    



    const RenderPostListData = postData.posts.map((each) => {
        return(
            <div key={each.id} style={{marginLeft:"3%",marginTop:"3%",marginRight:"3%",}}>
                <Card CardViewData={each}/>
            </div>
        );
    })
    if(postData.loading === false){
    return (
        <div className="m-4">
            <div className='flex justify-center mt-8'>
                <input type="search"  className="form-control w-25"  placeholder="Search"  onChange={(e) => {setSearchData(e.target.value)}} />   
            </div>


            <div className='grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 gap-20 mt-4'>
                {RenderPostListData}
            </div>
            <div>
            {postComplete ? <NoPosts/>: <LoadPosts/>}
            </div>
        </div>
    )
    }
    else{
        return(
            <div>
                <Loading/>
            </div>
        );
    }
}

export default Home;