import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Collapse } from 'react-bootstrap'
import UpdateBOUserForm from './UpdateBOUserForm'
import CreateBOUserForm from './CreateBOUserForm'
import { createBOUser, updateBOUser, deleteBOUser, initializeBOUsers } from '../reducers/bouserReducer'

const BOUser = (props) => {

  const bouser = props.bouser

  const [showBOUserDetails, setShowBOUserDetails] = useState(false)
  const [usernameField, setUsernameField] = useState(bouser.username)
  const [passwordField, setPasswordField] = useState('')
  const [verifyField, setVerifyField] = useState('')
  const [adminField, setAdminField] = useState(bouser.admin)
  const [isAdmin, setIsAdmin] = useState(bouser.admin)

  useEffect(() => {
    if (document.getElementById(`isAdmin${bouser._id}`)) {
      document.getElementById(`isAdmin${bouser._id}`).innerHTML = (isAdmin ? 'Pääkäyttäjä' : 'Ei pääkäyttäjä')
    }
    if (document.getElementById(`delete${props.bouser._id}`)) {
      document.getElementById(`delete${props.bouser._id}`).disabled = isAdmin
    }
    if (document.getElementById(`delhint${props.bouser._id}`)) {
      document.getElementById(`delhint${props.bouser._id}`).innerHTML = (isAdmin ? 'Et voi poistaa pääkäyttäjää' : '')
    }
  })

  const handleUsernameField = (event) => {
    setUsernameField(event.target.value)
  }
  const handlePasswordField = (event) => {
    setPasswordField(event.target.value)
  }
  const handleVerifyField = (event) => {
    setVerifyField(event.target.value)
  }
  const handleAdminField = (event) => {
    setAdminField(event.target.value)
  }

  const clearFields = () => {
    setUsernameField('')
    setPasswordField('')
    setAdminField(false)
    setShowBOUserDetails(false)
  }

  const handleBOUserCancel = (event) => {
    event.preventDefault()
    clearFields()
  }

  const handleBOUserCreate = (event) => {
    event.preventDefault()
    if (passwordField === verifyField) {
      try {
        props.createBOUser(usernameField, passwordField, adminField)
        clearFields()
      } catch (error) {
        //console.log('Error handling create', error, event.target.value)
      }
    }
  }

  const handleBOUserUpdate = async (event) => {
    event.preventDefault()
    if (passwordField === verifyField) {
      try {
        //console.log('Handle update, id =', event.target.value, 'username =', usernameField, 'admin =', adminField)
        bouser.username = usernameField
        bouser.password = passwordField
        bouser.admin = (adminField === 'true')
        await props.updateBOUser(bouser)
        setIsAdmin(adminField === 'true')
        setShowBOUserDetails(false)
      } catch (error) {
        //console.log('Error handling update', error, event.target.value)
      }
    }
  }

  const handleBOUserDelete = (event) => {
    event.preventDefault()
    try {
      if (window.confirm(`Haluatko varmasti poistaa käyttäjän ${usernameField}?`)) {
        //console.log('Handle delete, id =', event.target.value, 'username =', usernameField, 'admin =', adminField)
        props.deleteBOUser(bouser)
        setShowBOUserDetails(false)
      }
    } catch (error) {
      //console.log('Error handling delete', error, event.target.value)
    }
  }

  if (bouser._id === 'newBOUser') {
    return (
      <>
        <tr onClick={() => setShowBOUserDetails(!showBOUserDetails)}
          aria-controls={bouser._id}
          aria-expanded={showBOUserDetails}>
          <td><i className='fas fa-user-plus'></i></td>
          <td>Lisää uusi Back Office käyttäjä</td>
          <td>&nbsp;</td>
        </tr>
        <Collapse in={showBOUserDetails}>
          <tr id={bouser._id}>
            <td colSpan="7">
              <CreateBOUserForm bouserid={bouser._id}
                usernameField={usernameField}
                handleUsernameField={handleUsernameField}
                passwordField={passwordField}
                handlePasswordField={handlePasswordField}
                verifyField={verifyField}
                handleVerifyField={handleVerifyField}
                adminField={adminField}
                handleAdminField={handleAdminField}
                handleBOUserCancel={handleBOUserCancel}
                handleBOUserCreate={handleBOUserCreate} />
            </td>
          </tr>
        </Collapse>
      </>
    )
  } else {
    return (
      <>
        <tr onClick={() => setShowBOUserDetails(!showBOUserDetails)}
          aria-controls={bouser._id}
          aria-expanded={showBOUserDetails}>
          <td><i className={showBOUserDetails ? 'fas fa-user-edit' : 'fas fa-user'}></i></td>
          <td>{bouser.username}</td>
          <td><span id={`isAdmin${bouser._id}`}></span></td>
        </tr>
        <Collapse in={showBOUserDetails}>
          <tr id={bouser._id}>
            <td colSpan="7">
              <UpdateBOUserForm bouserid={bouser._id}
                usernameField={usernameField}
                handleUsernameField={handleUsernameField}
                passwordField={passwordField}
                handlePasswordField={handlePasswordField}
                verifyField={verifyField}
                handleVerifyField={handleVerifyField}
                adminField={adminField}
                handleAdminField={handleAdminField}
                handleBOUserCancel={handleBOUserCancel}
                handleBOUserUpdate={handleBOUserUpdate}
                handleBOUserDelete={handleBOUserDelete} />
            </td>
          </tr>
        </Collapse>
      </>
    )
  }


}

const mapStateToProps = (state) => {
  return {
    bousers: state.bousers,
    loggedUser: state.authentication.loggedUser
  }
}

const mapDispatchToProps = {
  createBOUser, updateBOUser, deleteBOUser, initializeBOUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(BOUser)