import React from 'react'
import DivingEvent from './DivingEvent'

const DivingEvents = (props) => {

  const divingEventsToShow = props.divingEvents.filter(divingEvent =>
    divingEvent.content.toUpperCase().includes(props.contentFilter.toUpperCase()) &&
    divingEvent.user.username.toUpperCase().includes(props.userFilter.toUpperCase()))

  const rows = () => divingEventsToShow.map(divingEvent =>
    <DivingEvent key={divingEvent.id} divingEvent={divingEvent} />
  )
  return (
    <tbody>{rows()}</tbody>
  )
}

export default DivingEvents