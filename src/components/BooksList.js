import React from 'react'
import Book from './Book'

export default function BooksList (props) {
  if (props.books.length === 0 ){
    return(
      <h1>...no books in this collection yet"</h1>
    )
  }

  return (
    <div  className="col-md-6 myBookList">
      <div className="row-eq-height">
        {props.books.map( book => <Book book={book} key={book.id} addUserBook={props.addUserBook} setBook={props.setBook} />  )}
      </div>
    </div>
  )
}
