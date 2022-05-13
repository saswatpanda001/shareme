import React,{useState,useEffect} from 'react'
import AxiosRequest from '../../axios'
import Search from '../basic/search'
import { DecodeToken } from '../token_decode'
import Card from './Card'

const Seller = () => {

    const user_id = DecodeToken(localStorage.getItem("access_token")).user_id
    const [search,setSearch] = useState("");
    const [contacts,setContacts] = useState([]);

    
    const RetrieveContacts = async(ser) => {
        
        
        const data = await AxiosRequest.post(`/accounts/profile/${user_id}`,ser)
                    .then((res) => {
                        setContacts(res.data)
                    })
                    .catch((err) => {console.log(err)})
        }

    const RenderSellers = contacts.map((each) => {
        
      return( 
      <div key={each.id}>
        <Card props={each}></Card>
      </div>
     );
      
    })
    

    useEffect(() => {
      RetrieveContacts(search);
      
    }, [search])
   


    return (
        <div>

            <div className='flex justify-center'>
                <input className="form-control w-25 mt-4" onChange={(e) => setSearch(e.target.value)} type="search" placeholder="Search" aria-label="Search"/>
            </div>

            <div className=' grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {RenderSellers}
            </div>

        </div>
    
  )
}

export default Seller