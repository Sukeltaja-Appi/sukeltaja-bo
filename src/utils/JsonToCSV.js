import React from 'react'
import { connect } from 'react-redux'
import decimalToDMS from './coordinates'
import { eventsfilename, targetdivesfilename, targetsfilename, usersfilename } from './config'

// We're making a link for downloading the json data in csv format:
const JsonToCSV = (props) => {

  if (props.content !== undefined && props.content !== null) {

    //console.log('Making a file for', props.contentType)

    let dataHeaders = {}
    let filename = ''
    switch (props.contentType) {
      case 'events':
        dataHeaders = require('../utils/eventHeaders.json')
        filename = eventsfilename
        break
      case 'targetDives':
        dataHeaders = require('../utils/targetDiveHeaders.json')
        filename = targetdivesfilename
        break
      case 'targets':
        dataHeaders = require('../utils/targetHeaders.json')
        filename = targetsfilename
        break
        case 'users':
        dataHeaders = require('../utils/userHeaders.json')
        filename = usersfilename
        break
      default:
        break
    }


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
    let havingArray = false
    let arrayIndex = 0
    let arrayMax = 0
    for (let o = 0; o < props.content.length; !havingArray ? o++ : null) {
      let jsonObj = props.content[o]
      let dataRow = ''
      // eslint-disable-next-line no-loop-func, cause I really really really want to do this
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
            if (arrKey[2] !== undefined) {
              // It's an array of objects
              havingArray = true
              let arr = Array.from(obj)
              arrayMax = arr.length - 1
              val = arr[arrayIndex][arrKey[2]]
            } else if (objAttr !== undefined && objAttr != null) {
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
      if (arrayIndex >= arrayMax) {
        havingArray = false
        arrayIndex = 0
      } else {
        arrayIndex++
      }
    }
    const downloadLink = () => {
      const contentType = 'text/csv;charset=utf-8'
      let blob = new Blob(data, { type: contentType })
      let urlForCSV = window.URL.createObjectURL(blob)
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