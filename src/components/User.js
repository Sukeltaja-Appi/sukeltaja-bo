import React, { useState } from 'react'
import { Collapse } from 'react-bootstrap'
import UpdateUserForm from './UpdateUserForm'

const User = (props) => {

  const user = props.user

  const updatingInUse = false; // Updating regular users is not yet implemented in the backend

  const [showUserDetails, setShowUserDetails] = useState(false)
  const [usernameField, setUsernameField] = useState(user.username)
  const [emailField, setEmailField] = useState(user.email)

  const handleUsernameField = (event) => {
    setUsernameField(event.target.value)
  }
  const handleEmailField = (event) => {
    setEmailField(event.target.value)
  }

  const gotEvents = (
    user.events !== undefined && user.events !== null && user.events.length > 0
  )
  const gotDives = (
    user.dives !== undefined && user.dives !== null && user.dives.length > 0
  )
  const gotMessages = (
    user.messages !== undefined && user.messages !== null && user.messages.length > 0
  )

  const handleUserUpdate = (event) => {
    try {
      console.log('Handle update, id =', event.target.value, 'username =', usernameField, 'email =', emailField)
    } catch (error) {
      console.log('Error handling update', error, event.target.value)
    }
  }

  const details = () => {
    return (
      <Collapse in={showUserDetails}>
        <tr id={user._id}>
          <td colSpan="7">
            <UpdateUserForm userid={user._id}
              usernameField={usernameField}
              handleUsernameField={handleUsernameField}
              emailField={emailField}
              handleEmailField={handleEmailField}
              handleUserUpdate={handleUserUpdate} />
          </td>
        </tr>
      </Collapse>
    )
  }

  if (updatingInUse) {
    return (
      <>
        <tr onClick={() => setShowUserDetails(!showUserDetails)}
          aria-controls={user._id}
          aria-expanded={showUserDetails}>
          <td><i className={showUserDetails ? 'fas fa-user-edit' : 'fas fa-user'}></i></td>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>{gotEvents ? user.events.length : 0}</td>
          <td>{gotDives ? user.dives.length : 0}</td>
          <td colSpan="2">{gotMessages ? user.messages.length : 0}</td>
        </tr>
        {details()}
      </>
    )
  } else {
    return (
        <tr>
          <td><i className='fas fa-user'></i></td>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>{gotEvents ? user.events.length : 0}</td>
          <td>{gotDives ? user.dives.length : 0}</td>
          <td colSpan="2">{gotMessages ? user.messages.length : 0}</td>
        </tr>
    )
  }

}

export default User
