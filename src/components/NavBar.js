import React, {Component} from 'react';
import { Nav, NavItem } from 'react-bootstrap'
import { withRouter  } from 'react-router-dom'

class NavBar extends Component {
  handleNavLink = (event) => {
    event.preventDefault();
    this.props.history.push(event.currentTarget.getAttribute('href'));
  }

  logOut = (event) => {
    event.preventDefault();
    localStorage.clear()
    this.props.history.push(event.currentTarget.getAttribute('href'));
  }
  render(){
    return(
      <div>
        <Nav justified staticTop>
            <NavItem href={`/${this.props.username}`} onClick={this.handleNavLink}> Home</NavItem>
            <NavItem href="/browse" onClick={this.handleNavLink}>Browse</NavItem>
          
            <NavItem href="/login" onClick={this.logOut}>Log Out</NavItem>
        </Nav>
      </div> )
  }

}

export default withRouter(NavBar)
