import React from 'react'

const Target = (props) => {
  if (props.target) {
    const target = props.target
    return (
      <tr>
        <td width="10%">Kohde:</td>
        <td width="10%">{target.type}</td>
        <td colSpan="2">{target.name}</td>
        <td width="15%"><a href={target.hylyt_link}>hylyt.net({target.hylyt_id})</a></td>
        <td width="15%"><a href={target.mj_link}>kyppi.fi({target.mj_id})</a></td>
      </tr>
    )
  } else {
    return null
  }
}

export default Target