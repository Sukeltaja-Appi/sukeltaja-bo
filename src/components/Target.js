import React from 'react'

const Target = (props) => {
  if (props.target) {
    const target = props.target
    return (
      <>
        <tr>
          <td id="caption" width="20%">Kohde:</td>
          <td width="50%" colSpan="3">{target.type}: {target.name}</td>
          <td width="15%"><a href={target.hylyt_link}>hylyt.net({target.hylyt_id})</a></td>
          <td width="15%"><a href={target.mj_link}>kyppi.fi({target.mj_id})</a></td>
        </tr>
        <tr>
          <td id="caption" width="20%">Sijainti:</td>
          <td width="30%">{target.latitude}, {target.longitude}</td>
          <td id="caption" width="10%">Syvyys:</td>
          <td width="10%">{target.depth}</td>
          <td width="15%">&nbsp;</td>
          <td width="15%">&nbsp;</td>
        </tr>
      </>
    )
  } else {
    return null
  }
}

export default Target