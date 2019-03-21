import React from 'react'
import { kyppiUrl } from '../utils/config'
import decimalToDMS from '../utils/coordinates'

const Target = (props) => {

  const linkToKyppi = (mj_id) => mj_id ? `${kyppiUrl}${mj_id}` : undefined

  if (props.target) {
    const target = props.target
    return (
      <>
        <tr>
          <td id="caption" width="10%">Kohde:</td>
          <td width="60%" colSpan="2">{target.name}</td>
          <td width="30%" colSpan="3"><a href={linkToKyppi(target.mj_id)}>{linkToKyppi(target.mj_id)}</a></td>
        </tr>
        <tr>
          <td id="caption" width="10%">Tyyppi:</td>
          <td width="60%" colSpan="2">{target.type}</td>
          <td width="30%" colSpan="3">&nbsp;</td>
        </tr>
        <tr>
          <td id="caption" width="10%">Materiaali:</td>
          <td width="60%" colSpan="2">{target.material}</td>
          <td width="30%" colSpan="3">&nbsp;</td>
        </tr>
        <tr>
          <td id="caption" width="10%">Sijainti:</td>
          <td width="40%" colSpan="2">
            {`${decimalToDMS(target.latitude)}`}{target.latitude > 0 ? ' N ' : ' S '} 
            {`${decimalToDMS(target.longitude)}`}{target.longitude > 0 ? ' E ' : ' W '}
          </td>
          <td id="caption" width="10%">Syvyys:</td>
          <td width="20%" colSpan="2">{target.depth}</td>
        </tr>
      </>
    )
  } else {
    return null
  }
}

export default Target