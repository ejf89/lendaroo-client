import React from 'react';
import { Link  } from 'react-router-dom'

const NavBar = ({style, title}) => (
  <div>
    <nav className="navbar sticky-top">
          <ul className="nav">
              <li><Link  className="nav-link" to="/home">Home</Link></li>
              <li><Link  className="nav-link" to="/browse">Browse</Link></li>
              <li><Link className="nav-link" to="/search">Search</Link></li>

          </ul>
    </nav>
  </div>
)

export default NavBar;
