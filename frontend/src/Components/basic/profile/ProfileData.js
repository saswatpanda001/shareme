import React from 'react'
import ProfileFollowers from './Followers'
import ProfileFollowing from './Following'

const ProfileData = ({props}) => {
  console.log(props)
  const profile = props.profile
  const usersData = props.accounts
    return (
    <div>
        <div>
            <div className='d-flex' style={{alignItems:"center",gap:"20px"}}>
            
            <p className='lead' style={{fontSize:"30px"}}>{profile.name}</p>
            <div className='d-flex' style={{alignItems:"center"}}>
            <i className="large map signs icon"></i>
            <p style={{fontSize:"15px",color:"gray"}}>{profile.location}</p>
            </div>
            </div>
            </div>

            <div className='d-flex mt-2 mb-2' style={{gap:"20px"}} >
            <p style={{fontWeight:"40px",fontSize:"18px"}} data-bs-toggle="modal" data-bs-target="#profilefollowers">
                Followers: {profile.followers.length}</p>
            <ProfileFollowers props={usersData}/>

            <p style={{fontWeight:"40px",fontSize:"18px"}} data-bs-toggle="modal" data-bs-target="#profilefollowing">
                Following: {profile.following.length}</p>
            <ProfileFollowing props={usersData}/>
            </div>

            <p className='lead' style={{color:"maroon"}}>{profile.about}</p>
            <p className='lead'>{profile.work}</p>
    </div>
  )
}

export default ProfileData;
