import React from 'react'
import { kyppiUrl } from '../utils/config'

const Target = (props) => {

  const linkToKyppi = (mj_id) => mj_id ? `${kyppiUrl}${mj_id}` : undefined

  if (props.target) {
    const target = props.target
    return (
      <>
        <tr>
          <td id="caption" width="10%">Kohde:</td>
          <td width="60%" colSpan="3">{target.name}: {target.type} ({target.material})</td>
          <td width="30%" colSpan="2"><a href={linkToKyppi(target.mj_id)}>kyppi.fi kohde {target.mj_id}</a></td>
        </tr>
        <tr>
          <td id="caption" width="10%">Sijainti:</td>
          <td width="40%">{target.latitude}, {target.longitude}</td>
          <td id="caption" width="10%">&nbsp;</td>
          <td width="10%">&nbsp;</td>
          <td width="30%" colSpan="2">&nbsp;</td>
        </tr>
      </>
    )
  } else {
    return null
  }
}

export default Target