import React from 'react'
import { Button, Glyphicon, Table } from 'react-bootstrap'

export default function Inbox (props) {

  if (props.loans === undefined){
    return <div>"LOADING..."</div>
  }

  if (props.loans.length === 0 ){
    return <div>"LOADING..."</div>
  }

  console.log(props.loans)

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


  if(props.loans.length > 0){
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

    let receivedRequests = () => {
      return <div>
        <Table striped condensed hover>
          <thead>
            <th>Received Requests</th>
          </thead>
          <tbody>
            {userIsGiver.map(loan => <tr>
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

    let pendingRequests = () => {
      return <div>
        <Table striped condensed hover>
          <thead>
            <th>Pending Requests</th>
          </thead>
          <tbody>
            {userIsTaker.map( loan => <tr> <td>{loan.title}</td>  <td><Glyphicon glyph="arrow-left" /> from </td> <td> {giverFind(loan)} </td> </tr>)}
          </tbody>
        </Table>
      </div>
    }

    let currentLoans = () => {
      return <div>
        <Table striped condensed hover>
          <thead>
            <th> Current Loans</th>
          </thead>
          <tbody>
            {userApproved.map( loan => <tr> <td> {loan.title} </td> <td> <Glyphicon glyph="arrow-right" /> </td> <td>{takerFind(loan)} </td> <td> <Button id={loan.id} onClick={props.completeLoanRequest} ><Glyphicon glyph="ok" /></Button>  </td> </tr> )}
            {userRequested.map(  loan => <tr> <td> {loan.title} </td> <td> <Glyphicon glyph="arrow-left" /> </td> <td> {giverFind(loan) } </td> </tr>)}
          </tbody>
        </Table>
      </div>
    }

    let approvedRequests = (loan) => {
      return <li id={loan.id}>{loan.title} <Glyphicon glyph="arrow-right" /> {takerFind(loan)} <Button id={loan.id} onClick={props.completeLoanRequest} ><Glyphicon glyph="ok" /></Button>   </li>
    }
    let requestedRequests = (loan) => {
      return <li id={loan.id}>{loan.title} <Glyphicon glyph="arrow-left" /> {giverFind(loan) }  </li>
    }

    if (props.loans.length > 0){
      return(

        <div id="inbox">

          {receivedRequests()}

          {pendingRequests()}

          {currentLoans()}

        </div>

      )

    } else {
      console.log("i am the else")
    }


}
