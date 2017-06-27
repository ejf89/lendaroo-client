import React, { Component } from 'react'

export default function BooksList (props) {
  return (
    <div>
      <h1>booklist</h1>
      <div id="booklist">
        {props.books.map( book => <div key={book.id}>{book.title}</div> )}
      </div>
    </div>
  )
}
