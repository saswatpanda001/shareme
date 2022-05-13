
import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router'
import AxiosRequest from '../../axios'
import { DecodeToken } from '../token_decode'


const Notifications = () => {
  const navigation = useNavigate()
  const [notifications,setNotifications] = useState([])
  
    
  const user_id = DecodeToken(localStorage.getItem("access_token")).user_id 
  
  const RetrieveNotifications = async() => {
    const notf = await AxiosRequest.get(`/chat/notifications/${user_id}`)
              .then((res) => {
                
                setNotifications(res.data);

              })
              .catch((err) => {console.log(err.data)})
  }
  

  const DeleteNotifications = async(notf_id) => {
   
    console.log("deleting notification")
    const delNot = await AxiosRequest.delete(`/chat/notifications/${notf_id}`)
                  .then((res) =>{
                    console.log(res.data)
                    
                  })
                  .catch((err) => {console.log(err.data)})
  }

 


  useEffect(() => {
    RetrieveNotifications();
  }, [])

  const RenderNotifications = notifications.map((each) => {
    return(
    
      <div className='bg-gray-100 hover:scale-110 rounded-lg shadow-md p-3 m-5 text-center font-medium text-gray-500 my-6'>
        <p > {each.sender_data}</p>
      </div>
      
    );
  })


  return (

    <div>
      <h1 className='display-6'>
      Notifications  {notifications.length}
      </h1>

      <div className='row'>
      <div className='col-md-4'>
      
      </div>

      <div className='col-md-4'>
      {RenderNotifications}
      </div>

      <div className='col-md-4'>
      
      </div>
      </div>
    </div>
  )
}

export default Notifications



