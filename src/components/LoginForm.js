import React, { Component } from 'react'
import { Glyphicon } from 'react-bootstrap'

class LoginForm extends Component {
  constructor(){
    super()
    this.state = {
      username: '',
      password: '',
      newUser: {
        username: '',
        password: '',
        email: '',
        picture: '',
        address: '',
        bio: ''
      }
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSignUpChange = this.handleSignUpChange.bind(this)
  }

  handleSignUpChange(e){
    this.setState({
      newUser: {...this.state.newUser,
      [e.target.name]: e.target.value
      }
    })
  }

  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e){
    e.preventDefault()
    if (e.target.id === "login") {
      this.props.onSubmit(this.state)
    } else if (e.target.id === "signUp") {
      this.props.createUser(this.state.newUser)
    }
    this.setState({username: '', password: ''})
  }

  render(){
    return(
      <div id="loginForm">

        <h3 id="firstWelcome">welcome to</h3>
        <h2 id="firstLogo"><span>L</span>it Len<span>d</span></h2>
        <p  id="tagLine">...it's lit</p>
        <div className="row">
          <div className="col-md-1">
          </div>
          <div className="col-md-3" id="loginFields">
            <p> Login </p>
              <form id="login" onSubmit={this.handleSubmit}>
                <label>Username</label>
                <input type="text" value={this.state.username} name="username" onChange={this.handleChange} />
                <label>Password</label>
                <input type="password" value={this.state.password} name="password" onChange={this.handleChange}/>
                <br></br>
                <input type="submit" className="loginButton" />
            </form>
          </div>
        <div className="col-md-2 signUpHeader">
          <p>or sign up for a new account   <Glyphicon glyph="arrow-right"/></p>
        </div>
        <div className="col-md-3">
          <form id="signUp" onSubmit={this.handleSubmit}>
            <label>Username</label>
            <input type="text" placeholder="Pick a Username!" onChange={this.handleSignUpChange} name="username"/>
            <label>Password</label>
            <input type="password" placeholder="Choose a password"onChange={this.handleSignUpChange} name="password" />
            <label>email</label>
            <input type="email" placeholder="Please enter your email" onChange={this.handleSignUpChange} name="email"/>
            <label>Profile Picture</label>
            <input type="text" placeholder="Link to a Profile Picture" onChange={this.handleSignUpChange} name="picture" />
            <label>Default Location</label>
            <input type="text" placeholder="Enter your home address" onChange={this.handleSignUpChange} name="address"/>
            <label>How about a short bio?</label>
            <input type="textarea" placeholder="a lil bit about yourself..." onChange={this.handleSignUpChange} name="bio"/>
            <input type="submit" className="loginButton" />
          </form>
        </div>
      </div>
    </div>
    )
  }
}
export default LoginForm
