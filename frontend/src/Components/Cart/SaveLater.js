import React,{useState,useEffect} from 'react'
import { DecodeToken } from '../token_decode'
import AxiosRequest from '../../axios'
import { useNavigate } from 'react-router'

const SaveLater = () => {
    const navigation = useNavigate()


    const user_id = DecodeToken(localStorage.getItem("access_token")).user_id
    const [saveLater,setSaveLater] = useState([])

    const RetrieveSaveLater = async() => {
        const content_dt = await AxiosRequest.get(`/shareme/savelater/${user_id}`)
                        .then((res)=> {
                            console.log(res.data)
                            setSaveLater(res.data)     
                        })
                        .catch((err) => {console.log(err)})
    }

    const handleDelete = async(id) => {
      const s_later = await AxiosRequest.delete(`/shareme/savelater/${id}`)
                    .then((res) => {RetrieveSaveLater()})
    }


    const RenderContent = saveLater.map((each) => {
        console.log(each)
        
        return(
          <div  class="mt-5 hover:scale-110  py-8 px-8 lg:max-w-md md:max-w-sm sm:max-w-sm mx-auto bg-white rounded-lg shadow-md space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
          <img onClick={() => {navigation(`/shareme/posts/${each.product}`)}} className="block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0" src={`http://localhost:8000${each.image}`} alt="Woman's Face"/>
          <div className="text-right space-y-2 ">
            <div className="space-y-0.5 text-right">
              <i className='large black close icon r-0' onClick={() => handleDelete(each.id)}></i>
              
              <p className="text-xl text-left font-normal text-black ">{each.title.slice(0,40)}</p>
              <p className="text-md text-left text-black ">Rs: {each.net_price}</p>
             
              
            </div>
           
        </div>
        </div>
        );
      })


      useEffect(() => {
        RetrieveSaveLater();
      }, [])
      



    return (
        <div className='row'>
            <p className='lg:text-4xl md:text-2xl sm:text-2xl text-center mt-3'>Save Later</p>
           
            <div className='  grid  lg:grid-cols-3 md:grid-cols-2  sm:grid-cols-1'>
                 {RenderContent}
            </div>
        </div>
  )
}

export default SaveLater