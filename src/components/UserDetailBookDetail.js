import React from 'react'
import CrudButtons from './CrudButtons'


export default function UserDetailBookDetail (props) {
  if (props.book.id !== undefined){

    const { title, image_url, id, description } = props.book
    return(

        <div id={id} className="UserBookDetailView">
          <img src={image_url} alt={id} className="bookDetailCover animated jello"/>
          <h3>{title}</h3>
          <p id="description">{description}</p>

            
        </div>


    )
  } else {
    return (null)
  }
}
