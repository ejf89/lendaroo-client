import React from 'react'
import BookDetail from './BookDetail'

export default function Book (props) {
  const { id, image_url, title } = props.book

  return(
    <div key={id} className="book col-sm-3">
      <img className="bookCover" id={id} src={image_url} alt={title} onClick={props.setBook}/>
    </div>
  )
}
