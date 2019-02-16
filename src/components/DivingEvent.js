import React from 'react'

const DivingEvent = (props) => {

  return (
    <>
      <tr>
        <td colSpan="6">{props.divingEvent.title}</td>
      </tr>
      <tr>
        <td>Alkuaika</td>
        <td>{props.divingEvent.startdate}</td>
        <td>Loppuaika</td>
        <td>{props.divingEvent.enddate}</td>
        <td>Käyttäjä</td>
        <td>{props.divingEvent.user.username}</td>
      </tr>
    </>
  )

}

export default DivingEvent
