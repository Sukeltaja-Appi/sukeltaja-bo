import React from 'react'

const FilterForm = (props) => {

  return (
    <table>
      <tbody>
        <tr>
          <td>Hae vain tapahtumia, joissa:</td>
          <td>
            <input value={props.contentFilter} onChange={props.handleContentFiltering} />
          </td>
          <td>Hae vain käyttäjiä, joissa:</td>
          <td>
            <input value={props.userFilter} onChange={props.handleUserFiltering} />
          </td>
        </tr>
      </tbody>
    </table>
  )

}

export default FilterForm
