import React from 'react';
import { Link  } from 'react-router-dom'

const NavBar = (props) => (
  <div>
    <nav className="navbar sticky-top">
          <ul className="nav">
              <li><Link  className="nav-link" to={`${props.username}`}>Home</Link></li>
              <li><Link  className="nav-link" to="/browse">Browse</Link></li>
              <li><Link className="nav-link" to="/search">Search</Link></li>

          </ul>
    </nav>
  </div>
)

export default NavBar;
