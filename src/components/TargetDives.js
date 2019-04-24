import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'
import { DateTime, Settings } from 'luxon'
import PropTypes from 'prop-types'
import { addDivesToTargets } from '../reducers/targetReducer'
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
  const [hasDivesFilter, setHasDivesFilter] = useState(true)
  const [noDivesFilter, setNoDivesFilter] = useState(false)
  const [targetFilter, setTargetFilter] = useState('')
  const [northFilter, setNorthFilter] = useState('')
  const [westFilter, setWestFilter] = useState('')
  const [southFilter, setSouthFilter] = useState('')
  const [eastFilter, setEastFilter] = useState('')

  const initStuff = async () => {
    await props.addDivesToTargets(props.events, props.targets)
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
      setCurrentPage(1)
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
      setCurrentPage(1)
    } catch (error) {
      console.log("Error with enddate", event.target.value)
    }
  }

  const handleHasDivesFiltering = () => {
    setHasDivesFilter(!hasDivesFilter)
    setCurrentPage(1)
  }
  const handleNoDivesFiltering = () => {
    setNoDivesFilter(!noDivesFilter)
    setCurrentPage(1)
  }
  const handleTargetFiltering = (event) => {
    setTargetFilter(event.target.value)
    setCurrentPage(1)
  }
  const handleNorthFiltering = (event) => {
    try {
      setNorthFilter(Number(event.target.value))
      setCurrentPage(1)
    } catch (error) {
      setNorthFilter(null)
    }
  }
  const handleWestFiltering = (event) => {
    try {
      setWestFilter(Number(event.target.value))
      setCurrentPage(1)
    } catch (error) {
      setWestFilter(null)
    }
  }
  const handleSouthFiltering = (event) => {
    try {
      setSouthFilter(Number(event.target.value))
      setCurrentPage(1)
    } catch (error) {
      setSouthFilter(null)
    }
  }
  const handleEastFiltering = (event) => {
    try {
      setEastFilter(Number(event.target.value))
      setCurrentPage(1)
    } catch (error) {
      setEastFilter(null)
    }
  }

  const filterByDives = (target) => {
    return ((hasDivesFilter === true && target.dives !== undefined) ||
      (noDivesFilter === true && target.dives === undefined))
  }
  const filterByStartdate = (target) => {
    return ((startFilter.length === 0) ||
      ((target.dives !== undefined && new Date(target.firstDive) >= new Date(useStart))))
  }
  const filterByEnddate = (target) => {
    return ((endFilter.length === 0) ||
    ((target.dives !== undefined && new Date(target.lastDive) >= new Date(useEnd))))
  }
  const filterByTarget = (target) => {
    return ((targetFilter.length === 0) ||
      (target && target.name.toUpperCase().includes(targetFilter.toUpperCase())))
  }
  const filterByNorth = (target) => {
    return ((northFilter !== null && northFilter.length === 0) ||
      (target && target.latitude <= northFilter))
  }
  const filterByWest = (target) => {
    return ((westFilter !== null && westFilter.length === 0) ||
      (target && target.longitude >= westFilter))
  }
  const filterBySouth = (target) => {
    return ((southFilter !== null && southFilter.length === 0) ||
      (target && target.latitude >= southFilter))
  }
  const filterByEast = (target) => {
    return ((eastFilter !== null && eastFilter.length === 0) ||
      (target && target.longitude <= eastFilter))
  }

  const filteredTargets = props.targets.filter(target =>
    filterByDives(target) &&
    filterByStartdate(target) &&
    filterByEnddate(target) &&
    filterByTarget(target) &&
    filterByNorth(target) &&
    filterByWest(target) &&
    filterBySouth(target) &&
    filterByEast(target)
  )

  const itemsOnPage = 20
  const pages = Math.ceil(filteredTargets.length / itemsOnPage)

  const targetsToDisplay = () => {
    var offset = (currentPage - 1) * itemsOnPage
    return (
      filteredTargets.map((target, index) => {
        if (index >= offset && index < (offset + itemsOnPage)) {
          return <Target key={target._id} target={target} elementID={target._id} dives={target.dives}/>
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
        hasDivesFilter={hasDivesFilter}
        handleHasDivesFiltering={handleHasDivesFiltering}
        noDivesFilter={noDivesFilter}
        handleNoDivesFiltering={handleNoDivesFiltering}
        targetFilter={targetFilter}
        handleTargetFiltering={handleTargetFiltering}
        northFilter={northFilter}
        handleNorthFiltering={handleNorthFiltering}
        westFilter={westFilter}
        handleWestFiltering={handleWestFiltering}
        southFilter={southFilter}
        handleSouthFiltering={handleSouthFiltering}
        eastFilter={eastFilter}
        handleEastFiltering={handleEastFiltering}
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
            <th width="40%" colSpan="2" id="caption">Kohde</th>
            <th width="57.5%" colSpan="4" id="caption">Sijainti</th>
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
    events: state.events,
    targets: state.targets,
    dives: state.dives,
    loggedUser: state.authentication.loggedUser
  }
}

const mapDispatchToProps = {
  addDivesToTargets,
  setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(TargetDives)