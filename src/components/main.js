import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import LoginForm from './LoginForm'
import UserContainer from './UserContainer'
import BooksContainer from './BooksContainer'
import {BooksAdapter} from '../adapters'

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

  componentDidMount(){
    BooksAdapter.all()
    .then( data => this.setState({
      books: data
    }))
  }

  render(){
    return(
      <div>
        <h2>Welcome to Lendaroo</h2>
        <Route path='/login' render={() => <LoginForm onSubmit={this.logIn}/>} />
        < UserContainer />
      < BooksContainer books={this.state.books} />

      </div>
    )
  }
}

export default Main
