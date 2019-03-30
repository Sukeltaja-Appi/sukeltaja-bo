import React, { useState } from 'react'
import { Collapse } from 'react-bootstrap'
import decimalToDMS from '../utils/coordinates'
import TargetDetails from './TargetDetails';

const Target = (props) => {

  const [showTargetDetails, setShowTargetDetails] = useState(false)

  if (props.target !== undefined && props.target !== null) {
    const target = props.target
    return (
      <>
        <tr onClick={() => setShowTargetDetails(!showTargetDetails)}
            aria-controls={props.elementId}
            aria-expanded={showTargetDetails} id="target">
          <td>
            <i className={showTargetDetails? 'fas fa-caret-down' : 'fas fa-caret-right'}></i>
          </td>
          <td colSpan="2">{target.name}</td>
          <td colSpan="2">
            {`${decimalToDMS(target.latitude)}`}{target.latitude > 0 ? ' N ' : ' S '}
          </td>
          <td colSpan="2">
            {`${decimalToDMS(target.longitude)}`}{target.longitude > 0 ? ' E ' : ' W '}
          </td>
        </tr>
        <tr>
          <Collapse in={showTargetDetails}>
            <td colSpan="7" id={props.elementId}>
              <TargetDetails target={target}/>
            </td>
          </Collapse>
        </tr>
      </>
    )
  } else {
    return null
  }
}

export default Target