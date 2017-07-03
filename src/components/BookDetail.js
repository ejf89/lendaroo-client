import React from 'react'

export default function BookDetail (props) {

  if (props.book.title !== undefined){
    const { title, image_url, id, description } = props.book
    return(
      <div id={id} className="bookDetailView">
        <img src={image_url} alt={id}/>
        <p>{title}</p>
        <p>{description}</p>
        <button className="btn btn-primary" onClick={props.deleteUserBook}>Delete from ur collecton</button>
      </div>

    )
  } else {
    return null
  }
}
