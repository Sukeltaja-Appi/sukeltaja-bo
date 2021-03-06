import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { storageKeyUser } from '../utils/config'
import { setNotification } from '../reducers/notificationReducer'
import { logoutUser } from '../reducers/authenticationReducer'
import { clearEvents } from '../reducers/eventReducer'
import { clearDives } from '../reducers/divesReducer'
import { clearTargets } from '../reducers/targetReducer'
import { clearUsers } from '../reducers/userReducer'
import { clearBOUsers } from '../reducers/bouserReducer'

const Logout = (props) => {

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      console.log('Logging out user', props.loggedUser.username)
      await props.logoutUser()
      window.localStorage.removeItem(storageKeyUser)
      await props.clearEvents()
      await props.clearDives()
      await props.clearTargets()
      await props.clearUsers()
      await props.clearBOUsers()
      await props.setNotification('success', 'Olet kirjautunut ulos', 5)
      return
    } catch (exception) {
      props.setNotification('danger', 'Kautta Neptunuksen! Uloskirjautuminen meni pieleen!', 10)
    }
  }

  const logoutForm = () => {
    return (
      <div style={{color:"black"}}>
        Sukeltamassa {props.loggedUser.username}&nbsp;
        <Button variant="primary" size="sm" type="button" onClick={handleLogout}>Kirjaudu ulos</Button>
      </div>
    )
  }

  if (props.loggedUser === undefined || props.loggedUser === null) {
    return (
      <>&nbsp;</>
    )
  } else {
    return (
      <>{logoutForm()}</>
    )
  }

}
Logout.propTypes = {
  loggedUser: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.authentication.loggedUser
  }
}

const mapDispatchToProps = {
  logoutUser,
  clearEvents,
  clearDives,
  clearTargets,
  clearUsers,
  clearBOUsers,
  setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)