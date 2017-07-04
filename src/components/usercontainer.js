import React from 'react'
import UserView from './UserView'


export default function UserContainer (props) {

  return(
    <div>
      < UserView user={props.user} userBooks={props.userBooks} allBooks={props.allBooks} detailBook={props.detailBook} setBook={props.setBook} deleteUserBook={props.deleteUserBook} addUserBook={props.addUserBook} inCollection={props.inCollection} usersWithSelectedBook={props.usersWithSelectedBook}/> </div>
  )

}
