import React from 'react'
import { Button, Glyphicon, Table } from 'react-bootstrap'

export default function Inbox (props) {

  if (props.loans === undefined){
    return <div>"LOADING..."</div>
  }



  if (props.loans.length > 0 && props.users.length > 0){

    if (props.loans.filter( loan => loan.giver_id === props.user.id || loan.taker_id === props.user.id).length === 0){
      return (
        <div>
          <h3><span role="img">👆</span>     <span role="img">🕵</span>️‍   <span role="img">👆</span>  </h3>
          <h3>No loans yet, click around to get started!</h3>
        </div>
        )
    }

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

      let takerFind = (loan) => {
        return props.users.filter( user => user.id === loan.taker_id)[0].username
      }
      let giverFind = (loan) => {
        return props.users.filter( user => user.id === loan.giver_id)[0].username
      }

      let receivedRequests = () => {
        if (userIsGiver().length > 0){
          return <div>
            <Table condensed  className="inboxTable">
              <thead>
                <tr><th>Received Requests</th></tr>
              </thead>
              <tbody>
                {userIsGiver().map(loan => <tr key={loan.id}>
                  <td>{loan.title}</td>
                  <td>requested by {takerFind(loan)}
                  </td>
                  <td>
                    <Button id={loan.id} onClick={props.approveLoanRequest}><Glyphicon glyph="thumbs-up"/></Button>
                  </td>
                  <td>
                    <Button id={loan.id} onClick={props.rejectLoanRequest}><Glyphicon glyph="remove-circle"/></Button>
                  </td>
                </tr>)}
              </tbody>
            </Table>
          </div>

        }
      }

      let pendingRequests = () => {
        if (userIsTaker().length > 0){
          return <div>
            <Table  condensed  className="inboxTable">
              <thead>
                <tr><th>Pending Requests</th></tr>
              </thead>
              <tbody>
                {userIsTaker().map( loan => <tr key={loan.id}><td>{loan.title}</td>  <td><Glyphicon glyph="arrow-left" /> from </td><td> {giverFind(loan)} </td> </tr>)}
              </tbody>
            </Table>
          </div>

        }
      }

      let currentLoans = () => {
        if (userApproved().length > 0 || userRequested.length > 0){
          return <div>
            <Table  className="inboxTable">
              <thead>
                <tr><th> Current Loans</th></tr>
              </thead>
              <tbody>
                {userApproved().map( loan => <tr key={loan.id}><td>{loan.title}</td><td> <Glyphicon glyph="arrow-right" /></td><td>{takerFind(loan)}</td><td><Button id={loan.id} onClick={props.completeLoanRequest}><Glyphicon glyph="ok" /></Button></td></tr> )}
                {userRequested().map(  loan => <tr key={loan.id}> <td> {loan.title} </td><td> <Glyphicon glyph="arrow-left" /></td><td>{giverFind(loan) }</td></tr>)}
              </tbody>
            </Table>
          </div>

        }
      }

        return(

          <div id="inbox" >

            {receivedRequests()}

            {pendingRequests()}

            {currentLoans()}

          </div>

        )

} else {
  return null
}


}
