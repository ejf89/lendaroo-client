import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import LoginForm from './LoginForm'
import UserContainer from './UserContainer'
// import BooksContainer from './BooksContainer'
import AuthAdapter from '../adapters/AuthAdapter'
import GoogleAdapter from '../adapters/GoogleAdapter'
import BooksAdapter from '../adapters/BooksAdapter'
import UserAdapter from '../adapters/UserAdapter'
import NavBar from './NavBar'
import BooksList from './BooksList'
import GoogleSearch from './GoogleSearch'

class Main extends Component {
  constructor(){
    super()
    this.state ={
      auth: {
        isLoggedIn :false,
        user: {}
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
    this.createUser = this.createUser.bind(this)
    this.setUser = this.setUser.bind(this)
  }

  logIn(loginParams){
    AuthAdapter.logIn(loginParams)
    .then( user => {
      if (!user.error) {
        this.setUser(user)
      }
    })
  }

  currentUser(){
    if (this.state.auth.isLoggedIn){
      return this.state.user.loginParams.username
    }
  }

  createUser(userParams){
    console.log('sending into to backend...')
    UserAdapter.createUser(userParams)
    .then( user => this.setUser(user))
  }

  setUser(user){
      this.setState({
        auth: {isLoggedIn: true, user: user}
      })
      localStorage.setItem('user_id', user.id)
      this.props.history.push(`/home`) //change this to custom slugs
  }


  componentDidMount(){
    if (localStorage.getItem('user_id')) {
      let user_id = parseInt(localStorage.getItem('user_id'), 10)
      AuthAdapter.currentUser(user_id)
      .then( user => this.setState({
        auth: {
          isLoggedIn: true,
          user: user
        }
      }
    ))
      BooksAdapter.fetchUserBooks(user_id) //change to current user id
        .then((data) => this.setState({
          userBooks: data.books
        })
      )
    } else {
      this.props.history.push('/login')
    }
      BooksAdapter.all()
        .then( data => this.setState({
          books: data
        }
      )
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
          books.forEach( book => this.setState( (previousState) => {
            return {
              books: [...previousState.books, book],
              userBooks: [...previousState.books, book]
            }
          }
        )
      )
      alert(`${books.length} books added to your collection!`)
    }
    )
    .then( () => this.setState({
      stagedForLocalStorage: []
    }))
  }

  fireSearch(searchTerm){
    GoogleAdapter.searchBooks(searchTerm)
    .then( res => this.setState({
      searchResults: res.items
    }))
  }

  // welcomeToggle(){
  //   if (this.state.auth.isLoggedIn) {
  //     return this.state.auth.user.username
  //   } else {
  //     return "Welcome to Lendaroo"
  //   }
  // }

  render(){
    return(
      <div className="container">
        <NavBar />
        <Route path='/login' render={() => <LoginForm onSubmit={this.logIn} createUser={this.createUser}/>} />
        <Route path='/home' render={() => < UserContainer user={this.state.auth.user} userBooks={this.state.userBooks} /> } />
        <Route path='/browse' render={() => <BooksList books={this.state.books} addUserBook={this.addUserBook}/>} />
        <Route path='/search' render={() =>  <GoogleSearch onCreate={this.createLocalBooks} stagedBooks={this.state.stagedForLocalStorage} fireSearch={this.fireSearch} searchResults={this.state.searchResults}/> } />
      </div>
    )
  }
}

export default withRouter(Main)
