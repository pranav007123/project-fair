import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import uploadimage from '../assets/uploadimage.png'
import { ServerUrl } from '../services/serverUrl';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editProjectAPI } from '../services/allAPI';
import { useCol } from 'react-bootstrap/esm/Col';
import { editResponseContext } from '../contexts/ContextAPI';

function Edit({ project }) {
  const { editResponse, setEditResponse } = useContext(editResponseContext)

  // console.log(project);

  const [projectData, setProjectData] = useState({
    id: project?._id, title: project?.title, language: project?.language, ovrview: project?.ovrview, github: project?.github, website: project?.website, projectImage: ""
  })
  const [preview, setPreview] = useState("")



  const [show, setShow] = useState(false);

  const handleClose = () => {

    setShow(false);
    setProjectData({
      id: project?._id, title: project?.title, language: project?.language, ovrview: project?.ovrview, github: project?.github, website: project?.website, projectImage: ""
    })
    setPreview("")
  }
  const handleShow = () => {
    setProjectData({
      id: project?._id, title: project?.title, language: project?.language, ovrview: project?.ovrview, github: project?.github, website: project?.website, projectImage: ""
    })
    setShow(true);}

  useEffect(() => {
    if (projectData.projectImage) {
      setPreview(URL.createObjectURL(projectData.projectImage))
    } else {
      setPreview("")
    }
  }, [projectData.projectImage])

  const handleUpdateProject = async () => {
    const { title, language, ovrview, github, website, projectImage } = projectData
    if (!title || !language || !ovrview || !github || !website) {
      toast.warning("plz fill form completly")
    } else {
      const reqBody = new FormData()
      reqBody.append("title", title)
      reqBody.append("language", language)
      reqBody.append("ovrview", ovrview)
      reqBody.append("github", github)
      reqBody.append("website", website)
      preview ? reqBody.append("projectImage", projectImage) : reqBody.append("projectImage", project.projectImage)

      const token = sessionStorage.getItem("token")
      if (token) {
        const reqHeader = {
          "Content-Type": preview ? "multipart/form-data" : "application/json",

          "Authorization": `Bearer ${token}`

        }
        // api call
        try {
          const result = await editProjectAPI(projectData.id, reqBody, reqHeader)
          console.log(result);
          if (result.status == 200) {
            handleClose()
            // pass response view
            setEditResponse(result)
          } else {
            console.log(result.response);
          }

        } catch (err) {
          console.log(err);
        }
      }
    }
  }
  return (
    <>

      <button className='btn btn-success' onClick={handleShow}><i className='fa-solid fa-edit'></i>Edit</button>



      <Modal
        size='lg'
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title> Edit Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-lg-4">
              <label>
                <input type="file" style={{ display: 'none' }} onChange={e => setProjectData({ ...projectData, projectImage: e.target.files[0] })} />
                <img src={`${ServerUrl}/uploads/${project?.projectImage}`} width={'100%'} className='image-fluid' alt="" />
              </label>
            </div>
            <div className="col-lg-8">
              <div>
                <input value={projectData.title} type="text" className='form-control mb-3' onChange={e => setProjectData({ ...projectData, title: e.target.value })} placeholder='Project Title' />
              </div>
              <div>  <input type="text" value={projectData.language} onChange={e => setProjectData({ ...projectData, language: e.target.value })} className='form-control' placeholder='Languages used in this Project' />
              </div>
              <div>
                <input type="text" value={projectData.github} onChange={e => setProjectData({ ...projectData, github: e.target.value })} className='form-control mt-3' placeholder='Project Git-HUb link' />

              </div>
              <div>
                <input type="text" value={projectData.website} onChange={e => setProjectData({ ...projectData, website: e.target.value })} className='form-control mt-3 ' placeholder='Project website link' />
              </div>
              <div>
                <input type="text" value={projectData.ovrview} onChange={e => setProjectData({ ...projectData, ovrview: e.target.value })} className='form-control mt-3 ' placeholder='Project Overview' />
              </div>



            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            CANCEL
          </Button>
          <Button variant="primary" onClick={handleUpdateProject} >Edit</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position='top-center' theme='coloured' style={{ color: "black" }} autoClose={3000} />
    </>
  )
}

export default Edit