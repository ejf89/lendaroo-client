import React, { Component } from 'react'
import UserView from './UserView'
import BooksContainer from './BooksContainer'


export default function UserContainer (props) {

  return(
    <div>
      < UserView userBooks={props.userBooks} />
    </div>
  )

}
