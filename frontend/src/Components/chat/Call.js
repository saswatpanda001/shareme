import React,{useState,useEffect,useRef} from 'react'
import AxiosRequest from '../../axios'
import { DecodeToken } from '../token_decode'






const Call = () => {

  const [socketDetails,setSocketDetails] = useState({user_id:null,username:null,ws_api:null})
    const videoReference= useRef()

    const [message,setMessage] = useState([])
    const video_id = window.location.pathname.slice(13)
    const [messageData,setMessageData] = useState([])

    if(socketDetails.videoWebSocket){

      socketDetails.videoWebSocket.onopen = () => {console.log("connection established")}
      socketDetails.videoWebSocket.onclose = () => {console.log("disconnected")}

      socketDetails.videoWebSocket.onmessage = (res) => {
        if(res.data){
            console.log(res)
            
        }
    }}

    const handleMessages = () => {
        messageData.push(message)
        console.log(message)
        socketDetails.videoWebSocket.send(JSON.stringify({"data":message,"code":video_id,"type":"send"}))
    }

    const getVideo = () => {
        navigator.mediaDevices.getUserMedia({ video: { width:500,height:350 },audio:true })
          .then((dataStream) => {
            console.log(dataStream)
            let video = videoReference.current;
            video.srcObject = dataStream;
            video.play()
          })
          .catch(err => {
            console.error("error:", err);
          });
      };

      useEffect(() => {
          const user_id = DecodeToken(localStorage.getItem("access_token")).user_id
          const username = DecodeToken(localStorage.getItem("access_token")).username
          const ws_api = new WebSocket(`ws://localhost:8000/ws/call/${window.location.pathname.slice(14)}`);
          getVideo();
      }, [])
      





    return (
    <div className='container mb-3'>
        <p className='text-center mb-5 mt-5' style={{fontSize:"35px"}}>Video Call</p>
        <div className='row'>

        <div className='col-md-5 mb-5'>
        <div className='mr-3 ml-3 d-flex mb-5' style={{gap:"20px"}}>
       
        <button className='btn btn-dark'>Audio Off</button>
        <button className='btn btn-dark'>Video Off</button>
        </div>
        <div className='d-flex'>
        <input></input>
        <button className='btn btn-dark'>Join Room</button>
        </div>

        <div className='d-flex mt-5'>
        <input onChange={(e) => {setMessage(e.target.value)}}></input>
        <button className='btn btn-dark' onClick={handleMessages}>Send Message</button>
        </div>
        </div>
        

        <div className='col-md-7 mb-5'>
         <video ref={videoReference} ></video>
        </div>


        </div>
       

    </div>
  )
}

export default Call