import React, { useState } from 'react'
import { Collapse } from 'react-bootstrap'
import decimalToDMS from '../utils/coordinates'
import TargetDetails from './TargetDetails'
import Dives from './Dives'

const Target = (props) => {

  const [showTargetDetails, setShowTargetDetails] = useState(false)

  if (props.target !== undefined && props.target !== null) {
    const target = props.target

    const dives = () => {
      if (target.dives !== undefined) {
        return (
          <Dives dives={target.dives} />
        )
      } else {
        return null
      }
    }

    if (props.noDetails) {
      return (
        <tr>
          <td>{target.name}</td><td>{target.dives.length}</td>
        </tr>
      )
    } else {
      return (
        <>
          <tr onClick={() => setShowTargetDetails(!showTargetDetails)}
            aria-controls={props.elementId} aria-expanded={showTargetDetails}
            style={target.dives !== undefined ? { backgroundColor: "#ddddff" } : { backgroundColor: "#ffffff" }} >
            <td>
              <i className={showTargetDetails ? 'fas fa-caret-down' : 'fas fa-caret-right'}></i>
            </td>
            <td colSpan="2">{target.name}</td>
            <td colSpan="2">
              {`${decimalToDMS(target.latitude)}`}{target.latitude > 0 ? ' N ' : ' S '}
            </td>
            <td colSpan="2">
              {`${decimalToDMS(target.longitude)}`}{target.longitude > 0 ? ' E ' : ' W '}
            </td>
          </tr>
          <Collapse in={showTargetDetails}>
            <tr>
              <td colSpan="7" id={props.elementId}>
                <TargetDetails target={target} />
              </td>
            </tr>
          </Collapse>
          {dives()}
        </>
      )
    }
  } else {
    return null
  }
}

export default Target