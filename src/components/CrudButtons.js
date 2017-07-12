import React from 'react'
import { Col, Button, ButtonGroup } from 'react-bootstrap'

export default function CrudButtons (props) {
  if (props.inCollection){
    return(
      <button className="btn btn-primary" onClick={props.deleteUserBook}>Delete from ur collecton</button>
    )
  } else {
    return  (
      <Col md={12} id="crudButtons" >
        <ButtonGroup  vertical>
          < Button bsStyle={"info"} block onClick = {
          props.addUserBook
        } > Add to Your Collection < /Button>
          {props.usersWithSelectedBook.map( user => <Button key={user.id} id={user.id} className="btn btn-primary" onClick={props.createLoan} >Ask {user.username} to borrow this book</Button >)
  }
      </ButtonGroup>
      </Col>

    )
  }
}
