import React, {Component} from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { withRouter  } from 'react-router-dom'

class TestNavBar extends Component {
  handleNavLink = (event) => {
    event.preventDefault();
    this.props.resetSelectedBook()
    this.props.history.push(event.currentTarget.getAttribute('href'));

  }

  logOut = (event) => {
    localStorage.clear()
    this.props.history.push(event.currentTarget.getAttribute('href'));
  }

  render(){

    if (this.props.history.location.pathname !== "/login"){
      return(
        <div>
          <Navbar fixedTop justified >

            <Nav >
              <Navbar.Header>
                <Navbar.Brand>
                  <h1>LitLend</h1>
                </Navbar.Brand>
              </Navbar.Header>
              <NavItem href={`/${this.props.username}`} onClick={this.handleNavLink}> Home</NavItem>
              <NavItem href={`/${this.props.username}/browse`} onClick={this.handleNavLink}>Browse</NavItem>
              <NavItem href="/search" onClick={this.handleNavLink}>Search</NavItem>
              <NavItem href="/login" onClick={this.logOut}>Log Out</NavItem>
            </Nav>
          </Navbar>
        </div>
      )
    } else {
      return null
    }
  }
}

export default withRouter(TestNavBar)
