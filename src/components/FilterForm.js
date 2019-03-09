import React from 'react'

const FilterForm = (props) => {

  return (
    <table width="100%">
      <tbody>
        <tr>
          <td id="caption">Suodata</td>
        </tr>
        <tr>
          <td width="20%">Tapahtuman nimen osalla:</td>
          <td width="30%">
            <input size="40" value={props.titleFilter} onChange={props.handleTitleFiltering} />
          </td>
          <td width="20%">Tapahtuman kuvauksen osalla:</td>
          <td width="30%">
            <input size="40" value={props.descriptionFilter} onChange={props.handleDescriptionFiltering} />
          </td>
        </tr>
        <tr>
          <td width="20%">Kohteen nimen osalla:</td>
          <td width="30%">
            <input size="40" value={props.targetFilter} onChange={props.handleTargetFiltering} />
          </td>
          <td width="20%">Käyttäjänimen osalla:</td>
          <td width="30%">
            <input size="40" value={props.userFilter} onChange={props.handleUserFiltering} />
          </td>
        </tr>
      </tbody>
    </table>
  )

}

export default FilterForm
