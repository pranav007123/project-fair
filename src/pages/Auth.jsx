import React, { useContext, useState } from 'react'
import { Link, useAsyncError, useNavigate } from 'react-router-dom'
import loginpic from '../assets/login.jpg'
import { Form } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginAPI, registerAPI } from '../services/allAPI';
import { tokenAuthContext } from '../contexts/TokenAuth';

function Auth({insideregister}) {
  const {isAuthorised,setIsAuthorised} = useContext(tokenAuthContext)
const navigate = useNavigate()
  const [userInputs,setUserInputs] = useState({username:"",email:"",password:""})
  console.log(userInputs);

  const handleregister= async(e)=>{
    e.preventDefault()

    if(userInputs.username && userInputs.email && userInputs.password ){
      try{
        const result = await registerAPI
        (userInputs)
        console.log(result);
        if(result.status==200){
          toast.success(`welcome ${result.data.username}...please login`)
          setUserInputs({username:"",email:"",password:""})
          setTimeout(()=>{
            navigate('/login')
          },2000);
        }else{
          toast.error(result.response.data)
          setTimeout(()=>{
            setUserInputs({username:"",email:"",password:""})

          },2000)
        }
      }catch(err){
        console.log(err);
      }
     
    }else{
      toast.warning("plz fill form completly")
    }
  }

  const handlelogin = async (e) =>{
    e.preventDefault()
    if(userInputs.email && userInputs.password){
      try{
        const result = await loginAPI(userInputs)

        if(result.status==200){
          sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
          sessionStorage.setItem("token",result.data.token)
          setIsAuthorised(true)
          toast.success(`welcome ${result.data.existingUser.username}...`)
          setUserInputs({username:"",email:"",password:""})
          setTimeout(()=>{
            navigate('/')
          },2000);
        }else{
          toast.error(result.response.data)
          
        }
      }
      catch(err){
console.log(err);
      }
    }else{
      toast.warning("Plz fill form completly")
    }
  }
  return (
    <div style={{width:'100%', height:'100vh'}} className='d-flex justify content-center align-items-center'>
      <div className="container w-75">
        <Link to={'/'} style={{textDecoration:'none'}}>Back to Home <i className='fa-solid fa-home'></i></Link>
        <div className="card shadow">
          <div className="row">
            <div className="col-lg-6">
              <img src={loginpic} alt="" />
            </div>
            <div className="col-lg-6 mt-3">
            <Form className='mt-5'>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control value={userInputs.email} onChange={e=>setUserInputs({...userInputs,email:e.target.value})} type="email" placeholder="name@example.com" required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control value={userInputs.password} onChange={e=>setUserInputs({...userInputs,password:e.target.value})} type="password" placeholder="password" />
      </Form.Group>
      {insideregister &&
       <Form.Group className="mb-3" controlId="Username">
       <Form.Label>UserName</Form.Label>
       <Form.Control value={userInputs.username} onChange={e=>setUserInputs({...userInputs,username:e.target.value})} type="text" placeholder="User Name" />
     </Form.Group>

      }
      
    </Form>
    <div className="div1">
      {
        insideregister? <div>
          <p>Already have an account please log in link <Link to={'/login'}>Login</Link></p>
          <button className='btn btn-primary rounded' onClick={handleregister} >
            register
          </button>
         </div>
        :
       <div>
        <p>New User please sign up <Link to={'/register'}>Register</Link></p>
        <button className='btn btn-primary' onClick={handlelogin} >login</button>
        </div>
      }
    </div>

            </div>
          </div>
        </div>
      </div>
      <ToastContainer position='top-center' theme='coloured'style={{color:"black"}}  autoClose={3000}/>
    
    </div>
 
  )
}

export default Auth