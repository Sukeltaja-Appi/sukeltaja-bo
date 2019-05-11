import React, { useState } from 'react'
import { Collapse } from 'react-bootstrap'
import Dive from './Dive'

const Dives = (props) => {

  const dives = props.dives

  const [showDives, setShowDives] = useState(false)

  const noMargins = { "margins": "0px" }

  //<Container id={props.elementId} style={noMargins}>
  //</Container>

  if (dives && dives.length > 0) {

    const rows = () => dives.map((dive, index) =>
      <Dive key={`${dive._id}${index}`} dive={dive} odd={index % 2} />
    )
    return (
      <>
        <tr onClick={() => setShowDives(!showDives)}
          aria-controls={props.elementId}
          aria-expanded={showDives} width="100%">
          <td width="1%"><i className={showDives ? 'fas fa-caret-down' : 'fas fa-caret-right'}></i></td>
          <td colSpan="2" id="caption">Sukeltaja</td>
          <td colSpan="1" id="caption">Alkuaika</td>
          <td colSpan="1" id="caption">Loppuaika</td>
          <td colSpan="2" id="caption">Sijainti</td>
        </tr>
        <Collapse in={showDives}>
          <tr id={props.elementId} style={noMargins}>
            <td colSpan="7" style={noMargins}>
              <table style={noMargins} width="100%">
                <tbody>
                  {rows()}
                </tbody>
              </table>
            </td>
          </tr>
        </Collapse>
      </>
    )
  } else {
    return null
  }
}
export default Dives