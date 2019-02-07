import React, { useState, useEffect } from 'react'
import divingEventService from '../services/divingEventService'
import DivingEvents from './DivingEvents'
import FilterForm from './FilterForm'

const App = () => {
  const [divingEvents, setDivingEvents] = useState([])
  const [contentFilter, setContentFilter] = useState('')
  const [userFilter, setUserFilter] = useState('')

  const dummy = [
    {
      "id": "5c543ed527e5fa0004672878",
      "content": "Hai söi toisen jalan",
      "startdate": "2019-01-28T12:43:01.987Z",
      "enddate": "2019-01-28T12:43:08.206Z",
      "user": {
        "_id": "5c50563f2da79c31a0a4e7fe",
        "username": "KalleKapteeni"
      }
    },
    {
      "id": "678fa8f67f8df68df69fdfa",
      "content": "Hai vei kädetkin",
      "startdate": "2019-01-29T12:43:01.987Z",
      "enddate": "2019-01-29T12:43:08.206Z",
      "user": {
        "_id": "5c50563f2da79c31a0a4e7fe",
        "username": "KalleKapteeni"
      }
    },
    {
      "id": "lkjfalöf7d8af76f7d",
      "content": "Yritin etsiä haita, mutta törmäsin Titanicin hylkyyn",
      "startdate": "2019-01-30T12:43:01.987Z",
      "enddate": "2019-01-30T12:43:08.206Z",
      "user": {
        "_id": "h24kj4k2lkö1424k24",
        "username": "BörjeBörgelsson"
      }
    },
    {
      "id": "4f56df7g4hshghgfh36d2",
      "content": "Yritin etsiä Börjeä, mutta törmäsin haihin",
      "startdate": "2019-01-31T12:43:01.987Z",
      "enddate": "2019-01-31T12:43:08.206Z",
      "user": {
        "_id": "43434.3n4kmn3kj4h34",
        "username": "PaavoVäyrynen"
      }
    }
  ]

  useEffect(() => {
    //setDivingEvents(dummy)
    divingEventService
      .getAll()
      .then(divingEvents => {
        setDivingEvents(divingEvents)
      })
  }, [])

  const handleContentFiltering = (event) => {
    //console.log("Filter:", event.target.value)
    setContentFilter(event.target.value)
  }
  const handleUserFiltering = (event) => {
    //console.log("Filter:", event.target.value)
    setUserFilter(event.target.value)
  }

  return (
    <div>
      <h2>Sukellustapahtumat</h2>
      <FilterForm
        contentFilter={contentFilter}
        handleContentFiltering={handleContentFiltering}
        userFilter={userFilter}
        handleUserFiltering={handleUserFiltering}
      />
      <table id="divingevents">
        <DivingEvents divingEvents={divingEvents} contentFilter={contentFilter} userFilter={userFilter} />
      </table>
    </div>
  )

}

export default App