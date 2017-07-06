import React from 'react'
import UserView from './UserView'


export default function UserContainer (props) {

  return(
    <div id="userView">
      < UserView id="userView" user = {
        props.user
      }
      users = {
        props.users
      }
      userBooks = {
        props.userBooks
      }
      allBooks = {
        props.allBooks
      }
      detailBook = {
        props.detailBook
      }
      setBook = {
        props.setBook
      }
      deleteUserBook = {
        props.deleteUserBook
      }
      addUserBook = {
        props.addUserBook
      }
      inCollection = {
        props.inCollection
      }
      usersWithSelectedBook = {
        props.usersWithSelectedBook
      }
      resetSelectedBook = {
        props.resetSelectedBook
      }
      createLoan = {
        props.createLoan
      }
      loans = {
        props.loans
      } />
   </div>)

}
