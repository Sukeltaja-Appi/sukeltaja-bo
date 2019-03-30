import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { storageKeyUser } from '../utils/config'
import { setNotification } from '../reducers/notificationReducer'
import { loginUser, reLoginUser } from '../reducers/authenticationReducer'

const Login = (props) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const storageUserToUser = () => {
    const loggedUserJSON = window.localStorage.getItem(storageKeyUser)
    if (loggedUserJSON && loggedUserJSON.length > 0 && loggedUserJSON !== 'null') {
      return JSON.parse(loggedUserJSON)
    } else {
      return null
    }
  }

  const initializeAtStartUp = async () => {
    //console.log('Initialize at Login')
    // Any initializations at login should be done here async at login if necessary
    //await props.initializeEvents()
    //await props.initializeUsers()
  }

  useEffect(() => {
    // First check from local storage if user is already logged
    const user = storageUserToUser()
    if (user !== undefined && user !== null) {
      // A user token was found
      // console.log("Storage user was", user)
      props.reLoginUser(user)
      initializeAtStartUp()
    }
  }, [])

  const handleUsername = (event) => {
    setUsername(event.target.value)
  }
  const handlePassword = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = async (event) => {
    console.log("Logging in", username)
    event.preventDefault()
    try {
      await props.loginUser(username, password)
      initializeAtStartUp()
      await props.setNotification('success', 'Tervetuloa! Muista hengittää rauhallisesti!', 5)
    } catch (exception) {
      await props.setNotification('danger', 'Käyttäjätunnus tai salasana on virheellinen', 5)
    }
  }

  if (props.loggedUser === undefined || props.loggedUser === null) {
    return (
      <div>
        <h2>Sukeltaja Back Office</h2>
        <Form onSubmit={handleLogin}>
          <Form.Group>
            <Form.Label>Käyttäjätunnus</Form.Label>
            <Form.Control type="text" name="username"
              placeholder="Syötä käyttäjätunnus" onChange={handleUsername} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Salasana</Form.Label>
            <Form.Control type="password" name="password"
              placeholder="Syötä salasana" onChange={handlePassword} />
          </Form.Group>
          <Form.Group>
            <Button variant="primary" type="submit">Kirjaudu</Button>
          </Form.Group>
          <p />
        </Form>
      </div >
    )
  } else {
    if (window.location.pathname !== "/") {
      return (
        <Redirect to="/"></Redirect>
      )
    } else {
      return null
    }
  }

}
Login.propTypes = {
  loggedUser: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.authentication.loggedUser
  }
}

const mapDispatchToProps = {
  loginUser,
  reLoginUser,
  setNotification,
  //initializeBlogs,
  //initializeUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)