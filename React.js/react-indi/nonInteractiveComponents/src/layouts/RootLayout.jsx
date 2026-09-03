import React from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div>
      <div className="container">
        {/* header section */}
        <div className="row">
            <div className="col-md-2">
                React bootstrap component
            </div>
        </div>
        <div className="row">
            {/* sidebar */}
            <div className="col-md-3">
                <ul className='sidebar-menu'>
                    <li><i className="bi bi-arrow-right"></i><Link to="/">Dashboard</Link></li>
                    <li><i className="bi bi-arrow-right"></i><NavLink to="/exercies">Exercies</NavLink></li>
                    <li><i className="bi bi-arrow-right"></i><NavLink to="/classWork">ClassWork</NavLink></li>
                    <li><i className="bi bi-arrow-right"></i><NavLink to="/ecomApp">EcomApp</NavLink></li>
                </ul>
            </div>
            <div className="col-md-9">
                Body
                <Outlet/>
            </div>
        </div>
      </div>
    </div>
  )
}

export default RootLayout



