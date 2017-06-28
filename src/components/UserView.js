import React, { Component } from 'react'

export default function UserView (props) {
  return(
    <div>
      <h3>My Books</h3>
      <div id="myBookList">
        {props.userBooks.map( book =>
          <div class="book-box" key={book.id}>
          <ul>
            <li>{book.title}</li>
          </ul></div>)}
      </div>
    </div>
  )
}
