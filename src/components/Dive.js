import React, { useState } from 'react'
import { Collapse } from 'react-bootstrap'
import { formatDate } from '../utils/dates'
import DiveDetails from './DiveDetails';

const Dive = (props) => {

  const [showDiveDetails, setShowDiveDetails] = useState(false)

  if (props.dive) {
    const dive = props.dive
    return (
      <>
        <tr onClick={() => setShowDiveDetails(!showDiveDetails)}
          aria-controls={props.elementId}
          aria-expanded={showDiveDetails}
          style={props.odd ? { backgroundColor: "#ffffff" } : { backgroundColor: "#eeeeee" }} >
          <td>
            <i className={showDiveDetails ? 'fas fa-caret-down' : 'fas fa-caret-right'}></i>
          </td>
          <td colSpan="2" id="dive">{dive.user.username}</td>
          <td colSpan="2" id="dive">
            {formatDate(dive.startdate)}
          </td>
          <td colSpan="2" id="dive">
            {formatDate(dive.enddate)}
          </td>
        </tr>
        <tr>
          <Collapse in={showDiveDetails}>
            <td colSpan="7" id={dive._id}>
              <DiveDetails dive={dive} />
            </td>
          </Collapse>
        </tr>
      </>
    )
  } else {
    return null
  }
}

export default Dive