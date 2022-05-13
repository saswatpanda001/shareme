import React,{useState,useEffect} from 'react'
import { DecodeToken } from '../token_decode'
import AxiosRequest from '../../axios'
import CartProductRecommendation from './CartProductRecommendation'
import { useNavigate } from 'react-router'
import { Axios } from 'axios'


const CartDetails = () => {
    const navigate = useNavigate()
    const user_id = DecodeToken(localStorage.getItem("access_token")).user_id;
    const [cartData,setCartData] = useState([])
    const [category,setCategory] = useState([])
    const [productRecommendation,setProductRecommendation] = useState([])
    const [coupon,setCoupon] = useState({"state":false,"name":"default","decrement":0})
    


    const applyCoupon = () => {
      const totalShoppedPrice= calculateNetPrice()
      console.log("coupon applying")
      if(coupon.name=="FREEDEL"){
        coupon.state = !coupon.state
        coupon.decrement =100
        setCoupon(coupon)
      }
    }

   


    const calculateNetPrice = () => {
        let totalAmount = 0
        for(let i=0;i<cartData.length;i++){
            totalAmount += (parseInt(cartData[i].net_price))
        }
        return totalAmount;
    }

    const amountAfterCharges = () => {
      if(!coupon.state){
        console.log("incrementing")
        return calculateNetPrice()+100
      }
      else{
        console.log("decrementing")
        return calculateNetPrice()-coupon.decrement
      }
    }

    const retrieveCart = async() => {
        const cartProducts = await AxiosRequest.get(`/shareme/cart/${user_id}`)
                            .then((res) => {
                                setCartData(res.data)
                                retrieveRecommendation();
                            })
                            .catch((err) => {console.log(err)})        
    }


    const handleQuantity = async(id,quantity,type) => {
        const passData = {"id":id,"quantity":quantity,"type":type}
        const a = await AxiosRequest.put(`/shareme/cart/${id}`,passData)
                .then((res) => {
                    console.log(res.data);
                    retrieveCart()
                })
                .catch((err) => console.log(err.data))
    }


    const retrieveRecommendation = async() => {
            const recProducts = await AxiosRequest.post("/shareme/posts/recommend",{user_id})
                            .then((res) => {
                                setProductRecommendation(res.data)    
                            })
                            .catch((err) => {console.log(err)})
    }

    const saveLaterHandler = async(id,del_id) => {
      console.log(id,del_id)  
      const addToSave =await AxiosRequest.post(`shareme/savelater/${id}`,{"buyer":user_id,"id":id})
                        .then((res) => console.log(res))
                        .catch((err) => console.log(err))

        deleteCartItem(del_id);
    }


    const deleteCartItem = async(id) => {
            const deleteCartItem = await AxiosRequest.delete(`/shareme/cart/${id}`)
                                .then((res) => {
                                    console.log(res.data)
                                    retrieveCart();
                                })
                                .catch((err) => {console.log(err)})
    }


    const handleOrder = async() => {
            const passOrder = await AxiosRequest.post(`/sales/orders/${user_id}`,cartData)
                            .then((res) => {console.log(res);})
                            .catch((err) => {console.log(err)})
            navigate(`/shareme/orders/${user_id}`)
    }


    const RenderCartItemValues = cartData.map((each) => {
      
      return(
        <div className='flex justify-between items-start mt-1' key={each.id}>
          <p className="font-semibold text-sm">{each.title.slice(0,20)}</p>
          <p className="font-semibold text-sm">{each.net_price}</p>
          

        </div>
      );
    })


    const RenderCartData = cartData.map((each) => { 
            
            return(
                <div key={each.id} >
                <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                <div className="flex w-2/5"> 
                  <div className="w-20">
                    <img onClick={() => navigate(`/shareme/posts/${each.product}`)} className="h-20" src={`http://localhost:8000${each.image}`} alt=""/>
                  </div>
                  <div className="flex flex-col justify-between ml-4 flex-grow">
                    <span className="font-bold text-md">{each.title}</span>
                    <span className="text-red-500 text-sm">{each.time.slice(11,16)} {each.time.slice(0,10)}</span>
                   
                    
                    <p onClick={() => deleteCartItem(each.id)} className="font-semibold hover:text-red-500 text-gray-500 text-xs">Remove</p>
                    <p onClick={() => saveLaterHandler(each.product,each.id)} className="font-semibold hover:text-red-500 text-blue-500 text-xs">Add to SaveLater</p>
                  
                  </div>
                </div>
                <div className="flex justify-center w-1/5">
                  <svg onClick={() => {handleQuantity(each.id,each.quantity,"dec")}} className="fill-current text-gray-600 w-3" viewBox="0 0 448 512"><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
                  </svg>
        
                  <input className="mx-2 border text-center w-8" type="int" value={each.quantity}/>
        
                  <svg onClick={() => {handleQuantity(each.id,each.quantity,"inc")}} className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                    <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
                  </svg>
                </div>
                <span className="text-center w-1/5 font-semibold text-sm">Rs: {each.price}</span>
                <span className="text-center w-1/5 font-semibold text-sm">Rs: {each.net_price} </span>
              </div>
              </div>
                            
            );
    })


    useEffect(() => {
      retrieveCart();     
    }, [])


    return (
        <div className="container mx-auto mt-10">
        <div className="flex shadow-md my-10">
          <div className="w-3/4 bg-white px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Shopping Cart</h1>
              <h2 className="font-semibold text-2xl">{cartData.length} Items</h2>
            </div>
            <div className="flex mt-10 mb-5">
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Quantity</h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Price</h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Total</h3>
            </div>
            {RenderCartData}    
            <a  className="flex font-semibold text-indigo-600 text-sm mt-10">
          
              
              <button onClick={() => navigate("/shareme/posts")} className='btn btn-dark hover:scale-120'>
                <div className='d-flex'>
                <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z"/></svg>
                Continue Shopping
                </div>
                  
              </button>
            </a>
          </div>
    
          <div id="summary" className="w-1/4 px-8 py-10">
            <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
            {RenderCartItemValues}

            
            <div className="flex justify-between mt-4 mb-5">
              <span className="font-semibold text-sm uppercase">Total Items {cartData.length}</span>
              <span className="font-semibold text-md">Rs. {calculateNetPrice()}</span>
            </div>
            <div>
              <label className="font-medium inline-block mb-3 text-sm uppercase">Shipping</label>
              <select className="block p-2 text-gray-600 w-full text-sm">
                <option>Standard shipping Rs: 100.00</option>
              </select>

            </div>
            <p className="font-semibold text-xl mt-4">Including Shipping: {amountAfterCharges()}</p>
            <div className="py-10">
              <label for="promo" className="font-semibold inline-block mb-3 text-sm uppercase">Promo Code</label>
              <input type="text" id="promo" placeholder="Enter your code" className="p-2 text-sm w-full" onChange={(e) =>{coupon.name=e.target.value; setCoupon(coupon)}}/>
            </div>
            <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase" onClick={applyCoupon}>Apply</button>
            <div className="border-t mt-8">
              <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>Total cost</span>
                <span>{amountAfterCharges()}</span>
              </div>
              <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full" onClick={() => navigate(`/shareme/checkout/${user_id}`)}>Checkout</button>
            </div>
          </div>
    
        </div>
      </div>
    


   
  )
}

export default CartDetails;


