import React from 'react'

const Target = (props) => {
  if (props.target) {
    const target = props.target
    return (
      <>
        <tr>
          <td width="25%">Kohde: {target.type}</td>
          <td width="45%" colSpan="3">{target.name}</td>
          <td width="15%"><a href={target.hylyt_link}>hylyt.net({target.hylyt_id})</a></td>
          <td width="15%"><a href={target.mj_link}>kyppi.fi({target.mj_id})</a></td>
        </tr>
        <tr>
          <td width="15%">Sijainti: {target.latitude}, {target.longitude}</td>
          <td width="10%">Syvyys: {target.depth}</td>
          <td colSpan="4">&nbsp;</td>
        </tr>
      </>
    )
  } else {
    return null
  }
}

export default Target