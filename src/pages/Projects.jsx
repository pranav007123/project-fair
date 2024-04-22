import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import ProjectCard from '../components/ProjectCard'
import { getAllProjectAPI } from '../services/allAPI'

function Projects() {
  const  [searchKey , setSearchKey] = useState("")
  const [allProjects , setAllProjects] = useState([])
  console.log(allProjects);
  const getAllProjects = async()=>{
    const token = sessionStorage.getItem("token")
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    try{
const result = await getAllProjectAPI(searchKey,reqHeader)
console.log(result);
if(result.status==200){
  setAllProjects(result.data)
}
    } catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
    getAllProjects()
  },[searchKey])
  return (
    <>
    <Header/>
    <div className="container-fluid mt-5 m">
      <div className="d-flex justify-content-evenly">
        <h2>All Projects</h2>
      <div>  <input className='form-control' type="text" placeholder='search project by project name'onChange={e=>setSearchKey(e.target.value)} /></div>
      </div>
      <div className="row mt-4" >
      
          {
allProjects?.length>0 ?
allProjects?.map(project=>(
<div className="col-lg-4" sm={2} md={3} lg={4} key={project} >
<ProjectCard displayData={project}/>
</div>
))
:
<div className="fw-bolder">project not found</div>
          }
        </div>
       
      
    </div>
    </>
  )
}

export default Projects