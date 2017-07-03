import React from 'react'
import UserView from './UserView'


export default function UserContainer (props) {

  return(
    <div>
      < UserView user={props.user} userBooks={props.userBooks} detailBook={props.detailBook} setBook={props.setBook} /> </div>
  )

}
