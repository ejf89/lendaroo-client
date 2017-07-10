import React from 'react'
import Book from './Book'
import GoogleSearch from './GoogleSearch'

export default function BooksList (props) {
  if (props.books.length === 0 ){
    return(
      <h1>...no books in this collection yet"</h1>
    )
  }

  return (
    <div id="myBookList" className="col-md-6">
      <div className="row-eq-height">
        {props.books.map( book => <Book book={book} key={book.id} addUserBook={props.addUserBook} setBook={props.setBook} />  )}
      </div>
    </div>
  )
}
