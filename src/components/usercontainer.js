import React from 'react'
import UserView from './UserView'


export default function UserContainer (props) {

  // function componentWillReceiveProps(){
  //
  // }

  return(
    <div>
      < UserView userBooks={props.userBooks} />
    </div>
  )

}
