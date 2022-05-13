
import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router';
import AxiosRequest from '../../../axios';
import { DecodeToken } from '../../token_decode';
import { Link } from 'react-router-dom';

const RecommendedProducts = ({props}) => {
    
    const {id,category} = props
    const navigate = useNavigate()


    const [recommendedtProducts,setRecommendedProducts]  = useState([])
    const user_id = DecodeToken(localStorage.getItem("access_token")).user_id



    const RenderRecommendedProducts = recommendedtProducts.map((each) => {
        
        return(
            <div key={each.id}>
            <div className='hover:scale-105 rounded-lg shadow-md p-4 m-3' onClick={() => {navigate(`/shareme/posts/${each.id}`);navigate(0)}}>
               <img src={`http://localhost:8000${each.image}`} className=''/>
               <div>
                <p className='text-xl font-light text-left'>{each.title}</p>
                <p className='text-xl font-light text-left'>Rs: {each.price}</p>
                </div>
            </div>
            </div>

        );
        
    })


    const RetrieveProductRecommendation = async() => {
       
       
            const dt = category.toString()+"/"+id.toString()
            const prd = await AxiosRequest.get(`/shareme/products/single_prd_recommend/${dt}`)
                        .then((res) => {
                            setRecommendedProducts(res.data)
                            
                        })
                        .catch((err) => {console.log(err.data)})
        


    }

    


    useEffect(() => {
        RetrieveProductRecommendation();
    }, [])

  
    return (
        <div className='lg:m-10 md:m-6'>             
            <p className='mt-20 lg:text-4xl md:text-2xl sm:text-xl'>Recommended Products</p>
            <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1'>
            {RenderRecommendedProducts}
            </div>
        </div>
  )
}

export default RecommendedProducts