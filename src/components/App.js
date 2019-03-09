import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Navbar, Nav, Container } from 'react-bootstrap'
import Notification from './Notification'
import Login from './Login'
import Logout from './Logout'
import Home from './Home'
import DivingEvents from './DivingEvents'

const App = (props) => {

  const haveUser = () => {
    return (props.loggedUser !== undefined && props.loggedUser !== null)
  }

  // Define preferred link style in Nav
  const navLinkStyle = { }

  if (!haveUser()) {
    return (
      <Container>
        <div className="justify-content-sm-center">
          &nbsp;
        </div>
        <div className="justify-content-sm-center">
          <Notification />
        </div>
        <div className="justify-content-sm-center">
          <Login />
        </div>
      </Container>
    )
  } else {
    return (
      <Container>
        <Router>
          <div>
            <div>
              <Navbar collapseOnSelect expand="lg" bg="warning" variant="dark">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav>
                    <Nav.Link as="span">
                      <Link style={navLinkStyle} to="/">Alkuun</Link>
                    </Nav.Link>
                    <Nav.Link as="span">
                      <Link style={navLinkStyle} to="/events">Sukellustapahtumat</Link>
                    </Nav.Link>
                    <Navbar.Text as="span">
                      <Logout />
                    </Navbar.Text>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            </div>
            <div>
              <div>
                <Notification />
                <Route exact path="/" render={() => <Home />} />
                <Route exact path="/events" render={() => <DivingEvents />} />
              </div>
            </div>
          </div>
        </Router>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    events: state.events,
    loggedUser: state.authentication.loggedUser
  }
}

export default connect(mapStateToProps, null)(App)
