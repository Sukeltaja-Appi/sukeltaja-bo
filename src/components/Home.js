import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { storageKeyUser } from '../utils/config'
import { setNotification } from '../reducers/notificationReducer'

const Home = (props) => {

  const storageUserToUser = () => {
    const loggedUserJSON = window.localStorage.getItem(storageKeyUser)
    if (loggedUserJSON && loggedUserJSON.length > 0 && loggedUserJSON !== 'null') {
      return JSON.parse(loggedUserJSON)
    } else {
      return null
    }
  }

  const fillTanks = async () => {
    await console.log("Filling tanks...")
    // Any initializations at login should be done here async at login if necessary
    //await props.initializeEvents()
    //await props.initializeUsers()
  }

  useEffect(() => {
    console.log("Checking if we have a token...")
    const user = storageUserToUser()
    if (user !== undefined && user !== null) {
      console.log("Storage user was", user)
      fillTanks()
    }
  }, [])

  /*****************************************************/



  /*****************************************************/

  if (props.loggedUser !== undefined || props.loggedUser !== null) {
    return (
      <div>
        <h2>Sukeltaja Back Office</h2>
        <div>
        </div>
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
Home.propTypes = {
  loggedUser: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.authentication.loggedUser
  }
}

const mapDispatchToProps = {
  //loginUser,
  //reLoginUser,
  setNotification,
  //initializeBlogs,
  //initializeUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)