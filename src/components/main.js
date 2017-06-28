import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import LoginForm from './LoginForm'
import UserContainer from './UserContainer'
// import BooksContainer from './BooksContainer'
import {BooksAdapter} from '../adapters'
import NavBar from './NavBar'
import BooksList from './BooksList'

class Main extends Component {
  constructor(){
    super()
    this.state ={
      auth: {
        isLoggedIn :true,
        user: {username: "abbey.shanahan", password: "pw"}
      },
      books: [],
      userBooks: []
    }
    this.logIn = this.logIn.bind(this)
    this.addUserBook = this.addUserBook.bind(this)
  }

  logIn(loginParams){
    this.setState({
      auth: {
        isLoggedIn: true,
        user: {loginParams}
        }
      }
    )
  }

  currentUser(){
    if (this.state.auth.isLoggedIn){
      return this.state.user.loginParams.username
    }
  }

  componentDidMount(){
    BooksAdapter.all()
      .then( data => this.setState({
        books: data
      }))

    BooksAdapter.fetchUserBooks(3)
      .then((data) => this.setState({
        userBooks: data.books
      })
    )
  }

  addUserBook(userbook){
    BooksAdapter.addUserBook(userbook)
    .then( userbook => this.setState( (previousState) => {
      return {
        userBooks: [...previousState.userBooks, userbook]
      }
    })
  )
  }

  welcomeToggle(){
    if (this.state.auth.isLoggedIn) {
      return this.state.auth.user.username
    } else {
      return "Welcome to Lendaroo"
    }
  }

  render(){
    return(
      <div>
        <NavBar style='inverse'/>
        <h2>{this.welcomeToggle()}</h2>
        <Route path='/login' render={() => <LoginForm onSubmit={this.logIn}/>} />
        <Route path='/home' render={() => < UserContainer userBooks={this.state.userBooks} /> } />
        <Route path='/books' render={() => <BooksList books={this.state.books} addUserBook={this.addUserBook}/>} />
      </div>
    )
  }
}

export default Main
