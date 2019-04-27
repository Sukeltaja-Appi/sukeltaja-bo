import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { setNotification } from '../reducers/notificationReducer'

const Home = (props) => {

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
  setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)