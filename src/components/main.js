import React, {Component} from 'react'
import {Route, withRouter} from 'react-router-dom'
import LoginForm from './LoginForm'
import UserContainer from './UserContainer'
// import BooksContainer from './BooksContainer'
import AuthAdapter from '../adapters/AuthAdapter'
import LoanAdapter from '../adapters/LoanAdapter'
import GoogleAdapter from '../adapters/GoogleAdapter'
import BooksAdapter from '../adapters/BooksAdapter'
import UserAdapter from '../adapters/UserAdapter'
import TestNavBar from './TestNavBar'
import BooksList from './BooksList'
import GoogleSearch from './GoogleSearch'

class Main extends Component {
  constructor() {
    super()
    this.state = {
      auth: {
        isLoggedIn: false,
        user: {}
      },
      books: [],
      userBooks: [],
      railsUserBooks: [],
      searchResults: [],
      stagedForLocalStorage: [],
      selectedBook: {},
      inCollection: false,
      users: [],
      usersWithBook: [],
      loans: {}
    }
    this.logIn = this.logIn.bind(this)
    this.addUserBook = this.addUserBook.bind(this)
    this.fireSearch = this.fireSearch.bind(this)
    this.createLocalBooks = this.createLocalBooks.bind(this)
    this.createUser = this.createUser.bind(this)
    this.setUser = this.setUser.bind(this)
    this.setSelectedBook = this.setSelectedBook.bind(this)
    this.deleteUserBook = this.deleteUserBook.bind(this)
    this.addUserBook = this.addUserBook.bind(this)
    this.usersWithSelectedBook = this.usersWithSelectedBook.bind(this)
    this.resetSelectedBook = this.resetSelectedBook.bind(this)
    this.createLoan = this.createLoan.bind(this)
    this.approveLoanRequest = this.approveLoanRequest.bind(this)
    this.completeLoanRequest = this.completeLoanRequest.bind(this)
    this.rejectLoanRequest = this.rejectLoanRequest.bind(this)
  }

  logIn(loginParams) {
    AuthAdapter.logIn(loginParams).then(user => {
      if (!user.error) {
        this.setUser(user)
      }
    })
  }

  currentUser() {
    if (this.state.auth.isLoggedIn) {
      return this.state.user.loginParams.username
    }
  }

  createUser(userParams) {
    console.log('sending into to backend...')
    UserAdapter.createUser(userParams).then(user => this.setUser(user))
  }

  setUser(user) {
    this.setState({
      auth: {
        isLoggedIn: true,
        user: user
      }
    })
    localStorage.setItem('user_id', user.id)
    this.props.history.push(`/home`)
  }

  componentDidMount() {
    if (localStorage.getItem('user_id')) {
      let user_id = parseInt(localStorage.getItem('user_id'), 10)
      AuthAdapter.currentUser(user_id).then(user => this.setState({
        auth: {
          isLoggedIn: true,
          user: user
        }
      })).then(() => {
        BooksAdapter.getRailsUserBooks().then(data => this.setState({railsUserBooks: data}))

        BooksAdapter.fetchUserBooks(this.state.auth.user.id).then((data) => this.setState({userBooks: data.books}))
      }).then(() => {
        UserAdapter.all().then(users => this.setState({users: users}))
      })
      .then( () => {
        LoanAdapter.all()
        .then( loans => this.setState({
          loans: loans
        }))
      } )


    } else {
      this.props.history.push('/login')
    }
    BooksAdapter.all().then(data => this.setState({books: data}))
  }

  addUserBook(e) {
    e.preventDefault()
    BooksAdapter.addUserBook(this.state.selectedBook).then(newBook => this.setState((previousState) => {
      return {
        userBooks: [
          ...previousState.userBooks,
          newBook
        ]
      }
    })).then(() => BooksAdapter.getRailsUserBooks().then(data => this.setState({railsUserBooks: data})))
    alert('Added!')
  }

  createLocalBooks() {
    const reshapedBooks = this.state.stagedForLocalStorage.map(gBook => {
      return {
        title: gBook.volumeInfo.title
          ? gBook.volumeInfo.title
          : "TITLE MISSING",
        author: gBook.volumeInfo.authors
          ? gBook.volumeInfo.authors[0]
          : "Author Missing",
        description: gBook.searchInfo
          ? gBook.searchInfo.textSnippet
          : "No description",
        image_url: gBook.volumeInfo.imageLinks.thumbnail,
        rating: gBook.volumeInfo.averageRating
          ? gBook.volumeInfo.averageRating
          : 5
      }
    })
    GoogleAdapter.createLocalBooks(reshapedBooks).then((books) => {
      books.forEach(book => this.setState((previousState) => {
        return {
          books: [
            ...previousState.books,
            book
          ],
          userBooks: [
            ...previousState.userBooks,
            book
          ]
        }
      }))
      alert(`${books.length} books added to your collection!`)
    }).then(() => this.setState({stagedForLocalStorage: []})).then(() => BooksAdapter.getRailsUserBooks()).then(res => this.setState({railsUserBooks: res}))
  }

  fireSearch(searchTerm) {
    GoogleAdapter.searchBooks(searchTerm).then(res => this.setState({searchResults: res.items}))
  }

