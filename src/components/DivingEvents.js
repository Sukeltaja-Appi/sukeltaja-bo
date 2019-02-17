import React from 'react'
import DivingEvent from './DivingEvent'

const DivingEvents = ({ divingEvents, titleFilter, userFilter }) => {

  var divingEventsToShow = divingEvents

  // Eslint warnings disabled from the following. It doesn't like && combined with ||.
  // We could perhaps make it more elegant but for now it works.
  // Have to be careful with comparing items that could be null.
  // eslint-disable-next-line
  if (divingEvents != null || divingEvents.length > 0) {
    divingEventsToShow = divingEvents.filter(divingEvent =>
      ((!(divingEvent.title) && titleFilter.length === 0) ||
        (divingEvent.title && divingEvent.title.toUpperCase().includes(titleFilter.toUpperCase()))) &&
      ((!(divingEvent.user.username) && userFilter.length === 0) ||
        (divingEvent.user.username && divingEvent.user.username.toUpperCase().includes(userFilter.toUpperCase())))
    )
  }
  const rows = () => divingEventsToShow.map(divingEvent =>
    <DivingEvent key={divingEvent.id} divingEvent={divingEvent} />
  )
  return (
    <tbody>
      <tr>
        <th>Alkuaika</th>
        <th>Loppuaika</th>
        <th>Käyttäjä</th>
        <th colSpan="3">Tapahtuma</th>
      </tr>
      {rows()}
    </tbody>
  )
}

export default DivingEvents