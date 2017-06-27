import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import LoginForm from './loginform'
import UserContainer from './usercontainer'

class Main extends Component {
  constructor(){
    super()
    this.state ={
      auth: {
        isLoggedIn :false,
        user: {}
      },
      books: []
    }
    this.logIn = this.logIn.bind(this)
  }

  logIn(loginParams){
    console.log('i am login')
  }

  render(){
    return(
      <div>
        <h2>Welcome to Lendaroo</h2>
        <Route path='/login' render={() => <LoginForm onSubmit={this.logIn}/>} />
        < UserContainer />

      </div>
    )
  }
}

export default Main
