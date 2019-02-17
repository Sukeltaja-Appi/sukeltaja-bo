import React from 'react'
import Togglable from './Togglable'

const DivingEvent = (props) => {

  const toggRef = React.createRef()

  const EventHeader = () => {
    return (
      <>
        <td>{props.divingEvent.startdate}</td>
        <td>{props.divingEvent.enddate}</td>
        <td>{props.divingEvent.user.username}</td>
        <td colSpan="3">{props.divingEvent.title}</td>
      </>
    )
  }

  return (
    <Togglable eventHeader={EventHeader()} ref={toggRef}>
        <td colSpan="6">{props.divingEvent.description}</td>
    </Togglable>
  )

}

export default DivingEvent
