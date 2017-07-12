import React from 'react'
import Book from './Book'
import {  withRouter } from 'react-router-dom'


function BooksList (props) {

  if (props.books.length === 0 ){
    return(
      <h1>...no books in this collection yet</h1>
    )
  }


  if (!props.history.location.pathname.includes("users")){
    return (
      <div  className="col-md-6 myBookList">
        <div className="row-eq-height">
          {props.books.map( book => <Book book={book} key={book.id} addUserBook={props.addUserBook} setBook={props.setBook} />  )}
        </div>
      </div>
    )
  } else {
    return (
      <div  className="userBookList">
        <div className="">
          {props.books.map( book => <Book book={book} key={book.id} addUserBook={props.addUserBook} setBook={props.setBook} />  )}
        </div>
      </div>
    )

  }
}

export default withRouter(BooksList)
