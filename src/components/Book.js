import React from 'react'

export default function Book (props) {
  const { id, image_url, title } = props.book
  return(
    <div className="localBook" key={id} >
      <img src={image_url} alt={title} />
    </div>
  )
}
