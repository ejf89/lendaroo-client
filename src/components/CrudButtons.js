import React from 'react'

export default function CrudButtons (props) {
  if (props.inCollection){
    return(
      <button className="btn btn-primary" onClick={props.deleteUserBook}>Delete from ur collecton</button>
    )
  } else {
    return  (
      <div>
      <button className="btn btn-primary" onClick={props.addUserBook}>Add to Your Collection</button>
      <button className="btn btn-primary" onClick={props.deleteUserBook}>Send Lend Request</button>

      </div>

    )
  }
}
