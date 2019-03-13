import React from 'react'
import { Table } from 'react-bootstrap'
import Togglable from './Togglable'
import Target from './Target'
import Dives from './Dives'
import { formatDate } from '../utils/dates'

const DivingEvent = (props) => {

  const toggRef = React.createRef()

  const EventHeader = () => {
    return (
      <>
        <td width="17.5%">{formatDate(props.divingEvent.startdate)}</td>
        <td width="17.5%">{formatDate(props.divingEvent.enddate)}</td>
        <td width="15%">{props.divingEvent.creator.username}</td>
        <td width="50%" colSpan="3">{props.divingEvent.title}</td>
      </>
    )
  }

// The following belongs after <Target... It is commented out because autopopulating
// dives in the backend maybe spills out multiple dives with the same id and after
// all a dive should only belong to a single event
// <Dives dives={props.divingEvent.dives} />

  return (
    <Togglable showAlways={EventHeader()} shownStyle="eventdetailsshown" ref={toggRef}>
      <td colSpan="6">
        <Table size="sm" width="100%">
          <tbody>
            <tr>
              <td colSpan="6">{props.divingEvent.description}</td>
            </tr>
            <Target target={props.divingEvent.target} />
          </tbody>
        </Table>
      </td>
    </Togglable>
  )

}

export default DivingEvent
