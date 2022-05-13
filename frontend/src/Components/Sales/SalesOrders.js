import { Axios } from 'axios'
import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router'
import AxiosRequest from '../../axios'
import { DecodeToken } from '../token_decode'


const SalesOrders = () => {
    const navigation = useNavigate()

    const deliverystatus = {
        "1":"Order Placed","2": "Order Processing","3":"Shipped","4":"On The Way","5":"Out for Delivery","6":"Delivered"
    }

    const [prdStatus,setPrdStatus] = useState(false)




    
    const [myOrders,setMyOrders] = useState([])

    const user_id = DecodeToken(localStorage.getItem("access_token")).user_id

    const handleOrderStatus = async(ord_id,status_id) => {
        console.log(ord_id)
        console.log(status_id)

        const status_cg = await AxiosRequest.put(`/sales/orders_rec/${ord_id}`,{"status":parseInt(status_id),"order_id":parseInt(ord_id)})
                            .then((res) => {
                                console.log(res.data)
                                RetrieveSalesOrders()
                                setPrdStatus(false)
                            })
                            .catch((err) => {console.log(err.data)})
    }

    


    const RetrieveSalesOrders = async() => {
        const a = await AxiosRequest.get(`/sales/orders_rec/${user_id}`)
                    .then((res) => {
                        console.log(res);
                        setMyOrders(res.data)
                    })
                    .catch((err) => {console.log(err)})
    }


    const RenderMyOrders = myOrders.map((each) => {
        console.log(each)
        
        return(
            <div  class="mt-5 hover:scale-110  py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
            <img onClick={() => {navigation(`/shareme/profile/${"1"}`)}} className="block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0" src={`http://localhost:8000${each.image}`} alt="Woman's Face"/>
            <div className="text-right space-y-2 sm:text-left ">
              <div className="space-y-0.5">
                <p className="text-xl font-normal text-black ">{each.title}</p>
                <p className="text-md text-black ">Quantity: {each.quantity}</p>
                <p className="text-md text-black ">Rs: {each.net_price}</p>
                <p className="text-xl  text-red-500 ">{deliverystatus[each.status]}</p>
                <button className='btn btn-dark' onClick={() => setPrdStatus(!prdStatus)}>Set Status</button>
              </div>



             {prdStatus ? <div>
              <select name="cars" id="cars" value={`each.status`} onChange={(e) => handleOrderStatus(each.id,e.target.value)}>
                <option value="1">Order Placed</option>
                <option value="2">Order Processing</option>
                <option value="3">Shipped</option>
                <option value="4">On the way</option>
                <option value="5">OutForDelivery</option>
                <option value="6">Delivered</option>
              </select></div>
              :
              <div></div>

             }
            </div>
            </div>





        );
    })
    useEffect(() => {
        RetrieveSalesOrders()
    }, [])
    


  
    return (
   
        <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {RenderMyOrders}
        </div>

  
    
  
  )
}

export default SalesOrders