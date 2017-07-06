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

    let userApproved = () => {
      return props.loans.filter( loan => loan.giver_id === props.user.id && loan.status === "approved")
    }


    if (props.loans.length !== undefined){
      userIsGiver = userIsGiver()
      userIsTaker = userIsTaker()
      userApproved = userApproved()
    }

    let takerFind = (loan) => {
      return props.users.filter( user => user.id === loan.taker_id)[0].username
    }
    let giverFind = (loan) => {
      return props.users.filter( user => user.id === loan.giver_id)[0].username
    }

    let receivedRequests = (loan) => {
      return <li id={loan.id}>{loan.title} requested by {takerFind(loan)}
         <Button id={loan.id} onClick={props.approveLoanRequest} ><Glyphicon glyph="thumbs-up" /></Button>
           <Button id={loan.id} onClick={props.rejectLoanRequest} ><Glyphicon glyph="remove-circle" /></Button>
         </li>
    }
    let approvedRequests = (loan) => {
      return <li id={loan.id}>{loan.title} <Glyphicon glyph="arrow-right" /> {takerFind(loan)} <Button id={loan.id} onClick={props.completeLoanRequest} ><Glyphicon glyph="ok" /></Button>   </li>
    }


    return(
      <div id="inbox">
        <h5>Received Requests</h5>
        <ul>
           {userIsGiver.map( loan => receivedRequests(loan))}
        </ul>

        <h5>Sent Requests</h5>
          <ul>
             {userIsTaker.map( loan => <li>{loan.title} requested from {giverFind(loan)}</li>)}
          </ul>

          <h5>Current Loans</h5>
            <ul>
               {userApproved.map( loan => approvedRequests(loan))}
            </ul>

      </div>

    )
  } else {
    return null
  }


}
