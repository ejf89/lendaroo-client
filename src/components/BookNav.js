import React from 'react';
import {Link} from 'react-router-dom'



const BookNav = (props) => (
  <div className="BookNav">
    <nav id="bookNav" className="navbar col-md-12" >
      <ul className="nav">
        <li>
          <Link className="nav-link" to={`/${props.username}`} onClick={props.resetSelectedBook}>Dashboard</Link>
        </li>
        <li>
          <Link className="nav-link" to={`/${props.username}/books`} onClick={props.resetSelectedBook}>All My Books</Link>
        </li>
        <li>
          <Link className="nav-link" to={`/${props.username}/browse`} onClick={props.resetSelectedBook}>Available Books</Link>
        </li>
      </ul>
    </nav>
  </div>
)

export default BookNav;
