import React from 'react'

export default function Book (props) {
  const { id, image_url, title } = props.book
  return(
    <div key={id} className="book col-sm-3">
      <img className="bookCover" src={image_url} alt={title} />
    </div>
  )
}
