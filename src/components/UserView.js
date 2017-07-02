import React from 'react'
import Book from './Book'

export default function UserView (props) {


  return(
    <div>
      <div  className="row" >
        <div id="userInfo" className="col-md-3" >
          <img id="userPic" src={props.user.picture} alt={props.user.username}/>
          <h2>{props.user.username}</h2>
        </div>
        <div id="userBio" className="col-md-6" >
          <p>{props.user.bio}</p>
        </div>

      </div>

      <div className="row">
        <div className="col-md-1">
        </div>
        <div className="col-md-4">
          <h3>My Books</h3>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
            <div id="myBookList" className="row">
            {props.userBooks.map( book => <Book book={book} />  )}
          </div>
        </div>
      </div>
    </div>

  )
}
