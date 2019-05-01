import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { setNotification } from '../reducers/notificationReducer'
import BOUser from './BOUser'

const BOUsers = (props) => {

  const bousers = props.bousers
  const bousersCount = ((props.bousers === undefined || props.bousers === null) ? 0 : props.bousers.length)

  const initStuff = async () => {
    // If something needs to be done when page loaded
  }

  useEffect(() => {
    initStuff()
  }, [])

  const usersToDisplay = () => {
    if (bousers !== undefined && bousers !== null) {
      //console.log('Logged user', props.loggedUser)
      return (
        bousers.map((bouser) => {
          return <BOUser key={bouser._id} bouser={bouser} />
        })
      )
    } else {
      return null
    }
  }

  return (
    <div>
      <h2>Back Office käyttäjät</h2>
      <div id="caption">
        Näytetään {bousersCount}/{bousersCount} back office käyttäjää.
      </div>
      <Table bordered hover size="sm">
        <thead>
          <tr>
            <th width="2.5%"></th>
            <th width="47.5%">Käyttäjä</th>
            <th width="50%">Pääkäyttäjä</th>
          </tr>
        </thead>
        <tbody>
          {usersToDisplay()}
          <BOUser key={'newBOUser'} bouser={{"_id": "newBOUser", "admin": false}} />
        </tbody>
      </Table>
    </div>
  )
}
BOUsers.propTypes = {
  setNotification: PropTypes.func.isRequired,
  loggedUser: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    bousers: state.bousers,
    loggedUser: state.authentication.loggedUser
  }
}

const mapDispatchToProps = {
  setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(BOUsers)