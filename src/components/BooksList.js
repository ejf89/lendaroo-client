import React from 'react'
import Book from './Book'

export default function BooksList (props) {


  function handleClick(e, id){
    e.preventDefault()
    let bookId = parseInt(e.target.id, 10)
    props.addUserBook( {book_id: bookId, user_id: 3} )

  }

  return (

    <div>
      <h1>booklist</h1>
      <div id="booklist" className="row">
        {props.books.map( book => <Book book={book} addUserBook={props.addUserBook} />  )}
      </div>
    </div>
  )
}
