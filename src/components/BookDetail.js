import React from 'react'

export default function BookDetail (props) {
  if (props.book){
    const { title, image_url, id, description } = props.book
    return(
      <div className="bookDetailView">
        <img src={image_url} alt={id}/>
        <p>{title}</p>
        <p>{description}</p>
      </div>
    )
  } else {
    return null
  }
}
