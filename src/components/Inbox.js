import React from 'react'

export default function Inbox (props) {


  let userIsGiver = () =>{
    return props.loans.filter( loan => loan.giver_id === props.user.id && loan.status === "pending")
  }

  let userIsTaker = () =>{
    return props.loans.filter( loan => loan.taker_id === props.user.id && loan.status === "pending")
  }

  if (props.loans.length !== undefined){
    userIsGiver = userIsGiver()
    userIsTaker = userIsTaker()
  }

  return(
    <div>
      <h5>Received Requests</h5>
      <ul>
         {userIsGiver.map( loan => <li>{loan.title} requested by 'name' {loan.status}</li>)}
      </ul>

      <h5>Sent Requests</h5>
        <ul>
           {userIsTaker.map( loan => <li>{loan.title} requested by 'name' {loan.status}</li>)}
        </ul>
    </div>

  )
}
