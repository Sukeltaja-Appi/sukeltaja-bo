import React from 'react'

const Dive = (props) => {

  if (props.dive) {
    const dive = props.dive
    return (
      <tr>
        <td width="20%">{dive.user}</td>
        <td width="30%">{dive.latitude}, {dive.longitude}</td>
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