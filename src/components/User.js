import React, { useState } from 'react'
import { Collapse } from 'react-bootstrap'

const User = (props) => {

  const [showUserDetails, setShowUserDetails] = useState(false)

  const user = props.user
  const gotEvents = (
    user.events !== undefined && user.events !== null && user.events.length > 0
  )
  const gotDives = (
    user.dives !== undefined && user.dives !== null && user.dives.length > 0
  )
  const gotMessages = (
    user.messages !== undefined && user.messages !== null && user.messages.length > 0
  )

  const details = () => {
    return (
      <Collapse in={showUserDetails}>
        <tr id={user._id}>
          <td colSpan="7">
            Place updating functionality here
            </td>
        </tr>
      </Collapse>
    )
  }

  return (
    <>
      <tr onClick={() => setShowUserDetails(!showUserDetails)}
        aria-controls={user._id}
        aria-expanded={showUserDetails}>
        <td><i className={showUserDetails ? 'fas fa-caret-down' : 'fas fa-caret-right'}></i></td>
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td>{gotEvents ? user.events.length : 0}</td>
        <td>{gotDives ? user.dives.length : 0}</td>
        <td colSpan="2">{gotMessages ? user.messages.length : 0}</td>
      </tr>
      {details()}
    </>
  )

}

export default User
