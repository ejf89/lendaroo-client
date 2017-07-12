import React from 'react'
import { Button } from 'react-bootstrap'



export default function UserDetailBookDetail (props) {
  if (props.book.id !== undefined){

    const { title, image_url, id, description } = props.book
    return(

        <div id={props.selectedUser.id} className="UserBookDetailView">
          <img src={image_url} alt={id} className="bookDetailCover animated jello"/>
          <h3>{title}</h3>
          <p id="description">{description}</p>
          <Button className="btn btn-primary" id={props.selectedUser.id}  onClick={props.createLoan}> Ask {props.selectedUser.username} to borrow this book </Button>

        </div>


    )
  } else {
    return (null)
  }
}
