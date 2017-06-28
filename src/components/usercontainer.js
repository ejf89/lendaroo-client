import React from 'react'
import UserView from './UserView'


export default function UserContainer (props) {

  return(
    <div>
      < UserView userBooks={props.userBooks} />
    </div>
  )

}
