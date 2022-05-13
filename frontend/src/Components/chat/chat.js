import React,{useState,useEffect,useRef} from 'react'
import { useNavigate, useLocation, Navigate } from 'react-router'
import { Link } from 'react-router-dom'
import { DecodeToken } from '../token_decode'
import AxiosRequest from '../../axios'
import { Axios } from 'axios'



const Chat = () => {

    const user_id = DecodeToken(localStorage.getItem("access_token")).user_id
    const [socketDetails,setSocketDetails] = useState({user_id:null,username:null,ws_api:null})
    const location = useLocation()
    const chat_id = location.pathname.slice(14)
    const yy =location.pathname.slice(14)
    const [message,setMessage] = useState("")
    const [messageData,setMessageData] = useState([])
    const [accountData,setAccountData] = useState([])
    const [id,setId] = useState(window.location.pathname.slice(14))
    const [recieverDt,setRecieverDt] = useState([])

    const navigate = useNavigate();
    const refScroll = useRef()

    const ChangeReciever = (data) => {
        console.log(data)
        setRecieverDt(data)
    }
    




    if(socketDetails.ws_api){

    socketDetails.ws_api.onopen = () => {console.log("connection established")}
    socketDetails.ws_api.onclose = () => {console.log("disconnected")}

    socketDetails.ws_api.onmessage = (res) => {
        if(res.data){
            console.log("onmessage",res.data)
            retrieveMessages();
        }
    }}
    

    const socketMessages = () => {
        if(message.length>0){
            const msg_data = JSON.stringify({"data":message,"code":chat_id,"type":"send"})
            if(msg_data.data !== ""){
                socketDetails.ws_api.send(msg_data);
            }
            setMessage("");
        }
    }

    const getUsers = async() => {
        const users = await AxiosRequest.get(`/accounts/retrieve_profiles/${user_id}`)
                        .then((res)=> {setAccountData(res.data)})
                        .catch((err) => {console.log(err)})
    }

    const changeText = (sender) => {
        navigate(`/shareme/text/${user_id}-${sender}`);
        setId(user_id+"-"+sender);

    }


    const RenderAccounts = accountData.map((each) => {
        const getIndex = id.indexOf("-")
        const senderIdPath = parseInt(id.slice(getIndex+1,))
        let bgColor ="hover:bg-gray-100"
       
        if(senderIdPath == parseInt(each.id)){
            console.log(senderIdPath,each.id)
            bgColor = "bg-gray-400"
            if()
           

        }
        

        return(
            <div key={each.id}  onClick={ () => {changeText(each.user);  ChangeReciever(each)}} >
                  
            <a
            class={`flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b ${bgColor}  border-gray-300 cursor-pointer  focus:outline-none`}>
            <img class="object-cover w-10 h-10 rounded-full"
            src="https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010__340.jpg" alt="username" />
            <div class="w-full pb-2">
            <div class="flex justify-between">
                <span class="block ml-2 font-semibold text-gray-600">{each.name}</span>
              
            </div>
            <span class="block ml-2 text-sm text-gray-600"></span>
            </div>
            </a>
            </div>
        );
    })


    const scrollToBottom = () => {
        refScroll.current?.scrollIntoView({ behavior: "smooth" })
    }




    
    
   


    const retrieveMessages = async() => {
        const getMessage = await AxiosRequest.get(`/chat/text/${chat_id}`)
                            .then((res) => {
                                
                                setMessageData(res.data);
                            })

        // ws request to get message
        // const messagesList = JSON.stringify({"data":message,"code":chat_id,"type":"fetch"})
        // ws_api.send(messagesList); 

    }
    // http request to store message
    // const sendMessages = async() => {
    //     const sendMessage = await AxiosRequest.post(`/chat/text/${chat_id}`,{"data":message})
    //                         .then((res) => {retrieveMessages();})
    // }




    let RenderMessages = messageData.map((each) => {
        if(user_id == each.sender){
            

            return(
                <div  key={each.id} 	>
                    
                <li class="flex justify-start ">
                    <div class="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-400 rounded-lg shadow-md">
                   <div className='flex flex-row items-center justify-between gap-2'>
                    <span class="block text-md font-medium ">You</span>
                    <span class="block text-xs font-light">{each.time.slice(0,10)} {each.time.slice(11,16)}</span>
                    </div>
                    <span class="block text-lg">{each.data}</span>
                    
                    </div>
                </li>
                </div>
            );
        }
        else{
            return(
                <div  key={each.id}>
                <li class="flex justify-end">
                <div class="relative max-w-xl px-4 py-2 text-gray-700 bg-purple-500 rounded-lg shadow-md">
                   <div className='flex flex-row items-center justify-between gap-2'>
                    <span class="block text-md font-medium ">{each.sender_name}</span>
                    <span class="block text-xs font-light">{each.time.slice(0,10)} {each.time.slice(11,16)}</span>
                    </div>
                    <span class="block text-lg">{each.data}</span>
                    
                    </div>
                </li>
                </div>
            )
        }
        
        
        

    })

    useEffect(() => {
        const user_id = DecodeToken(localStorage.getItem("access_token")).user_id
        const username = DecodeToken(localStorage.getItem("access_token")).username
        const ws_api = new WebSocket(`ws://localhost:8000/ws/chat/${window.location.pathname.slice(14)}`);
        setSocketDetails({user_id:user_id,username:username,ws_api:ws_api})
        retrieveMessages();
        getUsers();
        scrollToBottom()
        
    }, [id])


   
    
    return (

        <div class="container mx-auto">
        <div class="min-w-full border rounded lg:grid lg:grid-cols-3">
        <div class="border-r border-gray-300 lg:col-span-1">
            <div class="mx-3 my-3">
            <div class="relative text-gray-600">
                <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    viewBox="0 0 24 24" class="w-6 h-6 text-gray-300">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                </span>
                <input type="search" class="block w-full py-2 pl-10 bg-gray-100 rounded outline-none" name="search"
                placeholder="Search" required />
            </div>
            </div>

            <ul class="overflow-auto h-[32rem]" >
            <h2 class="my-2 mb-2 ml-2 text-lg text-gray-600">Chats</h2>
            <li>
            
            {RenderAccounts}
            </li>
            </ul>
        </div>
        <div class="hidden lg:col-span-2 lg:block">
            
            <div class="w-full">
          
            <div class="relative flex items-center p-3 border-b border-gray-300">
                <img class="object-cover w-10 h-10 rounded-full"
                src="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg" alt="username" />
                <span class="block ml-2 font-bold text-gray-600">{recieverDt.name}</span>
                <span class="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3">
                </span>
            </div>
            <div class="relative w-full p-6 overflow-y-auto h-[40rem]" ref={refScroll}>
                <ul class="space-y-2">
                    {RenderMessages}
               
                
                </ul>
            </div>

            <div class="flex items-center justify-between w-full p-3 border-t border-gray-300">
                <button>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                </button>
                <button>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
                </button>

                <input type="text"
                 value={message} placeholder='Enter the message' onChange={(e) => {setMessage(e.target.value)}}
                class="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                name="message" required />
                <button>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
                </button>
                <button onClick={socketMessages}>
                <svg class="w-5 h-5 text-gray-500 origin-center transform rotate-90" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20" fill="currentColor">
                    <path
                    d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
                </button>
            </div>
            </div>
        </div>
        </div>
        </div>

   
    );
}


export default Chat;


