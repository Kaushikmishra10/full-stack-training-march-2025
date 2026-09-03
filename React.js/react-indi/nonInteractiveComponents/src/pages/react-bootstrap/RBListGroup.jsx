import React from 'react'
import { Card, ListGroup } from 'react-bootstrap'
import { Facebook, Instagram, Linkedin, TwitterX, Youtube } from 'react-bootstrap-icons'

const RBListGroup = () => {
  return (
    <div>
      <h1>Exercise of List Group</h1>
      <br />
      <Card style={{ width: '23rem' }}>
            <Card.Title className='ms-3 mt-3'>
                <h3>Social Media Traffic</h3>
            </Card.Title>
            <Card.Body>
                <ListGroup variant="flush">
                    <ListGroup.Item> <div className="d-flex justify-content-between">
                        <span><Facebook className='text-primary'/> Facebook</span> <span>20%</span></div> </ListGroup.Item>
                    <ListGroup.Item> <div className="d-flex justify-content-between">
                        <span><Instagram className='text-primary'/> Instagram</span> <span>20%</span></div> </ListGroup.Item>
                    <ListGroup.Item> <div className="d-flex justify-content-between">
                        <span><Youtube className='text-primary'/> Youtube</span> <span>20%</span></div> </ListGroup.Item>
                    <ListGroup.Item> <div className="d-flex justify-content-between">
                        <span><TwitterX className='text-primary'/> TwitterX</span> <span>20%</span></div> </ListGroup.Item>
                    <ListGroup.Item> <div className="d-flex justify-content-between">
                        <span><Linkedin className='text-primary'/> Linkedin</span> <span>20%</span></div> </ListGroup.Item>
                </ListGroup>
            </Card.Body>

        </Card>
    </div>
  )
}

export default RBListGroup