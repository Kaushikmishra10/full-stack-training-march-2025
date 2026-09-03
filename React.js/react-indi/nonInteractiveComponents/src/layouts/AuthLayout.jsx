import React from 'react'
import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div>
      <section className='bg-light p-3 p-md-4 p-xl-5'>
        <Container >
            <Outlet/>
        </Container>
        
      </section>
    </div>
  )
}

export default AuthLayout