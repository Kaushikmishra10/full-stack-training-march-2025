import React, { useState } from 'react'
import { Button, Container, Form, Nav, Navbar, NavDropdown, Offcanvas } from 'react-bootstrap'
import { Envelope, Globe, Phone } from 'react-bootstrap-icons';

const RBNavbarOffcanvas = () => {

  // For navebar hover
  const [toggle, setToggle] = useState(false)

  // For offsetcanvas
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <div>
      <h1>Exercise of Navbar Off Canvas</h1>
      <br />

      <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home" className='bg-black text-white px-2'>RB</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav1">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown"
              show={toggle === "basic-nav-dropdown"}
              onMouseEnter={ () => {setToggle("basic-nav-dropdown")}}
              onMouseLeave={ () => {setToggle(false)}}>
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
            {/* second dropdown */}
            <NavDropdown title="Servicies" id="basic-nav-dropdown2"
              show={toggle === "basic-nav-dropdown2"}
              onMouseOver={ () => {setToggle("basic-nav-dropdown2")}}
              onMouseOut={ () => {setToggle(false)}}>
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className='d-flex gap-2'>
            <Button variant='primary'>Login</Button>
            <Button variant='outline-primary'>Submit</Button>
            <Button variant='dark' onClick={handleShow}>Contact</Button>

          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    <Offcanvas show={show} onHide={handleClose} placement='end'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
          Contect Us
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <h4> We are here to help you!</h4>
          <hr />
          <h5>Indixpert</h5>
          <br />
          <span className='text-secondary fw-bold'><Globe/> Our Office: </span>
          <br />
          1: Hedrabad, Telegana, India
          <br />
          2: Gurgaon, Haryana, India
          <br />
          
          <br />
          <span className='text-secondary fw-bold'><Envelope/> Email: </span>
          <br />
          contect@indixpert.com
          <br />
          
          <br />
          <span className='text-secondary fw-bold'><Phone/> Phone: </span>
          <br />
          (+91-7788992897)
          <br />

        </Offcanvas.Body>
      </Offcanvas>
    </div>
  )
}

export default RBNavbarOffcanvas