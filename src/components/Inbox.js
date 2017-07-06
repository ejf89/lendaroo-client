import React from 'react'
import { Button, Glyphicon } from 'react-bootstrap'

export default function Inbox (props) {

  if (props.loans.length !== undefined){
    let userIsGiver = () => {
      return props.loans.filter( loan => loan.giver_id === props.user.id && loan.status === "pending")
    }

    let userIsTaker = () => {
      return props.loans.filter( loan => loan.taker_id === props.user.id && loan.status === "pending")
    }

    if (props.loans.length !== undefined){
      userIsGiver = userIsGiver()
      userIsTaker = userIsTaker()
    }

    let takerFind = (loan) => {
      return props.users.filter( user => user.id === loan.taker_id)[0].username
    }
    let giverFind = (loan) => {
      return props.users.filter( user => user.id === loan.giver_id)[0].username
    }

    let receivedRequests = (loan) => {
      return <li>{loan.title} requested by {takerFind(loan)}<Button><Glyphicon glyph="thumbs-up" /></Button>   </li>
    }



    return(
      <div>
        <h5>Received Requests</h5>
        <ul>
           {userIsGiver.map( loan => receivedRequests(loan))}
        </ul>

        <h5>Sent Requests</h5>
          <ul>
             {userIsTaker.map( loan => <li>{loan.title} requested from {giverFind(loan)}</li>)}
          </ul>
      </div>

    )
  } else {
    return null
  }


}
