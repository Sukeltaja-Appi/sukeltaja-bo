import React from 'react'

const FilterForm = (props) => {

  return (
    <table>
      <tbody>
        <tr>
          <td>Rajaa tapahtuman nimen osalla:</td>
          <td>
            <input value={props.titleFilter} onChange={props.handleTitleFiltering} />
          </td>
          <td>Rajaa kohteen nimen osalla:</td>
          <td>
            <input value={props.targetFilter} onChange={props.handleTargetFiltering} />
          </td>
          <td>Rajaa käyttäjänimen osalla:</td>
          <td>
            <input value={props.userFilter} onChange={props.handleUserFiltering} />
          </td>
        </tr>
      </tbody>
    </table>
  )

}

export default FilterForm
