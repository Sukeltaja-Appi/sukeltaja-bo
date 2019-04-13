import React, { useState } from 'react'
import { Collapse, Table, Row, Col } from 'react-bootstrap'
import Togglable from './Togglable'
import Target from './Target'
//import Dives from './Dives'
import { formatDate } from '../utils/dates'

const DivingEvent = (props) => {

  const [showEventDetails, setShowEventDetails] = useState(false)

  const toggRef = React.createRef()

  // The following belongs after <Target... It is commented out because we don't get all the data anymore
  // with Events.
  // <Dives dives={props.divingEvent.dives} />

  //<tr onClick={() => setShowTarget(!showTarget)}
  //aria-controls={props.divingEvent._id}
  //aria-expanded={showTarget}>

  // <Collapse in={showTarget}>
  // <Target target={props.divingEvent.target} id={props.divingEvent._id} />
  // </Collapse>

  const divingEvent = props.divingEvent
  const gotDescription = (
    divingEvent.description !== undefined && divingEvent.description !== null && divingEvent.description !== ''
  )
  const gotTarget = divingEvent.target !== undefined && divingEvent.target !== null

  const diveTarget = () => {
    if (gotTarget) {
      return (
        <>
          <tr id="target">
            <td width="2.5%"></td>
            <td width="40%" colSpan="2" id="caption">Kohde</td>
            <td width="57.5%" colSpan="4" id="caption">Sijainti</td>
          </tr>
          <Target target={divingEvent.target} elementId={divingEvent._id.concat(divingEvent.target._id)} />
        </>
      )
    } else {
      return null
    }
  }

  const eventDescription = () => {
    if (gotDescription) {
      return (
        <tr>
          <td colSpan="6" debug="description">{props.divingEvent.description}</td>
        </tr>
      )
    } else {
      return null
    }
  }

  const detailCaret = () => {
    if (gotDescription || gotTarget) {
      return <i className={showEventDetails ? 'fas fa-caret-down' : 'fas fa-caret-right'}></i>
    } else {
      return null
    }
  }

  const details = () => {
    if (gotDescription || gotTarget) {
      return (
        <Collapse in={showEventDetails}>
          <tr id={divingEvent._id}>
            <td colSpan="7">
              <Table>
                <tbody>
                  {eventDescription()}
                  {diveTarget()}
                </tbody>
              </Table>
            </td>
          </tr>
        </Collapse>
      )
    } else {
      return null
    }
  }

  return (
    <>
      <tr onClick={() => setShowEventDetails(!showEventDetails)}
        aria-controls={divingEvent._id}
        aria-expanded={showEventDetails}>
        <td>{detailCaret()}</td>
        <td>{formatDate(props.divingEvent.startdate)}</td>
        <td>{formatDate(props.divingEvent.enddate)}</td>
        <td>{props.divingEvent.creator.username}</td>
        <td colSpan="3">{props.divingEvent.title}</td>
      </tr>
      {details()}
    </>
  )

}

export default DivingEvent
