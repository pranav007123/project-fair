import React, { useState } from 'react'
import { Button, Card, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { ServerUrl } from '../services/serverUrl';


function ProjectCard({displayData}) {
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
     <Card onClick={handleShow} style={{ width: '18rem' }}>
      <Card.Img variant="top" height={'200px'} src={`${ServerUrl}/UPLOADS/${displayData?.projectImage}`} />
      <Card.Body>
        <Card.Title className='text-center' >{displayData?.title}</Card.Title>
      </Card.Body>
    </Card>


    
    <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row p-1 ">
            <div className="col-lg-6">
              <img height={'200px'} src={`${ServerUrl}/UPLOADS/${displayData?.projectImage}`} alt="" />
            </div>
            <div className="col-lg-6 text-center">
              <h3>{displayData?.title}</h3>
              <h5>Languages:-{displayData?.language}</h5>
              <p>Description:-{displayData?.ovrview}
              </p>
              
            </div>
          </div>
          <div className="d-flex m-1">
           <a href={displayData?.github} target='_blank' className='btn btn-success me-1 ' onClick={handleClose}> <i className='fa-brands fa-github'></i></a> 
           <a href={displayData?.website} target='_blank' className='btn btn-info' onClick={handleClose}> <i className='fa-solid fa-link'></i></a>

          </div>
        </Modal.Body>
      
      </Modal>
    </>
  )
}

export default ProjectCard