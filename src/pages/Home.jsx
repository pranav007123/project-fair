import React, { useEffect, useState } from 'react'
import projectpic from '../assets/projectpic.jpg'
import ProjectCard from '../components/ProjectCard'
import TestimonialCard from '../components/TestimonialCard'
import { Link, useNavigate } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getHomeProjectAPI } from '../services/allAPI'


function Home() {
    const [homeProjects ,setHomeProjects] = useState([])
    console.log(homeProjects);
    const navigate = useNavigate()
 const [loginStatus , setLoginStatus] = useState(false)

    useEffect(()=>{
        getHomeProjects()
        if(sessionStorage.getItem("token")){
            setLoginStatus(true)
        }else{
            setLoginStatus(false)
        }

    },[])

    const handleProjects =()=>{
        if(loginStatus){
navigate('/project')
        }else{
            toast.warning("plz login to get full access to our projects")
        }
    }

   
     const getHomeProjects = async()=>{
        try{
            const result =await getHomeProjectAPI();

        if(result.status==200){
            setHomeProjects(result.data)
        }
    
}catch(err){
    console.log(err);
}
}


  return (
    <>
    <div className="w-100">
        <div className="row align-items-center"  style={{backgroundColor:'greenyellow'}}>
            <div className="col-lg-6 p-5">
                <h1> Project Fair</h1>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum laborum neque dolore voluptatibus facere est. Nisi vero voluptatum minima totam perspiciatis laborum eos, maxime necessitatibus officia rerum cupiditate officiis eligendi.</p>
             { loginStatus ?
             <Link to={'/dashboard'}> <button className='btn btn-warning'>Manage Your Projects</button></Link>
             :
             
             <Link to={'/login'}> <button className='btn btn-warning'>get Start</button></Link>}

            </div>
            <div className="col-lg-6 p-5" >
                <img src={projectpic} height={'50%'} width={'50%'} alt="" />
            </div>
        </div>
    </div>
    <div className="div1 mt-5 mb-5 text-center">
        <h3>Explore Projects</h3>
        <marquee>
<div className="d-flex mt-2 mb-2">
    {homeProjects?.length>0 &&
    homeProjects?.map(project=>(
<div key={project}className='me-5'><ProjectCard displayData={project}/></div>
    ))}
</div>
        </marquee>

<button className='btn btn-link'onClick={handleProjects}>click here to see more projects...</button>
    </div>
    <div className="div2 mb-5 text-center">
        <h3>Our Testimonial</h3>
        <marquee>
<TestimonialCard/>
        </marquee>
    </div>
    <ToastContainer position='top-center' theme='coloured'style={{color:"black"}}  autoClose={3000}/>
    </>
  )
}

export default Home