import React from 'react'
import DivingEvent from './DivingEvent'

const DivingEvents = (props) => {

  var divingEventsToShow = props.divingEvents
  const titleFilter = props.titleFilter
  const userFilter = props.userFilter

  // eslint-disable-next-line
  if (props.divingEvents != null || props.divingEvents.length > 0) {
    divingEventsToShow = props.divingEvents.filter(divingEvent =>
      ((!(divingEvent.title) && titleFilter.length === 0) ||
        (divingEvent.title && divingEvent.title.toUpperCase().includes(titleFilter.toUpperCase()))) &&
      ((!(divingEvent.user.username) && userFilter.length === 0) ||
        (divingEvent.user.username && divingEvent.user.username.toUpperCase().includes(userFilter.toUpperCase())))
    )
  }

  /*
  if (!isNullOrUndefined(props.divingEvents) && props.divingEvents.length > 0) {
    divingEventsToShow = props.divingEvents.filter(divingEvent =>
      divingEvent.title.toUpperCase().includes(props.titleFilter.toUpperCase()) &&
      divingEvent.user.username.toUpperCase().includes(props.userFilter.toUpperCase()))
  }
  */

  const rows = () => divingEventsToShow.map(divingEvent =>
    <DivingEvent key={divingEvent.id} divingEvent={divingEvent} />
  )
  return (
    <tbody>{rows()}</tbody>
  )
}

export default DivingEvents