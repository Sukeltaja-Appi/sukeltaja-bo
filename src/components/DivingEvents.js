import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'
import { DateTime, Settings } from 'luxon'
import { CSVLink } from 'react-csv'
import PropTypes from 'prop-types'
import { initializeEvents } from '../reducers/eventReducer'
import { setNotification } from '../reducers/notificationReducer'
import DivingEvent from './DivingEvent'
import FilterForm from './FilterForm'
import { JsonToCSV } from '../utils/JsonToCSV'

//const eventHeaders = require('../utils/eventHeaders.json') 

const eventHeaders = [
  { "label": "Alkuaika", "key": "startdate" },
  { "label": "Loppuaika", "key": "enddate" },
  { "label": "Perustaja", "key": "creator.username" },
  { "label": "Tapahtuma", "key": "title" },
  { "label": "Kuvaus", "key": "description" },
  { "label": "Pääkäyttäjät", "key": "admins.username" },
  { "label": "Osallistujat", "key": "participants.username" },
  //{ "label": "Kohde", "key": "target.name" },
  //{ "label": "Tyyppi", "key": "target.type" },
  //{ "label": "Materiaali", "key": "target.material" },
  //{ "label": "MJ-tunnus", "key": "target.mj_id" },
  //{ "label": "Leveyspiiri", "key": "target.latitude" },
  //{ "label": "Pituuspiiri", "key": "target.longitude" }
]

const DivingEvents = (props) => {

  Settings.defaultLocale = 'fi'

  const [startFilter, setStartFilter] = useState('')
  const [useStart, setUseStart] = useState('')
  const [endFilter, setEndFilter] = useState('')
  const [useEnd, setUseEnd] = useState('')
  const [titleFilter, setTitleFilter] = useState('')
  const [descriptionFilter, setDescriptionFilter] = useState('')
  const [targetFilter, setTargetFilter] = useState('')
  const [userFilter, setUserFilter] = useState('')

  const initStuff = async () => {
    await props.initializeEvents()
  }

  useEffect(() => {
    initStuff()
  }, [])

  function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
  }

  const handleStartFiltering = (event) => {
    try {
      let startdate = DateTime.fromFormat(event.target.value, 'd.M.yyyy', 'fi-FI').toJSDate()
      if (isValidDate(startdate)) {
        setUseStart(startdate)
      }
      setStartFilter(event.target.value)
    } catch (error) {
      console.log("Error with startdate", event.target.value)
    }
  }
  const handleEndFiltering = (event) => {
    try {
      let enddate = DateTime.fromFormat(event.target.value, 'd.M.yyyy', 'fi-FI')
        .plus({ days: 1 }).plus({ minutes: -1 }).toJSDate()
      if (isValidDate(enddate)) {
        setUseEnd(enddate)
      }
      setEndFilter(event.target.value)
    } catch (error) {
      console.log("Error with enddate", event.target.value)
    }
  }

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

  const filterByStartdate = (divingEvent) => {
    return ((startFilter.length === 0) ||
      (new Date(divingEvent.startdate) >= new Date(useStart)))
  }
  const filterByEnddate = (divingEvent) => {
    return ((endFilter.length === 0) ||
      (new Date(divingEvent.enddate) <= new Date(useEnd)))
  }
  const filterByTitle = (divingEvent) => {
    return ((!(divingEvent.title) && titleFilter.length === 0) ||
      (divingEvent.title && divingEvent.title.toUpperCase().includes(titleFilter.toUpperCase())))
  }
  const filterByDescription = (divingEvent) => {
    return ((!(divingEvent.description) && descriptionFilter.length === 0) ||
      (divingEvent.description && divingEvent.description.toUpperCase().includes(descriptionFilter.toUpperCase())))
  }
  const filterByTarget = (divingEvent) => {
    return ((!(divingEvent.target) && targetFilter.length === 0) ||
      (divingEvent.target && divingEvent.target.name.toUpperCase().includes(targetFilter.toUpperCase())))
  }
  const filterByUsername = (divingEvent) => {
    return ((!(divingEvent.creator.username) && userFilter.length === 0) || (divingEvent.creator.username === undefined) ||
      (divingEvent.creator && divingEvent.creator.username.toUpperCase().includes(userFilter.toUpperCase())))
  }

  // Eslint warnings disabled from the following. It doesn't like && combined with ||.
  // We could perhaps make it more elegant but for now it works.
  // Have to be careful with comparing items that could be null.
  // eslint-disable-next-line
  const filteredEvents = props.events.filter(divingEvent =>
    filterByStartdate(divingEvent) &&
    filterByEnddate(divingEvent) &&
    filterByTitle(divingEvent) &&
    filterByDescription(divingEvent) &&
    filterByTarget(divingEvent) &&
    filterByUsername(divingEvent)
  )

  const eventsToDisplay = () => filteredEvents.map(divingEvent =>
    <DivingEvent key={divingEvent._id} divingEvent={divingEvent} />
  )

  const csvlink = () => {
    if (filteredEvents !== undefined && filteredEvents !== null) {
      return (
        <CSVLink
          data={filteredEvents}
          headers={eventHeaders}
          filename={"Sukellustapahtumat.csv"}
          separator={";"}>
          Lataa CSV
      </CSVLink>
      )
    } else {
      return null
    }
  }

  return (
    <div>
      <h2>Sukellustapahtumat</h2>
      <FilterForm
        startFilter={startFilter}
        handleStartFiltering={handleStartFiltering}
        endFilter={endFilter}
        handleEndFiltering={handleEndFiltering}
        titleFilter={titleFilter}
        handleTitleFiltering={handleTitleFiltering}
        descriptionFilter={descriptionFilter}
        handleDescriptionFiltering={handleDescriptionFiltering}
        targetFilter={targetFilter}
        handleTargetFiltering={handleTargetFiltering}
        userFilter={userFilter}
        handleUserFiltering={handleUserFiltering}
      />
      <div id="caption">
        Näytetään {filteredEvents.length}/{props.events.length} tapahtumaa.
        &nbsp;
        {csvlink()}
        &nbsp;
        <JsonToCSV />
      </div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Alkuaika</th>
            <th>Loppuaika</th>
            <th>Perustaja</th>
            <th colSpan="3">Tapahtuma</th>
          </tr>
        </thead>
        <tbody>
          {eventsToDisplay()}
        </tbody>
      </Table>
    </div>
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