  deleteUserBook(e) {
    e.preventDefault()
    let bookId = parseInt(e.target.parentElement.id, 10)
    let userId = this.state.auth.user.id
    let rubyUserBooksArray = this.state.railsUserBooks

    let findUserBook = ub => ub.book_id === bookId && ub.user_id === userId
    let backEndBook = rubyUserBooksArray.find(findUserBook)

    BooksAdapter.deleteUserBook(backEndBook).then(res => {
      let bookId = res.book_id
      let filteredLocalUserBooks = this.state.userBooks.filter(book => book.id !== bookId)
      this.setState({userBooks: filteredLocalUserBooks, selectedBook: {}})
    })
    this.props.history.replace(" ")
  }

  setSelectedBook(e) {
    let bookId = parseInt(e.target.id, 10)
    let booksArr = this.state.books
    let findBook = book => book.id === bookId
    let username = this.state.auth.user.username
    let userBookIds = this.state.userBooks.map(book => book.id)

    let selectedBook = booksArr.find(findBook)
    this.setState({selectedBook: selectedBook})

    if (userBookIds.includes(selectedBook.id)) {
      this.setState({inCollection: true})
    } else {
      this.setState({inCollection: false})
    }

    this.usersWithSelectedBook()

    if (!this.props.history.location.pathname.includes(username)) {
      this.props.history.push(`/${username}/${bookId}`)
    } else if (this.props.history.location.pathname.includes(username + '/browse')) {
      this.props.history.push(`/${username}/browse/${bookId}`)
    } else {
      this.props.history.push(`/${username}/${bookId}`)
    }
  }

  resetSelectedBook(){
    this.setState({ selectedBook: {} })
  }

  usersWithSelectedBook() {
    let filteredUserBooks = this.state.railsUserBooks.filter(userBook => userBook.book_id === this.state.selectedBook.id)
    let usersWithBook = filteredUserBooks.map(userBook => {
      let users = this.state.users
      let findUser = user => user.id === userBook.user_id
      return users.find(findUser)
    })
    this.setState({usersWithBook: usersWithBook})
  }

  createLoan(e){
    let giver_id = parseInt(e.target.id, 10)
    let taker_id = this.state.auth.user.id
    let book_id = this.state.selectedBook.id
    let title = this.state.selectedBook.title

    LoanAdapter.createLoan(giver_id, taker_id, book_id, title)
    .then( loan => this.setState( (previousState) => {
      return {
        loans: [...previousState.loans, loan]
      }
    }))
    .then(() => alert("Request Sent!"))
  }

  approveLoanRequest(e){
    let loan_id = parseInt(e.target.parentElement.id, 10)
    LoanAdapter.approveLoanRequest(loan_id)
    .then( (loan) => this.setState( (previousState)  => {
      console.log(loan)
      return (
        {  loans: previousState.loans.map( l => {
              if (l.id !== loan.id){
                return l
              } else {
                return loan
              }
            }
          )
        }
      )
    }
  ))
  }

  completeLoanRequest(e){
    let loan_id = parseInt(e.target.parentElement.id, 10)
    LoanAdapter.completeLoanRequest(loan_id)
    .then( (loan) => this.setState( (previousState)  => {
      console.log(loan)
      return (
        {  loans: previousState.loans.map( l => {
              if (l.id !== loan.id){
                return l
              } else {
                return loan
              }
            }
          )
        }
      )
    }
  ))
  }

  rejectLoanRequest(e){
    let loan_id = parseInt(e.target.parentElement.id, 10)
    LoanAdapter.rejectLoanRequest(loan_id)
    .then( (deadLoan) => this.setState( (previousState)  => {
      return {
        loans: previousState.loans.filter( loan => loan.id !==deadLoan.id)
      }
    }
  ))
  .then( () => alert("Loan request rejected!"))
  }


  render() {
    return (
      <div className="container">
        <TestNavBar username={this.state.auth.user.username}/>
        <Route path='/login' render={() => <LoginForm onSubmit={this.logIn} createUser={this.createUser}/>}/>

        <Route path={`/${this.state.auth.user.username}`} render={() => < UserContainer user = {
          this.state.auth.user
        }
        users = {
          this.state.users
        }
        userBooks = {
          this.state.userBooks
        }
        allBooks = {
          this.state.books
        }
        setBook = {
          this.setSelectedBook
        }
        detailBook = {
          this.state.selectedBook
        }
        deleteUserBook = {
          this.deleteUserBook
        }
        addUserBook = {
          this.addUserBook
        }
        inCollection = {
          this.state.inCollection
        }
        usersWithSelectedBook = {
          this.state.usersWithBook
        }
        resetSelectedBook = {
          this.resetSelectedBook
        }
        createLoan = {
          this.createLoan
        }
        approveLoanRequest = {
          this.approveLoanRequest
        }
        completeLoanRequest = {
          this.completeLoanRequest
        }
        rejectLoanRequest = {
          this.rejectLoanRequest
        }
        loans = {
          this.state.loans
        }

        />}/>

        <Route path='/browse' render={() => <BooksList books={this.state.books} addUserBook={this.addUserBook}/>}/>

        <Route path='/search' render={() => <GoogleSearch localBooks={this.state.books} onCreate={this.createLocalBooks} stagedBooks={this.state.stagedForLocalStorage} fireSearch={this.fireSearch} searchResults={this.state.searchResults} addUserBook={this.addUserBook}/>}/>
      </div>
    )
  }
}

export default withRouter(Main)
