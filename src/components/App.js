import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { storageKeyUser } from '../utils/config'
import { initializeTargets } from '../reducers/targetReducer'
import { initializeEvents } from '../reducers/eventReducer'
import { mapDivesToTargets } from '../reducers/divesReducer'
import { setNotification } from '../reducers/notificationReducer'
import Notification from './Notification'
import Login from './Login'
import Logout from './Logout'
import Home from './Home'
import DivingEvents from './DivingEvents'
import TargetDives from './TargetDives';

const App = (props) => {

  const haveUser = () => {
    return (props.loggedUser !== undefined && props.loggedUser !== null)
  }

  const storageUserToUser = () => {
    const loggedUserJSON = window.localStorage.getItem(storageKeyUser)
    if (loggedUserJSON && loggedUserJSON.length > 0 && loggedUserJSON !== 'null') {
      return JSON.parse(loggedUserJSON)
    } else {
      return null
    }
  }

  const initializeAtStartUp = async () => {
    console.log('Initialize at App')
    // Any initializations at login should be done here async at login if necessary
    props.setNotification('success', 'Tervetuloa! Muista hengittää rauhallisesti!', 5)
    if (props.events === undefined || props.events === null || props.events.length === 0) {
      await props.initializeEvents()
      await props.mapDivesToTargets()
    }
    if (props.targets === undefined || props.targets === null || props.targets.length === 0) {
      await props.initializeTargets()
    }
    //await props.initializeUsers()
  }

  useEffect(() => {
    //console.log("Checking if we have a token...")
    const user = storageUserToUser()
    if (user !== undefined && user !== null) {
      //console.log("Storage user was", user)
      initializeAtStartUp()
    }
  }, [])


  // Define preferred link style in Nav
  const navLinkStyle = {}

  // This is to prevent the top of the page to be hiding behind the Navbar
  const topPadding = { "paddingTop": "70px" }

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
      <Container style={topPadding}>
        <Router>
          <div>
            <div>
              <Navbar fixed="top" collapseOnSelect expand="md" bg="warning" variant="dark">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav>
                    <Nav.Link as="span">
                      <Link style={navLinkStyle} to="/">Alkuun</Link>
                    </Nav.Link>
                    <Nav.Link as="span">
                      <Link style={navLinkStyle} to="/targets">Kohteiden sukellukset</Link>
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
                <Route exact path="/targets" render={() => <TargetDives />} />
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
    targets: state.targets,
    events: state.events,
    targetDives: state.targetDives,
    loggedUser: state.authentication.loggedUser
  }
}

const mapDispatchToProps = {
  initializeTargets,
  initializeEvents,
  mapDivesToTargets,
  setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
