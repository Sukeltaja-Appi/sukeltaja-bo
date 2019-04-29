import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { setNotification } from '../reducers/notificationReducer'
import Target from './Target'
import FilterTargetsForm from './FilterTargetsForm'
import JsonToCSV from '../utils/JsonToCSV'
import Paginator from './Paginator'

const Targets = (props) => {

  const [currentPage, setCurrentPage] = useState(1)
  const [targetFilter, setTargetFilter] = useState('')
  const [northFilter, setNorthFilter] = useState(70.1) // Finland northest point
  const [westFilter, setWestFilter] = useState(19.0) // Finland most western point (at sea)
  const [southFilter, setSouthFilter] = useState(59.4) // Finland southest point (at sea)
  const [eastFilter, setEastFilter] = useState(31.6) // Finland most eastern point

  const initStuff = async () => {
    // Do stuff if needed
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
          return <Target key={target._id} target={target} elementID={target._id}/>
        } else {
          return null
        }
      })
    )
  }

  const jsonToCSV = () => {
    if (filteredTargets !== undefined && filteredTargets !== null) {
      return (
        <JsonToCSV contentType={'targets'} content={filteredTargets} sep={';'} dec={','} />
      )
    } else {
      return null
    }
  }

  return (
    <div>
      <h2>Kaikki kohteet</h2>
      <FilterTargetsForm
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
Targets.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Targets)