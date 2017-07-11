import React from 'react'
import CrudButtons from './CrudButtons'

export default function UserDetail (props) {

  if (props.user){
    const {username, picture, email, bio} = props.user
    return(
      <div id="userDetailView">
        <img src={picture} alt={picture} id="userPic" />
        <h2>{username}</h2>
        <p>{email}</p>
        <p>{bio}</p>
      </div>
    )
  } else {
    return (<p>Click any user to see learn more</p>)
  }

}
