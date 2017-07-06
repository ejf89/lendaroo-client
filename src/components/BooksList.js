import React from 'react'
import Book from './Book'

export default function BooksList (props) {

  return (
    <div>
      <h1>booklist</h1>
      <div className="row-eq-height">
        {props.books.map( book => <Book book={book} addUserBook={props.addUserBook} setBook={props.setBook} />  )}
      </div>
    </div>
  )
}
