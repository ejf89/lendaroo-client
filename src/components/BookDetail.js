import React from 'react'
import CrudButtons from './CrudButtons'


export default function BookDetail (props) {
  if (props.book.id !== undefined){
    const { title, image_url, id, description } = props.book
    return(

        <div id={id} className="bookDetailView">
          <img src={image_url} alt={id} className="bookDetailCover animated jello"/>
          <h3>{title}</h3>
          <p id="description">{description}</p>

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
            loans = {
              props.loans
            }
            />
        </div>


    )
  } else {
    return (null)
  }
}
