import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'
import { DateTime, Settings } from 'luxon'
import PropTypes from 'prop-types'
import { setNotification } from '../reducers/notificationReducer'
import Target from './Target'
import FilterTargetsForm from './FilterTargetsForm'
import JsonToCSV from '../utils/JsonToCSV'
import Paginator from './Paginator'

const TargetDives = (props) => {

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
  const filterByTarget = (target) => {
    return ((targetFilter.length === 0) ||
      (target && target.name.toUpperCase().includes(targetFilter.toUpperCase())))
  }
  const filterByCreator = (divingEvent) => {
    return ((!(divingEvent.creator.username) && creatorFilter.length === 0) || (divingEvent.creator.username === undefined) ||
      (divingEvent.creator && divingEvent.creator.username.toUpperCase().includes(creatorFilter.toUpperCase())))
  }

  const filteredTargets = props.targets.filter(target =>
    //filterByStartdate(target) &&
    //filterByEnddate(target) &&
    //filterByTitle(target) &&
    //filterByDescription(target) &&
    filterByTarget(target) //&&
    //filterByCreator(target)
  )

  const itemsOnPage = 20
  const pages = Math.ceil(filteredTargets.length / itemsOnPage)

  const targetsToDisplay = () => {
    var offset = (currentPage - 1) * itemsOnPage
    return (
      filteredTargets.map((target, index) => {
        if (index >= offset && index < (offset + itemsOnPage)) {
          return <Target key={target._id} target={target} elementID={target._id} />
        } else {
          return null
        }
      })
    )
  }

  const jsonToCSV = () => {
    if (filteredTargets !== undefined && filteredTargets !== null) {
      return (
        <JsonToCSV content={filteredTargets} sep={';'} dec={','} filename={'kohteidensukellukset.csv'} />
      )
    } else {
      return null
    }
  }

  return (
    <div>
      <h2>Kohteiden sukellukset</h2>
      <FilterTargetsForm
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
        Näytetään {filteredTargets.length}/{props.targets.length} kohdetta.
        &nbsp;
        {jsonToCSV()}
      </div>
      <Table bordered hover size="sm">
        <thead>
          <tr id="target">
            <th width="2.5%"></th>
            <th width="40%" colSpan="2">Kohde</th>
            <th width="57.5%" colSpan="4">Sijainti</th>
          </tr>
        </thead>
        <tbody>
          {targetsToDisplay()}
        </tbody>
      </Table>
      <Paginator current={currentPage} pages={pages} handlePageSelect={handlePageSelect} />
    </div>
  )
}
TargetDives.propTypes = {
  setNotification: PropTypes.func.isRequired,
  loggedUser: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    targets: state.targets,
    loggedUser: state.authentication.loggedUser
  }
}

const mapDispatchToProps = {
  setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(TargetDives)