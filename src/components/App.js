import React, { useState, useEffect } from 'react'
import divingEventService from '../services/divingEventService'
import DivingEvents from './DivingEvents'
import FilterForm from './FilterForm'

const App = () => {
  const [divingEvents, setDivingEvents] = useState([])
  const [titleFilter, setTitleFilter] = useState('')
  const [targetFilter, setTargetFilter] = useState('')
  const [userFilter, setUserFilter] = useState('')

  useEffect(() => {
    divingEventService
      .getAll()
      .then(divingEvents => {
        setDivingEvents(divingEvents)
      })
  }, [])

  const handleTitleFiltering = (event) => {
    setTitleFilter(event.target.value)
  }
  const handleTargetFiltering = (event) => {
    setTargetFilter(event.target.value)
  }
  const handleUserFiltering = (event) => {
    setUserFilter(event.target.value)
  }

  return (
    <div>
      <h2>Sukellustapahtumat</h2>
      <FilterForm
        titleFilter={titleFilter}
        handleTitleFiltering={handleTitleFiltering}
        targetFilter={targetFilter}
        handleTargetFiltering={handleTargetFiltering}
        userFilter={userFilter}
        handleUserFiltering={handleUserFiltering}
      />
      <DivingEvents
        divingEvents={divingEvents}
        titleFilter={titleFilter}
        targetFilter={targetFilter}
        userFilter={userFilter} />
    </div>
  )

}

export default App