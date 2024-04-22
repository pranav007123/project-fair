import React, { useContext } from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { tokenAuthContext } from '../contexts/TokenAuth'

function Header({insideDashboard}) {
  const{isAuthorised,setIsAuthorised} = useContext(tokenAuthContext)
  const navigate = useNavigate()
  const logout = ()=>{
    sessionStorage.clear()
    setIsAuthorised(false)
    navigate('/')
  }
  return (
    <>
     <Navbar className="shadow">
    <Container>
      <Navbar.Brand>
     <Link to={'/'} style={{textDecoration:'none'}} > <i></i> <h2> Project Fair</h2></Link>
        </Navbar.Brand>
       { insideDashboard &&
       <div className="ms-auto">

        <button className='btn'onClick={logout}>logout</button>
        </div>}
    </Container>
  </Navbar>
  </>
  )
}

export default Header