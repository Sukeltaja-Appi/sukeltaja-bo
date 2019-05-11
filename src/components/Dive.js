import React from 'react'
import { formatDate } from '../utils/dates'
import decimalToDMS from '../utils/coordinates'

const Dive = (props) => {

  if (props.dive) {
    const dive = props.dive
    return (
      <>
        <tr>
          <td colSpan="3" id="dive">{dive.user.username}</td>
          <td colSpan="1" id="dive">
            {formatDate(dive.startdate)}
          </td>
          <td colSpan="1" id="dive">
            {formatDate(dive.enddate)}
          </td>
          <td colSpan="2" id="dive">
            {`${decimalToDMS(dive.latitude)}`}{dive.latitude > 0 ? ' N ' : ' S '}
            {`${decimalToDMS(dive.longitude)}`}{dive.longitude > 0 ? ' E ' : ' W '}
        </td>
        </tr>
      </>
    )
  } else {
    return null
  }
}

export default Dive