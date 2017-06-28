import React from 'react'

export default function BooksList (props) {


  function handleClick(e, id){
    e.preventDefault()
    let bookId = parseInt(e.target.id, 10)
    props.addUserBook( {book_id: bookId, user_id: 3} )

  }


  return (
    <div>
      <h1>booklist</h1>
      <div id="booklist">
        {props.books.map( book => <div key={book.id}>{book.title} <button id={book.id} onClick={handleClick}/> </div> )}
      </div>
    </div>
  )
}
