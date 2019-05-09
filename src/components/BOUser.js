import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Collapse } from 'react-bootstrap'
import UpdateBOUserForm from './UpdateBOUserForm'
import CreateBOUserForm from './CreateBOUserForm'
import { createBOUser, updateBOUser, deleteBOUser, initializeBOUsers } from '../reducers/bouserReducer'

const BOUser = (props) => {

  const bouser = props.bouser
  const currentuser = (props.bouser._id === props.loggedUser.id)
  const newuser = (bouser._id === 'newBOUser')

  const [showBOUserDetails, setShowBOUserDetails] = useState(false)
  const [usernameField, setUsernameField] = useState(bouser.username || '')
  const [passwordField, setPasswordField] = useState('')
  const [verifyField, setVerifyField] = useState('')
  const [adminField, setAdminField] = useState(bouser.admin)
  const [isAdmin, setIsAdmin] = useState(bouser.admin)

  const nameInUse = () => { return (props.bousers.some(bou => bou.username === usernameField.trim())) }

  const controlUsername = () => {
    if (document.getElementById(`usernamehint${bouser._id}`)) {
      if (newuser) {
        if (usernameField.trim() === '') {
          document.getElementById(`usernamehint${bouser._id}`).innerHTML = 'Syötä käyttäjätunnus'
        } else {
          document.getElementById(`usernamehint${bouser._id}`).innerHTML =
            (nameInUse() ? 'Tämä käyttäjätunnus on jo käytössä' : 'Tämä käyttäjätunnus on vapaana')
        }
      } else {
        document.getElementById(`usernamehint${bouser._id}`).innerHTML = 'Käyttäjätunnusta ei voi vaihtaa'
      }
    }
  }
  const controlPassword = () => {
    if (document.getElementById(`passwordhint${bouser._id}`) && document.getElementById(`verifyhint${bouser._id}`)) {
      if (passwordField === '' && verifyField === '') {
        if (newuser) {
          document.getElementById(`passwordhint${bouser._id}`).innerHTML = 'Syötä salasana'
          document.getElementById(`verifyhint${bouser._id}`).innerHTML = 'Syötä salasana uudestaan'
        } else {
          document.getElementById(`passwordhint${bouser._id}`).innerHTML =
            'Syötä uusi salasana, jos haluat vaihtaa salasanan'
          document.getElementById(`verifyhint${bouser._id}`).innerHTML =
            'Syötä salasana uudestaan, jos haluat vaihtaa salasanan'
        }
      } else {
        if (passwordField !== verifyField) {
          document.getElementById(`passwordhint${bouser._id}`).innerHTML = 'Salasanat eivät täsmää'
          document.getElementById(`verifyhint${bouser._id}`).innerHTML = 'Salasanat eivät täsmää'
        } else {
          document.getElementById(`passwordhint${bouser._id}`).innerHTML = 'Salasanat täsmäävät'
          document.getElementById(`verifyhint${bouser._id}`).innerHTML = 'Salasanat täsmäävät'
        }
      }
    }
  }
  const controlAdmin = () => {
    if (document.getElementById(`isAdmin${bouser._id}`)) {
      document.getElementById(`isAdmin${bouser._id}`).innerHTML = (isAdmin ? 'Pääkäyttäjä' : 'Ei pääkäyttäjä')
    }
    if (document.getElementById(`setadmin${props.bouser._id}`)) {
      document.getElementById(`setadmin${props.bouser._id}`).disabled = currentuser
    }
    if (document.getElementById(`adminhint${bouser._id}`)) {
      document.getElementById(`adminhint${bouser._id}`).innerHTML =
        (currentuser ? 'Et voi poistaa itseltäsi pääkäyttäjyyttä' : 'Valitse onko käyttäjä pääkäyttäjä')
    }
    if (document.getElementById(`delete${props.bouser._id}`)) {
      document.getElementById(`delete${props.bouser._id}`).disabled = isAdmin
    }
    if (document.getElementById(`delhint${props.bouser._id}`)) {
      document.getElementById(`delhint${props.bouser._id}`).innerHTML = (isAdmin ? 'Et voi poistaa pääkäyttäjää' : '')
    }
  }

  useEffect(() => {
    controlUsername()
    controlPassword()
    controlAdmin()
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
    document.getElementById(`setusername${bouser._id}`).value = ''
    setPasswordField('')
    document.getElementById(`setpassword${bouser._id}`).value = ''
    setVerifyField('')
    document.getElementById(`setverify${bouser._id}`).value = ''
    setAdminField(false)
  }

  const revertFields = () => {
    setPasswordField('')
    document.getElementById(`setpassword${bouser._id}`).value = ''
    setVerifyField('')
    document.getElementById(`setverify${bouser._id}`).value = ''
    setAdminField(bouser.admin)
    document.getElementById(`setadmin${bouser._id}`).value = bouser.admin
  }

  const handleToggleBOUserDetails = () => {
    setShowBOUserDetails(!showBOUserDetails)
    if (!showBOUserDetails) {
      if (newuser) {
        clearFields()
      } else {
        revertFields()
      }
    }
  }

  const handleNewBOUserCancel = (event) => {
    event.preventDefault()
    clearFields()
    setShowBOUserDetails(false)
  }

  const handleBOUserCancel = (event) => {
    event.preventDefault()
    revertFields()
    setShowBOUserDetails(false)
  }

  const handleBOUserCreate = (event) => {
    event.preventDefault()
    if (passwordField === verifyField) {
      if (!nameInUse() && usernameField.trim() !== '') {
        try {
          props.createBOUser(usernameField.trim(), passwordField, adminField)
          clearFields()
        } catch (error) {
          //console.log('Error handling create', error, event.target.value)
        }
      } else {
        console.log('Username is taken or empty')
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
        bouser.admin = (adminField === 'true') // because it's a string
        await props.updateBOUser(bouser)
        setIsAdmin(adminField === 'true') // because it's a string
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

  if (newuser) {
    return (
      <>
        <tr onClick={() => handleToggleBOUserDetails()}
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
                handleNewBOUserCancel={handleNewBOUserCancel}
                handleBOUserCreate={handleBOUserCreate} />
            </td>
          </tr>
        </Collapse>
      </>
    )
  } else {
    return (
      <>
        <tr onClick={() => handleToggleBOUserDetails()}
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