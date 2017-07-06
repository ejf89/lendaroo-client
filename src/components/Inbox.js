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
    let userRequested = () => {
      return props.loans.filter( loan => loan.taker_id === props.user.id && loan.status === "approved")
    }


    if (props.loans.length !== undefined){
      userIsGiver = userIsGiver()
      userIsTaker = userIsTaker()
      userApproved = userApproved()
      userRequested = userRequested()
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
    let requestedRequests = (loan) => {
      return <li id={loan.id}>{loan.title} <Glyphicon glyph="arrow-left" /> {giverFind(loan) }  </li>
    }


    return(
      <div id="inbox">
        <h5 className="inboxHeader">Received Requests</h5>
        <ul>
           {userIsGiver.map( loan => receivedRequests(loan))}
        </ul>

        <h5>Pending Requests</h5>
          <ul>
             {userIsTaker.map( loan => <li>{loan.title}  <Glyphicon glyph="arrow-left" /> {giverFind(loan)}</li>)}
          </ul>

          <h5>Current Loans</h5>
            <ul>
               {userApproved.map( loan => approvedRequests(loan))}
               {userRequested.map( loan => requestedRequests(loan) )}
            </ul>

      </div>

    )
  } else {
    return null
  }


}
