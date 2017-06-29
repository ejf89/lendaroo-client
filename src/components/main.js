import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import LoginForm from './LoginForm'
import UserContainer from './UserContainer'
// import BooksContainer from './BooksContainer'
import {BooksAdapter, GoogleAdapter} from '../adapters'
import NavBar from './NavBar'
import BooksList from './BooksList'
import GoogleSearch from './GoogleSearch'

class Main extends Component {
  constructor(){
    super()
    this.state ={
      auth: {
        isLoggedIn :true,
        user: {username: "mustafa", password: "pw"}
      },
      books: [],
      userBooks: [],
      searchResults: [],
      stagedForLocalStorage: []
    }
    this.logIn = this.logIn.bind(this)
    this.addUserBook = this.addUserBook.bind(this)
    this.fireSearch = this.fireSearch.bind(this)
    this.createLocalBooks = this.createLocalBooks.bind(this)
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

    BooksAdapter.fetchUserBooks(3) //change to current user id
      .then((data) => this.setState({
        userBooks: data.books
      })
    )
  }

  addUserBook(userbook){
    BooksAdapter.addUserBook(userbook)
    .then( newBook => this.setState( (previousState) => {
      return {
        userBooks: [...previousState.userBooks, newBook]
        }
      })
    )
  }

  createLocalBooks(){
    const reshapedBooks = this.state.stagedForLocalStorage.map( gBook => {
      return {
        title: gBook.volumeInfo.title,
        author: gBook.volumeInfo.authors[0],
        description: gBook.searchInfo.textSnippet,
        image_url: gBook.volumeInfo.imageLinks.thumbnail,
        rating: gBook.volumeInfo.averageRating}
    })
      GoogleAdapter.createLocalBooks(reshapedBooks)
        .then( (books) => {
          books.forEach( book => this.setState( (previousState) =>{
            return{
              books: [...previousState.books, book]
            }
          }
        )
      )
      alert(`${books.length} books added to your collection!`)
    }
    )
  }

  fireSearch(searchTerm){
    GoogleAdapter.searchBooks(searchTerm)
    .then( res => this.setState({
      searchResults: res.items
    }))
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
      <div className="container">
        <NavBar />
        <h2>{this.welcomeToggle()}</h2>
        <Route path='/login' render={() => <LoginForm onSubmit={this.logIn}/>} />
        <Route path='/home' render={() => < UserContainer userBooks={this.state.userBooks} /> } />
        <Route path='/browse' render={() => <BooksList books={this.state.books} addUserBook={this.addUserBook}/>} />
        <Route path='/search' render={() =>  <GoogleSearch onCreate={this.createLocalBooks} stagedBooks={this.state.stagedForLocalStorage} fireSearch={this.fireSearch} searchResults={this.state.searchResults}/> } />
      </div>
    )
  }
}

export default Main
