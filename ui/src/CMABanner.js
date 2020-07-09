import React from 'react';
import logo from './cma-logo.svg';
import Navbar from 'react-bootstrap/Navbar'
import './CMABanner.css'



function CMABanner (props) {
  return(
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#home">
          <img
              src={logo}
              width="60"
              height="60"
              className="d-inline-block align-top"
              alt="CMA logo"
          />
          <span className='CMABanner-banner-header'>{'Cleveland Museum of Art Collection'}</span>
        </Navbar.Brand>

      </Navbar>
  )
}

export default CMABanner
