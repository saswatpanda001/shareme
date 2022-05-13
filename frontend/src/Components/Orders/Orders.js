import React,{useState,useEffect} from 'react'
import AxiosRequest from '../../axios'
import { DecodeToken } from '../token_decode'
import {useNavigate} from 'react-router-dom'




const Orders = () => {

  const navigation = useNavigate()

  const user_id = DecodeToken(localStorage.getItem("access_token")).user_id
  const [ordersData,setOrdersData] = useState([])

  const RetrieveOrders = async() => {
    const orders_dt = await AxiosRequest.get(`/sales/orders/${user_id}`)
                    .then((res)=> {
                     
                      setOrdersData(res.data)     
                    })
                    .catch((err) => {console.log(err)})
  }




  const RenderOrders = ordersData.map((each) => {
    console.log(each)
    const status = parseInt(each["status"])

    return(

      <div  class="m-5 p-8  bg-gray-200 rounded-xl shadow-md">
         <p className="text-lg mb-3 font-semibold text-black ">Order Id: {each.transaction_id}</p>
         
        <div className="flex flex-row justify-between items-center">
       
          <div className=''>
          <img onClick={() => {navigation(`/shareme/profile/${"1"}`)}} className="block mx-auto h-24 rounded-lg sm:mx-0 sm:shrink-0" src={`http://localhost:8000${each.image}`} alt="Woman's Face"/>
       
          </div>
         <div className="space-y-0.5">
            <p className="text-xl font-normal text-black ">{each.title}</p>
            <p className="text-lg font-light text-black ">Quantity: {each.quantity}</p>
            <p className="text-lg font-light text-black ">Rs: {each.net_price}</p>
          </div>
          <div className="">
          <p className="text-xl font-normaltext-black ">Address:</p>
            <p className="text-lg font-light text-black ">{each.address}</p>
          
            
          </div>

          <div className="">
          <p className="text-xl font-normaltext-black ">Shipping Details</p>
           <p className="text-md font-light text-black ">Name: {each.firstname} {each.lastname}</p>
            <p className="text-md font-light  text-black ">Phone: {each.phone}</p>
            <p className="text-md font-light text-black ">Email: {each.email}</p>
            
          </div>


         
      </div>


      <p className=" mt-4 text-xl font-normaltext-black ">Preparing to ship the order </p>
      <div class="w-full bg-gray-200 rounded-full mt-3">
        <div class={`bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-l-full w-${status}/6`}> 25%</div>
      </div>
      <div className='flex flex-row items-center justify-around'>
        <p className="text-xl font-normaltext-black ">Ordere Placed</p>
        <p className="text-xl font-normaltext-black ">Processing</p>
        <p className="text-xl font-normaltext-black ">Shipped</p>
        <p className="text-xl font-normaltext-black ">On the way</p>
        <p className="text-xl font-normaltext-black ">OutForDelivery</p>
        <p className="text-xl font-normaltext-black ">Delivered</p>

      </div>

   

     

      </div>


    
    );
  })

  useEffect(() => {
    RetrieveOrders();
  }, [])


  


  return (
    <div>
      <div className='row'>
        <div>
        {RenderOrders}
        </div>
      


      </div>
      

    </div>
  )
}

export default Orders;
