import React from 'react'
import CrudButtons from './CrudButtons'


export default function BookDetail (props) {
  if (props.book.id !== undefined){
    const { title, image_url, id, description } = props.book

    return(

        <div id={id} className="bookDetailView">
          <img src={image_url} alt={id}/>
          <p>{title}</p>
          <p>{description}</p>

            < CrudButtons book = {
              props.book
            }
            inCollection = {
              props.inCollection
            }
            deleteUserBook = {
              props.deleteUserBook
            }
            addUserBook = {
              props.addUserBook
            }
            usersWithSelectedBook = {
              props.usersWithSelectedBook
            }
            createLoan = {
              props.createLoan
            }
            />
        </div>


    )
  } else {
    return (null)
  }
}
