import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'
import { DateTime, Settings } from 'luxon'
import PropTypes from 'prop-types'
import { setNotification } from '../reducers/notificationReducer'
import DivingEvent from './DivingEvent'
import FilterEventsForm from './FilterEventsForm'
import JsonToCSV from '../utils/JsonToCSV'
import Paginator from './Paginator'

const DivingEvents = (props) => {

  Settings.defaultLocale = 'fi'

  const [currentPage, setCurrentPage] = useState(1)
  const [startFilter, setStartFilter] = useState('')
  const [useStart, setUseStart] = useState('')
  const [endFilter, setEndFilter] = useState('')
  const [useEnd, setUseEnd] = useState('')
  const [titleFilter, setTitleFilter] = useState('')
  const [descriptionFilter, setDescriptionFilter] = useState('')
  const [targetFilter, setTargetFilter] = useState('')
  const [creatorFilter, setCreatorFilter] = useState('')

  const initStuff = async () => {
    //await props.initializeEvents()
  }

  useEffect(() => {
    initStuff()
  }, [])

  function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
  }

  const handlePageSelect = (event) => {
    try {
      setCurrentPage(parseInt(event.target.id))
    } catch (error) {
      // Do nothing
    }
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
  const handleCreatorFiltering = (event) => {
    setCreatorFilter(event.target.value)
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
  const filterByCreator = (divingEvent) => {
    return ((!(divingEvent.creator.username) && creatorFilter.length === 0) || (divingEvent.creator.username === undefined) ||
      (divingEvent.creator && divingEvent.creator.username.toUpperCase().includes(creatorFilter.toUpperCase())))
  }

  const filteredEvents = props.events.filter(divingEvent =>
    filterByStartdate(divingEvent) &&
    filterByEnddate(divingEvent) &&
    filterByTitle(divingEvent) &&
    filterByDescription(divingEvent) &&
    filterByTarget(divingEvent) &&
    filterByCreator(divingEvent)
  )

  const itemsOnPage = 20
  const pages = Math.ceil(filteredEvents.length / itemsOnPage)

  const eventsToDisplay = () => {
    var offset = (currentPage - 1) * itemsOnPage
    return (
      filteredEvents.map((divingEvent, index) => {
        if (index >= offset && index < (offset + itemsOnPage)) {
          return <DivingEvent key={divingEvent._id} divingEvent={divingEvent} />
        } else {
          return null
        }
      })
    )
  }

  const jsonToCSV = () => {
    if (filteredEvents !== undefined && filteredEvents !== null) {
      return (
        <JsonToCSV content={filteredEvents} sep={';'} dec={','} filename={'sukellustapahtumat.csv'} />
      )
    } else {
      return null
    }
  }

  return (
    <div>
      <h2>Sukellustapahtumat</h2>
      <FilterEventsForm
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
        creatorFilter={creatorFilter}
        handleCreatorFiltering={handleCreatorFiltering}
      />
      <div id="caption">
        Näytetään {filteredEvents.length}/{props.events.length} tapahtumaa.
        &nbsp;
        {jsonToCSV()}
      </div>
      <Table bordered hover size="sm">
        <thead>
          <tr>
            <th width="2.5%"></th>
            <th width="17.5%">Alkuaika</th>
            <th width="17.5%">Loppuaika</th>
            <th width="15%">Perustaja</th>
            <th width="47.5%" colSpan="3">Tapahtuma</th>
          </tr>
        </thead>
        <tbody>
          {eventsToDisplay()}
        </tbody>
      </Table>
      <Paginator current={currentPage} pages={pages} handlePageSelect={handlePageSelect} />
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
  setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(DivingEvents)