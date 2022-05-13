
import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router';
import AxiosRequest from '../../../axios';
import { DecodeToken } from '../../token_decode';
import { Link } from 'react-router-dom';


const RecentlyViewedProducts = () => {
    const navigate = useNavigate()

    const [recentlyViewedProducts,setRecentlyViewedProducts] = useState([])
  
   
    const user_id = DecodeToken(localStorage.getItem("access_token")).user_id
   

  
    const RetrieveRecentlyViewedProducts = async() =>{

        const prod = await AxiosRequest.get(`/shareme/products/recently_viewed/${user_id}`)
                    .then((res) => {
                        
                        setRecentlyViewedProducts(res.data)
                    })
                    .catch((err) => console.log(err.data))

    }


    const handlePage = (id) => {
        navigate(`/shareme/posts/${id}`);
        navigate(0);
        
    }

    


    const RenderRecentlyViewedProducts = recentlyViewedProducts.map((each) => {
       
        return(
            <div key={each.id}>
            <div className='hover:scale-105 rounded-lg shadow-md p-4 m-3' onClick={() => handlePage(each.id)}>
               <div className='flex justify-between items-center gap-4'>
                <img src={`http://localhost:8000${each.image}`} className='h-20'/>
                <div>
                <p className='text-xl font-light text-left'>{each.title}</p>
                <p className='text-xl font-light text-left'>Rs: {each.price}</p>
                </div>

                </div>
             
            </div>
            </div>

        );
        
    })

    useEffect(() => {
      RetrieveRecentlyViewedProducts()
    }, [])
    


   

    return (
        <div className='lg:m-10 md:m-6'>
             <p className='mt-20 text-4xl'>RenderRecentlyViewedProducts</p>
           
            <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1'>
            {RenderRecentlyViewedProducts}
            </div>
        </div>
    )
}

export default RecentlyViewedProducts