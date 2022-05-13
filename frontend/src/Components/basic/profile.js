
import React,{useState,useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router';
import AxiosRequest from '../../axios';
import { DecodeToken } from '../token_decode';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router';
import ProfileFollowers from './profile/Followers';
import ProfileFollowing from './profile/Following';
import Contact from './profile/Contact';
import ProfileButtons from './profile/ProfileButtons';
import ProfileData from './profile/ProfileData';



const Profile = () => {
  const navigation = useNavigate()
  const location = useLocation();
  let key =window.location.pathname.slice(17,)
  const {user_id} = DecodeToken(localStorage.getItem("access_token"))
  const [followData,setFollowData] = useState({following:[],followers:[]})

  const [profile,setProfile] = useState({about:"",id:"",adress:"",birthdate:"",followers:"",following:"",hobby:"",name:"",location:"",status:"",user:"",work:"",image:"",email:"",website:"",phone:""});

  const HandleUserNavigation = (idd) => {
      console.log(idd);
      navigation(`/shareme/profile/${idd}`);
      retrieveProfileDetails(idd);
  }


  const retrieveProfileDetails = async(idd) => {
    if(idd){
      key =idd
    }
    const details =await AxiosRequest.get(`/accounts/profile/${key}`)
                    .then((res) => {
                    
                      const {phone,image,about,id,adress,birthdate,followers,following,hobby,name,location,status,user,work,email,website} = res.data.ser_data
                      setProfile({phone:phone,email:email,website:website,about:about,id:id,adress:adress,birthdate:birthdate,followers:followers,following:following,hobby:hobby,name:name,location:location,status:status,user:user,work:work,image:image});
                      setFollowData({following:res.data.fg,followers:res.data.fr})
                      
                    })
                    .catch(err => console.log(err))
  }

  useEffect(() => {
    retrieveProfileDetails()
  },[])


  const handleFollowers = () => {
    const followers = AxiosRequest.put(`/accounts/profile/${key}`,{user_id:user_id,fol_id:key})
                      .then((res) => {console.log(res);retrieveProfileDetails()})
                      .catch((err) => {console.log(err)})
  }

  
  const RenderFollowers = followData.followers.map((each) => {
    const k = each[1]
    return(
      <div key={each[1]}>
      <p className='lead' onClick={() => {HandleUserNavigation(k)}}> name: {each[0]}, id: {each[1]}  </p>
      </div>
    );
  })
  

  const RenderFollowing = followData.following.map((each) => {
    const k = each[1]
    return(
      <div key={each[1]}>
      <p className='lead' onClick={() => {HandleUserNavigation(k)}}> name: {each[0]}, id: {each[1]}  </p>
        
      </div>
    );
  })


  const text_id = user_id+"-"+profile.user;
  
  const passProfileData = {"profile":profile,"accounts":followData}
  return (
    <div className='container row mt-5 ml-5 mb-5'>
      <Contact props={profile}/>
    
    <div className='col-md-7' style={{textAlign:"left"}}>
      <ProfileData props={passProfileData}/>
      <ProfileButtons props={profile.user} fol={handleFollowers}/>
    </div>
    <div className='mt-4 ml-4 col-md-2'></div>
    </div>
  )
}

export default Profile;

