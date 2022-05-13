import React from 'react'

const Contact = ({props}) => {
  const profile = props
  return (
    <div className='col-md-4 mb-5' >
      <img  class="img-fluid" style={{width:"200px",height:"200px"}} src={`http://localhost:8000${profile.image}`}></img>

      <p style={{fontSize:"20px"}} className="mt-3">Adress:</p>
      <p className='mt-1 lead' style={{color:"maroon"}}>{profile.adress}</p>

      <p style={{fontSize:"20px"}} className="mt-3">Email:</p>
      <p className="mt-1 lead" style={{color:"maroon"}}>{profile.email}</p>

      <p style={{fontSize:"20px"}} className="mt-3">Website:</p>
      <p className="mt-1 lead" style={{color:"maroon"}}>{profile.website}</p>

      <p style={{fontSize:"20px"}} className="mt-3">Phone:</p>
      <p className="mt-1 lead" style={{color:"maroon"}}>{profile.phone}</p>
      </div>
  )
}

export default Contact
