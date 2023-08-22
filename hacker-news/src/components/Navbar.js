import React from 'react'
import '../styles/Styles.css'

const Navbar = () => {
  return (
    <nav className='nav'>
        <div >
        <h2 className='logo'>HN</h2>  
        <ul className='nav-links'>
          <li><a href='#'> Home</a></li>
        <li> <a href='mailto:someone@example.com'>Contact Us</a></li>
      </ul>
      </div>
       </nav>
  )
}

export default Navbar
