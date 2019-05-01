import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { setNotification } from '../reducers/notificationReducer'
import User from './User'
import FilterUsersForm from './FilterUsersForm'
import JsonToCSV from '../utils/JsonToCSV'
import Paginator from './Paginator'

const Users = (props) => {

  const allUsers = props.users

  const [currentPage, setCurrentPage] = useState(1)
  const [usernameFilter, setUsernameFilter] = useState('')
  const [emailFilter, setEmailFilter] = useState('')

  const initStuff = async () => {
    // If something needs to be done when page loaded
  }

  useEffect(() => {
    initStuff()
  }, [])

  const handlePageSelect = (event) => {
    try {
      setCurrentPage(parseInt(event.target.id))
    } catch (error) {
      // Do nothing
    }
  }

  const handleUsernameFiltering = (event) => {
    setUsernameFilter(event.target.value)
  }
  const handleEmailFiltering = (event) => {
    setEmailFilter(event.target.value)
  }

  const filterByUsername = (user) => {
    return ((!(user.username) && usernameFilter.length === 0) ||
      (user.username && user.username.toUpperCase().includes(usernameFilter.toUpperCase())))
  }
  const filterByEmail = (user) => {
    return ((!(user.email) && emailFilter.length === 0) ||
      (user.email && user.email.toUpperCase().includes(emailFilter.toUpperCase())))
  }

  const filteredUsers = allUsers.filter(user =>
    filterByUsername(user) &&
    filterByEmail(user)
  )

  const itemsOnPage = 20
  const pages = Math.ceil(filteredUsers.length / itemsOnPage)

  const usersToDisplay = () => {
    var offset = (currentPage - 1) * itemsOnPage
    return (
      filteredUsers.map((user, index) => {
        if (index >= offset && index < (offset + itemsOnPage)) {
          return <User key={user._id} user={user} />
        } else {
          return null
        }
      })
    )
  }

  const jsonToCSV = () => {
    if (filteredUsers !== undefined && filteredUsers !== null) {
      return (
        <JsonToCSV contentType={'users'} content={filteredUsers} sep={';'} dec={','} />
      )
    } else {
      return null
    }
  }

  return (
    <div>
      <h2>Sukeltajat</h2>
      <FilterUsersForm
        usernameFilter={usernameFilter}
        handleUsernameFiltering={handleUsernameFiltering}
        emailFilter={emailFilter}
        handleEmailFiltering={handleEmailFiltering}
      />
      <div id="caption">
        Näytetään {filteredUsers.length}/{props.users.length} käyttäjää.
        &nbsp;
        {jsonToCSV()}
      </div>
      <Table bordered hover size="sm">
        <thead>
          <tr>
            <th width="2.5%"></th>
            <th width="30%">Käyttäjä</th>
            <th width="30%">Sähköposti</th>
            <th width="12.5%">Tapahtumia</th>
            <th width="12.5%">Sukelluksia</th>
            <th width="12.5%" colSpan="2">Viestejä</th>
          </tr>
        </thead>
        <tbody>
          {usersToDisplay()}
        </tbody>
      </Table>
      <Paginator current={currentPage} pages={pages} handlePageSelect={handlePageSelect} />
    </div>
  )
}
Users.propTypes = {
  setNotification: PropTypes.func.isRequired,
  loggedUser: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    loggedUser: state.authentication.loggedUser
  }
}

const mapDispatchToProps = {
  setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)