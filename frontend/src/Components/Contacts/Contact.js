import React,{useState,useEffect} from 'react'
import AxiosRequest from '../../axios'
import Search from '../basic/search'
import { DecodeToken } from '../token_decode'
import Card from './Card'



const Contact = () => {
    const user_id = DecodeToken(localStorage.getItem("access_token")).user_id
    const [search,setSearch] = useState("");
    const [contacts,setContacts] = useState([]);

    
    const RetrieveContacts = async(ser) => {
        
        if(ser){
        const data = await AxiosRequest.post(`/accounts/profile/${user_id}`,ser)
                    .then((res) => {
                        setContacts(res.data)
                    })
                    .catch((err) => {console.log(err)})
                  }
        else{
            const data = await AxiosRequest.get(`/accounts/profile/${user_id}`)
            .then((res) => {
                setContacts(res.data.cm)
            })
            .catch((err) => {console.log(err)})
          }
        }
      
    

    const RenderContacts = contacts.map((each) => {
      
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
    <div className='container mt-4 ml-4' text>
        {/* <div className='flex justify-center'>
        <input className="form-control w-25" onChange={(e) => setSearch(e.target.value)} type="search" placeholder="Search" aria-label="Search"/>
        </div> */}
        
        <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1'>
           {RenderContacts}
        </div>

    </div>


  )
    }

export default Contact