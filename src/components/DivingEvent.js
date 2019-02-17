import React from 'react'
import Togglable from './Togglable'
import Target from './Target'

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
    <Togglable showAlways={EventHeader()} shownStyle="eventdetailsshown" ref={toggRef}>
      <td colSpan="6">
        <table width="100%">
          <tbody>
            <tr>
              <td colSpan="6">{props.divingEvent.description}</td>
            </tr>
            <Target target={props.divingEvent.target}/>
          </tbody>
        </table>
      </td>
    </Togglable>
  )

}

export default DivingEvent
