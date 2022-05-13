import axios, { Axios } from 'axios';


const AxiosMediaRequest =  axios.create({
    baseURL:"http://127.0.0.1:8000/",
    timeout:5000,
    headers:{
        'Authorization': "JWT " + localStorage.getItem('access_token'),
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'}
})

export default AxiosMediaRequest;

