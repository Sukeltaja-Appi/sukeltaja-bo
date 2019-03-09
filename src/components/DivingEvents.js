import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { initializeEvents } from '../reducers/eventReducer'
import { setNotification } from '../reducers/notificationReducer'
import DivingEvent from './DivingEvent'
import FilterForm from './FilterForm'

const DivingEvents = (props) => {

  const [divingEvents, setDivingEvents] = useState([])
  const [titleFilter, setTitleFilter] = useState('')
  const [descriptionFilter, setDescriptionFilter] = useState('')
  const [targetFilter, setTargetFilter] = useState('')
  const [userFilter, setUserFilter] = useState('')

  const haveEvents = () => {
    return (props.events !== undefined && props.events !== null)
  }
  const haveUser = () => {
    return (props.loggedUser !== undefined && props.loggedUser !== null)
  }

  const initStuff = async () => {
    await props.initializeEvents()
    console.log("Stuff initialized", props.events)
    await setDivingEvents(props.events)
    console.log("Events:", props.events.length)
  }

  useEffect(() => {
    initStuff()
  }, [])

  const handleTitleFiltering = (event) => {
    setTitleFilter(event.target.value)
  }
  const handleDescriptionFiltering = (event) => {
    setDescriptionFilter(event.target.value)
  }
  const handleTargetFiltering = (event) => {
    setTargetFilter(event.target.value)
  }
  const handleUserFiltering = (event) => {
    setUserFilter(event.target.value)
  }



  let filteredEvents = divingEvents

  // Eslint warnings disabled from the following. It doesn't like && combined with ||.
  // We could perhaps make it more elegant but for now it works.
  // Have to be careful with comparing items that could be null.
  // eslint-disable-next-line
  filteredEvents = divingEvents.filter(divingEvent =>
    ((!(divingEvent.title) && titleFilter.length === 0) ||
      (divingEvent.title && divingEvent.title.toUpperCase().includes(titleFilter.toUpperCase()))) &&
    ((!(divingEvent.description) && descriptionFilter.length === 0) ||
      (divingEvent.description && divingEvent.description.toUpperCase().includes(descriptionFilter.toUpperCase()))) &&
    ((!(divingEvent.target) && targetFilter.length === 0) ||
      (divingEvent.target && divingEvent.target.name.toUpperCase().includes(targetFilter.toUpperCase()))) &&
    ((!(divingEvent.creator.username) && userFilter.length === 0) ||
      (divingEvent.creator && divingEvent.creator.username.toUpperCase().includes(userFilter.toUpperCase())))
  )

  const eventsToDisplay = () => filteredEvents.map(divingEvent =>
    <DivingEvent key={divingEvent.id} divingEvent={divingEvent} />
  )

  return (
    <>
      <h2>Sukellustapahtumat</h2>
      <FilterForm
        titleFilter={titleFilter}
        handleTitleFiltering={handleTitleFiltering}
        descriptionFilter={descriptionFilter}
        handleDescriptionFiltering={handleDescriptionFiltering}
        targetFilter={targetFilter}
        handleTargetFiltering={handleTargetFiltering}
        userFilter={userFilter}
        handleUserFiltering={handleUserFiltering}
      />
      <table>
        <tbody>
          <tr>
            <td>Näytetään {eventsToDisplay().length}/{divingEvents.length} tapahtumaa</td>
          </tr>
        </tbody>
      </table>
      <table id="divingevents">
        <tbody>
          <tr>
            <th>Alkuaika</th>
            <th>Loppuaika</th>
            <th>Perustaja</th>
            <th colSpan="3">Tapahtuma</th>
          </tr>
          {eventsToDisplay()}
        </tbody>
      </table>
    </>
  )
}
DivingEvents.propTypes = {
  setNotification: PropTypes.func.isRequired,
  loggedUser: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    events: state.events,
    loggedUser: state.authentication.loggedUser
  }
}

const mapDispatchToProps = {
  setNotification,
  initializeEvents
}

export default connect(mapStateToProps, mapDispatchToProps)(DivingEvents)