import React from 'react'
import Book from './Book'

export default function BooksList (props) {

  return (
    <div id="myBookList" className="col-md-6">
      <div className="row-eq-height">
        {props.books.map( book => <Book book={book} key={book.id} addUserBook={props.addUserBook} setBook={props.setBook} />  )}
      </div>
    </div>
  )
}
