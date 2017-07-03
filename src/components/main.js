import React, { Component } from 'react'
import { Route, withRouter, Switch } from 'react-router-dom'
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
      railsUserBooks: [],
      searchResults: [],
      stagedForLocalStorage: [],
      selectedBook: {}
    }
    this.logIn = this.logIn.bind(this)
    this.addUserBook = this.addUserBook.bind(this)
    this.fireSearch = this.fireSearch.bind(this)
    this.createLocalBooks = this.createLocalBooks.bind(this)
    this.createUser = this.createUser.bind(this)
    this.setUser = this.setUser.bind(this)
    this.setSelectedBook = this.setSelectedBook.bind(this)
    this.deleteUserBook = this.deleteUserBook.bind(this)
  }

  logIn(loginParams){
    debugger
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
    .then( () => {
      BooksAdapter.getRailsUserBooks()
        .then( data => this.setState({
          railsUserBooks: data
        }))

      BooksAdapter.fetchUserBooks(this.state.auth.user.id)
        .then((data) => this.setState({
          userBooks: data.books
        })
      )
    } )

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

  addUserBook(userbookArr){
    BooksAdapter.addUserBook(userbookArr)
    .then(() => {debugger})
    .then( newBook => this.setState( (previousState) => {
      return {
        userBooks: [...previousState.userBooks, newBook]
        }
      })
    )
  }

  createLocalBooks(){
    const reshapedBooks = this.state.stagedForLocalStorage.map( gBook => {
      debugger
      return {
        title: gBook.volumeInfo.title ? gBook.volumeInfo.title : "TITLE MISSING",
        author: gBook.volumeInfo.authors ? gBook.volumeInfo.authors[0] : "Author Missing",
        description: gBook.searchInfo ? gBook.searchInfo.textSnippet : "No description",
        image_url: gBook.volumeInfo.imageLinks.thumbnail,
        rating: gBook.volumeInfo.averageRating ? gBook.volumeInfo.averageRating : 5}
    })
      GoogleAdapter.createLocalBooks(reshapedBooks)
        .then( (books) => {
          books.forEach( book => this.setState( (previousState) => {
            return {
              books: [...previousState.books, book],
              userBooks: [...previousState.userBooks, book]
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

    // BooksAdapter.addUserBook(reshapedBooks)
  }

  fireSearch(searchTerm){
    GoogleAdapter.searchBooks(searchTerm)
    .then( res => this.setState({
      searchResults: res.items
    }))
  }

  deleteUserBook(e){
    e.preventDefault()
    let bookId = parseInt(e.target.parentElement.id, 10)
    let userId = this.state.auth.user.id
    let rubyUserBooksArray = this.state.railsUserBooks

    let findUserBook = ub => ub.book_id === bookId && ub.user_id === userId
    let backEndBook = rubyUserBooksArray.find(findUserBook)

    BooksAdapter.deleteUserBook(backEndBook)
    .then( res => {
      let bookId = res.book_id
      let filteredLocalUserBooks = this.state.userBooks.filter( book => book.id !== bookId)
      this.setState({
        userBooks: filteredLocalUserBooks,
        selectedBook: {}
      })
    })
    this.props.history.replace(" ")
  }

  setSelectedBook(e){
    let bookId = parseInt(e.target.id, 10)
    let booksArr = this.state.books
    let findBook = book => book.id === bookId
    let username = this.state.auth.user.username

    let selectedBook = booksArr.find(findBook)
    this.setState({
      selectedBook: selectedBook
    })

    if(!this.props.history.location.pathname.includes(username)){
      this.props.history.push(`/${username}/${bookId}`)
    } else {
      this.props.history.push(`/${username}/${bookId}`)
    }

  }

  render(){
    return(
      <div className="container">
        <NavBar username={this.state.auth.user.username}/>
        <Route path='/login' render={() => <LoginForm onSubmit={this.logIn} createUser={this.createUser}/>} />
        <Switch>
          <Route path={`/${this.state.auth.user.username}`} render={() => < UserContainer user={this.state.auth.user} userBooks={this.state.userBooks} setBook={this.setSelectedBook} detailBook={this.state.selectedBook} deleteUserBook={this.deleteUserBook} /> } />

          <Route exact path={`/${this.state.auth.user.username}/:id`} render={() => < UserContainer user={this.state.auth.user} userBooks={this.state.userBooks} setBook={this.setSelectedBook} detailBook={this.state.selectedBook} deleteUserBook={this.deleteUserBook} /> } />


        </Switch>
        <Route path='/browse' render={() => <BooksList books={this.state.books} addUserBook={this.addUserBook}/>} />
        <Route path='/search' render={() =>  <GoogleSearch onCreate={this.createLocalBooks} stagedBooks={this.state.stagedForLocalStorage} fireSearch={this.fireSearch} searchResults={this.state.searchResults}
          addUserBook={this.addUserBook}/> } />
      </div>
    )
  }
}

export default withRouter(Main)
