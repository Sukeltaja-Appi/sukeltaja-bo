import React from 'react'
import Dive from './Dive'

const Dives = ({ dives }) => {
  if (dives && dives.length > 0) {

    const rows = () => dives.map((dive, index) =>
      <Dive key={`${dive._id}${index}`} dive={dive} odd={index%2} />
    )
    return (
      <>
        <tr width="100%">
          <td width="2.5%"></td>
          <td width="40%" colSpan="2" id="caption">Sukeltaja</td>
          <td width="27.5%" colSpan="2" id="caption">Alkuaika</td>
          <td width="30.0%" colSpan="2" id="caption">Loppuaika</td>
        </tr>
        {rows()}
      </>
    )
  } else {
    return null
  }
}
export default Dives