import React, { useState, useEffect } from 'react'
import divingEventService from '../services/divingEventService'
import DivingEvents from './DivingEvents'
import FilterForm from './FilterForm'

const App = () => {
  const [divingEvents, setDivingEvents] = useState([])
  const [titleFilter, setTitleFilter] = useState('')
  const [userFilter, setUserFilter] = useState('')

  useEffect(() => {
    divingEventService
      .getAll()
      .then(divingEvents => {
        setDivingEvents(divingEvents)
      })
  }, [])

  const handleTitleFiltering = (event) => {
    //console.log("Filter:", event.target.value)
    setTitleFilter(event.target.value)
  }
  const handleUserFiltering = (event) => {
    //console.log("Filter:", event.target.value)
    setUserFilter(event.target.value)
  }

  return (
    <div>
      <h2>Sukellustapahtumat</h2>
      <FilterForm
        titleFilter={titleFilter}
        handleTitleFiltering={handleTitleFiltering}
        userFilter={userFilter}
        handleUserFiltering={handleUserFiltering}
      />
      <table id="divingevents">
        <DivingEvents divingEvents={divingEvents} titleFilter={titleFilter} userFilter={userFilter} />
      </table>
    </div>
  )

}

export default App