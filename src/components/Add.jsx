import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import uploadimage from '../assets/uploadimage.png'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectAPI } from '../services/allAPI';
import { addResponseContext } from '../contexts/ContextAPI';

function Add() {
  const { addResponse , setAddResponse} = useContext(addResponseContext)
  const [preview, setPreview] = useState("")
  const [imageFileStatus, setImageFileStatus] = useState(false)

  const [projectDetails, setProjectDetails] = useState({
    title: "", language: "", ovrview: "", github: "", website: "", projectImage: ""
  })

  console.log(projectDetails);

  useEffect(() => {
    if  (projectDetails.projectImage.type === "image/png" || projectDetails.projectImage.type === "image/jpg" || projectDetails.projectImage.type === "image/jpeg") {
      setImageFileStatus(true);
      setPreview(URL.createObjectURL(projectDetails.projectImage));
    } else {
      setPreview(uploadimage);
      setImageFileStatus(false);
    }
  }, [projectDetails.projectImage]);



  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setProjectDetails({ title: "", language: "", ovrview: "", github: "", website: "", projectImage: "" })
  }
  const handleShow = () => setShow(true);

  const handleUploadProject = async () => {
    const { title, language, ovrview, github, website, projectImage } = projectDetails
    if (!title || !language || !ovrview || !github || !website || !projectImage) {
      toast.warning("please fill the form completly")
    } else {
      const reqBody = new FormData()
      reqBody.append("title", title)
      reqBody.append("language", language)
      reqBody.append("ovrview", ovrview)
      reqBody.append("github", github)
      reqBody.append("website", website)
      reqBody.append("projectImage", projectImage)

      const token = sessionStorage.getItem("token")
      // console.log(token);
      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",

          "Authorization": `Bearer ${token}`

        }
        try {
          const result = await addProjectAPI(reqBody, reqHeader)
          console.log(result);
          if (result.status == 200) {
          setAddResponse(result)
            handleClose()
          } else {
            toast.warning(result.response.data)
          }
        } catch (err) {
          console.log(err);
          toast.error('error')
        }
      }
    }
  }
  return (
    <>
      <button className='btn btn-success' onClick={handleShow}><i className='fa-solid fa-plus'></i>Add New</button>



      <Modal
        size='lg'
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-lg-4">
              <label>
                <input type="file" style={{ display: 'none' }} onChange={e => setProjectDetails({ ...projectDetails, projectImage: e.target.files[0] })} />
                <img src={preview} width={'100%'} className='image-fluid' alt="" />
              </label>
              {!imageFileStatus && <div className="text-danger text-center">upload only following type files (png,jpg,jpeg)only!!</div>}
            </div>
            <div className="col-lg-8">
              <div>
                <input type="text" className='form-control mb-3' placeholder='Project Title' value={projectDetails.title} onChange={(e) => setProjectDetails({ ...projectDetails, title: e.target.value })} />
              </div>
              <div>  <input type="text" className='form-control' placeholder='Languages used in this Project' value={projectDetails.language} onChange={(e) => setProjectDetails({ ...projectDetails, language: e.target.value })} />
              </div>
              <div>
                <input type="text" className='form-control mt-3' placeholder='Project Git-HUb link' value={projectDetails.github} onChange={(e) => setProjectDetails({ ...projectDetails, github: e.target.value })} />

              </div>
              <div>
                <input type="text" className='form-control mt-3 ' placeholder='Project website link' value={projectDetails.website} onChange={(e) => setProjectDetails({ ...projectDetails, website: e.target.value })} />
              </div>
              <div>
                <input type="text" className='form-control mt-3 ' placeholder='Project Overview' value={projectDetails.ovrview} onChange={(e) => setProjectDetails({ ...projectDetails, ovrview: e.target.value })} />
              </div>



            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            CANCEL
          </Button>
          <Button variant="primary" onClick={handleUploadProject}>UPLOAD</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position='top-center' theme='coloured' style={{ color: "black" }} autoClose={3000} />
    </>
  )
}

export default Add