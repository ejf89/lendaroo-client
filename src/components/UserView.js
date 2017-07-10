import React from 'react'
import BookNav from './BookNav'
import BookDetail from './BookDetail'
import BooksList from './BooksList'
import Inbox from './Inbox'
import Map from './Map'
import { Route, Switch } from 'react-router-dom'
import { Col } from 'react-bootstrap'


export default function UserView (props) {
  const { username } = props.user

  const detailBookShow = () => {if (props.detailBook.id !== undefined) {
    return (
      <div id="BookDetail" className="col-md-6">
        < BookDetail book = {
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
          usersWithSelectedBook = {
            props.usersWithSelectedBook.filter( user => user.id !== props.user.id)
          }
          createLoan = {
            props.createLoan
          }
          loans = {
            props.loans
          }
          />
      </div>

    )
  }
}

  return(
    <div>
      <div  id="userInfo" className="row" >
        <div  className="col-md-3" >
          <img id="userPic" src={props.user.picture} alt={username}/>
          <h2>{username}</h2>

        </div>
        <div id="userBio" className="col-md-6" >
            <h3>Karma: {props.karma}</h3>
            <p><span id="bioHeader">Bio:</span> {props.user.bio}</p>

        </div>
      </div>



        <div className="row" >
          <div className="col-md-6" >
            < BookNav username={username} resetSelectedBook={props.resetSelectedBook} />
        </div>
      </div>



      <div >
        <div >
            <div>
            <Switch>
              < Route exact path = {
                  `/${username}`
                }
                render = {
                  () =>
                  <div id="listAndMap" >
                    <div id="myBookList" className="BookNav col-md-6">

                    < Inbox user = {
                      props.user
                    }
                    loans = {
                      props.loans
                    }
                    allBooks = {
                      props.allBooks
                    }
                    users = {
                      props.users
                    }
                    approveLoanRequest = {
                      props.approveLoanRequest
                    }
                    completeLoanRequest = {
                      props.completeLoanRequest
                    }
                    rejectLoanRequest = {
                      props.rejectLoanRequest
                    } />
                </div>

                <div id="mapDaddy" className="col-md-6" > < Map currentUser={props.user} users={props.users} hoverUser={props.hoverUser} setHoverUser={props.setHoverUser} /> </div>

              </div>


                } />

              <Route path={`/${username}/browse`} render={() => < BooksList books={props.allBooks} setBook={props.setBook} />} />

              <Route path={`/${username}/books`} render={ () => < BooksList books={props.userBooks} setBook={props.setBook} /> }  />

              <Route exact path={`/${username}/:id`} render={ () =><  BooksList books={props.userBooks} setBook={props.setBook} /> } />

              <Route exact path='/map' render={() => <div id="mapDaddy"> <Map /> </div>} />
            </Switch>
        </div>
        </div>


        {detailBookShow()}


      </div>
    </div>

  )
}
