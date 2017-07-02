import React from 'react';
import { Link  } from 'react-router-dom'

const BookNav = (props) => (
  <div>
    <nav className="navbar">
          <ul className="nav">
              <li><Link  className="nav-link" to={`${props.username}`}>All My Books</Link></li>
              <li><Link  className="nav-link" to="/browse">Unread Books</Link></li>
              <li><Link className="nav-link" to="/search">Availabe Books!</Link></li>

          </ul>
    </nav>
  </div>
)

export default BookNav;
