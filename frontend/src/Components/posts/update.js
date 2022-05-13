import React,{useState,useEffect} from 'react';
import { useLocation,useNavigate } from 'react-router';
import AxiosRequest from '../../axios';
import { PostContext } from '../../app';
import { useContext } from 'react';


const UpdatePost = (props) => {
    const navigation = useNavigate()
    const {postDetails,setPostDetails} = useContext(PostContext);
    const {title,data,content,id} = postDetails.details

    

    const handleSubmit = async() => {    
        const cleanFormData = JSON.stringify(postDetails.details);
        console.log(cleanFormData)
        const req  = await AxiosRequest.put(`/shareme/posts/${id}/update`,cleanFormData)
        .then((res) => {navigation(`/shareme/posts/${id}`);console.log("updated")})
        .catch((err) => {console.log(err);})
    }

    const handleUpdate = (e) => {
      postDetails.details[e.target.name] = e.target.value
      setPostDetails({loading:false,details:postDetails.details})
    }

    return(
        <div className='container-fluid col-md-5 mt-4' style={{backgroundColor:"white",padding:"3%",borderRadius:"25px",marginTop:"25px"}}>
            <div className='mb-4'>
                <h1 className='display-4'>Update Post</h1>
            </div>

            <div>

            <div class="mb-3 mt-3">
            <label class="form-label lead">Title</label>
            <input type="text" defaultValue={title} name="title" class="form-control" placeholder="Enter the title" onChange={handleUpdate}/>
            </div>

            <div class="mb-3">
            <label class="form-label lead">Content</label>
            <textarea class="form-control"  defaultValue={content} name="content" rows="3" placeholder="Enter the content" onChange={handleUpdate}/>
            </div>

            <div class="mb-3">
            <label class="form-label lead">Data</label>
            <textarea class="form-control" defaultValue={data} name="data" rows="3" placeholder="Enter the data" onChange={handleUpdate}/>
            </div>
            <div className='d-grid gap-2'>
            <button className='btn btn-dark' onClick={handleSubmit}>Submit</button>
            </div>

            </div>
        </div>
    );
};

export default UpdatePost;