import React from 'react'
import { connect } from 'react-redux'
import { Alert } from 'react-bootstrap'
import PropTypes from 'prop-types'

const Notification = (props) => {

  if (props.notMessage === undefined || props.notMessage === null || props.notMessage === '') {
    return null
  } else {
    console.log('Notmessage', props.notMessage)
    return (
      <div>
        <div>
          &nbsp;
        </div>
        <div>
          <Alert variant={props.notClass}>{props.notMessage}</Alert>
        </div>
        <div>
          &nbsp;
        </div>
      </div>
    )
  }
}

Notification.propTypes = {
  notMessage: PropTypes.string,
  notClass: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    notMessage: state.notification.notMessage,
    notClass: state.notification.notClass
  }
}

export default connect(
  mapStateToProps,
  null
)(Notification)