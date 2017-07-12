import React from 'react'
import UserDetail from './UserDetail'
import BooksList from './BooksList'
import { Table } from 'react-bootstrap'
import UserDetailBookDetail from './UserDetailBookDetail'

export default function UserList (props) {
  let selectedUsersBooks = []

  if (props.selectedUser[0] !== undefined){
    let selectedUserId = props.selectedUser[0].id
    let filteredUserBooks = props.railsUserBooks.filter( userBook => userBook.user_id === selectedUserId )
    let filteredUserBooksIds = filteredUserBooks.map( ub => ub.book_id)


    props.books.forEach( book => {
      if (filteredUserBooksIds.includes(book.id)){
        selectedUsersBooks.push(book)
        }
      }
    )


  }

  return(<div className="row" id="userViewContainer">

          <div id="userTable" className="col-md-4">
            <Table striped condensed hover>
              <thead>
                <tr><th>Users</th></tr>
              </thead>
              <tbody>
                {props.users.map( user => <tr onClick={props.setSelectedUser}><td id={user.id}>{user.username}</td></tr>)}
              </tbody>
            </Table>
          </div>

        <div className="col-md-4">
          <UserDetail user={props.selectedUser[0]}/>

            < UserDetailBookDetail
              user = {
                props.user
              }
              selectedUser = {
                props.selectedUser[0]
              }
              book = {
                props.detailBook
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

              createLoan = {
                props.createLoan
              }
              loans = {
                props.loans
              } />
        </div>

        <div className="col-md-4" >
          <BooksList setBook={props.setBook} books={selectedUsersBooks} />
        </div>

        <div className="row">
          <div className="col-md-4">
          </div>


            <div className="col-md-3">
            </div>
        </div>



      </div>
      )
}
