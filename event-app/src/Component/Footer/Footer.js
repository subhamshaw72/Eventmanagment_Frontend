import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div>
       <footer className="py-3 my-4">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
          <li className="nav-item"><Link to="/" className="nav-link px-2 text-body-white">Home</Link></li>
          <li className="nav-item"><Link to="About" className="nav-link px-2 text-body-white">About</Link></li>
          <li className="nav-item"><Link to="Service" className="nav-link px-2 text-body-white">Service</Link></li>
          <li className="nav-item"><Link to="Contact" className="nav-link px-2 text-body-white">Contact</Link></li>
          {/* <li className="nav-item"><Link to="#" className="nav-link px-2 text-body-white">About</Link></li> */}
        </ul>
        <p className="text-center text-body-White">The company of Event, 2024 Company, Inc</p>
      </footer>
    </div>
  )
}

export default Footer
