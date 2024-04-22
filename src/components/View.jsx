import React, { useContext, useEffect, useState } from 'react'
import Edit from './Edit'
import Add from './Add'
import { getUserProjectAPI, removeProjectAPI } from '../services/allAPI'
import { addResponseContext, editResponseContext } from '../contexts/ContextAPI'


function View() {
  const {editResponse,setEditResponse} = useContext(editResponseContext)
  const { addResponse , setAddResponse} = useContext(addResponseContext)
  const [userProjects ,setUserProjects] = useState([])

  console.log(userProjects);
  const getUserProjects = async()=>{
    const token = sessionStorage.getItem("token")
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    try{
const result = await getUserProjectAPI(reqHeader)
console.log(result);
if(result.status==200){
  setUserProjects(result.data)
}
    } catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
    getUserProjects()
  },[addResponse,editResponse])

  const handleDeleteProject = async(projectId)=>{
    const token = sessionStorage.getItem("token")
    if(token){
      const reqHeader = {
        "Content-Type": "application/json",

        "Authorization": `Bearer ${token}`
      }
        // api call
        const result = await removeProjectAPI(projectId,reqHeader)
        if(result.status==200){
          getUserProjects()
        }else{
console.log(result);
        }
      }
    
  }
  return (
    <>
    <div className="d-flex justify-content-between w-100">
      <h4>All Projects</h4>
      <div className='btn'><Add/> </div>
    </div>
    <div className="mt-4">
      {
      userProjects?.length>0?
      userProjects?.map(project=>(
        <div className="d-flex justify-content-between border p-2 rounded ">
        <h3>{project?.title}</h3>
        <div className="icons d-flex">
         <div> <Edit project={project} /></div>
          <div className="btn"><a href={project?.github}><i className='fa-brands fa-github'></i></a></div>
        <button className='btn'onClick={()=>handleDeleteProject(project?._id)}><i className='fa-solid fa-trash texxt-danger'></i></button>
        </div>
       
      </div>
      ))
      :
      <div className="fw-bolder">no projects uploaded yet</div>
    }
    </div>
    </>
  )
}

export default View