import React, { Component } from 'react'
import UserDetail from './UserDetail'
import BooksList from './BooksList'
import { Table } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import UserDetailBookDetail from './UserDetailBookDetail'
import UserAdapter from '../adapters/UserAdapter'

class UserList extends Component {
  constructor(props){
    super(props)
    this.state = {
      selectedUsersBooks: []
    }
    this.setBooks = this.setBooks.bind(this)
  }


  componentWillMount(){
    console.log('I will try to get the books')
    if (this.props.history.location.pathname.includes("users/")){

      var userId = parseInt(this.props.history.location.pathname.split("/")[2], 10)
      this.props.fetchAllBooks()
      this.props.fetchRailsUserBooks()
       UserAdapter.currentUser(userId)
      .then( res => {this.props.setSelectedUserById(res)})
      .then(() => this.setBooks())
    }
  }



  componentDidUpdate(np) {
    console.log('np')
    console.log(np.selectedUser.id )
    console.log('cp')
    console.log(this.props.selectedUser.id)
    if (np.selectedUser.id !== this.props.selectedUser.id ) {
      this.setBooks()
    } else {
      console.log('No need to update books')
    }
  }


  setBooks(){
    console.log("Sorry but I am trying to set books")
    let booksObjs = []
    if (this.props.selectedUser !== undefined){

      let selectedUserId = this.props.selectedUser.id
      let filteredUserBooks = this.props.railsUserBooks.filter( userBook => userBook.user_id === selectedUserId )
      let filteredUserBooksIds = filteredUserBooks.map( ub => ub.book_id)

      this.props.books.forEach( book => {
        if ( filteredUserBooksIds.includes(book.id) ){
          console.log("Will collect items for the set state")
          booksObjs.push(book)
        }
      }
    )
    console.log(booksObjs)
    this.setState({
      selectedUsersBooks: booksObjs
    })
  }

  }

  render(){
    return(<div className="row" id="userViewContainer">
    <div id="userTable" className="col-md-4">
      <Table condensed hover>
        <thead>
          <tr><th>Users</th></tr>
        </thead>
        <tbody>
          {this.props.users.map( user => <tr onClick={this.props.setSelectedUser}><td id={user.id}>{user.username}</td></tr>)}
        </tbody>
      </Table>
    </div>

    <div className="col-md-4">

      <UserDetail user={this.props.selectedUser}/>

      < UserDetailBookDetail
      user = {
        this.props.user
      }
      selectedUser = {
        this.props.selectedUser
      }
      book = {
        this.props.detailBook
      }
      deleteUserBook = {
        this.props.deleteUserBook
      }
      addUserBook = {
        this.props.addUserBook
      }
      inCollection = {
        this.props.inCollection
      }

      createLoan = {
        this.props.createLoan
      }
      loans = {
        this.props.loans
      } />
    </div>

    <div className="col-md-4" >
      <BooksList setBook={this.props.setBook} books={this.state.selectedUsersBooks} />
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
  }

export default withRouter(UserList)
