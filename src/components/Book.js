import React from 'react'


export default function Book (props) {
  const { id, image_url, title } = props.book

  return(
    <div key={id} className="book col-md-1">
      <img className="bookCover" id={id} src={image_url} alt={title} onClick={props.setBook}/>
    </div>
  )
}
