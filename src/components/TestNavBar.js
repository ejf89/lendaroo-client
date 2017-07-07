import React, {Component} from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { withRouter  } from 'react-router-dom'

class TestNavBar extends Component {
  handleNavLink = (event) => {
    event.preventDefault();
    this.props.history.push(event.currentTarget.getAttribute('href'));
  }

  logOut = (event) => {
    localStorage.clear()
    this.props.history.push(event.currentTarget.getAttribute('href'));
  }

  render(){
    return(
      <div>
        <Navbar justified fixedTop>
          <Nav >
              <NavItem href={`/${this.props.username}`} onClick={this.handleNavLink}> Home</NavItem>
              <NavItem href={`/${this.props.username}/browse`} onClick={this.handleNavLink}>Browse</NavItem>
              <NavItem href="/search" onClick={this.handleNavLink}>Search</NavItem>
              <NavItem href="/login" onClick={this.logOut}>Log Out</NavItem>
          </Nav>
        </Navbar>
      </div>
    )
  }
}

export default withRouter(TestNavBar)
