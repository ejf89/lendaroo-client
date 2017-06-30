import React from 'react'
import Book from './Book'

export default function UserView (props) {
  return(
    <div>
      <h3>My Books</h3>
      <div id="myBookList" className="row">
        {props.userBooks.map( book => <Book book={book} />  )}
      </div>
    </div>
  )
}
