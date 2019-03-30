import React from 'react'
import decimalToDMS from '../utils/coordinates'

const Dive = (props) => {

  if (props.dive) {
    const dive = props.dive
    return (
      <tr>
        <td width="20%">{dive.username}</td>
        <td width="30%">
          {`${decimalToDMS(dive.latitude)}`}{dive.latitude > 0 ? ' N ' : ' S '}
          {`${decimalToDMS(dive.longitude)}`}{dive.longitude > 0 ? ' E ' : ' W '}
        </td>
        <td id="caption" width="10%">&nbsp;</td>
        <td id="caption" width="10%">&nbsp;</td>
        <td width="15%">&nbsp;</td>
        <td width="15%">&nbsp;</td>
      </tr>
    )
  } else {
    return null
  }
}

export default Dive