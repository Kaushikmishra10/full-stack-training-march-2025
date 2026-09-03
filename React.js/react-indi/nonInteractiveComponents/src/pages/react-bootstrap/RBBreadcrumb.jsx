import React from 'react'
import { Breadcrumb } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { ChevronRight} from "react-bootstrap-icons";

const RBBreadcrumb = () => {
  return (
    <div>
      <h1> Exercise of Breadcrumb</h1>
      <br />
      
      <Breadcrumb as="ul" className='rb-breadcrumb'>

      <Breadcrumb.Item linkAs="span" bsPrefix=' ' className='me-2 rb-link' as="li">
      <NavLink to="/">Home <span className="ms-2"> <ChevronRight size={10}/></span></NavLink>
      </Breadcrumb.Item>

      <Breadcrumb.Item linkAs="span" bsPrefix=' ' className='me-2 rb-link' as="li">
      <NavLink to="/rb-badges">Library <span className="ms-2"> <ChevronRight size={10}/></span></NavLink>
      </Breadcrumb.Item>
      <Breadcrumb.Item active >Data</Breadcrumb.Item>

    </Breadcrumb>
    </div>
  )
}

export default RBBreadcrumb