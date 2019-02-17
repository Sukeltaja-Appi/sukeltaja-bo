import React from 'react'
import Dive from './Dive'

const Dives = ({ dives }) => {
  if (dives && dives.length > 0) {

    const rows = () => dives.map(dive =>
      <Dive key={dive._id} dive={dive} />
    )
    return (
      <>
        <tr>
          <td id="caption" width="20%">Sukeltajat</td>
          <td id="caption" width="30%">Sijainti</td>
          <td id="caption" width="10%">&nbsp;</td>
          <td id="caption" width="10%">&nbsp;</td>
          <td width="15%">&nbsp;</td>
          <td width="15%">&nbsp;</td>
        </tr>
        {rows()}
      </>
    )
  } else {
    return null
  }
}
export default Dives