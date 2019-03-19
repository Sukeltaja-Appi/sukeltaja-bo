import React from 'react'

// We're trying to make a link like the following for downloading data in csv format:
//
// <a download="Sukellustapahtumat.csv"
//   href="data:text/csv;charset=utf-8,
//   \"Tapahtuma\";\"Kuvaus\";\"Alkupäivä\";\"Loppupäivä\";\"Perustaja\";\"Pääkäyttäjät\";\"Osallistujat\"
//   \"Koko vuorokauden kestävä…\”;\”Koko vuorokauden kestävä… paikassa Saittalammen ruuhi 2\";\"2018-12-10T13:00:00.000Z\";\"2018-12-11T01:00:00.000Z\";\"\";\"\";\"\""
//   target="_self">
//   Lataa CSV
// </a>

export const JsonToCSV = () => {

  const downloadLink = () => {
    const contentType = 'text/csv;charset=utf-8'
    let blob = new Blob(['\\"Testing\\"'], { type: contentType })
    let urlForCSV = window.URL.createObjectURL(blob)
    const filename = 'filename.csv'
    const prompt = "DOWNLOAD!"
    return React.createElement('a', {href: urlForCSV, type: contentType, download: filename}, prompt)
  }

  return (
    <div>{downloadLink()}</div>
  )

}