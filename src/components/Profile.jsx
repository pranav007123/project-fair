import React, { useEffect, useState } from 'react'
import { Collapse } from 'react-bootstrap';
import profileImg from '../assets/userimageupload.png'
import { ServerUrl } from '../services/serverUrl';
import { toast } from 'react-toastify';
import { updateuserAPI } from '../services/allAPI';

function Profile() {
  const [preview , setPreview] = useState("")
  const [existingImg , setExistingImg] = useState("")
  const [userDetails , setUserDetails] = useState({
    username:"",email:"",password:"",github:"",linkedin:"",profileImage:""
  })
  const [open, setOpen] = useState(false);

  useEffect(()=>{
    if(sessionStorage.getItem("existingUser")){
      const existingUserDetails=JSON.parse(sessionStorage.getItem("existingUser"))
      setUserDetails({...userDetails,username:existingUserDetails.username,email:existingUserDetails.email,password:existingUserDetails.password,github:existingUserDetails.github,
        linkedin:existingUserDetails.linkedin})
      setExistingImg(existingUserDetails.profile)

    }
    

  },[open])

  useEffect(()=>{
if(userDetails.profileImage){
  setPreview(URL.createObjectURL(userDetails.profileImage))
}else{
  setPreview("")
}
  },[userDetails.profileImage])

  const handleUserProfile = async ()=>{
    const{username,email,password,github,linkedin,profileImage} = userDetails
    if(!github||!linkedin){
      toast.warning("please fill the form completely")
    }else{
      const reqBody = FormData()
      reqBody.append("username", username)
      reqBody.append("email", email)
      reqBody.append("password", password)
      reqBody.append("github", github)
      reqBody.append("linkedin", linkedin)
      preview?reqBody.append("profileImage", profileImage):reqBody.append("profileImage",existingImg)

      const token = sessionStorage.getItem("token")
    try{ 
       if(token){
        const reqHeader={
          "Content-Type": preview ? "multipart/form-data" : "application/json",

          "Authorization": `Bearer ${token}`
        }
        // apicall
        const result = await updateuserAPI(reqBody,reqHeader)
        if(result.status==200){
          setOpen(!open)
          sessionStorage.setItem("existingUser",JSON.stringify(result.data))
        }else{
          console.log(result);
        }
      }
      }catch (err){
console.log(err);
      }
    }
  }

  return (
    <>
    <div className="d-flex justify-content-center">
      <h3 className='text-warning fw-bolder'>User Profile</h3>
<button  onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open} className="btn fw-bolder text-warning"  ><i class="fa-solid fa-angle-down"></i></button>
    </div>











    <Collapse in={open}>
        <div className='row justify-content-center shadow' id="example-collapse-text">
         <label className='text-center'>
         
          <input type="file" onChange={e=>setUserDetails({...userDetails,profileImage:e.target.files[0]})} style={{display:'none'}}  />
         
         {
          existingImg == "" ?
         <img  width={'200px'} height={'200px'} className='rounded-circle' src={preview?preview:profileImg} alt="" />
: 
<img width={'200px'} height={'200px'} className='rounded-circle' src={preview?preview:`${ServerUrl}/uploads/${existingImg}`} alt="" /> 

          } 
        
         </label>
         <input value={userDetails.github} onChange={e=>setUserDetails({...userDetails,github:e.target.value})} className='form-control mb-2 mt-2 w-75' type="text" placeholder='git' />
          <input value={userDetails.linkedin} onChange={e=>setUserDetails({...userDetails,linkedin:e.target.value})} className='form-control mb-2 w-75' type="text" placeholder='linkedin' />
          
<button className='btn btn-warning w-50 mb-1 border rounded shadow'onClick={handleUserProfile}>update Profile</button>
        </div>
      </Collapse>
    </>
  )
}

export default Profile