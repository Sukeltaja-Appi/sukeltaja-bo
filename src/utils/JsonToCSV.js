import React from 'react'
import { connect } from 'react-redux'
import decimalToDMS from './coordinates'

// Need to switch the json description to a props so we can use this for other exports also
const dataHeaders = require('../utils/eventHeaders.json')

// We're trying to make a link for downloading the json data in csv format:

const JsonToCSV = (props) => {

  if (props.content !== undefined && props.content !== null) {

    console.log('Making', props.filename)

    const sep = props.sep // Field separator
    const dec = props.dec // Decimal separator
    const xdc = (props.dec === ',' ? '.' : ',')

    let data = []

    // First make the headers
    let headers = '';
    dataHeaders.forEach(header => {
      headers = headers.concat('"').concat(header.label).concat('";')
    })
    headers = headers.concat('\n')
    data.push(headers)

    // Then the actual rows of data
    props.content.forEach(jsonObj => {
      let dataRow = ''
      dataHeaders.forEach(header => {
        let val = ''
        const quo = (header["type"] === "Number" ? '' : '"')
        if (header["type"] === "Count" && jsonObj[header["key"]] !== undefined && jsonObj[header["key"]] !== null) {
          // Special case first: Type: "Count"
          val = jsonObj[header["key"]].length
        } else if (header["key"].includes('.')) {
          // It's an object
          try {
            // We'll fish the attribute out if it exists
            const arrKey = header["key"].split('.')
            const obj = jsonObj[arrKey[0]]
            const objAttr = obj[arrKey[1]]
            if (objAttr !== undefined && objAttr != null) {
              // The attribute was eventually found
              val = objAttr
            }
          } catch (exception) {
            // Object was perhaps missing
            // Do nothing
          }
        } else {
          // Just a regular attribute
          val = (jsonObj[header["key"]] === undefined || jsonObj[header["key"]] === null ? '' : jsonObj[header["key"]])
        }
        if (val !== '') {
          if (header["type"] === "Number") {
            val = val.toString().replace(xdc, dec)
          } else if (header["type"] === "Latitude") {
            val = `${decimalToDMS(val)}`.concat(val > 0 ? ' N ' : ' S ')
          } else if (header["type"] === "Longitude") {
            val = `${decimalToDMS(val)}`.concat(val > 0 ? ' E ' : ' W ')
          }
        }
        dataRow = dataRow.concat(quo).concat(val).concat(quo).concat(sep)
      })
      dataRow = dataRow.concat('\n')
      data.push(dataRow)
    })

    const downloadLink = () => {
      const contentType = 'text/csv;charset=utf-8'
      let blob = new Blob(data, { type: contentType })
      let urlForCSV = window.URL.createObjectURL(blob)
      const filename = props.filename
      const prompt = "Lataa CSV"
      return React.createElement('a', { href: urlForCSV, type: contentType, download: filename }, prompt)
    }

    return (
      <>{downloadLink()}</>
    )

  } else {
    return null
  }

}
const mapStateToProps = (state) => {
  return {
    events: state.events
  }
}

export default connect(mapStateToProps, null)(JsonToCSV)