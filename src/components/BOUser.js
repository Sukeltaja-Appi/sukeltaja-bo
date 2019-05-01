import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Collapse } from 'react-bootstrap'
import UpdateBOUserForm from './UpdateBOUserForm'
import { updateBOUser, deleteBOUser, initializeBOUsers } from '../reducers/bouserReducer'

const BOUser = (props) => {

  const bouser = props.bouser

  const [showBOUserDetails, setShowBOUserDetails] = useState(false)
  const [usernameField, setUsernameField] = useState(bouser.username)
  const [adminField, setAdminField] = useState(bouser.admin)

  const handleUsernameField = (event) => {
    setUsernameField(event.target.value)
  }
  const handleAdminField = (event) => {
    setAdminField(event.target.value)
  }

  const updateBouser = async () => {
    console.log('Update bouser', usernameField, adminField)
    bouser.username = usernameField
    bouser.admin = adminField
    await updateBOUser(bouser)
  }
  const deleteBouser = async () => {
    await deleteBOUser(bouser)
  }
  const initializeBousers = async () => {
    await initializeBOUsers()
  }

  const handleBOUserUpdate = (event) => {
    try {
      console.log('Handle update, id =', event.target.value, 'username =', usernameField, 'admin =', adminField)
      updateBouser()
      initializeBousers()
    } catch (error) {
      console.log('Error handling update', error, event.target.value)
    }
  }

  const handleBOUserDelete = (event) => {
    try {
      if (window.confirm(`Haluatko varmasti poistaa käyttäjän ${usernameField}?`)) {
        console.log('Handle delete, id =', event.target.value, 'username =', usernameField, 'admin =', adminField)
        deleteBouser()
        initializeBousers()
      }
    } catch (error) {
      console.log('Error handling delete', error, event.target.value)
    }
  }

  const details = () => {
    return (
      <Collapse in={showBOUserDetails}>
        <tr id={bouser._id}>
          <td colSpan="7">
            <UpdateBOUserForm bouserid={bouser._id}
              usernameField={usernameField}
              handleUsernameField={handleUsernameField}
              adminField={adminField}
              handleAdminField={handleAdminField}
              handleBOUserUpdate={handleBOUserUpdate}
              handleBOUserDelete={handleBOUserDelete}
              buttonText={bouser._id === 'newBOUser' ? 'Lisää' : 'Päivitä'} />
          </td>
        </tr>
      </Collapse>
    )
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
        {details()}
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
          <td>{bouser.admin ? 'Pääkäyttäjä' : ''}</td>
        </tr>
        {details()}
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
  updateBOUser, deleteBOUser, initializeBOUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(BOUser)