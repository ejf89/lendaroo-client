import React, { Component } from 'react'
import BooksList from './BooksList'

export default function BooksContainer (props) {
  return(
    <div>
      < BooksList books={props.books} />
    </div>
  )
}
