import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import LoginForm from './LoginForm'
import UserContainer from './UserContainer'
import BooksContainer from './BooksContainer'
import {BooksAdapter} from '../adapters'
import NavBar from './NavBar'

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
  }

  logIn(loginParams){
    this.setState({
      auth: {
        isLoggedIn: true,
        user: {loginParams}
    }})
  }

  currentUser(){
    if (this.state.auth.isLoggedIn){
      return this.state.loginParams.user.username
    }
  }

  componentDidMount(){
    BooksAdapter.all()
      .then( data => this.setState({
        books: data
      }))
    BooksAdapter.userBooks(3)
      .then((data) => this.setState({
        userBooks: data.books
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
        <Route path='/home' render={() =>< UserContainer userBooks={this.state.userBooks} /> } />
      </div>
    )
  }
}

export default Main
