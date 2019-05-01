import axios from 'axios'
import { storageKeyUser, baseURL, eventsAPI } from '../utils/config'

const serviceURL = `${baseURL}${eventsAPI}`

const getAll = async () => {

  let config = ''
  const loggedUserJSON = window.localStorage.getItem(storageKeyUser)
  if (loggedUserJSON && loggedUserJSON.length > 0 && loggedUserJSON !== 'null') {
    const token = `bearer ${JSON.parse(loggedUserJSON).token}`
    config = {
      headers: { Authorization: token },
    }
  } else {
    console.log('Unauthorized call in eventService')
    return null
  }

  const response = await axios.get(serviceURL, config)
  console.log(response.data.length, 'events')
  return response.data
}

export default { getAll }