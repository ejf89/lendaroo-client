import React from 'react'

export default function UserView (props) {
  return(
    <div>
      <h3>My Books</h3>
      <div id="myBookList">
        {props.userBooks.map( book => <div className="book-box" key={book.id}>

            <li>{book.title}</li>
          </div>)}
      </div>
    </div>
  )
}
